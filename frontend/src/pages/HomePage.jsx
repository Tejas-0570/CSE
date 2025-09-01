import Navbar from "../components/Navbar";
import { Box, Grid, Typography } from '@mui/material';
import profilePhoto from "../assets/illustrate/profile.jpg"; // Adjust the path as necessary
import LabCard from "../components/LabCard";
const HomePage = () => {
    return (
        <>
            <Navbar />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    background: 'linear-gradient(135deg, #e9f5fd 0%, #ffffff 100%)',
                }}>

                <Box
                    display={"flex"}
                    alignItems="center"
                    justifyContent="space-between"
                    padding={"1rem 3rem"}
                    mt={3}
                    mb={3}
                    sx={{
                        width: '80%',
                        maxWidth: '1200px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                    }}
                >
                    <Box display="flex" alignItems="center" gap="0.8rem">
                        <Box
                            component={"img"}
                            src={profilePhoto}
                            alt="Profile"
                            sx={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        ></Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold" color="#2563eb">
                                Welcome back, User!
                            </Typography>
                            <Typography variant="body1" color="#374151">
                                Ready to continue your learning journey?
                            </Typography>
                        </Box>
                    </Box>


                    <Box display="flex" alignItems="center" gap="1rem">
                        <Box display={"flex"} flexDirection="column" alignItems="center">
                            <Typography variant="h5" fontWeight="bold" color="#2563eb">
                                12
                            </Typography>
                            <Typography>
                                Last Completed
                            </Typography>
                        </Box>
                        <Box display={"flex"} flexDirection="column" alignItems="center">
                            <Typography variant="h5" fontWeight="bold" color="#2563eb">
                                85%
                            </Typography>
                            <Typography>
                                Progress
                            </Typography>
                        </Box>
                        <Box display={"flex"} flexDirection="column" alignItems="center">
                            <Typography variant="h5" fontWeight="bold" color="#2563eb">
                                20
                            </Typography>
                            <Typography>
                                Total Courses
                            </Typography>
                        </Box>

                    </Box>
                </Box>

                <Box
                    display={"flex"}
                    alignItems="center"
                    justifyContent="space-between"
                    padding={"1rem 3rem"}
                    mt={1}
                    mb={3}
                    sx={{
                        width: '80%',
                        maxWidth: '1200px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        backgroundColor: '#2f5fa6',
                        borderRadius: '8px',
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="left" gap="0.5rem">
                        <Typography variant="h5" fontWeight="bold" color="#ffffff">
                            Continue where you left off
                        </Typography>
                        <Typography variant="body1" color="#ffffff">
                            DSA Lab - Binary Search Trees
                        </Typography>
                    </Box>
                </Box>

                {/* { Lab Cards } */}
                <Grid container spacing={4} justifyContent={"center"} mb={5}>
                    <Grid item xs={12} sm={6} md={3}>
                        <LabCard
                            title="Data Structures & Algorithms"
                            description="Explore the fundamentals of data structures with interactive labs."
                            linkText="Start DSA Lab"
                            iconKey="dsa"
                            linkHref="/dsa"
                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <LabCard
                            title="Operating Systems"
                            description="Dive into operating systems concepts with hands-on simulations."
                            linkText="Start OS Lab"
                            iconKey="os"
                            linkHref={"/os"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <LabCard
                            title="Database Management Systems"
                            description="Learn about databases through interactive exercises and labs."
                            linkText="Start DBMS Lab"
                            iconKey="dbms"
                            linkHref={"/dbms"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <LabCard
                            title="Coding Challenges"
                            description="Enhance your coding skills with a variety of challenges."
                            linkText="Start Coding Lab"
                            iconKey="code"
                            linkHref={"/run"}
                        />
                    </Grid>
                </Grid>

            </Box>
        </>
    );
}

export default HomePage;