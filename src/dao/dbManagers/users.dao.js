import userModel from "../models/Users.model.js";
import { sendAccountDeletionEmail } from "../../utils/email.utils.js";


export class UsersManagerDAO {

async getPremiumDao(req, res) {
    try {
        const { uid } = req.params;
        const user = await userModel.findById(uid);
    
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
    
        // Verificar si el usuario ya ha cargado los documentos necesarios
        const requiredDocuments = ["Identificación", "Comprobante de domicilio", "Comprobante de estado de cuenta"];
        const userDocuments = user.documents.map((document) => document.name);
    
        const documentsMissing = requiredDocuments.filter((doc) => !userDocuments.includes(doc));
    
        if (documentsMissing.length > 0) {
          return res.status(400).json({
            message: "El usuario no ha terminado de procesar su documentación. Documentos faltantes: " + documentsMissing.join(", "),
          });
        }
    
        // Si todos los documentos requeridos están presentes, actualiza el rol del usuario a premium
        user.role = "premium";
        await user.save();
    
        return res.status(200).json({ message: "Usuario actualizado a premium exitosamente" });
      } catch (error) {
        return res.status(500).json({ message: "Error al actualizar al usuario a premium", error: error.message });
      }
}

async getUserDao(req, res) {
    try {
        const { uid } = req.params;
        const user = userModel.findById(uid);
        if(!user) return `Usuario no existe.`
        return await userModel.updateOne({ _id: uid }, { role: 'user' });
    } catch (error) {
        return `${error}`;
    }
}

async uploadDocumentsDao(req, res) {
    try {
        const { uid } = req.params;
        const uploadedFiles = req.files;

        if (!uploadedFiles || uploadedFiles.length === 0) {
            return res.status(400).json({ message: "No se han proporcionado archivos válidos" });
        }

        const user = await userModel.findById(uid);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Obtiene los documentos existentes del usuario
        const existingDocuments = user.documents || [];

        // Espera un campo en la solicitud llamado 'documentName' que contiene el nombre del documento
        const documentName = req.body.documentName;

        // Itera a través de los archivos cargados y agrega los nuevos documentos
        for (const file of uploadedFiles) {
            existingDocuments.push({
                name: documentName, // Usa el nombre del documento seleccionado
                reference: file.filename,
            });
        }

        // Actualiza la propiedad de documentos del usuario con los documentos existentes y nuevos
        user.documents = existingDocuments;

        // Guarda el usuario actualizado en la base de datos
        await user.save();

        return res.status(200).json({ message: "Documentos cargados exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error en la carga de documentos", error: error.message });
    }
}


async uploadFileDao(req, res) {
    try {
        const { uid } = req.params;
        const uploadedFile = req.file;

        if (!uploadedFile) {
            return res.status(400).json({ message: "No se ha proporcionado un archivo válido" });
        }

        const user = await userModel.findById(uid);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Mapea los archivos cargados a objetos de documento
        const file = {
            name: uploadedFile.originalname,
            reference: uploadedFile.filename,
        };

        // Agrega el archivo al array de documentos del usuario
        user.documents.push(file);

        // Guarda el usuario actualizado en la base de datos
        await user.save();

        return res.status(200).json({ message: "Archivo cargado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error en la carga del archivo", error: error.message });
    }
}

async getAllUsersDao(req, res) {
    try {
        // Consulta la base de datos para obtener todos los usuarios
        const users = await userModel.find({}, "first_name last_name email role");

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
    }
}

async deleteInactiveUsersDao(req, res) {
    try {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const usersToDelete = await userModel.find({
            last_connection: { $lt: twoDaysAgo },
        });

        const deletedUsers = await userModel.deleteMany({
            last_connection: { $lt: twoDaysAgo },
        });

        if (deletedUsers.deletedCount > 0) {
            usersToDelete.forEach(async (user) => {
                await sendAccountDeletionEmail(user.email);
            });

            return res.status(200).json({
                message: `${deletedUsers.deletedCount} usuarios inactivos eliminados y notificados.`,
            });
        } else {
            return res.status(200).json({ message: 'No hay usuarios inactivos para eliminar.' });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar usuarios inactivos',
            error: error.message,
        });
    }
}

async deleteUserDao(req, res) {
    try {
        const { uid } = req.params;
        
        // Busca y elimina al usuario por su ID
        const deletedUser = await userModel.findByIdAndDelete(uid);
    
        if (!deletedUser) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    
        return res.status(200).json({ message: 'Usuario eliminado exitosamente' });
      } catch (error) {
      }
}

  
}