import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, IconButton, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { HiAcademicCap } from 'react-icons/hi';
import { GiReturnArrow } from "react-icons/gi";
import { GrAttachment } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import { useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';




const ChatbotPopup = ({ onClose }) => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [input, setInput] = useState('');
    const [limitReached, setLimitReached] = useState(false);
    const messagesEndRef = useRef(null);


    useEffect(() => {
        axios.get('/api/chats')
            .then(res => setChats(res.data))
            .catch(err => console.error('Chat load error'));
    }, []);

    useEffect(() => {
        // Disable scroll on mount
        document.body.style.overflow = 'hidden';

        // Enable scroll on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedChat?.messages]);




    const handleNewChat = async () => {
        if (!input.trim()) return;

        const question = input;
        setInput(''); // Clear input immediately

        // Show "You: question" and "Bot: loading..." in UI
        const tempChat = {
            title: question.slice(0, 50),
            messages: [{ question, response: 'loading...' }]
        };
        setSelectedChat(tempChat);

        try {
            const res = await axios.post('/api/chats', { question });
            const finalResponse = res.data.messages[0].response;
            const chatId = res.data._id;

            // Add new chat to chat list
            setChats(prev => [res.data, ...prev]);

            // Typing animation
            let i = 0;
            const interval = setInterval(() => {
                i++;
                const partial = finalResponse.slice(0, i);
                const updatedMessages = [{ question, response: partial }];
                setSelectedChat({ _id: chatId, title: question.slice(0, 50), messages: updatedMessages });

                if (i >= finalResponse.length) clearInterval(interval);
            }, 1);
        } catch (err) {
            console.error(err);
            setSelectedChat({
                title: question.slice(0, 50),
                messages: [{ question, response: '❌ Failed to get response.' }]
            });
        }
    };



    const handleSend = async () => {
        if (!input.trim() || !selectedChat) return;

        const question = input;
        setInput(''); // Clear input immediately

        // Step 1: Show user message with "loading..." immediately
        const loadingMessage = { question, response: 'loading...' };
        const updatedMessages = [...selectedChat.messages, loadingMessage];
        const chatCopy = { ...selectedChat, messages: updatedMessages };
        setSelectedChat(chatCopy);

        try {
            // Step 2: Fetch the full response
            const res = await axios.post(`/api/chats/${selectedChat._id}`, { question });
            const finalResponse = res.data.response;

            // Step 3: Animate typing effect (with local scope, fresh state)
            let i = 0;
            const interval = setInterval(() => {
                i++;
                const partial = finalResponse.slice(0, i);
                const newMessages = [...chatCopy.messages];
                newMessages[newMessages.length - 1] = {
                    ...newMessages[newMessages.length - 1],
                    response: partial
                };
                setSelectedChat({ ...chatCopy, messages: newMessages });

                if (i >= finalResponse.length) clearInterval(interval);
            }, 1); // You can adjust typing speed here

        } catch (err) {
            console.error(err);
            const failedMessages = [...chatCopy.messages];
            failedMessages[failedMessages.length - 1].response = '❌ Failed to get response.';
            setSelectedChat({ ...chatCopy, messages: failedMessages });
        }
    };






    const loadChat = async (id) => {
        const res = await axios.get(`/api/chats/${id}`);
        setSelectedChat(res.data);
        setLimitReached(res.data.messages.length > 30);

    }

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // semi-transparent black
                    backdropFilter: 'blur(4px)', // optional: adds blur effect
                    zIndex: 1499,
                }}

            >
                <Box sx={{
                    position: 'fixed', top: '5%', left: '5%', width: '90%', height: '90%',
                    backgroundColor: '#fff', borderRadius: 3, boxShadow: 3, zIndex: 1500, display: 'flex',
                }}>
                    {/* Close Button */}
                    <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
                        <CloseIcon />
                    </IconButton>

                    {/* Sidebar */}
                    <Box sx={{
                        width: '15%',
                        borderRight: '1px solid #ccc',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3
                    }}>
                        {/* Fixed Header */}
                        <Box sx={{ flexShrink: 0 }}>
                            <Box display="flex" alignItems="center" gap="0.5rem">
                                <HiAcademicCap size={28} color="#2563eb" />
                                <Typography fontWeight="bold" fontSize="1.25rem" color="#000000">
                                    EduLab
                                </Typography>
                            </Box>
                            <hr />
                            <Button
                                sx={{
                                    mt: 2,
                                    border: '1px solid #2563eb',
                                    padding: 1,
                                    width: '100%'
                                }}
                                onClick={() => {
                                    setSelectedChat(null);
                                    setInput('');
                                    setLimitReached(false);
                                }}
                            >
                                <GiReturnArrow style={{ marginRight: '10px' }} /> New Chat
                            </Button>
                            <Typography variant="body1" color="text.secondary" mt={3}>
                                Recent Chats
                            </Typography>
                        </Box>

                        {/* Scrollable Chat List */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                overflowY: 'auto',
                                mt: 2,
                                '&::-webkit-scrollbar': {
                                    width: '6px', // thinner scrollbar
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#d1d5db', // light gray thumb
                                    borderRadius: '8px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: '#f3f4f6', // light background
                                },

                                scrollbarWidth: 'thin', // Firefox
                                scrollbarColor: '#d1d5db #f3f4f6' // Firefox (thumb + track)
                            }}
                        >
                            {chats.map(chat => (
                                <Box
                                    key={chat._id}
                                    sx={{
                                        p: 1,
                                        mb: 1,
                                        cursor: 'pointer',
                                        borderRadius: 1,
                                        backgroundColor: selectedChat?._id === chat._id ? '#e0e7ff' : '#f3f4f6',
                                        '&:hover': {
                                            backgroundColor: selectedChat?._id === chat._id ? '#e0e7ff' : 'lightgray',
                                        }
                                    }}
                                    onClick={() => loadChat(chat._id)}
                                >
                                    <Typography variant="body2">{chat.title}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>


                    {/* Main Chat Area */}
                    <Box sx={{ width: '70%', p: 3, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" fontWeight={600}>Chatbot</Typography>
                        <Box sx={{ flex: 1, overflowY: 'auto', my: 2 }}>
                            {selectedChat?.messages?.map((msg, i) => (
                                <Box key={i} mb={5}>
                                    <Typography variant="body1" color="text.secondary"><strong>You:</strong> {msg.question}</Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        <strong>Bot:</strong>{' '}
                                        <ReactMarkdown
                                            children={msg.response}
                                            components={{
                                                code({ node, inline, className, children, ...props }) {
                                                    const match = /language-(\w+)/.exec(className || '');
                                                    return !inline && match ? (
                                                        <SyntaxHighlighter
                                                            style={oneDark}
                                                            language={match[1]}
                                                            PreTag="div"
                                                            {...props}
                                                        >
                                                            {String(children).replace(/\n$/, '')}
                                                        </SyntaxHighlighter>
                                                    ) : (
                                                        <code className={className} {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                },
                                            }}
                                        />
                                    </Typography>

                                </Box>
                            ))}
                            <div ref={messagesEndRef} />

                        </Box>

                        {limitReached ? (
                            <Typography color="error" mt={2}>
                                ⚠️ Limit of 30 messages reached. Start a new chat.
                            </Typography>
                        ) : (
                            <Box display="flex" gap={1} mt="auto" component="form" onSubmit={(e) => { e.preventDefault(); selectedChat ? handleSend() : handleNewChat(); }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Ask something..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <Button type="" variant="contained">
                                    <IoIosSend />
                                </Button>
                                <Button type="submit" variant="contained">
                                    <GrAttachment />
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box >
        </>
    );


}

export default ChatbotPopup;