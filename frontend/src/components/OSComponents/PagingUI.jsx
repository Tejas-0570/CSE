// PagingUI.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Input,
  Button,
  Card,
  CardContent,
  TextField,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { FaPlay } from "react-icons/fa";

const defaultRefString = "1,2,3,4,1,2,5,1,2,3,4,5";

const parseRefString = (s) =>
  s
    .split(/[,\s]+/)
    .map((t) => Number(t))
    .filter((n) => !Number.isNaN(n));

const PagingUI = () => {
  const [pageSize, setPageSize] = useState("4KB");
  const [frameCount, setFrameCount] = useState(8);
  const [pageRefString, setPageRefString] = useState(defaultRefString);
  const [frames, setFrames] = useState(Array(8).fill(null));
  const [pageTable, setPageTable] = useState({});
  const [pageFaults, setPageFaults] = useState(0);
  const [hitRatio, setHitRatio] = useState(0);
  const [frameUtilization, setFrameUtilization] = useState(0);
  const [logSteps, setLogSteps] = useState([]);

  const logsEndRef = useRef(null);
  useEffect(() => {
    if (logsEndRef.current) logsEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [logSteps]);

  const runSimulation = () => {
    const refs = parseRefString(pageRefString);
    if (!refs.length) {
      setLogSteps(["No valid page reference string provided."]);
      return;
    }

    const fCount = Math.max(1, Number(frameCount) || 1);
    const f = Array(fCount).fill(null);
    const table = {};
    let front = 0, faults = 0, hits = 0;

    setFrames([...f]);
    setPageTable({});
    setPageFaults(0);
    setHitRatio(0);
    setFrameUtilization(0);
    setLogSteps([`Starting FIFO Simulation: frames=${fCount}, refs=[${refs.join(", ")}]`]);

    let i = 0;
    const step = () => {
      if (i >= refs.length) {
        const loaded = f.filter((x) => x !== null).length;
        setFrameUtilization(Math.round((loaded / fCount) * 100));
        setHitRatio(Math.round((hits / refs.length) * 100));
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
        f[front] = p;
        table[p] = front;
        setFrames([...f]);
        setPageTable({ ...table });
        front = (front + 1) % fCount;
      }

      setPageFaults(faults);
      i++;
      setTimeout(step, 800);
    };

    step();
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={700}>Paging Simulation</Typography>
      <Box mt={2} display="flex" gap={2}>
        <Box flex={1}>
          <Typography variant="subtitle2">Page Size</Typography>
          <Select fullWidth value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
            <MenuItem value="1KB">1KB</MenuItem>
            <MenuItem value="2KB">2KB</MenuItem>
            <MenuItem value="4KB">4KB</MenuItem>
          </Select>
        </Box>
        <Box flex={1}>
          <Typography variant="subtitle2">Frame Count</Typography>
          <Input value={frameCount} onChange={(e) => setFrameCount(e.target.value)} fullWidth />
        </Box>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle2">Page Reference String</Typography>
        <TextField fullWidth value={pageRefString} onChange={(e) => setPageRefString(e.target.value)} />
      </Box>

      <Box mt={2} display="flex" gap={2}>
        <Button onClick={runSimulation} variant="contained" startIcon={<FaPlay />}>Run</Button>
        <Button onClick={() => setLogSteps([])} variant="outlined">Reset</Button>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" fontWeight={700}>Log & Steps</Typography>
      <Box sx={{ maxHeight: 300, overflow: "auto", px: 1 }}>
        {logSteps.map((line, i) => (
          <Typography key={i} variant="body2">{line}</Typography>
        ))}
        <div ref={logsEndRef} />
      </Box>
    </Box>
  );
};

export default PagingUI;
