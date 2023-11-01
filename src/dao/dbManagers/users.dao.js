import userModel from "../models/Users.model.js";

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

}