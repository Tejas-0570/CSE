// VirtualMemoryUI.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Box, Typography, Input, Button, Card, CardContent, TextField, Divider, Select, MenuItem
} from "@mui/material";
import { FaPlay } from "react-icons/fa";

const defaultRefString = "1,2,3,4,2,1,5";

const parseRefString = (s) =>
  s
    .split(/[,\s]+/)
    .map((t) => Number(t))
    .filter((n) => !Number.isNaN(n));

const VirtualMemoryUI = () => {
  const [pageSize, setPageSize] = useState("4KB");
  const [frameCount, setFrameCount] = useState(4);
  const [diskSize, setDiskSize] = useState(1024);
  const [pageRefString, setPageRefString] = useState(defaultRefString);
  const [logSteps, setLogSteps] = useState([]);

  const logsEndRef = useRef(null);
  useEffect(() => {
    if (logsEndRef.current) logsEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [logSteps]);

  const runSimulation = () => {
    const refs = parseRefString(pageRefString);
    setLogSteps([`Simulating Virtual Memory with ${frameCount} frames, Disk=${diskSize}KB`]);
    refs.forEach((p, idx) => {
      setLogSteps((prev) => [...prev, `Ref ${idx + 1}: Page ${p} → ${p % frameCount}`]);
    });
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={700}>Virtual Memory Simulation</Typography>
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
        <Box flex={1}>
          <Typography variant="subtitle2">Disk Size</Typography>
          <Input value={diskSize} onChange={(e) => setDiskSize(e.target.value)} fullWidth />
        </Box>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle2">Page Reference String</Typography>
        <TextField fullWidth value={pageRefString} onChange={(e) => setPageRefString(e.target.value)} />
      </Box>

      <Box mt={2}>
        <Button onClick={runSimulation} variant="contained" startIcon={<FaPlay />}>Run</Button>
        <Button onClick={() => setLogSteps([])} variant="outlined" sx={{ ml: 2 }}>Reset</Button>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" fontWeight={700}>Log & Steps</Typography>
      <Box sx={{ maxHeight: 300, overflow: "auto" }}>
        {logSteps.map((line, i) => (
          <Typography key={i} variant="body2">{line}</Typography>
        ))}
        <div ref={logsEndRef} />
      </Box>
    </Box>
  );
};

export default VirtualMemoryUI;
