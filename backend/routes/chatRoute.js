const express = require('express');
const router = express.Router();
const Chat = require('../models/chat');
const axios = require('axios');

// Fetch all chats (for sidebar)
router.get('/', async (req, res) => {
    try {
        const chats = await Chat.find().select('_id title').sort({ createdAt: -1 });
        res.json(chats);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch chats' });
    }
});

// Fetch single chat by ID
router.get('/:id', async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        res.json(chat);
    } catch (err) {
        res.status(404).json({ error: 'Chat not found' });
    }
});

// Start new chat
router.post('/', async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question required' });

    try {
        const geminiRes = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
            {
                contents: [{ parts: [{ text: question }] }]
            }
        );

        const response = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";

        const newChat = new Chat({
            title: question.slice(0, 50),
            messages: [{ question, response }]
        });

        const saved = await newChat.save();
        res.json(saved);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Gemini API Error' });
    }
});

// Continue existing chat
router.post('/:id', async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question required' });

    try {
        const geminiRes = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
            {
                contents: [{ parts: [{ text: question }] }]
            }
        );

        const response = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";

        const chat = await Chat.findById(req.params.id);
        if (!chat) return res.status(404).json({ error: 'Chat not found' });

        if (chat.messages.length >= 30) {
            return res.status(403).json({ error: 'Limit reached for this chat' });
        }

        chat.messages.push({ question, response });
        await chat.save();

        res.json({ question, response });
    } catch (err) {
        console.error("❌ Gemini API Error:", err.response?.data || err.message || err);
        res.status(500).json({ error: 'Gemini API Error' });
    }
});

module.exports = router;
