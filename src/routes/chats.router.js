import express from "express";
import ChatManager from "../dao/dbManagers/chats.js";

const router = express.Router();
const chatManager = new ChatManager();

router.get("/messages", async (req, res) => {
  try {
    const messages = await chatManager.getAllMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los mensajes" });
  }
});

router.post("/messages", async (req, res) => {
  const { user, message } = req.body;

  if (!user || !message) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const newMessage = await chatManager.addMessage(user, message);
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el mensaje" });
  }
});

export default router;
