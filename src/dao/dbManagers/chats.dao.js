import messageModel from "../models/chats.js";

export default class ChatManager {
    constructor() {
      console.log("Iniciando chat manager...");
    }
  
    async addMessage(user, message) {
      try {
        const newMessage = await messageModel.create({ user, message });
        return newMessage;
      } catch (error) {
        console.error("Error al agregar el mensaje:", error);
        return null;
      }
    }
  
    async getAllMessages() {
      try {
        const messages = await messageModel.find().lean();
        return messages;
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
        return [];
      }
    }
  }