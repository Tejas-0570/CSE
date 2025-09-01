import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";


const LabNavbar = ({ title, breadcrumbs = [] }) => {
  const navigate = useNavigate();

  return (
    <>
      
        <Box
          display="flex"
          alignItems="center"
          px={4}
          py={2}
          bgcolor="#ffffff"
          borderBottom="1px solid #e2e8f0"
         
        
        >
          {/* Left title */}
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#3445a8"
            sx={{ mr: 2 }}
          >
            {title}
          </Typography>

          {/* Breadcrumbs next to the title */}
          <Breadcrumbs separator={<FaAngleRight />} aria-label="breadcrumb">
            {breadcrumbs.map((item, index) =>
              item.link ? (
                <Link
                  key={index}
                  color="inherit"
                  underline="hover"
                  onClick={() => navigate(item.link)}
                  sx={{ cursor: 'pointer', fontSize: '0.95rem' }}
                >
                  {item.label}
                </Link>
              ) : (
                <Typography
                  key={index}
                  color="text.primary"
                  fontSize="0.95rem"
                >
                  {item.label}
                </Typography>
              )
            )}
          </Breadcrumbs>
        </Box>
        




    </>
  );
};

export default LabNavbar;
