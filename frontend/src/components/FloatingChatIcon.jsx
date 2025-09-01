import React, { useState } from 'react';
import { BsWechat } from 'react-icons/bs';
import { Box } from '@mui/material';

const FloatingChatIcon = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <Box
        onClick= {() => setIsOpen(true)}
        sx={{
            position:'fixed',
            bottom: '20px',
            right: '20px',
            cursor: 'pointer',
            zIndex: 1000
        }}
        >
            <BsWechat style={{fontSize:'50px', color:'#2563eb'}} />
        </Box>
        {isOpen && ''}
        </>
    );
}

export default FloatingChatIcon;