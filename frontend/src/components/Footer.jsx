import React from 'react';
import { Box, Typography } from '@mui/material';
import { HiAcademicCap } from 'react-icons/hi'; // Importing the academic cap icon
const Footer = () => {
    return (
        <Box
      component="nav"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="1rem 10rem"
      bgcolor="#e8f4fd"
      boxShadow="0 2px 4px rgba(0,0,0,0.05)"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      {/* Logo */}
      <Box display="flex" alignItems="center" gap="0.5rem">
        <HiAcademicCap size={28} color="#2563eb" />
        <Typography fontWeight="bold" fontSize="1.35rem" color="#000000">
          EduLab
        </Typography>
      </Box>

      {/* Navigation Links */}
      <Box>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          © {new Date().getFullYear()} 2025 EduLab. All rights reserved.
        </Typography>
      </Box>
    </Box>
    );
}

export default Footer;