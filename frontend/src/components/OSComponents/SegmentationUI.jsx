// SegmentationUI.jsx
import React, { useState } from "react";
import {
  Box, Typography, Input, Button, Card, CardContent, Divider,
} from "@mui/material";
import { FaPlay } from "react-icons/fa";

const SegmentationUI = () => {
  const [logicalAddress, setLogicalAddress] = useState("");
  const [segmentTable, setSegmentTable] = useState([
    { base: 1000, limit: 200 },
    { base: 2000, limit: 300 },
  ]);
  const [logSteps, setLogSteps] = useState([]);

  const runSimulation = () => {
    if (!logicalAddress.includes(",")) {
      setLogSteps(["Enter logical address as segment,offset"]);
      return;
    }
    const [seg, offset] = logicalAddress.split(",").map(Number);
    if (seg >= segmentTable.length) {
      setLogSteps([`Invalid segment: ${seg}`]);
      return;
    }
    if (offset >= segmentTable[seg].limit) {
      setLogSteps([`Offset ${offset} out of limit ${segmentTable[seg].limit}`]);
      return;
    }
    const physical = segmentTable[seg].base + offset;
    setLogSteps([`Translated (S=${seg}, O=${offset}) → Physical: ${physical}`]);
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={700}>Segmentation Simulation</Typography>
      <Box mt={2} display="flex" gap={2}>
        <Box flex={1}>
          <Typography variant="subtitle2">Logical Address (S,O)</Typography>
          <Input fullWidth value={logicalAddress} onChange={(e) => setLogicalAddress(e.target.value)} placeholder="0,50" />
        </Box>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle2">Segment Table (Base, Limit)</Typography>
        {segmentTable.map((s, idx) => (
          <Typography key={idx}>Segment {idx}: Base={s.base}, Limit={s.limit}</Typography>
        ))}
      </Box>

      <Box mt={2}>
        <Button onClick={runSimulation} variant="contained" startIcon={<FaPlay />}>Run</Button>
        <Button onClick={() => setLogSteps([])} variant="outlined" sx={{ ml: 2 }}>Reset</Button>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" fontWeight={700}>Log & Steps</Typography>
      {logSteps.map((l, i) => (
        <Typography key={i} variant="body2">{l}</Typography>
      ))}
    </Box>
  );
};

export default SegmentationUI;
