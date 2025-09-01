import React, { useState } from 'react';
import LabNavbar from '../../components/LabNavbar';
import Sidebar from '../../components/Sidebar';
import ChatbotPopup from '../../components/ChatbotPopup';
import { Box } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaMicrochip } from "react-icons/fa6";
import { FaMemory } from "react-icons/fa6";
import { FaHdd } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FaSync } from "react-icons/fa";
import { FaFile } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { IoChatbubblesSharp } from "react-icons/io5";


const CNItems = [
  { label: 'Introduction', icon: <FiAlignJustify />, path: '' },
  { label: 'OSI & TCP/IP Models', icon: <FaMicrochip />, path: 'osi-tcpip-model' },
  { label: 'Transmission Modes', icon: <FaMemory />, path: "transmission-model" },
  { label: 'Protocols', icon: <FaHdd />, path: "protocols" },
  { label: 'Error Detection', icon: <FaLock />, path: "error-detection" },
  { label: 'Routing & Congestion', icon: <FaSync />, path: "routing-congestion" },
  { label: 'Wireless Networks', icon: <FaFile />, path: "wireless-networks" },
];

const CNLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split("/")[2] || '';
  const activeIndex = CNItems.findIndex(item => item.path === currentPath);

  const toggleChat = () => setIsChatOpen(prev => !prev);

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      {/* Top Navbar */}
      <Box position="fixed" top={0} left={0} right={0} zIndex={1100}>
        <LabNavbar
          title="CN Lab"
          breadcrumbs={[
            { label: 'Home', link: '/home' },
            { label: 'CN Lab', link: '/cn' },
          ]}
        />
      </Box>

      {/* Sidebar + Content */}
      <Box display="flex" flexGrow={1} mt="57px">
        <Box
          position="fixed"
          top="64px"
          bottom={0}
          width="240px"
          bgcolor="#ffffff"
          borderRight="1px solid #e2e8f0"
          zIndex={1000}
        >
          <Sidebar
            title="CN Topics"
            items={CNItems}
            activeIndex={activeIndex}
            onItemClick={(index) => {
              const path = CNItems[index].path;
              navigate(`/cn/${path}`);
            }}
          />
        </Box>

        {/* Main Outlet */}
        <Box
          flexGrow={1}
          ml="257px"
          mt={0}
          p={3}
          height="95%"
          overflowY="auto"
          // bgcolor="#f0f7ff"
          bgcolor={'#f5f6f7'}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Floating Chat Icon */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000,
          cursor: 'pointer',
          animation: 'float 2s ease-in-out infinite',
          '@keyframes float': {
            '0%': {
              transform: 'translateY(0)',
            },
            '50%': {
              transform: 'translateY(-10px)', // Move up slightly
            },
            '100%': {
              transform: 'translateY(0)',
            },
          },
        }}
        onClick={toggleChat}
      >
        <Box
          sx={{
            backgroundColor: '#4a90e2', // light purple background
            borderRadius: '50%',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <IoChatbubblesSharp style={{ fontSize: '30px', color: '#ffffff' }} />
        </Box>
      </Box>

      {isChatOpen && <ChatbotPopup onClose={toggleChat} />}
    </Box>
  );
};

export default CNLayout;
