// MemoryManagement.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Input,
  Button,
  Card,
  CardContent,
  TextField,
  Divider,
} from "@mui/material";
import { FaPlay } from "react-icons/fa";

const conceptCards = [
  { title: "Logical vs Physical", desc: "Address translation between logical and physical memory spaces." },
  { title: "Paging", desc: "Fixed-size page allocation with page table mapping." },
  { title: "Segmentation", desc: "Variable-size segment allocation based on logical units." },
  { title: "Virtual Memory", desc: "Page fault handling and replacement algorithms." },
];

const defaultRefString = "1,2,3,4,1,2,5,1,2,3,4,5";

const parseRefString = (s) => {
  if (!s) return [];
  return s
    .split(/[,\s]+/)
    .map((t) => (t === "" ? null : Number(t)))
    .filter((n) => typeof n === "number" && !Number.isNaN(n));
};

const computeInternalFragmentation = (pageSize, pagesInFrames) => {
  return 0; // demo
};

const MemoryManagement = () => {
  const [simulationMode, setSimulationMode] = useState("paging"); // NEW
  const [pageSize, setPageSize] = useState("4KB");
  const [frameCount, setFrameCount] = useState(8);
  const [pageRefString, setPageRefString] = useState(defaultRefString);
  const [logicalAddress, setLogicalAddress] = useState("");
  const [frames, setFrames] = useState(Array(8).fill(null));
  const [pageTable, setPageTable] = useState({});
  const [pageFaults, setPageFaults] = useState(0);
  const [elementsLoaded, setElementsLoaded] = useState(0);
  const [hitRatio, setHitRatio] = useState(0);
  const [frameUtilization, setFrameUtilization] = useState(0);
  const [internalFragKB, setInternalFragKB] = useState(0);
  const [logSteps, setLogSteps] = useState([]);
  const logsContainerRef = useRef(null);
  const logsEndRef = useRef(null);

  const runSimulation = () => {
    if (simulationMode === "paging") {
      runPagingSimulation();
    } else if (simulationMode === "segmentation") {
      runSegmentationSimulation();
    } else if (simulationMode === "virtual") {
      runVirtualMemorySimulation();
    }
  };

  // ---------------- Paging Simulation ----------------
  const runPagingSimulation = () => {
    const refs = parseRefString(pageRefString);
    if (!refs.length) {
      setLogSteps((p) => [...p, "No valid page reference string provided."]);
      return;
    }

    const fCount = Math.max(1, Number(frameCount) || 1);
    const f = Array(fCount).fill(null);
    const table = {};
    let front = 0,
      faults = 0,
      hits = 0;

    setFrames([...f]);
    setPageTable({});
    setPageFaults(0);
    setHitRatio(0);
    setFrameUtilization(0);
    setLogSteps([`Starting FIFO Paging Simulation: frames=${fCount}, refs=[${refs.join(", ")}]`]);

    let i = 0;
    const step = () => {
      if (i >= refs.length) {
        const loaded = f.filter((x) => x !== null).length;
        const utilization = Math.round((loaded / fCount) * 1000) / 10;
        const hitRatioVal = refs.length > 0 ? Math.round((hits / refs.length) * 1000) / 10 : 0;
        setElementsLoaded(loaded);
        setFrameUtilization(utilization);
        setHitRatio(hitRatioVal);
        setInternalFragKB(computeInternalFragmentation(pageSize, f));
        setLogSteps((p) => [...p, `Simulation complete: page faults=${faults}, hits=${hits}`]);
        return;
      }

      const p = refs[i];
      setLogSteps((prev) => [...prev, `Reference ${i + 1}: page ${p}`]);

      let hitFrame = f.findIndex((val) => val === p);
      if (hitFrame >= 0) {
        hits++;
        setLogSteps((prev) => [...prev, ` → Hit in frame ${hitFrame}`]);
      } else {
        faults++;
        setLogSteps((prev) => [...prev, ` → Page fault. Replacing at frame ${front}`]);
        const evicted = f[front];
        if (evicted != null) {
          table[evicted] = null;
          setLogSteps((prev) => [...prev, `    Evicted page ${evicted} from frame ${front}`]);
        }
        f[front] = p;
        table[p] = front;
        setFrames([...f]);
        setPageTable({ ...table });
        setLogSteps((prev) => [...prev, `    Placed page ${p} into frame ${front}`]);
        front = (front + 1) % fCount;
      }

      setPageFaults(faults);
      i++;
      setTimeout(step, 1000);
    };

    step();
  };

  // ---------------- Segmentation Simulation ----------------
  const runSegmentationSimulation = () => {
    setLogSteps([`Starting Segmentation Simulation: logical address=${logicalAddress || "N/A"}`]);

    // Example: assume logicalAddress is "2:50" (segment 2, offset 50)
    if (!logicalAddress.includes(":")) {
      setLogSteps((p) => [...p, "Invalid format. Use 'segment:offset' (e.g., 2:50)."]);
      return;
    }

    const [segStr, offsetStr] = logicalAddress.split(":");
    const seg = Number(segStr);
    const offset = Number(offsetStr);

    // Example: define segment table
    const segmentTable = {
      0: { base: 1000, limit: 200 },
      1: { base: 2000, limit: 300 },
      2: { base: 3000, limit: 400 },
    };

    if (!(seg in segmentTable)) {
      setLogSteps((p) => [...p, `Segment ${seg} not found in segment table.`]);
      return;
    }

    const entry = segmentTable[seg];
    if (offset >= entry.limit) {
      setLogSteps((p) => [...p, `Offset ${offset} exceeds limit ${entry.limit}. → SEGMENTATION FAULT`]);
    } else {
      const physicalAddress = entry.base + offset;
      setLogSteps((p) => [...p, `Translated to physical address = base ${entry.base} + offset ${offset} = ${physicalAddress}`]);
    }
  };

  // ---------------- Virtual Memory Simulation ----------------
  const runVirtualMemorySimulation = () => {
    const refs = parseRefString(pageRefString);
    if (!refs.length) {
      setLogSteps((p) => [...p, "No valid reference string for Virtual Memory simulation."]);
      return;
    }

    const fCount = Math.max(1, Number(frameCount) || 1);
    const f = Array(fCount).fill(null);
    const table = {};
    let front = 0,
      faults = 0,
      hits = 0;

    setFrames([...f]);
    setPageTable({});
    setPageFaults(0);
    setLogSteps([`Starting Virtual Memory Simulation (FIFO Replacement): frames=${fCount}, refs=[${refs.join(", ")}]`]);

    let i = 0;
    const step = () => {
      if (i >= refs.length) {
        setLogSteps((p) => [...p, `VM Simulation complete: faults=${faults}, hits=${hits}`]);
        return;
      }

      const p = refs[i];
      setLogSteps((prev) => [...prev, `Reference ${i + 1}: page ${p}`]);

      let hitFrame = f.findIndex((val) => val === p);
      if (hitFrame >= 0) {
        hits++;
        setLogSteps((prev) => [...prev, ` → Hit in frame ${hitFrame}`]);
      } else {
        faults++;
        setLogSteps((prev) => [...prev, ` → Page fault. Replacing at frame ${front}`]);
        const evicted = f[front];
        if (evicted != null) {
          table[evicted] = null;
          setLogSteps((prev) => [...prev, `    Swapped out page ${evicted}`]);
        }
        f[front] = p;
        table[p] = front;
        setFrames([...f]);
        setPageTable({ ...table });
        setLogSteps((prev) => [...prev, `    Swapped in page ${p} at frame ${front}`]);
        front = (front + 1) % fCount;
      }

      setPageFaults(faults);
      i++;
      setTimeout(step, 1000);
    };

    step();
  };

  const resetSimulation = () => {
    setFrames(Array(frameCount).fill(null));
    setPageTable({});
    setPageFaults(0);
    setElementsLoaded(0);
    setFrameUtilization(0);
    setHitRatio(0);
    setInternalFragKB(0);
    setLogSteps([]);
  };

  useEffect(() => {
    setFrames((prev) => {
      const newCount = Math.max(1, Number(frameCount) || 1);
      const copy = prev.slice(0, newCount);
      while (copy.length < newCount) copy.push(null);
      return copy;
    });
  }, [frameCount]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logSteps]);

  return (
    <>
      {/* Header */}
      <Box mb={3}>
        <Card sx={{ background: "#1e66d6", color: "white", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700}>
              Memory Management: Paging, Segmentation & Virtual Memory
            </Typography>
            <Typography mt={1} sx={{ opacity: 0.95 }}>
              Simulation & visualization — learn address translation, page tables, page faults and replacement.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Simulation Controls */}
      <Card sx={{ borderRadius: 2, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Simulation Controls
          </Typography>

          {/* Simulation Mode */}
          <Box mt={2}>
            <Typography variant="subtitle2">Simulation Mode</Typography>
            <Box mt={1} display="flex" gap={1}>
              <Button
                variant={simulationMode === "paging" ? "contained" : "outlined"}
                onClick={() => setSimulationMode("paging")}
                size="small"
              >
                Paging
              </Button>
              <Button
                variant={simulationMode === "segmentation" ? "contained" : "outlined"}
                onClick={() => setSimulationMode("segmentation")}
                size="small"
              >
                Segmentation
              </Button>
              <Button
                variant={simulationMode === "virtual" ? "contained" : "outlined"}
                onClick={() => setSimulationMode("virtual")}
                size="small"
              >
                Virtual Memory
              </Button>
            </Box>
          </Box>

          {/* Shared Inputs */}
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={3}
          >
            <Box sx={{ width: "33%" }}>
              <Typography variant="subtitle2" mb={0.5}>
                Logical Address
              </Typography>
              <Input
                placeholder={simulationMode === "segmentation" ? "segment:offset" : "0x1234"}
                value={logicalAddress}
                onChange={(e) => setLogicalAddress(e.target.value)}
                disableUnderline
                sx={{
                  width: "100%",
                  border: "1px solid #e2e8f0",
                  borderRadius: 1,
                  px: 1,
                  py: 0.6,
                  backgroundColor: "white",
                }}
              />
            </Box>

            {simulationMode !== "segmentation" && (
              <>
                <Box sx={{ width: "33%" }}>
                  <Typography variant="subtitle2" mb={0.5}>
                    Page Size
                  </Typography>
                  <Select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{ background: "white" }}
                  >
                    <MenuItem value="1KB">1KB</MenuItem>
                    <MenuItem value="2KB">2KB</MenuItem>
                    <MenuItem value="4KB">4KB</MenuItem>
                    <MenuItem value="8KB">8KB</MenuItem>
                  </Select>
                </Box>

                <Box sx={{ width: "33%" }}>
                  <Typography variant="subtitle2" mb={0.5}>
                    Frame Count
                  </Typography>
                  <Input
                    value={frameCount}
                    onChange={(e) => setFrameCount(Number(e.target.value) || 0)}
                    disableUnderline
                    sx={{
                      width: "100%",
                      border: "1px solid #e2e8f0",
                      borderRadius: 1,
                      px: 1,
                      py: 0.6,
                      backgroundColor: "white",
                    }}
                  />
                </Box>
              </>
            )}
          </Box>

          {/* Page Reference String (not needed for Segmentation) */}
          {simulationMode !== "segmentation" && (
            <Box mt={2}>
              <Typography variant="subtitle2" mb={0.5}>
                Page Reference String
              </Typography>
              <TextField
                fullWidth
                value={pageRefString}
                onChange={(e) => setPageRefString(e.target.value)}
                placeholder="1,2,3,4,1,2,5,1,2,3,4,5"
                variant="outlined"
                size="small"
              />
            </Box>
          )}

          {/* Run / Reset */}
          <Box mt={3} display="flex" gap={2}>
            <Button
              onClick={runSimulation}
              startIcon={<FaPlay />}
              sx={{ background: "#2563eb", color: "white", "&:hover": { background: "#1e4fb4" } }}
              fullWidth
            >
              Run Simulation
            </Button>
            <Button onClick={resetSimulation} variant="outlined" fullWidth>
              Reset
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Logs + Visualization */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        {/* Logs */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={700}>
                Log & Steps
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box
                sx={{ maxHeight: 400, overflow: "auto", px: 1 }}
                ref={logsContainerRef}
              >
                {logSteps.length === 0 && (
                  <Typography color="text.secondary">
                    Click Run Simulation to see steps
                  </Typography>
                )}
                {logSteps.map((line, i) => (
                  <Typography key={i} variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                    {line}
                  </Typography>
                ))}
                <div ref={logsEndRef} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Visualization (only for paging & VM) */}
        {simulationMode !== "segmentation" && (
          <Box sx={{ flex: 1.5 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>
                  Memory Visualization
                </Typography>

                <Box mt={2}>
                  <Typography variant="subtitle2">Physical Memory Frames</Typography>
                  <Box display="flex" gap={1} flexWrap="wrap" alignItems="center" mt={1}>
                    {frames.map((p, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          minWidth: 110,
                          height: 70,
                          borderRadius: 1.5,
                          border: "1px solid #e2e8f0",
                          background: p != null ? "#e6f4ff" : "#f7f9fb",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          px: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Frame {idx}
                        </Typography>
                        <Typography fontWeight={700}>{p != null ? `Page ${p}` : "Empty"}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box mt={3}>
                  <Typography variant="subtitle2">Page Table</Typography>
                  <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                    {Array.from(new Set(parseRefString(pageRefString))).map((page) => (
                      <Box
                        key={page}
                        sx={{
                          minWidth: 140,
                          border: "1px solid #e2e8f0",
                          borderRadius: 1,
                          p: 1,
                          background: pageTable[page] != null ? "#f0fff6" : "#fff",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Page {page}
                        </Typography>
                        <Typography fontWeight={700}>
                          → {pageTable[page] != null ? `Frame ${pageTable[page]}` : "—"}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </>
  );
};

export default MemoryManagement;
