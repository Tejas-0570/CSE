import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

// Reusable wrapper for problem sections
const ProblemCard = ({ title, children }) => (
  <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </CardContent>
  </Card>
);

const Synchronization = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
        Synchronization Problems
      </Typography>

      {/* Tabs for switching problems */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        centered
        sx={{ mb: 3 }}
      >
        <Tab label="Dining Philosophers" />
        <Tab label="Producer-Consumer" />
        <Tab label="Reader-Writer" />
      </Tabs>

      {/* Show content based on tab */}
      {tab === 0 && <DiningPhilosophers />}
      {tab === 1 && <ProducerConsumer />}
      {tab === 2 && <ReaderWriter />}
    </Box>
  );
};

/* ---------------- Dining Philosophers ---------------- */
const DiningPhilosophers = () => {
  const [states, setStates] = useState(
    Array(5).fill("thinking")
  );

  const toggleEat = (i) => {
    setStates((prev) =>
      prev.map((s, idx) =>
        idx === i ? (s === "thinking" ? "eating" : "thinking") : s
      )
    );
  };

  return (
    <ProblemCard title="Dining Philosophers Problem">
      <Box
        sx={{
          position: "relative",
          width: 320,
          height: 320,
          margin: "0 auto",
        }}
      >
        {states.map((state, i) => {
          const angle = (i / 5) * 2 * Math.PI;
          const x = 110 * Math.cos(angle);
          const y = 110 * Math.sin(angle);

          return (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px - 40px)`,
                top: `calc(50% + ${y}px - 40px)`,
                width: 80,
                height: 80,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor:
                  state === "thinking" ? "#FFD54F" : "#66BB6A",
                color: "#000",
                fontWeight: "bold",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleEat(i)}
            >
              P{i + 1}
            </motion.div>
          );
        })}
      </Box>
      <Typography align="center" sx={{ mt: 2 }}>
        Click a philosopher to toggle between <b>Thinking</b> and <b>Eating</b>.
      </Typography>
    </ProblemCard>
  );
};

/* ---------------- Producer Consumer ---------------- */
const ProducerConsumer = () => {
  const [buffer, setBuffer] = useState([]);
  const capacity = 5;

  const produce = () => {
    if (buffer.length < capacity) {
      setBuffer([...buffer, `Item${buffer.length + 1}`]);
    }
  };

  const consume = () => {
    if (buffer.length > 0) {
      setBuffer(buffer.slice(1));
    }
  };

  return (
    <ProblemCard title="Producer-Consumer Problem">
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={produce}
          sx={{ mr: 2 }}
        >
          Produce
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={consume}
        >
          Consume
        </Button>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {[...Array(capacity)].map((_, i) => (
          <Grid item key={i}>
            <Paper
              elevation={3}
              sx={{
                width: 70,
                height: 70,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: buffer[i] ? "primary.main" : "grey.300",
                color: buffer[i] ? "white" : "text.secondary",
                fontWeight: "bold",
              }}
            >
              {buffer[i] || ""}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography align="center" sx={{ mt: 2 }}>
        Capacity: {capacity}. Producer adds items, Consumer removes them.
      </Typography>
    </ProblemCard>
  );
};

/* ---------------- Reader Writer ---------------- */
const ReaderWriter = () => {
  const [readers, setReaders] = useState(0);
  const [writing, setWriting] = useState(false);

  const addReader = () => {
    if (!writing) setReaders(readers + 1);
  };

  const removeReader = () => {
    if (readers > 0) setReaders(readers - 1);
  };

  const toggleWriter = () => {
    if (!writing && readers === 0) setWriting(true);
    else if (writing) setWriting(false);
  };

  return (
    <ProblemCard title="Reader-Writer Problem">
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={addReader}
          sx={{ mr: 1 }}
        >
          Add Reader
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={removeReader}
          sx={{ mr: 1 }}
        >
          Remove Reader
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleWriter}
        >
          {writing ? "Stop Writing" : "Start Writing"}
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          width: 300,
          height: 120,
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: writing ? "purple.100" : readers > 0 ? "green.100" : "grey.100",
        }}
      >
        {writing ? (
          <Typography variant="h6" color="secondary">
            Writer Writing...
          </Typography>
        ) : readers > 0 ? (
          <Typography variant="h6" color="success.main">
            {readers} Reader(s) Reading...
          </Typography>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No Readers/Writers
          </Typography>
        )}
      </Paper>

      <Typography align="center" sx={{ mt: 2 }}>
        Multiple readers can read simultaneously, but only one writer can write at a time.
      </Typography>
    </ProblemCard>
  );
};

export default Synchronization;
