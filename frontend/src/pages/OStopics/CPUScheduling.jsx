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


const CPUScheduling = () => {
    const [algorithm, setAlgorithm] = useState("First Come First Serve");
    const [timeQuantum, setTimeQuantum] = useState('');
    const [processList, setProcessList] = useState([]);
    const [arrivalTime, setArrivalTime] = useState('');
    const [burstTime, setBurstTime] = useState('');
    const [ganttData, setGanttData] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const [showResult, setShowResult] = useState(false);


    // Add process handler
    const handleAddProcess = () => {
        if (arrivalTime === '' || burstTime === '') return;
        const newProcess = {
            id: `P${processList.length + 1}`,
            arrivalTime: parseInt(arrivalTime),
            burstTime: parseInt(burstTime)
        };
        setProcessList([...processList, newProcess]);
        setArrivalTime('');
        setBurstTime('');
    };

    // Delete and update process names
    const handleDeleteProcess = (index) => {
        const updatedList = processList.filter((_, i) => i !== index);
        // Reassign process IDs
        const renamed = updatedList.map((proc, idx) => ({
            ...proc,
            id: `P${idx + 1}`
        }));
        setProcessList(renamed);
    };

    const runFCFS = () => {
        const sorted = [...processList].sort((a, b) => a.arrivalTime - b.arrivalTime);
        let currentTime = 0;
        let gantt = [];
        let totalWT = 0, totalTAT = 0;

        const result = sorted.map((proc) => {
            const startTime = Math.max(currentTime, proc.arrivalTime);
            const waitingTime = startTime - proc.arrivalTime;
            const turnaroundTime = waitingTime + proc.burstTime;

            gantt.push({
                id: proc.id,
                start: startTime,
                end: startTime + proc.burstTime,
            });

            currentTime = startTime + proc.burstTime;
            totalWT += waitingTime;
            totalTAT += turnaroundTime;

            return {
                ...proc,
                waitingTime,
                turnaroundTime
            };
        });

        setGanttData(gantt);
        setMetrics({
            avgWT: (totalWT / result.length).toFixed(2),
            avgTAT: (totalTAT / result.length).toFixed(2),
            details: result
        });
        setShowResult(true);
    };


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
                <Typography variant="h5" fontWeight={600} mb={2}>Process Input</Typography>
                <Box display={'flex'} justifyContent={'left'} gap={26} mb={1.5}>
                    <Typography>Algorithm</Typography>
                    <Typography ml={11}>Time Quantum (for RR)</Typography>
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
                            width: '30%',
                            '&.Mui-focused': {
                                border: '2px solid black'
                            },
                            backgroundColor: 'white'
                        }}
                    >
                        <MenuItem value="First Come First Serve">First Come First Serve</MenuItem>
                        <MenuItem value="Shortest Job First">Shortest Job First</MenuItem>
                        <MenuItem value="Round Robin">Round Robin</MenuItem>

                    </Select>
                    <Input type='number' disableUnderline sx={{ border: '2px solid gray', borderRadius: 2, p: 0.5, width: '20%', '&.Mui-focused': { border: '2px solid black' }, backgroundColor: 'white' }}></Input>
                    <Button
                        onClick={handleAddProcess}
                        sx={{
                            p: 1, textTransform: 'none', bgcolor: '#4a90e2',
                            color: '#ffffff', width: '25%', borderRadius: 2.5,
                            '&:hover': { bgcolor: '#2265d4' }
                        }}
                    >
                        + Add Process
                    </Button>
                </Box>
                <Box display="flex" gap={2} mb={3} mt={2}>
                    <Input
                        placeholder="Arrival Time"
                        disableUnderline
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        type="number"
                        sx={{ border: '1px solid gray', borderRadius: 2, px: 1, py: 0.5, width: '20%', backgroundColor: 'white' }}
                    />
                    <Input
                        placeholder="Burst Time"
                        disableUnderline
                        value={burstTime}
                        onChange={(e) => setBurstTime(e.target.value)}
                        type="number"
                        sx={{ border: '1px solid gray', borderRadius: 2, px: 1, py: 0.5, width: '20%', backgroundColor: 'white' }}
                    />
                </Box>
                {processList.length > 0 && (
                    <Table sx={{ backgroundColor: 'white', borderRadius: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Process ID</strong></TableCell>
                                <TableCell><strong>Arrival Time</strong></TableCell>
                                <TableCell><strong>Burst Time</strong></TableCell>
                                <TableCell><strong>Action</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {processList.map((proc, index) => (
                                <TableRow key={index}>
                                    <TableCell>{proc.id}</TableCell>
                                    <TableCell>{proc.arrivalTime}</TableCell>
                                    <TableCell>{proc.burstTime}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDeleteProcess(index)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {processList.length > 0 && (
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: 'green', '&:hover': { bgcolor: '#075f21' } }}
                            onClick={runFCFS}
                        >
                            ▶ Run Simulation
                        </Button>
                    </Box>
                )}
                {showResult && (
                    <Box mt={4} bgcolor="#f5f9ff" p={3} borderRadius={3}>

                        <Typography variant="h6" fontWeight="bold" mb={2}>Gantt Chart Visualization</Typography>

                        <Box display="flex" alignItems="center" gap={2} mb={1}>
                            {ganttData.map((block, i) => (
                                <Box key={i} textAlign="center">
                                    <Box
                                        bgcolor={['#a0c4ff', '#b9fbc0', '#ffe066'][i % 3]}
                                        px={2}
                                        py={1}
                                        borderRadius={1}
                                        minWidth={50}
                                    >
                                        <Typography fontWeight="bold">{block.id}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        <Box display="flex" gap={3} mt={1}>
                            {ganttData.map((block, i) => (
                                <Typography key={i}>{block.start}</Typography>
                            ))}
                            <Typography>{ganttData[ganttData.length - 1].end}</Typography>
                        </Box>

                        {/* Performance Metrics */}
                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Box bgcolor="#eaf4ff" p={2} borderRadius={2} width="45%">
                                <Typography fontWeight="bold" mb={1}>
                                    Performance Metrics (FCFS)
                                </Typography>
                                <Typography>Average Waiting Time: <strong style={{ color: '#4a90e2' }}>{metrics.avgWT} units</strong></Typography>
                                <Typography>Average Turnaround Time: <strong style={{ color: '#4a90e2' }}>{metrics.avgTAT} units</strong></Typography>
                                <Typography>Algorithm Used: <strong style={{ color: '#4a90e2' }}>FCFS</strong></Typography>
                            </Box>

                            <Box bgcolor="#f8f9fa" p={2} borderRadius={2} width="45%">
                                <Typography fontWeight="bold" mb={1}>Process Details</Typography>
                                {metrics.details.map((proc, i) => (
                                    <Typography key={i}>
                                        {proc.id}: Waiting = {proc.waitingTime}, Turnaround = {proc.turnaroundTime}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                )}




            </Box>


        </>
    );
}


export default CPUScheduling;