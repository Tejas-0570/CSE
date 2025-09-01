import { Box, Typography, Input, Button, Select, MenuItem } from "@mui/material";
import { FaStop } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { RiLoopLeftFill } from "react-icons/ri";
import React, { useState, useEffect, useRef } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PracticeProblem from '../../components/PracticeProblem'

const DSASearching = () => {
    const [algorithm, setAlgorithm] = useState("Linear Search");

    // visual states
    const [array, setArray] = useState([5, 2, 8, 1, 9]);
    const [arrayInput, setArrayInput] = useState("5,2,8,1,9");
    const [targetInput, setTargetInput] = useState("");
    const [currentIndex, setCurrentIndex] = useState(-1);

    // run control
    const [isPlaying, setIsPlaying] = useState(false);
    const timerRef = useRef(null);

    // narration
    const [steps, setSteps] = useState([
        "Click Start Search to see step-by-step narration here."
    ]);
    const [statusText, setStatusText] = useState("");
    const descRef = useRef(null);

    // auto-scroll narration
    useEffect(() => {
        if (descRef.current) {
            descRef.current.scrollTop = descRef.current.scrollHeight;
        }
    }, [steps]);

    // ---------- Replaced functions (pure JS) ----------

    const parseArray = (s) => {
        if (!s) return null;
        const trimmed = s.trim();
        if (!trimmed) return null;
        const parts = trimmed.split(/[\s,]+/).filter(Boolean);
        const nums = parts.map(p => Number(p));
        if (nums.some(n => Number.isNaN(n))) return null;
        return nums;
    };

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const playActions = (actions, interval = 850) => {
        clearTimer();
        setIsPlaying(true);
        let i = 0;
        timerRef.current = setInterval(() => {
            if (i >= actions.length) {
                clearTimer();
                setIsPlaying(false);
                return;
            }
            try {
                actions[i++]();
            } catch (err) {
                // ensure we don't break the interval loop if a step throws
                console.error("Error in action:", err);
                i++;
            }
        }, interval);
    };

    const runLinear = (arr, target) => {
        const actions = [];
        actions.push(() => setSteps(prev => [...prev, `Start Linear Search`]));

        let foundAt = null;

        for (let i = 0; i < arr.length; i++) {
            const idx = i;
            actions.push(() => {
                setCurrentIndex(idx);
                setSteps(prev => [...prev, `Compare arr[${idx}] = ${arr[idx]} with ${target}`]);
            });

            if (arr[i] === target) {
                foundAt = idx;
                actions.push(() => {
                    setSteps(prev => [...prev, `✅ Found ${target} at index ${idx}`]);
                    setStatusText(`Found ${target} at index ${idx}`);
                });
                break;
            } else {
                actions.push(() => {
                    setSteps(prev => [...prev, `Not equal → continue`]);
                });
            }
        }

        if (foundAt === null) {
            actions.push(() => {
                setCurrentIndex(-1);
                setSteps(prev => [...prev, `❌ Target ${target} not found`]);
                setStatusText(`Target ${target} not found`);
            });
        }

        playActions(actions);
    };

    const runBinary = (arr, target) => {
        const actions = [];
        let low = 0, high = arr.length - 1;
        let foundAt = null;

        // ensure target is number
        target = Number(target);

        actions.push(() => setSteps(prev => [...prev,
        `Binary Search: Searching for ${target} in [${arr.join(", ")}]`]));
        actions.push(((l, h) => () => setSteps(prev => [...prev,
        `Start Binary Search (low=${l}, high=${h})`]))(low, high));

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);

            actions.push(((l, h, m, val) => () => setSteps(prev => [...prev,
            `mid = ⌊(${l}+${h})/2⌋ = ${m}, check arr[${m}] = ${val}`]))(low, high, mid, arr[mid]));
            actions.push(() => setHighlight(mid));

            if (arr[mid] === target) {
                foundAt = mid;
                const m = mid, val = arr[mid];
                actions.push(() => setSteps(prev => [...prev,
                `✅ Found ${target} at index ${m} (arr[${m}] = ${val})`
                ]));
                break;
            } else if (arr[mid] < target) {
                actions.push(((m, val) => () => setSteps(prev => [...prev,
                `${val} < ${target} → move low to ${m + 1}`]))(mid, arr[mid]));
                low = mid + 1;
                actions.push(((l, h) => () => setSteps(prev => [...prev,
                `Window is now [low=${l}, high=${h}]`]))(low, high));
            } else {
                actions.push(((m, val) => () => setSteps(prev => [...prev,
                `${val} > ${target} → move high to ${m - 1}`]))(mid, arr[mid]));
                high = mid - 1;
                actions.push(((l, h) => () => setSteps(prev => [...prev,
                `Window is now [low=${l}, high=${h}]`]))(low, high));
            }
        }

        if (foundAt !== null) {
            const m = foundAt, val = arr[m];
            actions.push(() => setSteps(prev => [...prev,
            `✅ Found ${target} at index ${m} (arr[${m}] = ${val})`
            ]));
        } else {
            actions.push(() => setSteps(prev => [...prev, `❌ ${target} not found`]));
        }


        playActions(actions);
    };



    // ---------- end replaced functions ----------

    const handleGenerateRandom = () => {
        clearTimer();
        setIsPlaying(false);
        const len = Math.floor(Math.random() * 6) + 6; // 6–11
        const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 90) + 10);
        setArray(arr);
        setArrayInput(arr.join(","));
        setTargetInput("");
        setCurrentIndex(-1);
        setSteps(["Random array generated. Click Start Search to begin."]);
        setStatusText("");
    };

    const handleReset = () => {
        clearTimer();
        setIsPlaying(false);
        setAlgorithm("Linear Search");
        const initial = [5, 2, 8, 1, 9];
        setArray(initial);
        setArrayInput(initial.join(","));
        setTargetInput("");
        setCurrentIndex(-1);
        setSteps(["Click Start Search to see step-by-step narration here."]);
        setStatusText("");
    };

    const handleStart = () => {
        // parse inputs
        const parsed = parseArray(arrayInput);
        const arr = parsed ?? array; // fallback to current displayed
        const target = Number(targetInput);
        if (Number.isNaN(target)) {
            setSteps(prev => [...prev, "⚠️ Please enter a numeric target before starting."]);
            setStatusText("Awaiting valid target…");
            return;
        }

        // reset visuals
        clearTimer();
        setIsPlaying(false);
        setCurrentIndex(-1);
        setStatusText("");
        setSteps([`${algorithm}: Searching for ${target} in [${arr.join(", ")}]`]);

        // choose algo
        if (algorithm === "Linear Search") {
            setArray(arr); // show as-is
            runLinear(arr, target);
        } else {
            // Binary search needs sorted array (ascending)
            const sorted = [...arr].sort((a, b) => a - b);
            setArray(sorted); // reflect sorted array in UI
            setSteps(prev => [...prev, `Sorted array for Binary Search: [${sorted.join(", ")}]`]);
            runBinary(sorted, target);
        }
    };

    return (
        <>
            <Box
                display={'flex'}
                justifyContent={'center'}
                width={'100%'}
                gap={2}
            >
                <Box
                    width={'80%'}
                    gap={2}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Box display={'flex'} flexDirection={'column'} bgcolor={'#ffffff'} height={'400px'} borderRadius={2} p={3}>
                        <Typography variant="h5" fontWeight={600} mb={2}>Interactive Visualizer</Typography>
                        <Box display={'flex'} justifyContent={'left'} gap={26} mb={1.5}>
                            <Typography>Algorithm</Typography>
                            <Typography ml={1}>Array Input</Typography>
                            <Typography>Target</Typography>
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
                                <MenuItem value="Linear Search">Linear Search</MenuItem>
                                <MenuItem value="Binary Search">Binary Search</MenuItem>
                            </Select>

                            <Input
                                placeholder="e.g. 34,67,25,75,23"
                                disableUnderline
                                value={arrayInput}
                                onChange={(e) => setArrayInput(e.target.value)}
                                sx={{
                                    border: '2px solid gray',
                                    borderRadius: 2,
                                    p: 0.5,
                                    width: '30%',
                                    '&.Mui-focused': { border: '2px solid black' },
                                    backgroundColor: 'white'
                                }}
                            />

                            <Input
                                disableUnderline
                                placeholder="Target"
                                value={targetInput}
                                onChange={(e) => setTargetInput(e.target.value)}
                                sx={{
                                    border: '2px solid gray',
                                    borderRadius: 2,
                                    p: 0.5,
                                    width: '10%',
                                    '&.Mui-focused': { border: '2px solid black' },
                                    backgroundColor: 'white'
                                }}
                            />

                            <Button
                                onClick={handleStart}
                                sx={{
                                    p: 1, textTransform: 'none', bgcolor: '#4a90e2', color: '#ffffff', width: '25%',
                                    borderRadius: 2.5, '&:hover': { bgcolor: '#2265d4' }
                                }}
                            >
                                <FaPlay style={{ marginRight: 6 }} /> Start Search
                            </Button>
                        </Box>

                        <Box display={'flex'} gap={2} mt={3}>
                            <Button
                                onClick={handleGenerateRandom}
                                sx={{ textTransform: "none", color: 'text.secondary', p: 1, bgcolor: '#f3f4f6', borderRadius: 2, '&:hover': { bgcolor: '#e1e1e3' } }}
                            >
                                Generate Random Array
                            </Button>
                            <Button
                                onClick={handleReset}
                                sx={{ textTransform: "none", color: 'text.secondary', p: 1, bgcolor: '#f3f4f6', borderRadius: 2, '&:hover': { bgcolor: '#e1e1e3' } }}
                            >
                                <RiLoopLeftFill style={{ marginRight: 5 }} />Reset
                            </Button>
                        </Box>

                        {/* Array row */}
                        <Box display={"flex"} justifyContent={"center"} gap={1} mt={2.5}>
                            {array.map((value, index) => (
                                <Box
                                    key={index}
                                    height={"15px"}
                                    width={"15px"}
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    borderRadius={2}
                                    fontSize={"17px"}
                                    padding={2}
                                    border={'1px solid #e4e6e5'}
                                    sx={{
                                        backgroundColor: index === currentIndex ? '#fcea97' : '#ffffff',
                                        color: '#000000',
                                        border: index === currentIndex ? '2px solid #ffc966' : '1px solid #e4e6e5',
                                        transition: 'all 0.25s ease'
                                    }}
                                >
                                    {value}
                                </Box>
                            ))}
                        </Box>

                        {/* Description (scrollable) + status/step */}
                        <Box display={"flex"} flexDirection={'column'} alignItems={'center'} justifyContent={"center"} mt={2}>
                            <Box
                                ref={descRef}
                                sx={{
                                    width: '100%',
                                    maxHeight: 110,
                                    overflowY: 'auto',
                                    border: '1px dashed #e0e0e0',
                                    borderRadius: 1.5,
                                    px: 1.5,
                                    py: 1,
                                    backgroundColor: '#fafcff'
                                }}
                            >
                                {steps.map((line, i) => (
                                    <Typography key={i} variant="body2" sx={{ mb: 0.25 }}>
                                        {line}
                                    </Typography>
                                ))}
                            </Box>

                            <Typography sx={{ mt: 1 }}>{statusText || ' '}</Typography>
                            <Typography color="text.secondary">
                                Step {Math.max(steps.length - (steps[0].startsWith("Click Start") ? 1 : 0), 1)} of {steps.length}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Theory accordion (unchanged) */}
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
                                    {/* your code sample here */}
                                </SyntaxHighlighter>
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                    <PracticeProblem />
                </Box>

                {/* Right sidebar (unchanged) */}
                <Box
                    height={'600px'}
                    width={'20%'}
                    borderRadius={2}
                    bgcolor={'#ffffff'}
                    p={1.5}
                >
                    <Typography variant="h6" fontWeight={600}>Complexity Analysis</Typography>
                    <Box bgcolor={'#ebf4ff'} p={1.5} m={1} borderRadius={2}>
                        <Typography color="#438af7" fontWeight={600}>Time Complexity</Typography>
                        <Box mt={1}>
                            <Typography variant="body1" color="text.secondary" mb={0.1}>Linear Search : O(n)</Typography>
                            <Typography variant="body1" color="text.secondary" mb={0.1}>Binary Search : O(log n)</Typography>
                        </Box>
                    </Box>

                    <Box bgcolor={'#f0fdf4'} p={1.5} m={1} borderRadius={2}>
                        <Typography color="#1c8972" fontWeight={600} mb={1.5}>Space Complexity</Typography>
                        <Typography variant="body1" color="text.secondary" mb={0.1}>Linear Search : O(1)</Typography>
                        <Typography variant="body1" color="text.secondary" mb={0.1}>Binary Search : O(1)</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default DSASearching;





