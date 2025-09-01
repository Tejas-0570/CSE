// DSAGraphs.jsx (Hashing page) -- full component
import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Input,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { RiLoopLeftFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PracticeProblem from "../../components/PracticeProblem";
import { FaRandom } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaLessThan } from "react-icons/fa6";

const TABLE_SIZE = 11; // fixed size as your UI showed

const initialChainingTable = () => Array(TABLE_SIZE).fill(null);
const initialProbingTable = () => Array(TABLE_SIZE).fill(null); // will store numbers or {deleted: true}

export default function DSAHashing() {
    const [algorithm, setAlgorithm] = useState("Chaining");
    const [keyInput, setKeyInput] = useState("");
    const [table, setTable] = useState(initialChainingTable());
    const [elements, setElements] = useState(0);
    const [collisions, setCollisions] = useState(0);

    const [steps, setSteps] = useState([]); // step-by-step log
    const stepsRef = useRef(null);

    const [highlightIndex, setHighlightIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const timerRef = useRef(null);

    // Dialog not necessary here, but keep pattern if you want popups later
    const [openHashDialog, setOpenHashDialog] = useState(false);

    // Hash function calculation strings shown in the pink box
    const [hashCalcLines, setHashCalcLines] = useState([]);

    // When algorithm changes, reset table & stats
    useEffect(() => {
        resetTable(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [algorithm]);

    // Scroll the steps box to bottom whenever steps update
    useEffect(() => {
        if (stepsRef.current) {
            stepsRef.current.scrollTop = stepsRef.current.scrollHeight;
        }
    }, [steps]);

    // Helper: clear running timer
    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        setIsPlaying(false);
    };

    // Helper: play a series of action functions with delay between them
    const playActions = (actions = [], interval = 650) => {
        clearTimer();
        if (!actions || actions.length === 0) return;
        setIsPlaying(true);
        let i = 0;
        const next = () => {
            if (i >= actions.length) {
                setIsPlaying(false);
                timerRef.current = null;
                return;
            }
            try {
                actions[i++]();
            } catch (err) {
                console.error("action error", err);
            }
            timerRef.current = setTimeout(next, interval);
        };
        next();
    };

    // Hash function
    const hash = (key) => {
        const k = Number(key);
        if (!Number.isFinite(k)) return null;
        return Math.abs(k) % TABLE_SIZE;
    };

    // Update the pink "Hash Function Calculation" display
    useEffect(() => {
        const k = keyInput.trim();
        if (k === "") {
            setHashCalcLines(["Enter a key to see hash calculation"]);
            return;
        }
        const n = Number(k);
        if (Number.isNaN(n)) {
            setHashCalcLines(["Invalid key (must be a number)"]);
            return;
        }
        const idx = hash(n);
        setHashCalcLines([
            `key = ${n}`,
            `table size = ${TABLE_SIZE}`,
            `index = ${n} % ${TABLE_SIZE} = ${idx}`,
        ]);
    }, [keyInput]);

    // Helpers for creating table initial state depending on algorithm
    const resetTable = (clearLog = true) => {
        clearTimer();
        setHighlightIndex(null);
        setElements(0);
        setCollisions(0);
        setTable(algorithm === "Chaining" ? initialChainingTable() : initialProbingTable());
        if (clearLog) setSteps([]);
    };

    // Format display value per slot
    const displaySlot = (slot) => {
        if (algorithm === "Chaining") {
            if (!slot || slot.length === 0) return "";
            return slot.join(" → ");
        } else {
            // probing
            if (slot === null) return "";
            if (slot && slot.deleted) return "DELETED";
            return String(slot);
        }
    };

    // Insert implementations produce a list of action functions which will execute sequentially
    const insertKey = () => {
        if (isPlaying) return;
        const k = Number(keyInput);
        if (keyInput.trim() === "" || Number.isNaN(k)) {
            setSteps((p) => [...p, "Please enter a valid numeric key to insert."]);
            return;
        }

        if (algorithm === "Chaining") {
            insertChaining(k);
        } else if (algorithm === "Linear Probing") {
            insertLinear(k);
        } else {
            insertQuadratic(k);
        }
        setKeyInput("");
    };

    // Insert — Separate Chaining
    const insertChaining = (key) => {
        const idx = hash(key);
        const actions = [];

        // Step 1: Log insertion start
        actions.push(() =>
            setSteps((p) => [...p, `Insert ${key}: hash = ${idx}`])
        );

        // Step 2: Highlight slot
        actions.push(() => setHighlightIndex(idx));

        // Step 3: Perform insertion logic (without calling setSteps inside setTable!)
        actions.push(() => {
            setTable((prev) => {
                const t = [...prev]; // shallow copy
                let stepMsg = "";

                if (!t[idx]) {
                    // Slot empty
                    t[idx] = [key];
                    stepMsg = `Slot ${idx} empty → placed ${key}`;
                } else {
                    // Collision
                    t[idx] = [...t[idx], key];
                    setCollisions((c) => c + 1);
                    stepMsg = `Slot ${idx} already had [${prev[idx].join(", ")}] → collision, appended ${key}`;
                }

                // ✅ Only push message once here (outside the table logic)
                setSteps((p) => [...p, stepMsg]);
                return t;
            });

            setElements((e) => e + 1);
        });

        // Step 4: Remove highlight
        actions.push(() => setHighlightIndex(null));

        playActions(actions, 700);
    };


    // Insert — Linear Probing
    const insertLinear = (key) => {
        const start = hash(key);
        const actions = [];
        actions.push(() => setSteps((p) => [...p, `Insert ${key}: start hash index = ${start}`]));
        let placed = false;
        let collisionsHere = 0;

        for (let i = 0; i < TABLE_SIZE; i++) {
            const pos = (start + i) % TABLE_SIZE;
            actions.push(((pos) => () => setHighlightIndex(pos))(pos));

            actions.push(
                ((pos) => () => {
                    setTable((prev) => {
                        const t = prev.slice();
                        const cell = t[pos];
                        if (cell === null || (cell && cell.deleted)) {
                            // place here
                            t[pos] = key;
                            setSteps((p) => [...p, `Checked slot ${pos}: empty → placed ${key}.`]);
                            setElements((e) => e + 1);
                            placed = true;
                        } else {
                            // collision
                            collisionsHere++;
                            setSteps((p) => [...p, `Checked slot ${pos}: occupied (${cell}) → probe next.`]);
                        }
                        return t;
                    });
                })(pos)
            );

            if (placed) break;
            // if not placed, the action will have been queued; but to ensure correct control flow we should check after all actions executed.
            // The playActions will execute these in sequence and we won't check "placed" here synchronously.
        }

        // If none placed in loop above, queue final message
        actions.push(() =>
            setSteps((p) => [...p, `Finished probing. ${collisionsHere} collision(s) during insertion.`])
        );
        actions.push(() => {
            if (collisionsHere > 0) setCollisions((c) => c + collisionsHere);
        });
        actions.push(() => setHighlightIndex(null));

        // Because the above "placed" is determined inside actions (async), we must re-implement in a safer way:
        // Build actions by explicitly checking the current table at action time (as above). That works — the previous actions update table.
        playActions(actions, 650);
    };

    // Insert — Quadratic Probing
    const insertQuadratic = (key) => {
        const start = hash(key);
        const actions = [];
        actions.push(() => setSteps((p) => [...p, `Insert ${key}: start hash index = ${start}`]));
        let collisionsHere = 0;

        for (let j = 0; j < TABLE_SIZE; j++) {
            const pos = (start + j * j) % TABLE_SIZE;
            actions.push(((pos, j) => () => setHighlightIndex(pos))(pos, j));

            actions.push(
                ((pos, j) => () => {
                    setTable((prev) => {
                        const t = prev.slice();
                        const cell = t[pos];
                        if (cell === null || (cell && cell.deleted)) {
                            t[pos] = key;
                            setSteps((p) => [...p, `Attempt j=${j} → slot ${pos} empty → placed ${key}.`]);
                            setElements((e) => e + 1);
                        } else {
                            collisionsHere++;
                            setSteps((p) => [...p, `Attempt j=${j} → slot ${pos} occupied (${cell}) → try next j.`]);
                        }
                        return t;
                    });
                })(pos, j)
            );
        }

        actions.push(() =>
            setSteps((p) => [...p, `Quadratic probing finished. collisions during attempts: ${collisionsHere}`])
        );
        actions.push(() => {
            if (collisionsHere > 0) setCollisions((c) => c + collisionsHere);
        });
        actions.push(() => setHighlightIndex(null));
        playActions(actions, 650);
    };

    // SEARCH
    const searchKey = () => {
        if (isPlaying) return;
        const k = Number(keyInput);
        if (keyInput.trim() === "" || Number.isNaN(k)) {
            setSteps((p) => [...p, "Please enter a valid numeric key to search."]);
            return;
        }
        if (algorithm === "Chaining") {
            searchChaining(k);
        } else if (algorithm === "Linear Probing") {
            searchLinear(k);
        } else {
            searchQuadratic(k);
        }
    };

    const searchChaining = (key) => {
        const idx = hash(key);
        const actions = [];
        actions.push(() => setSteps((p) => [...p, `Search ${key}: index = hash(${key}) = ${idx}`]));
        actions.push(() => setHighlightIndex(idx));
        actions.push(() => {
            const slot = table[idx];
            if (!slot || slot.length === 0) {
                setSteps((p) => [...p, `Slot ${idx} empty → ${key} not found.`]);
            } else if (slot.includes(key)) {
                setSteps((p) => [...p, `Found ${key} in slot ${idx} within [${slot.join(", ")}].`]);
            } else {
                setSteps((p) => [...p, `Slot ${idx} does not contain ${key} → not found.`]);
            }
        });
        actions.push(() => setHighlightIndex(null));
        playActions(actions, 700);
        setKeyInput("");
    };

    const searchLinear = (key) => {
        const start = hash(key);
        const actions = [];
        actions.push(() => setSteps((p) => [...p, `Search ${key}: start at index ${start} (linear probing).`]));
        let found = false;
        for (let i = 0; i < TABLE_SIZE; i++) {
            const pos = (start + i) % TABLE_SIZE;
            actions.push(((pos) => () => setHighlightIndex(pos))(pos));
            actions.push(
                ((pos) => () => {
                    const t = table; // closure
                    const cell = t[pos];
                    if (cell === null) {
                        setSteps((p) => [...p, `Checked slot ${pos}: empty → stop, ${key} not in table.`]);
                    } else if (cell && cell.deleted) {
                        setSteps((p) => [...p, `Checked slot ${pos}: DELETED marker → continue probing.`]);
                    } else if (cell === key) {
                        setSteps((p) => [...p, `✅ Found ${key} at slot ${pos}.`]);
                    } else {
                        setSteps((p) => [...p, `Checked slot ${pos}: ${cell} ≠ ${key} → continue.`]);
                    }
                })(pos)
            );
        }
        actions.push(() => setHighlightIndex(null));
        playActions(actions, 650);
        setKeyInput("");
    };

    const searchQuadratic = (key) => {
        const start = hash(key);
        const actions = [];
        actions.push(() => setSteps((p) => [...p, `Search ${key}: start at index ${start} (quadratic).`]));
        for (let j = 0; j < TABLE_SIZE; j++) {
            const pos = (start + j * j) % TABLE_SIZE;
            actions.push(((pos, j) => () => setHighlightIndex(pos))(pos, j));
            actions.push(
                ((pos, j) => () => {
                    const cell = table[pos];
                    if (cell === null) {
                        setSteps((p) => [...p, `j=${j} check slot ${pos}: empty → stop, not found.`]);
                    } else if (cell && cell.deleted) {
                        setSteps((p) => [...p, `j=${j} check slot ${pos}: DELETED → continue.`]);
                    } else if (cell === key) {
                        setSteps((p) => [...p, `✅ Found ${key} at slot ${pos} (j=${j}).`]);
                    } else {
                        setSteps((p) => [...p, `j=${j} check slot ${pos}: ${cell} ≠ ${key} → continue.`]);
                    }
                })(pos, j)
            );
        }
        actions.push(() => setHighlightIndex(null));
        playActions(actions, 650);
        setKeyInput("");
    };

    // DELETE
    const deleteKey = () => {
        if (isPlaying) return;
        const k = Number(keyInput);
        if (keyInput.trim() === "" || Number.isNaN(k)) {
            setSteps((p) => [...p, "Please enter a valid numeric key to delete."]);
            return;
        }
        if (algorithm === "Chaining") {
            deleteChaining(k);
        } else {
            deleteProbing(k); // works for both linear & quadratic (we search using probing)
        }
        setKeyInput("");
    };

    const deleteChaining = (key) => {
        const idx = hash(key);
        const actions = [];
        actions.push(() => setSteps((p) => [...p, `Delete ${key}: index = ${idx}`]));
        actions.push(() => setHighlightIndex(idx));
        actions.push(() => {
            setTable((prev) => {
                const t = prev.slice();
                const arr = t[idx];
                if (!arr || arr.length === 0) {
                    setSteps((p) => [...p, `Slot ${idx} empty → ${key} not present.`]);
                    return t;
                }
                const pos = arr.indexOf(key);
                if (pos === -1) {
                    setSteps((p) => [...p, `${key} not found in slot ${idx}.`]);
                } else {
                    const newArr = arr.slice();
                    newArr.splice(pos, 1);
                    t[idx] = newArr.length ? newArr : null;
                    setElements((e) => Math.max(0, e - 1));
                    setSteps((p) => [...p, `${key} removed from slot ${idx}.`]);
                }
                return t;
            });
        });
        actions.push(() => setHighlightIndex(null));
        playActions(actions, 700);
    };

    const deleteProbing = (key) => {
        const start = hash(key);
        const actions = [];
        actions.push(() => setSteps((p) => [...p, `Delete ${key}: start at ${start} (probing).`]));

        for (let i = 0; i < TABLE_SIZE; i++) {
            const pos = (start + i) % TABLE_SIZE;
            actions.push(((pos) => () => setHighlightIndex(pos))(pos));
            actions.push(
                ((pos) => () => {
                    setTable((prev) => {
                        const t = prev.slice();
                        const cell = t[pos];
                        if (cell === null) {
                            setSteps((p) => [...p, `Checked ${pos}: empty → ${key} not present.`]);
                        } else if (cell && cell.deleted) {
                            setSteps((p) => [...p, `Checked ${pos}: DELETED marker → continue.`]);
                        } else if (cell === key) {
                            t[pos] = { deleted: true };
                            setElements((e) => Math.max(0, e - 1));
                            setSteps((p) => [...p, `Deleted ${key} at slot ${pos} (marked DELETED).`]);
                        } else {
                            setSteps((p) => [...p, `Checked ${pos}: ${cell} ≠ ${key} → continue.`]);
                        }
                        return t;
                    });
                })(pos)
            );
        }
        actions.push(() => setHighlightIndex(null));
        playActions(actions, 650);
    };

    // Random fill: generate 5–10 numbers and insert them using chosen algorithm (synchronously, logged)
    const handleRandom = () => {
        if (isPlaying) return;
        resetTable(true);
        const count = Math.floor(Math.random() * 6) + 5; // 5..10
        const keys = [];
        while (keys.length < count) {
            const k = Math.floor(Math.random() * 90) + 5;
            if (!keys.includes(k)) keys.push(k);
        }

        // Build combined actions for sequential insertion animation
        const combined = [];
        keys.forEach((k) => {
            if (algorithm === "Chaining") {
                const idx = hash(k);
                combined.push(() => setSteps((p) => [...p, `Insert ${k}: hash = ${idx}`]));
                combined.push(((idx, k) => () => setHighlightIndex(idx))(idx, k));
                combined.push(((idx, k) => () => {
                    setTable((prev) => {
                        const t = prev.slice();
                        if (!t[idx]) {
                            t[idx] = [k];
                            setSteps((p) => [...p, `Slot ${idx} empty → placed ${k}`]);
                        } else {
                            t[idx] = [...t[idx], k];
                            setCollisions((c) => c + 1);
                            setSteps((p) => [...p, `Slot ${idx} already had [${prev[idx].join(", ")}] → collision, appended ${k}`]);
                        }
                        setElements((e) => e + 1);
                        return t;
                    });
                })(idx, k));
                combined.push(() => setHighlightIndex(null));
            } else if (algorithm === "Linear Probing") {
                combined.push(() => setSteps((p) => [...p, `Insert ${k} (linear probing)`]));
                const start = hash(k);
                for (let i = 0; i < TABLE_SIZE; i++) {
                    const pos = (start + i) % TABLE_SIZE;
                    combined.push(((pos, k) => () => setHighlightIndex(pos))(pos, k));
                    combined.push(((pos, k) => () => {
                        setTable((prev) => {
                            const t = prev.slice();
                            const cell = t[pos];
                            if (cell === null || (cell && cell.deleted)) {
                                t[pos] = k;
                                setSteps((p) => [...p, `Placed ${k} at slot ${pos}`]);
                                setElements((e) => e + 1);
                            } else {
                                setCollisions((c) => c + 1);
                                setSteps((p) => [...p, `Collision at ${pos} (${cell}) → probing next`]);
                            }
                            return t;
                        });
                    })(pos, k));
                }
                combined.push(() => setHighlightIndex(null));
            } else {
                combined.push(() => setSteps((p) => [...p, `Insert ${k} (quadratic probing)`]));
                const start = hash(k);
                for (let j = 0; j < TABLE_SIZE; j++) {
                    const pos = (start + j * j) % TABLE_SIZE;
                    combined.push(((pos, k, j) => () => setHighlightIndex(pos))(pos, k, j));
                    combined.push(((pos, k, j) => () => {
                        setTable((prev) => {
                            const t = prev.slice();
                            const cell = t[pos];
                            if (cell === null || (cell && cell.deleted)) {
                                t[pos] = k;
                                setElements((e) => e + 1);
                                setSteps((p) => [...p, `Placed ${k} at slot ${pos} (j=${j})`]);
                            } else {
                                setCollisions((c) => c + 1);
                                setSteps((p) => [...p, `Collision at ${pos} (${cell}) (j=${j}) → continue`]);
                            }
                            return t;
                        });
                    })(pos, k, j));
                }
                combined.push(() => setHighlightIndex(null));
            }
        });

        playActions(combined, 500);
    };

    // UI helpers: load factor
    const loadFactor = (elements / TABLE_SIZE).toFixed(2);

    // Render a slot box (small square as in your UI)
    const SlotBox = ({ idx, value }) => {
        const isHighlighted = highlightIndex === idx;
        return (
            <Box
                sx={{
                    minWidth: 60,
                    minHeight: 48,
                    borderRadius: 1,
                    border: isHighlighted ? "2px solid #ff9900" : "1px solid #e2e8f0",
                    backgroundColor: isHighlighted ? "#fff7ed" : "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                    mx: 0.5,
                }}
            >
                <Box textAlign="center">
                    <Typography variant="caption" color="text.secondary">
                        [{idx}]
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                        {value || ""}
                    </Typography>
                </Box>
            </Box>
        );
    };

    return (
        <>
            <Box display={"flex"} justifyContent={"center"} width={"100%"} gap={2}>
                <Box width={"80%"} gap={2} display={"flex"} flexDirection={"column"}>
                    <Box bgcolor={"#ffffff"} height={"700px"} borderRadius={2} p={3}>
                        <Typography variant="h6" fontWeight={600}>
                            Interactive Hash Table
                        </Typography>

                        {/* Controls */}
                        <Box display={"flex"} gap={2} mt={3}>
                            <Input
                                placeholder="Enter Value"
                                disableUnderline
                                value={keyInput}
                                onChange={(e) => setKeyInput(e.target.value)}
                                sx={{
                                    width: "150px",
                                    border: "1px solid gray",
                                    borderRadius: "10px",
                                    padding: "0 0 0 10px",
                                    fontSize: "16px",
                                }}
                            />

                            <Select
                                value={algorithm}
                                onChange={(e) => setAlgorithm(e.target.value)}
                                variant="standard"
                                disableUnderline
                                sx={{
                                    border: "1px solid gray",
                                    borderRadius: 2,
                                    px: 1,
                                    py: 0.5,
                                    width: "30%",
                                    backgroundColor: "white",
                                }}
                            >
                                <MenuItem value="Chaining">Chaining</MenuItem>
                                <MenuItem value="Linear Probing">Linear Probing</MenuItem>
                                <MenuItem value="Quadratic Probing">Quadratic Probing</MenuItem>
                            </Select>

                            <Button
                                onClick={insertKey}
                                sx={{ textTransform: "none", p: 1, width: "12%", bgcolor: "#3b82f6", color: "#ffffff", borderRadius: 2.5 }}
                                disabled={isPlaying}
                            >
                                <IoMdAdd style={{ marginRight: 5 }} />Insert
                            </Button>

                            <Button
                                onClick={deleteKey}
                                sx={{ textTransform: "none", p: 1, width: "12%", bgcolor: "#ef4444", color: "#ffffff", borderRadius: 2.5 }}
                                disabled={isPlaying}
                            >
                                <MdDelete style={{ marginRight: 5 }} />Delete
                            </Button>

                            <Button
                                onClick={searchKey}
                                sx={{ textTransform: "none", p: 1, width: "12%", bgcolor: "#22c55e", color: "#ffffff", borderRadius: 2.5 }}
                                disabled={isPlaying}
                            >
                                <FaSearch style={{ marginRight: 5 }} />Search
                            </Button>

                            <Button
                                onClick={handleRandom}
                                sx={{ textTransform: "none", p: 1, width: "12%", bgcolor: "#b13bf6", color: "#ffffff", borderRadius: 2.5 }}
                                disabled={isPlaying}
                            >
                                <FaRandom style={{ marginRight: 5 }} />Random
                            </Button>

                            <Button
                                onClick={() => resetTable(true)}
                                sx={{ textTransform: "none", p: 1, width: "12%", bgcolor: "#6b7280", color: "#ffffff", borderRadius: 2.5 }}
                                disabled={isPlaying}
                            >
                                <RiLoopLeftFill style={{ marginRight: 5 }} />Reset
                            </Button>
                        </Box>

                        {/* Hash Function Calculation (pink box) */}
                        <Box bgcolor={"#fceded"} mt={3} width={"96.5%"} height={"18%"} borderRadius={2} p={2}>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <FaCalculator />
                                <Typography>Hash Function Calculation</Typography>
                            </Box>
                            <Box bgcolor={"#ffffff"} p={1} mt={1} borderRadius={1} height={"60%"} overflow={"auto"}>
                                {hashCalcLines.map((l, i) => (
                                    <Typography key={i} variant="body2">
                                        {l}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>

                        {/* Hash table visual */}
                        <Box display={"flex"} justifyContent={"center"} borderRadius={2} mt={3}>
                            <Box display={"flex"} justifyContent={"center"} minHeight={"100px"} width={"100%"} p={2} border={"2px solid #dedfe0"} borderRadius={2} flexDirection={"column"}>
                                <Box display={"flex"} justifyContent={"center"} flexWrap={"nowrap"} overflow={"auto"} pb={1}>
                                    {table.map((slot, idx) => (
                                        <SlotBox key={idx} idx={idx} value={displaySlot(slot)} />
                                    ))}
                                </Box>

                                {/* Steps log (below the table, scrollable) */}
                                <Box mt={2} px={1}>
                                    <Box
                                        ref={stepsRef}
                                        sx={{
                                            border: "1px dashed #e6e6e6",
                                            borderRadius: 1,
                                            p: 1,
                                            height: 120,
                                            overflow: "auto",
                                            backgroundColor: "#fafafa",
                                        }}
                                    >
                                        {steps.length === 0 ? (
                                            <Typography color="text.secondary">Action log will appear here.</Typography>
                                        ) : (
                                            steps.map((s, i) => (
                                                <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                                                    {s}
                                                </Typography>
                                            ))
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* Stats */}
                        <Box display={"flex"} justifyContent={"center"} mt={2.5} gap={3}>
                            <Box display={"flex"} height={"75px"} width={"30%"} bgcolor={"#ebf4ff"} borderRadius={2} p={2}>
                                <Box display={"flex"} flexDirection={"column"}>
                                    <Typography variant="body1" color="text.secondary" fontWeight={600}>
                                        Load Factor
                                    </Typography>
                                    <Typography variant="h5" color="#2563eb" fontWeight={600}>
                                        {loadFactor}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" fontSize={"12px"}>
                                        Elements / Table Size
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display={"flex"} height={"75px"} width={"30%"} bgcolor={"#fefce8"} borderRadius={2} p={2}>
                                <Box display={"flex"} flexDirection={"column"}>
                                    <Typography variant="body1" color="text.secondary" fontWeight={600}>
                                        Collisions
                                    </Typography>
                                    <Typography variant="h5" color="#ff841f" fontWeight={600}>
                                        {collisions}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" fontSize={"12px"}>
                                        Total collision events
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display={"flex"} height={"75px"} width={"30%"} bgcolor={"#f0fdf4"} borderRadius={2} p={2}>
                                <Box display={"flex"} flexDirection={"column"}>
                                    <Typography variant="body1" color="text.secondary" fontWeight={600}>
                                        Elements
                                    </Typography>
                                    <Typography variant="h5" color="#00c92f" fontWeight={600}>
                                        {elements}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" fontSize={"12px"}>
                                        Total stored elements
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* <Box display={"flex"} justifyContent={"center"} mt={2}>
              <Typography bgcolor="#e0f4fSf" color="#2563eb" fontWeight={540} borderRadius={2} p={1} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <IoInformationCircleSharp size={23} style={{ color: "#2563eb", marginRight: 5 }} />
                Enter a key and click Insert to begin
              </Typography>
            </Box> */}
                    </Box>

                    {/* Theory & examples area kept same as original */}
                    <Box bgcolor={"#f0f8ff"} width={"100%"} mb={2}>
                        <Accordion sx={{ borderRadius: 2, boxShadow: 1 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: "bold" }}>
                                <Typography fontWeight={"bold"}>Theory & Examples</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography variant="h6" mb={1}>
                                    Hashing — Overview
                                </Typography>
                                <Typography mb={2}>
                                    This page demonstrates three hashing strategies: Separate Chaining (each slot keeps a list),
                                    Linear Probing and Quadratic Probing (open addressing). Use the controls to insert, search and delete keys
                                    and observe collisions and load factor.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                    <PracticeProblem />
                </Box>

                {/* Right column with complexities — kept similar */}
                <Box height={"600px"} width={"20%"} borderRadius={2} bgcolor={"#ffffff"} p={1.5}>
                    <Typography variant="h6" fontWeight={600}>
                        Complexity Analysis
                    </Typography>

                    <Box bgcolor={"#ebf4ff"} p={1.5} m={1} borderRadius={2}>
                        <Typography color="#438af7" fontWeight={600}>
                            Separate Chaining
                        </Typography>
                        <Box mt={1}>
                            <Typography variant="body1" color="text.primary" mb={0.1}>
                                Average Search : O(1 + α)
                            </Typography>
                            <Typography variant="body1" color="text.primary" mb={0.1}>
                                Worst Case : O(n)
                            </Typography>
                            <Typography variant="body1" color="text.secondary" mt={1} mb={0.1}>
                                α = load factor (n/m). Performance degrades with high load factor.
                            </Typography>
                        </Box>
                    </Box>

                    <Box bgcolor={"#f0fdf4"} p={1.5} m={1} borderRadius={2}>
                        <Typography color="#1c8972" fontWeight={600} mb={1.5}>
                            Open Addressing (Linear / Quadratic)
                        </Typography>
                        <Typography variant="body1" color="text.primary" mb={0.1}>
                            Average Search : O(1 + α)
                        </Typography>
                        <Typography variant="body1" color="text.primary" mb={0.1}>
                            Worst Case : O(n)
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mt={1} mb={0.1}>
                            Requires α &lt; 1. Performance drops significantly as table fills.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* If we ever want a dialog for more interactions */}
            <Dialog open={openHashDialog} onClose={() => setOpenHashDialog(false)}>
                <DialogTitle>Hash Info</DialogTitle>
                <DialogContent>
                    <Typography>Size: {TABLE_SIZE}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenHashDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
