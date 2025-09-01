import Navbar from '../../components/Navbar';
import loginImage from "../../assets/illustrate/login.png"
import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Tab,
    Tabs,
    TextField,
    Typography,
    Divider,
} from '@mui/material';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <>
            <Navbar />
            <Box display={"flex"} alignItems="center" justifyContent="space-around" minHeight="100vh" sx={{
                background: 'linear-gradient(135deg, #e9f5fd 0%, #ffffff 100%)',


            }}>
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="#174BCD"
                        mb={3}
                        sx={{
                            fontSize: {
                                xs: '2rem', // ~32px on mobile
                                md: '3rem',   // ~48px on desktop
                            },
                            lineHeight: 1.2,
                            fontWeight: 800
                        }}
                    >
                        Join Our Learning <br /> Community
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        maxWidth="600px"
                        mx="auto"
                    >
                        Access interactive labs, practice coding, and master computer science concepts with our comprehensive platform.
                    </Typography>
                    <Box
                        component="img"
                        src={loginImage}
                        alt="Illustration"
                        sx={{
                            width: '100%',
                            maxWidth: '600px',
                            height: 'auto',
                            mt: 4,
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    />
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Box
                        maxWidth={400}
                        mx="auto"
                        mt={8}
                        px={4}
                        py={5}
                        borderRadius={5}
                        boxShadow={3}
                        bgcolor="#fff"
                    >
                        {/* Tabs */}
                        <Tabs
                            value={tab}
                            onChange={handleChange}
                            variant="fullWidth"
                            sx={{ mb: 3, borderRadius: 4, bgcolor: '#f3f4f6', minHeight: 'auto' }}
                            TabIndicatorProps={{ style: { display: 'none' } }}
                        >
                            <Tab
                                label="Login"
                                sx={{
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    m: 0.7,
                                    backgroundColor: tab === 0 ? '#ffffff' : 'transparent',
                                    color: tab === 0 ? 'black' : 'gray',
                                    minHeight: 'auto',
                                    py: 1.2
                                }}
                            />
                            <Tab
                                label="Create Account"
                                sx={{
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    m: 0.7,
                                    backgroundColor: tab === 1 ? '#ffffff' : 'transparent',
                                    color: tab === 1 ? 'black' : 'gray',
                                    minHeight: 'auto',
                                    py: 1.2
                                }}
                            />
                        </Tabs>

                        {/* Login Form */}
                        {tab === 0 && (
                            <>
                                <TextField fullWidth margin="normal" label="Email Address" placeholder="Enter your email" />
                                <TextField fullWidth margin="normal" label="Password" placeholder="Enter your password" type="password" />

                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <FormControlLabel control={<Checkbox />} label="Remember me" />
                                    <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>Forgot password?</Typography>
                                </Box>

                                <Button
                                    href='/home'
                                    variant="contained"
                                    fullWidth
                                    sx={{ backgroundColor: '#3b82f6', borderRadius: 3, textTransform: 'none', fontWeight: 600 }}
                                >
                                    Sign In
                                </Button>

                                <Divider sx={{ my: 3 }}>or</Divider>

                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<FcGoogle />}
                                    sx={{ textTransform: 'none', borderRadius: 3 }}
                                >
                                    Continue with Google
                                </Button>
                            </>
                        )}

                        {/* Signup Form */}
                        {tab === 1 && (
                            <>
                                <TextField fullWidth margin="normal" label="Full Name" placeholder="Enter your full name" />
                                <TextField fullWidth margin="normal" label="Email Address" placeholder="Enter your email" />
                                <TextField fullWidth margin="normal" label="Password" placeholder="Create a password" type="password" />
                                <TextField fullWidth margin="normal" label="Confirm Password" placeholder="Confirm your password" type="password" />

                                <FormControlLabel
                                    control={<Checkbox />}
                                    label={<Typography variant="body2">I agree to the Terms of Service and Privacy Policy</Typography>}
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ backgroundColor: '#3b82f6', borderRadius: 3, textTransform: 'none', fontWeight: 600 }}
                                >
                                    Sign Up
                                </Button>

                                <Divider sx={{ my: 3 }}>or</Divider>

                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<FcGoogle />}
                                    sx={{ textTransform: 'none', borderRadius: 3 }}
                                >
                                    Continue with Google
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>

            </Box>
        </>
    );
}

export default Login;