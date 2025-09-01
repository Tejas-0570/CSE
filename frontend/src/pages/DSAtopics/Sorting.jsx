import { Box, Typography, Input, Button, Select, MenuItem } from "@mui/material";
import { FaStop } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { RiLoopLeftFill } from "react-icons/ri";
import React, { useState, useRef } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PracticeProblem from '../../components/PracticeProblem'


const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

/** A step the visualizer can play */
//
// array: current array snapshot
// compare?: [i, j]                 -> highlight comparison (amber)
// swap?: [i, j]                    -> highlight swap (red)
// writeIndex?: number              -> highlight single write (green) - mainly for Merge Sort
// pivot?: number                   -> highlight pivot (purple)       - Quick Sort
//
/** type Step = { array:number[], compare?:[number,number], swap?:[number,number], writeIndex?:number, pivot?:number } */

// ------------- SORT STEP BUILDERS ------------- //
const bubbleSortSteps = (src) => {
  const arr = [...src];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      comparisons++;
      steps.push({ array: [...arr], compare: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        steps.push({ array: [...arr], swap: [j, j + 1] });
      }
    }
  }
  return { steps, comparisons, swaps };
};

const selectionSortSteps = (src) => {
  const arr = [...src];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      comparisons++;
      steps.push({ array: [...arr], compare: [minIdx, j] });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
      steps.push({ array: [...arr], swap: [i, minIdx] });
    }
  }
  return { steps, comparisons, swaps };
};

const insertionSortSteps = (src) => {
  const arr = [...src];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    const key = arr[i];
    // We’ll visualize insertion as adjacent swaps (shifts)
    while (j >= 0) {
      comparisons++;
      steps.push({ array: [...arr], compare: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        steps.push({ array: [...arr], swap: [j, j + 1] });
      } else {
        break;
      }
      j--;
    }
    // After the while loop the element is in place (adjacent swaps already handled the placement)
  }
  return { steps, comparisons, swaps };
};

// ----- Merge Sort (uses writes rather than swaps) -----
const mergeSortSteps = (src) => {
  const arr = [...src];
  const steps = [];
  let comparisons = 0;
  let swaps = 0; // Merge sort does not swap in-place; we leave this 0.

  const merge = (l, m, r) => {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0,
      j = 0,
      k = l;

    while (i < left.length && j < right.length) {
      // compare the absolute positions
      comparisons++;
      steps.push({ array: [...arr], compare: [l + i, m + 1 + j] });
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        steps.push({ array: [...arr], writeIndex: k });
        i++;
      } else {
        arr[k] = right[j];
        steps.push({ array: [...arr], writeIndex: k });
        j++;
      }
      k++;
    }
    while (i < left.length) {
      arr[k] = left[i];
      steps.push({ array: [...arr], writeIndex: k });
      i++;
      k++;
    }
    while (j < right.length) {
      arr[k] = right[j];
      steps.push({ array: [...arr], writeIndex: k });
      j++;
      k++;
    }
  };

  const sort = (l, r) => {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    sort(l, m);
    sort(m + 1, r);
    merge(l, m, r);
  };

  sort(0, arr.length - 1);
  return { steps, comparisons, swaps };
};

// ----- Quick Sort (Lomuto) -----
const quickSortSteps = (src) => {
  const arr = [...src];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  const partition = (lo, hi) => {
    const pivot = arr[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      comparisons++;
      steps.push({ array: [...arr], compare: [j, hi], pivot: hi });
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
          steps.push({ array: [...arr], swap: [i, j], pivot: hi });
        }
      }
    }
    if (i + 1 !== hi) {
      [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
      swaps++;
      steps.push({ array: [...arr], swap: [i + 1, hi], pivot: i + 1 });
    }
    return i + 1;
  };

  const sort = (lo, hi) => {
    if (lo < hi) {
      const p = partition(lo, hi);
      sort(lo, p - 1);
      sort(p + 1, hi);
    }
  };

  sort(0, arr.length - 1);
  return { steps, comparisons, swaps };
};

// ----- Heap Sort -----
const heapSortSteps = (src) => {
  const arr = [...src];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  const heapify = (n, i) => {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n) {
      comparisons++;
      steps.push({ array: [...arr], compare: [l, largest] });
      if (arr[l] > arr[largest]) largest = l;
    }
    if (r < n) {
      comparisons++;
      steps.push({ array: [...arr], compare: [r, largest] });
      if (arr[r] > arr[largest]) largest = r;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swaps++;
      steps.push({ array: [...arr], swap: [i, largest] });
      heapify(n, largest);
    }
  };

  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps++;
    steps.push({ array: [...arr], swap: [0, i] });
    heapify(i, 0);
  }

  return { steps, comparisons, swaps };
};

// ----------------------------------------------------- //

const DSASorting = () => {
  const [algorithm, setAlgorithm] = useState("Bubble Sort");
  const [array, setArray] = useState([34, 67, 25, 75, 23, 12, 59]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [speed] = useState(300); // ms per step
  const [input, setInput] = useState(array.join(", "));
  const stopRef = useRef(false);

  // Highlight state for animation
  const [comparePair, setComparePair] = useState(null); // [i,j]
  const [swapPair, setSwapPair] = useState(null); // [i,j]
  const [writeIndex, setWriteIndex] = useState(null); // number
  const [pivotIndex, setPivotIndex] = useState(null); // number

  // Generate random array + show in input box
  const generateRandomArray = () => {
    const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 99));
    setArray(arr);
    setInput(arr.join(", "));
    resetStats(false);
  };

  // Reset (optionally clear highlights too)
  const resetStats = (clearArray = false) => {
    if (clearArray) setArray([]);
    setComparisons(0);
    setSwaps(0);
    setIsSorting(false);
    stopRef.current = true; // tell any running loop to stop
    // clear highlights
    setComparePair(null);
    setSwapPair(null);
    setWriteIndex(null);
    setPivotIndex(null);
  };

  // Handle array input
  const handleSetArray = () => {
    const arr = input
      .split(",")
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n));
    if (arr.length > 0) {
      setArray(arr);
      resetStats(false);
    }
  };

  const pickSorter = () => {
    switch (algorithm) {
      case "Bubble Sort":
        return bubbleSortSteps;
      case "Selection Sort":
        return selectionSortSteps;
      case "Insertion Sort":
        return insertionSortSteps;
      case "Merge Sort":
        return mergeSortSteps;
      case "Quick Sort":
        return quickSortSteps;
      case "Heap Sort":
        return heapSortSteps;
      default:
        return bubbleSortSteps;
    }
  };

  // Playback steps with highlighting and live counters
  const startSorting = async () => {
    if (isSorting) return;
    setComparisons(0);
    setSwaps(0);
    setIsSorting(true);
    stopRef.current = false;

    const { steps } = pickSorter()(array);

    let comp = 0;
    let swp = 0;

    for (let s of steps) {
      if (stopRef.current) break;

      setArray(s.array);

      setComparePair(s.compare || null);
      setSwapPair(s.swap || null);
      setWriteIndex(
        typeof s.writeIndex === "number" ? s.writeIndex : null
      );
      setPivotIndex(typeof s.pivot === "number" ? s.pivot : null);

      if (s.compare) {
        comp++;
        setComparisons(comp);
      }
      if (s.swap) {
        swp++;
        setSwaps(swp);
      }

      await sleep(speed);
    }

    // clear highlights at the end
    setComparePair(null);
    setSwapPair(null);
    setWriteIndex(null);
    setPivotIndex(null);
    setIsSorting(false);
  };

  const stopSorting = () => {
    stopRef.current = true;
    setIsSorting(false);
  };

  const barColor = (idx) => {
    if (swapPair && (idx === swapPair[0] || idx === swapPair[1])) return "#ef4444"; // red
    if (comparePair && (idx === comparePair[0] || idx === comparePair[1])) return "#f59e0b"; // amber
    if (writeIndex === idx) return "#22c55e"; // green
    if (pivotIndex === idx) return "#a78bfa"; // purple
    return "#9ca3af"; // default gray
    // (ordering matters: swap > compare > write > pivot > default)
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} width={"100%"} gap={2}>
        <Box width={"80%"} gap={2} display={"flex"} flexDirection={"column"}>
          {/* Controls */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            bgcolor={"#ffffff"}
            height={"170px"}
            borderRadius={2}
            p={3}
          >
            <Box display={"flex"} justifyContent={"left"} gap={27} mb={1.5}>
              <Typography>Algorithm</Typography>
              <Typography>Array Input</Typography>
            </Box>

            <Box display={"flex"} gap={2}>
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
                  "&.Mui-focused": { border: "2px solid black" },
                  backgroundColor: "white",
                }}
              >
                <MenuItem value="Bubble Sort">Bubble Sort</MenuItem>
                <MenuItem value="Selection Sort">Selection Sort</MenuItem>
                <MenuItem value="Insertion Sort">Insertion Sort</MenuItem>
                <MenuItem value="Merge Sort">Merge Sort</MenuItem>
                <MenuItem value="Quick Sort">Quick Sort</MenuItem>
                <MenuItem value="Heap Sort">Heap Sort</MenuItem>
              </Select>

              <Input
                placeholder="e.g. 34,67,25,75,23"
                disableUnderline
                value={input}
                onChange={(e) => setInput(e.target.value)}
                sx={{
                  border: "2px solid gray",
                  borderRadius: 2,
                  p: 0.5,
                  width: "30%",
                  "&.Mui-focused": { border: "2px solid black" },
                  backgroundColor: "white",
                }}
              />

              <Button
                onClick={handleSetArray}
                sx={{
                  textTransform: "none",
                  p: 1,
                  bgcolor: "#3b82f6",
                  color: "#ffffff",
                  width: "20%",
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "#2265d4" },
                }}
              >
                Set Array
              </Button>
              <Button
                onClick={generateRandomArray}
                sx={{
                  textTransform: "none",
                  p: 1,
                  bgcolor: "#6b7280",
                  color: "#ffffff",
                  width: "15%",
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "#5a606e" },
                }}
              >
                Random
              </Button>
            </Box>

            <Box display={"flex"} gap={2} mt={3}>
              <Button
                disabled={isSorting}
                onClick={startSorting}
                sx={{
                  textTransform: "none",
                  p: 1,
                  width: "12%",
                  bgcolor: "#22c55e",
                  color: "#ffffff",
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "#0da143" },
                }}
              >
                <FaPlay style={{ marginRight: 5 }} />
                Start
              </Button>
              <Button
                onClick={stopSorting}
                sx={{
                  textTransform: "none",
                  p: 1,
                  width: "12%",
                  bgcolor: "#ef4444",
                  color: "#ffffff",
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "#c92e2e" },
                }}
              >
                <FaStop style={{ marginRight: 5 }} />
                Stop
              </Button>
              <Button
                onClick={() => resetStats(false)}
                sx={{
                  textTransform: "none",
                  p: 1,
                  width: "12%",
                  bgcolor: "#6b7280",
                  color: "#ffffff",
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "#5a606e" },
                }}
              >
                <RiLoopLeftFill style={{ marginRight: 5 }} />
                Reset
              </Button>
            </Box>
          </Box>

          {/* Visualization */}
          <Box bgcolor={"#ffffff"} height={"550px"} borderRadius={2} p={3}>
            <Typography variant="h6" fontWeight={600}>
              Sorting Visualization
            </Typography>
            <Box
              height={"70%"}
              width={"96%"}
              border={"2px solid #dedfe0"}
              borderRadius={2}
              mt={3}
              p={2}
              display="flex"
              alignItems="end"
              justifyContent="center"
              gap={1}
              sx={{ overflow: "hidden" }}
            >
              {array.map((val, idx) => (
                <Box
                  key={idx}
                  height={`${val * 3}px`}
                  width="30px"
                  bgcolor={barColor(idx)}
                  borderRadius={1}
                  sx={{
                    transition: "all 0.3s ease",
                  }}
                  title={String(val)}
                />
              ))}
            </Box>

            {/* Stats */}
            <Box display={"flex"} justifyContent={"center"} mt={4} gap={3}>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography variant="body1" color="text.secondary">
                  Comparisons
                </Typography>
                <Typography variant="h5" color="#2563eb" fontWeight={600}>
                  {comparisons}
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography variant="body1" color="text.secondary">
                  Swaps
                </Typography>
                <Typography variant="h5" color="#2563eb" fontWeight={600}>
                  {swaps}
                </Typography>
              </Box>
              {/* <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography variant="body1" color="text.secondary">
                  Speed
                </Typography>
                <Typography variant="h6" color="#2563eb" fontWeight={600}>
                  Normal
                </Typography>
              </Box> */}
            </Box>
          </Box>
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

          <PracticeProblem />
        </Box>
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
              <Typography variant="body1" color="text.secondary" mb={0.1}>Best : O(n)</Typography>
              <Typography variant="body1" color="text.secondary" mb={0.1}>Average : O(n²)</Typography>
              <Typography variant="body1" color="text.secondary" mb={0.1}>Worst : O(n²)</Typography>
            </Box>
          </Box>

          <Box bgcolor={'#f0fdf4'} p={1.5} m={1} borderRadius={2}>
            <Typography color="#1c8972" fontWeight={600} mb={1.5}>Space Complexity</Typography>
            <Typography variant="body1" color="text.secondary">Space : O(1)</Typography>
          </Box>

          <Box bgcolor={'#fefce8'} p={1.5} m={1} borderRadius={2}>
            <Typography color="#a46f26" fontWeight={600} mb={1.5}>Properties</Typography>
            <Typography variant="body1" color="text.secondary">• Stable sorting</Typography>
            <Typography variant="body1" color="text.secondary">• In-place algorithm</Typography>
            <Typography variant="body1" color="text.secondary">• Simple implementation</Typography>
            <Typography variant="body1" color="text.secondary">• Poor performance</Typography>

          </Box>

        </Box>
      </Box>
    </>
  );
};

export default DSASorting;
