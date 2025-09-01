import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

const Sidebar = ({ title, items = [], activeIndex = 0, onItemClick }) => {
  return (
    <Box
      width="240px"
      minWidth="240px"
      minHeight="100vh"
      bgcolor="#ffffff"
      borderRight="1px solid #e2e8f0"
      px={1}
      py={3}
    >
      <Typography variant="subtitle1" fontWeight={600} marginBottom={3}>
        {title}
      </Typography>
      <List>
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <ListItemButton
              key={item.label}
              selected={isActive}
              onClick={() => onItemClick?.(index)}
              sx={{
                mb: 1,
                borderRadius: 2,
                color: isActive ? '#2563eb' : '#000000',
                backgroundColor: isActive ? '#e0edff' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? '#2563eb' : '#000000',
                  minWidth: '32px',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
      
    </Box>
  );
};

export default Sidebar;
