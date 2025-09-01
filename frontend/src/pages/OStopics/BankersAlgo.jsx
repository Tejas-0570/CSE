import {
    Box, Typography, Select, MenuItem, Input, Button, Table, TableHead,
    TableRow, TableCell, TableBody, TextField, Alert
} from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { useState } from 'react';
import { GrPowerReset } from "react-icons/gr";
import { FaPlay, FaStop } from 'react-icons/fa';

const NumberCell = ({ value, onChange }) => (
    <TextField
        type="number"
        variant="standard"
        value={value}
        onChange={onChange}
        InputProps={{
            disableUnderline: true,
            inputProps: {
                min: 0,
                style: { textAlign: 'center' },
            },
        }}
        sx={{
            width: 60,
            '& .MuiInputBase-root': {
                backgroundColor: 'transparent',
            },
        }}
    />
);

const BankersAlgo = () => {
    const [numProcesses, setNumProcesses] = useState(3);
    const [numResources, setNumResources] = useState(3);
    const [allocation, setAllocation] = useState(Array(3).fill().map(() => Array(3).fill(0)));
    const [max, setMax] = useState(Array(3).fill().map(() => Array(3).fill(0)));
    const [available, setAvailable] = useState(Array(3).fill(0));
    const [need, setNeed] = useState([]);
    const [safeSequence, setSafeSequence] = useState([]);
    const [steps, setSteps] = useState([]);
    const [isSafe, setIsSafe] = useState(true);

    const handleMatrixChange = (setter, matrix, i, j, value) => {
        const updated = matrix.map(row => [...row]);
        updated[i][j] = parseInt(value) || 0;
        setter(updated);
    };

    const handleAvailableChange = (j, value) => {
        const updated = [...available];
        updated[j] = parseInt(value) || 0;
        setAvailable(updated);
    };

    const calculateNeed = () => {
        const nd = allocation.map((row, i) =>
            row.map((val, j) => max[i][j] - val)
        );
        setNeed(nd);
        return nd;
    };

    const runBankersAlgorithm = () => {
        const work = [...available];
        const finish = Array(numProcesses).fill(false);
        const seq = [];
        const stepLogs = [];
        const nd = calculateNeed();

        let found;
        do {
            found = false;
            for (let i = 0; i < numProcesses; i++) {
                if (!finish[i]) {
                    const canAllocate = nd[i].every((needVal, j) => needVal <= work[j]);
                    if (canAllocate) {
                        stepLogs.push(`Process P${i + 1} can be allocated. Work before: [${work.join(', ')}]`);
                        for (let j = 0; j < numResources; j++) {
                            work[j] += allocation[i][j];
                        }
                        finish[i] = true;
                        seq.push(`P${i + 1}`);
                        stepLogs.push(`Process P${i + 1} completed. Work updated: [${work.join(', ')}]`);
                        found = true;
                    }
                }
            }
        } while (found);

        if (finish.every(f => f)) {
            setIsSafe(true);
            setSafeSequence(seq);
        } else {
            stepLogs.push("🔴 Deadlock detected: No safe sequence possible.");
            setIsSafe(false);
            setSafeSequence([]);
        }
        setSteps(stepLogs);
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
                            {/* code here */}
                        </SyntaxHighlighter>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box display={'flex'} flexDirection={'column'} bgcolor={'#ffffff'} borderRadius={2} p={3}>
                <Typography variant="h5" fontWeight={600} mb={2}>System Configuration</Typography>
                <Box display={'flex'} justifyContent={'left'} gap={12} mb={1.5}>
                    <Typography>Number of Processes</Typography>
                    <Typography>Number of Resources</Typography>
                </Box>
                <Box display={'flex'} gap={2}>
                    <Input type='number' value={numProcesses} onChange={(e) => setNumProcesses(Number(e.target.value))} disableUnderline sx={{ border: '2px solid gray', borderRadius: 2, p: 0.5, width: '20%' }} />
                    <Input type='number' value={numResources} onChange={(e) => setNumResources(Number(e.target.value))} disableUnderline sx={{ border: '2px solid gray', borderRadius: 2, p: 0.5, width: '20%' }} />
                    <Button
                        onClick={() => {
                            setAllocation(Array(numProcesses).fill().map(() => Array(numResources).fill(0)));
                            setMax(Array(numProcesses).fill().map(() => Array(numResources).fill(0)));
                            setAvailable(Array(numResources).fill(0));
                        }}
                        sx={{ p: 1, textTransform: 'none', bgcolor: '#4a90e2', color: '#ffffff', width: '25%', borderRadius: 2.5 }}>
                        + Generate Table
                    </Button>
                    <Button sx={{ textTransform: "none", p: 1, width: '12%', bgcolor: '#6b7280', color: '#ffffff', borderRadius: 2.5 }}><GrPowerReset style={{ marginRight: 5 }} />Reset</Button>
                    <Button onClick={runBankersAlgorithm} sx={{ textTransform: "none", p: 1, width: '15%', bgcolor: '#10b981', color: '#ffffff', borderRadius: 2.5 }}><FaPlay style={{ marginRight: 5 }} />Run Algorithm</Button>
                </Box>
            </Box>

            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={2} mt={3} gap={2}>
                <Box width={'100%'} backgroundColor={'#ffffff'} borderRadius={2} p={2}>
                    <Typography variant='h6' fontWeight={600}>Allocation Matrix</Typography>
                    <Table>
                        <TableBody>
                            {allocation.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>{`P${i + 1}`}</TableCell>
                                    {row.map((val, j) => (
                                        <TableCell key={j}><NumberCell value={val} onChange={(e) => handleMatrixChange(setAllocation, allocation, i, j, e.target.value)} /></TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <Box width={'100%'} backgroundColor={'#ffffff'} borderRadius={2} p={2}>
                    <Typography variant='h6' fontWeight={600}>Need Matrix (Calculated)</Typography>
                    <Table>
                        <TableBody>
                            {need.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>{`P${i + 1}`}</TableCell>
                                    {row.map((val, j) => (
                                        <TableCell key={j}><NumberCell value={val} onChange={() => {}} /></TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>

            <Box display={'flex'} justifyContent={'space-between'} borderRadius={3} mt={2} gap={3}>
                <Box width={'100%'} borderRadius={2}>
                    <Box width={'95%'} backgroundColor={'#ffffff'} borderRadius={2} p={2}>
                        <Typography variant='h6' fontWeight={600}>Max Matrix</Typography>
                        <Table>
                            <TableBody>
                                {max.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{`P${i + 1}`}</TableCell>
                                        {row.map((val, j) => (
                                            <TableCell key={j}><NumberCell value={val} onChange={(e) => handleMatrixChange(setMax, max, i, j, e.target.value)} /></TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                    <Box mt={3} bgcolor={'#ffffff'} borderRadius={2} p={2}>
                        <Typography>Available Resources</Typography>
                        <Box display={'flex'} justifyContent={'space-between'} mt={1}>
                            {available.map((val, j) => (
                                <Input key={j} type='number' value={val} onChange={(e) => handleAvailableChange(j, e.target.value)} disableUnderline sx={{ border: '2px solid gray', borderRadius: 2, p: 0.5, width: '30%' }} />
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box width={'100%'} borderRadius={2}>
                    <Box width={'92%'} backgroundColor={'#ffffff'} borderRadius={2} p={3}>
                        <Typography variant='h6' fontWeight={600}>Safe Sequence</Typography>
                        {!isSafe && (
                            <Alert severity="error" sx={{ my: 1 }}>
                                Deadlock detected: No safe sequence possible.
                            </Alert>
                        )}
                        <Box width={'94%'} bgcolor={'#f9fafb'} p={2}>{safeSequence.length ? safeSequence.join(' → ') : 'Run algorithm to see safe sequence'}</Box>
                    </Box>
                    <Box width={'92%'} backgroundColor={'#ffffff'} borderRadius={2} p={3} mt={3}>
                        <Typography variant='h6' fontWeight={600}>Algorithm Steps</Typography>
                        <Box width={'94%'} bgcolor={'#f9fafb'} p={2} minHeight={100}>
                            {steps.map((step, i) => (<Typography key={i}>{step}</Typography>))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default BankersAlgo;