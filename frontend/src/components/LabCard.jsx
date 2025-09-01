import { Box, Typography, Link, Paper } from '@mui/material';
import { FaLaptopCode, FaCogs, FaDatabase, FaCode } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';


// Define icon styles
const iconStyle = {
  color: '#3b82f6', // blue-500
  fontSize: '2rem',
  marginBottom: '0.75rem',
};

// Icon map
const icons = {
  dsa: <FaLaptopCode style={iconStyle} />,
  os: <FaCogs style={iconStyle} />,
  dbms: <FaDatabase style={iconStyle} />,
  code: <FaCode style={iconStyle} />,
};

const LabCard = ({ title, description, linkText, iconKey, linkHref }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        textAlign: 'left',
        borderRadius: '12px',
        width: '230px',
        margin: '20px',

        height: '280px',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 10,
        },
      }}
    >
      <Box mb={1}>{icons[iconKey]}</Box>

      <Typography variant="h6" fontWeight={600} mb={1}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        {description}
      </Typography>

      <Link
        component={RouterLink}
        to={linkHref}
        underline="hover"
        sx={{ color: '#2563eb', fontWeight: 500, fontSize: '0.95rem' }}
      >
        {linkText} →
      </Link>
    </Paper>
  );
};

export default LabCard;
