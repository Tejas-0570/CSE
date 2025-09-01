import {
    Box, Typography, Select, MenuItem, Input, Button, Table, TableHead,
    TableRow, TableCell, TableBody, IconButton
} from '@mui/material'; import { RiLoopLeftFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PracticeProblem from '../../components/PracticeProblem'
import { FaRandom } from "react-icons/fa";
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { GrPowerReset } from "react-icons/gr";
import { FaPlay, FaStop } from 'react-icons/fa';

const MemoryManagement = () => {
    const [algorithm, setAlgorithm] = useState("First Fit");

    return (
        <>
            <Box bgcolor={'#f0f8ff'} width={'100%'} mb={2}>
                <Accordion sx={{ borderRadius: 2, boxShadow: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 'bold' }}>
                        <Typography fontWeight={'bold'}>Theory & Examples</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography variant="h6" mb={1}>Binary Search Tree</Typography>
                        <Typography mb={2}>
                            BST repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order.
                        </Typography>

                        <SyntaxHighlighter language="cpp" style={darcula} customStyle={{ borderRadius: 10 }}>

                        </SyntaxHighlighter>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box display={'flex'} flexDirection={'column'} bgcolor={'#ffffff'} borderRadius={2} p={3}>
                <Typography variant="h5" fontWeight={600} mb={2}>Memory Allocation Simulator</Typography>
                <Box display={'flex'} justifyContent={'left'} gap={12} mb={1.5}>
                    <Typography>Allocation Strategy</Typography>
                    <Typography ml={20}>Memory Block Sizes</Typography>
                    <Typography ml={20}>Process Sizes</Typography>
                </Box>
                <Box display={'flex'} gap={2}>
                    <Select
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value)}
                        variant="standard"
                        disableUnderline
                        sx={{
                            border: '1px solid gray',
                            borderRadius: 2,
                            px: 1,
                            py: 0.5,
                            width: '33%',
                            '&.Mui-focused': {
                                border: '2px solid black'
                            },
                            backgroundColor: 'white'
                        }}
                    >
                        <MenuItem value="First Fit">First Fit</MenuItem>
                        <MenuItem value="Best Fit">Best Fit</MenuItem>
                        <MenuItem value="Worst Fit">Worst Fit</MenuItem>

                    </Select>
                    <Input placeholder='100, 200, 300, 400' disableUnderline sx={{ border: '2px solid gray', borderRadius: 2, p: 0.5, width: '33%', }} />
                    <Input placeholder='247, 159, 90, 112' disableUnderline sx={{ border: '2px solid gray', borderRadius: 2, p: 0.5, width: '33%' }} />
                    {/* <Button
                        // onClick={() => {
                        //     setAllocation(Array(numProcesses).fill().map(() => Array(numResources).fill(0)));
                        //     setMax(Array(numProcesses).fill().map(() => Array(numResources).fill(0)));
                        //     setAvailable(Array(numResources).fill(0));
                        // }}
                        sx={{ p: 1, textTransform: 'none', bgcolor: '#4a90e2', color: '#ffffff', width: '25%', borderRadius: 2.5 }}>
                        + Generate Table
                    </Button>
                    <Button sx={{ textTransform: "none", p: 1, width: '12%', bgcolor: '#6b7280', color: '#ffffff', borderRadius: 2.5 }}><GrPowerReset style={{ marginRight: 5 }} />Reset</Button>*/}
                </Box>
                <Button sx={{ textTransform: "none", p: 1, width: '15%', bgcolor: '#10b981', color: '#ffffff', borderRadius: 2.5, mt: 2.5 }}><FaPlay style={{ marginRight: 5 }} />Run Algorithm</Button>

                <Typography variant='h6' mt={3} fontWeight={600}>Memory Visualization</Typography>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                    <Typography variant='body1'>Block 1:</Typography>
                    <Box width={'94%'} height={'40px'} bgcolor={'lightgrey'}></Box>
                </Box>

                <Typography variant='h6' mt={3} fontWeight={600}>Allocation Summary</Typography>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                    <Typography variant='body1'>Block 1:</Typography>
                    <Box width={'94%'} height={'40px'} bgcolor={'lightgrey'}></Box>
                </Box>



                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={3} gap={3}>
                    <Box height={'60px'} width={'100%'} bgcolor={'lightgreen'} p={2} borderRadius={2}>
                        <Typography variant='h6' fontWeight={600}>Memory Used</Typography>
                        <Typography variant='h5' fontWeight={600}>100 KB</Typography>
                    </Box>
                    <Box height={'60px'} width={'100%'} bgcolor={'lightpink'} p={2} borderRadius={2}>
                        <Typography variant='h6' fontWeight={600}>Memory Wasted</Typography>
                        <Typography variant='h5' fontWeight={600}>100 KB</Typography>
                    </Box>
                    <Box height={'60px'} width={'100%'} bgcolor={'lightyellow'} p={2} borderRadius={2}>
                        <Typography variant='h6' fontWeight={600}>Unallocated Processes</Typography>
                        <Typography variant='h5' fontWeight={600}>100 KB</Typography>
                    </Box>
                    
                </Box>
            </Box>

        </>
    );
}

export default MemoryManagement;