import { Box, Button, Typography } from '@mui/material';
import { FaBrain } from "react-icons/fa6";
import { FaRocket } from "react-icons/fa6";
import { FaCloud } from "react-icons/fa";
import { GrOptimize } from "react-icons/gr";
import { FaGraduationCap } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { FaWindows } from "react-icons/fa6";
import { FcLinux } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { FcAndroidOs } from "react-icons/fc";
import { FaMemory } from "react-icons/fa6";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaHdd } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
import { FaTrophy } from "react-icons/fa6";





const OSIntro = () => {
    return (
        <>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mt={3}>
                <Typography variant='h4' fontWeight={600}>Operating Systems - Introduction and Overview</Typography>
                <Typography variant='body1' color='text.secondary'>
                    <h3>Master the fundamentals of operating systems through interactive learning</h3>
                </Typography>
            </Box>


            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    padding: 3,
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: 1,
                    height: "400px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Box>
                    <Typography variant='h5' color='text.primary' fontWeight={600} mb={2} display={'flex'} alignItems={'center'} gap={2}>
                        <Box
                            sx={{
                                backgroundColor: '#4a90e2', // light purple background
                                borderRadius: '25%',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FaBrain size="20px" color="#ffffff" /> {/* icon color purple */}
                        </Box>
                        What is an Operating System?
                    </Typography>

                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3} mt={3}>
                        <Box width={'45%'}>
                            <Typography variant='body1' color='text.secondary'>An Operating System (OS) is system software that manages computer hardware and software resources, providing common services for computer programs. It acts as an intermediary between users and computer hardware.</Typography>
                            <Box backgroundColor='#ffffff' height={'80%'} width={'95%'} borderRadius={3} p={1.5} mt={3}>
                                <Typography variant='h6'>Key Functions::</Typography>
                                <Typography variant='body1' color='text.secondary'>
                                    <ul>
                                        <li>Process Management</li>
                                        <li>Memory Management</li>
                                        <li>File System Management</li>
                                        <li>Device Management</li>
                                    </ul>
                                </Typography>
                            </Box>
                        </Box>

                        <Box width={'45%'}>
                            <Typography variant='h6'>Popular Operating Systems:</Typography>
                            <Box p={1.5} mt={1}>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2}>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#e8f2ff'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <FaWindows size={'25px'} color='#4a90e2' />
                                        <Typography>Windows</Typography>
                                    </Box>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#f3f4f6'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <FcLinux size={'30px'} />
                                        <Typography>Linux</Typography>
                                    </Box>
                                </Box>

                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={2}>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#f3f4f6'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <FaApple size={'25px'} />
                                        <Typography>macOS</Typography>
                                    </Box>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#f0fdf4'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <FcAndroidOs size={'30px'} />
                                        <Typography>Linux</Typography>
                                    </Box>
                                </Box>


                            </Box>
                        </Box>
                    </Box>


                </Box>
            </Box>


            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    padding: 3,
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: 1,
                    height: "280px",
                    maxWidth: "1210px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Typography variant='h5' color='text.primary' fontWeight={600} mb={2} display={'flex'} alignItems={'center'} gap={2}>
                    <Box
                        sx={{
                            backgroundColor: '#22c55e', // light purple background
                            borderRadius: '25%',
                            padding: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FaRocket size="20px" color="#ffffff" /> {/* icon color purple */}
                    </Box>
                    Why Study Operating Systems?
                </Typography>

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={6} mt={5}>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
                        <Box
                            sx={{
                                backgroundColor: '#e8f2ff', // light purple background
                                borderRadius: '50%',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <GrOptimize size="30px" color="#4a90e2" /> {/* icon color purple */}
                        </Box>
                        <Typography variant='h7' fontWeight={500} mt={3}>System Understanding</Typography>
                        <Typography variant='body1' color='text.secondary' mt={1.5}>Learn how computers manage resources and execute programs efficiently</Typography>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
                        <Box
                            sx={{
                                backgroundColor: '#e6e0ff', // light purple background
                                borderRadius: '50%',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FaCode size="30px" color="#9333ea" /> {/* icon color purple */}
                        </Box>
                        <Typography variant='h7' fontWeight={500} mt={3}>Programming Skills</Typography>
                        <Typography variant='body1' color='text.secondary' mt={1.5}>Essential for systems programming, backend development, and performance optimization</Typography>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
                        <Box
                            sx={{
                                backgroundColor: '#ffedd5', // light purple background
                                borderRadius: '50%',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FaCloud size="30px" color="#f97316" /> {/* icon color purple */}
                        </Box>
                        <Typography variant='h7' fontWeight={500} mt={3}>Career Growth</Typography>
                        <Typography variant='body1' color='text.secondary' mt={1.5}>Foundation for cloud computing, embedded systems, and enterprise software</Typography>
                    </Box>
                </Box>


            </Box>



            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    padding: 3,
                    mb: 5,
                    borderRadius: 2,
                    boxShadow: 1,
                    height: "380px",
                    maxWidth: "1210px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Typography variant='h5' color='text.primary' fontWeight={600} mb={2} display={'flex'} alignItems={'center'} gap={2}>
                    <Box
                        sx={{
                            backgroundColor: '#a855f7', // light purple background
                            borderRadius: '25%',
                            padding: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FaGraduationCap size="20px" color="#ffffff" /> {/* icon color purple */}
                    </Box>
                   What You'll Learn in OS Lab
                </Typography>

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={4} mt={3}>
                    <Box width={'100%'} height={'80px'} bgcolor={'#e8f2ff'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaList size={'25px'} color='#4a90e2' />
                            <Typography variant='body1' fontWeight={500}>Process Management</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>CPU Scheduling algorithms, Process synchronization, Deadlock handling</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#f0fdf4'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaMemory size={'25px'} color='#16a34a' />
                            <Typography variant='body1' fontWeight={500}>Memory Management</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Paging, Segmentation, Virtual memory, Allocation strategies</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#fff7ed'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <GoFileDirectoryFill size={'25px'} color='#f67216' />
                            <Typography variant='body1' fontWeight={500}>File Systems</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>File organization, Directory structures, Access methods</Typography>
                    </Box>


                </Box>

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={4} mt={3}>
                    <Box width={'100%'} height={'80px'} bgcolor={'#faf5ff'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaHdd size={'25px'} color='#9333ea' />
                            <Typography variant='body1' fontWeight={500}>Disk Scheduling</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>FCFS, SSTF, SCAN, C-SCAN algorithms</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#fef2f2'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaSyncAlt size={'25px'} color='#4f46e5' />
                            <Typography variant='body1' fontWeight={500}>Synchronization</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Semaphores, Monitors, Producer-Consumer problems</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#eef2ff'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaShieldHalved size={'25px'} color='#ef4444' />
                            <Typography variant='body1' fontWeight={500}>Security & Protection</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Access control, Authentication, Security threats</Typography>
                    </Box>


                </Box>

            </Box>



            <Box
                sx={{
                    backgroundColor: "#3c81c9",
                    padding: 3,
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: 1,
                    height: "240px",
                    maxWidth: "1210px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Typography variant='h5' color='#ffffff' fontWeight={600} mb={2} display={'flex'} alignItems={'center'} gap={2}>
                    <Box
                        sx={{
                            backgroundColor: '#6da5e6', // light purple background
                            borderRadius: '25%',
                            padding: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FaExclamation size="20px" color="#ffffff" /> {/* icon color purple */}
                    </Box>
                    Interactive Learning Goals
                </Typography>

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={4} mt={3}>
                    <Box display={'flex'} flexDirection={'column'} bgcolor={'#5c9ae4'} p={2} width={'30%'} borderRadius={3}>
                        <FaRegEye size="30px" color="#ffffff" />
                        <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Visual Simulations</Typography>
                        <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Interactive schedulers and memory allocators to see algorithms in action</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} bgcolor={'#5c9ae4'} p={2} width={'30%'} borderRadius={3}>
                        <FaBrain size="30px" color="#ffffff" />
                        <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Concept Mastery</Typography>
                        <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Step-by-step explanations with real-world examples and analogies</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} bgcolor={'#5c9ae4'} p={2} width={'30%'} borderRadius={3}>
                        <FaTrophy size="30px" color="#ffffff" />
                        <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Exam Preparation</Typography>
                        <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Practice questions, viva preparation, and performance analysis</Typography>
                    </Box>


                </Box>

            </Box>

            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} mt={6} mb={3}>
                <Button sx={{ textTransform: "none", p: 1.5, width: '30%', bgcolor: '#4a90e2', color: '#ffffff', borderRadius: 2.5, fontSize: '18px', '&:hover': { bgcolor: '#367bbe' } }} onClick={''}><FaPlay style={{ marginRight: 5 }} />Start Learning - CPU Scheduling</Button>
                <Typography variant='body1' color='text.secondary' mt={2}>Begin your journey with process scheduling algorithms</Typography>
            </Box>



        </>
    );
}


export default OSIntro;