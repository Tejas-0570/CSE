import React, { useState } from 'react';
import LabNavbar from '../../components/LabNavbar';
import Sidebar from '../../components/Sidebar';
import ChatbotPopup from '../../components/ChatbotPopup';
import { Box } from '@mui/material';
import { IoChatbubblesSharp } from "react-icons/io5";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FiAlignJustify } from "react-icons/fi";
import { MdDataArray } from "react-icons/md";
import { FaLink, FaHashtag } from "react-icons/fa";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { PiQueueDuotone, PiSortAscendingDuotone, PiGraphBold } from "react-icons/pi";
import { TbBinaryTreeFilled, TbDatabaseSearch } from "react-icons/tb";

const DSAItems = [
  { label: 'Introduction', icon: <FiAlignJustify />, path: '' },
  { label: 'Arrays', icon: <MdDataArray />, path: 'array' },
  { label: 'Linked List', icon: <FaLink />, path: "linked-list" },
  { label: 'Stack', icon: <HiMiniSquare3Stack3D />, path: "stack" },
  { label: 'Queue', icon: <PiQueueDuotone />, path: "queue" },
  { label: 'Sorting', icon: <PiSortAscendingDuotone />, path: "sorting" },
  { label: 'Trees', icon: <TbBinaryTreeFilled />, path: "trees" },
  { label: 'Graphs', icon: <PiGraphBold />, path: "graphs" },
  { label: 'Searching', icon: <TbDatabaseSearch />, path: "searching" },
  { label: 'Hashing', icon: <FaHashtag />, path: "hashing" },
];

const DSALayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split("/")[2] || '';
  const activeIndex = DSAItems.findIndex(item => item.path === currentPath);

  const toggleChat = () => setIsChatOpen(prev => !prev);

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      {/* Top Navbar */}
      <Box position="fixed" top={0} left={0} right={0} zIndex={1100}>
        <LabNavbar
          title="DSA Lab"
          breadcrumbs={[
            { label: 'Home', link: '/home' },
            { label: 'DSA Lab', link: '/dsa' },
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
            title="DSA Topics"
            items={DSAItems}
            activeIndex={activeIndex}
            onItemClick={(index) => {
              const path = DSAItems[index].path;
              navigate(`/dsa/${path}`);
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

export default DSALayout;
