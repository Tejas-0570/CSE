import React, { useState } from 'react';
import { Box, IconButton, Modal, Typography, TextField, Button } from '@mui/material';
import { BsWechat } from 'react-icons/bs';

const ChatIconWithModal = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = () => {
    if (message.trim() !== '') {
      setChatHistory(prev => [...prev, { sender: 'user', text: message }]);
      setMessage('');
      // Placeholder for response logic (e.g. OpenAI, Gemini, etc.)
      setTimeout(() => {
        setChatHistory(prev => [...prev, { sender: 'bot', text: 'I received your message!' }]);
      }, 500);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1300,
        }}
      >
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: '#2563eb',
            color: '#fff',
            width: 60,
            height: 60,
            borderRadius: '50%',
            boxShadow: 3,
            '&:hover': { backgroundColor: '#1d4ed8' },
          }}
        >
          <BsWechat style={{ fontSize: '28px' }} />
        </IconButton>
      </Box>

      {/* Chat Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 90,
            right: 30,
            width: 350,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 400,
          }}
        >
          <Typography variant="h6" fontWeight={600} color="#2563eb" mb={1}>
            Need Help?
          </Typography>

          {/* Chat History */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              mb: 2,
              px: 1,
              bgcolor: '#f3f4f6',
              borderRadius: 1,
            }}
          >
            {chatHistory.map((msg, index) => (
              <Typography
                key={index}
                align={msg.sender === 'user' ? 'right' : 'left'}
                sx={{
                  color: msg.sender === 'user' ? '#2563eb' : '#000',
                  backgroundColor: msg.sender === 'user' ? '#dbeafe' : '#e5e7eb',
                  p: 1,
                  m: 0.5,
                  borderRadius: 1,
                  display: 'inline-block',
                  maxWidth: '80%',
                }}
              >
                {msg.text}
              </Typography>
            ))}
          </Box>

          {/* Input Area */}
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type your question..."
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" onClick={handleSend} disabled={!message.trim()}>
              Send
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChatIconWithModal;
