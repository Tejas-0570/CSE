import LabCard from "../components/LabCard";
import Navbar from "../components/Navbar";
import { Box, Typography, Button } from '@mui/material';
import { Grid } from '@mui/material';
import Footer from "../components/Footer"
import { FaRocket } from 'react-icons/fa';




const LandingPage = () => {
    return (
        <>
            <Navbar />
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#e9f5fd" sx={{
                background: 'linear-gradient(135deg, #e9f5fd 0%, #ffffff 100%)',
            }}>
                <Box
                    component="section"
                    textAlign="center"
                    py={{ xs: 10, md: 15 }}
                    px={3}
                >
                    {/* Heading */}
                    <Typography
                        variant="h1"
                        fontWeight="extrabold"
                        color="text.primary"
                        mb={3}
                        sx={{
                            fontSize: {
                                xs: '2.5rem', // ~40px on mobile
                                md: '4rem',   // ~64px on desktop
                            },
                            lineHeight: 1.2,
                            fontWeight: 800
                        }}
                    >
                        Master Computer Science <br />
                        with{' '}
                        <Box component="span" color="#174BCD">
                            Interactive Labs
                        </Box>
                    </Typography>

                    {/* Subheading / Paragraph */}
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        maxWidth="600px"
                        mx="auto"
                        mb={5}
                        sx={{ fontSize: '1.23rem' }} // ~18px
                    >
                        Learn DSA, Operating Systems, Computer Network and Database Management through hands-on simulations, visualizations, and real-time coding environments.
                    </Typography>

                    {/* CTA Button */}
                    <Button
                        href="/auth/login"
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: '#2563eb',
                            color: '#fff',
                            borderRadius: 3,
                            px: 5,
                            py: 1.5,
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            '&:hover': {
                                backgroundColor: '#1d4ed8', // a slightly darker blue for hover (blue-700)
                            },
                        }}
                    >
                        Start Learning →
                    </Button>

                </Box>
            </Box>

            {/* Labs Section */}
            <Typography
                variant="h3"
                fontWeight="bold"
                textAlign="center"
                mt={13}
                mb={3}
            >
                Explore Our Interactive Labs
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
                textAlign={"center"}
                maxWidth="600px"
                mx="auto"
                mb={5}
                sx={{ fontSize: '1.23rem' }} // ~18px
            >
                Experience computer science concepts through immersive, hands-on learning environments
            </Typography>

            <Grid container spacing={4} justifyContent="center" >
                <Grid item xs={12} sm={6} md={3}>
                    <LabCard
                        title="Data Structures & Algorithms"
                        description="Master the fundamentals of DSA with interactive coding challenges and visualizations."
                        linkText="Explore DSA Lab"
                        iconKey="dsa"
                        linkHref= "/dsa"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <LabCard
                        title="Operating Systems"
                        description="Dive deep into OS concepts with hands-on simulations and real-time coding environments."
                        linkText="Explore OS Lab"
                        iconKey="os"
                        linkHref="/os"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <LabCard
                        title="Database Management Systems"
                        description="Learn DBMS concepts through interactive labs and practical exercises."
                        linkText="Explore DBMS Lab"
                        iconKey="dbms"
                        linkHref="/dbms"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <LabCard
                        title="Coding Challenges"
                        description="Sharpen your coding skills with a variety of challenges and competitions."
                        linkText="Explore Coding Lab"
                        iconKey="code"
                        linkHref="/code"
                    />
                </Grid>

            </Grid>
            <Box display={"flex"} justifyContent="space-evenly" mt={5} mb={10} backgroundColor="#e8f4fd" py={5}>
                <Box width="300px" textAlign="center" backgroundColor="#ffffff" p={5} borderRadius={3} boxShadow={3}>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="#2563eb"
                    >50+
                    </Typography>
                    <Typography
                        variant="h6"
                        color="#000000"
                    >Interactive Simulation
                    </Typography>
                </Box>

                <Box width="300px" textAlign="center" backgroundColor="#ffffff" p={5} borderRadius={3} boxShadow={3}>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="#2563eb"
                    >1000+
                    </Typography>
                    <Typography
                        variant="h6"
                        color="#000000"
                    >Student Learning
                    </Typography>
                </Box>

                <Box width="300px" textAlign="center" backgroundColor="#ffffff" p={5} borderRadius={3} boxShadow={3}>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="#2563eb"
                    >100%
                    </Typography>
                    <Typography
                        variant="h6"
                        color="#000000"
                    >Concept Learning
                    </Typography>
                </Box>
            </Box>

            <Box>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="center"
                    mt={10}
                    mb={3}
                >
                    Ready to Start Your Learning Journey?
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign={"center"}
                    maxWidth="600px"
                    mx="auto"
                    mb={5}
                    sx={{ fontSize: '1.23rem' }} // ~18px
                >
                    Join us, thousands of students mastering computer science concepts through interactive learning
                </Typography>
            </Box>

            <Box display={"flex"} justifyContent="center" mb={10}>
                <Button
                    href="/auth/login"
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        borderRadius: 3,
                        px: 5,
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        '&:hover': {
                            backgroundColor: '#1d4ed8', // a slightly darker blue for hover (blue-700)
                        },
                    }}
                >
                    Get Started Now 
                    <FaRocket size={24} style={{ marginLeft: '10px', color: '#ffffff' }} />
                </Button>
                
                
            </Box>

            {/* Footer */}
            <Footer />

        </>

    );
}

export default LandingPage;