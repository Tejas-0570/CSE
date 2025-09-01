import React, { useState } from "react";
import { Box, Typography, Button, Input, Paper } from "@mui/material";
import { FaArrowDownLong } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { RiLoopLeftFill } from "react-icons/ri";
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import PracticeProblem from "../../components/PracticeProblem";

const DSAQueue = () => {
  const [queue, setQueue] = useState([]);
  const [input, setInput] = useState("");

  const handleEnqueue = () => {
    if (input === "" || isNaN(input)) return;
    setQueue([...queue, Number(input)]);
    setInput("");
  };

  const handleDequeue = () => {
    if (queue.length === 0) return;
    setQueue(queue.slice(1));
  };

  const handleReset = () => {
    setQueue([]);
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} width={"100%"} gap={2}>
        <Box width={"80%"} gap={2} display={"flex"} flexDirection={"column"}>
          {/* Queue Theory Section */}
          <Box
            sx={{
              backgroundColor: "#ffffff",
              padding: 3,
              mb: 3,
              borderRadius: 2,
              boxShadow: 1,
              height: "400px",
              overflowY: "auto",
              "&::webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            <Typography variant="h5" fontWeight={600} color="text.primary">
              Queue
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              A Queue is a linear data structure that follows the FIFO
              (First-In-First-Out) principle. The element inserted first is the
              one removed first.
            </Typography>
          </Box>

          {/* Interactive Simulation Section */}
          <Box
            sx={{
              backgroundColor: "#ffffff",
              padding: 3,
              mb: 3,
              borderRadius: 2,
              boxShadow: 1,
              minHeight: "410px",
              overflowY: "auto",
              "&::webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight={600}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <FaPlay size={20} style={{ color: "blue" }} />
              Interactive Queue Simulation
            </Typography>
            <hr />

            {/* Input + Buttons */}
            <Box display={"flex"} justifyContent={"center"} gap={2} mt={3}>
              <Input
                type="number"
                placeholder="Enter number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disableUnderline
                sx={{
                  width: "110px",
                  border: "1px solid gray",
                  borderRadius: "10px",
                  padding: "0 0 0 10px",
                  fontSize: "16px",
                  "&:focus-within": {
                    border: "2px solid black",
                  },
                }}
              />

              <Button
                variant="contained"
                onClick={handleEnqueue}
                sx={{
                  textTransform: "none",
                  padding: 2.3,
                  height: "15px",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  border: "2px solid #2563eb",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#1d4ed8",
                    borderColor: "#1d4ed8",
                  },
                }}
              >
                <IoMdAdd style={{ marginRight: "5px", fontSize: "20px" }} />
                Enqueue
              </Button>

              <Button
                variant="contained"
                onClick={handleDequeue}
                disabled={queue.length === 0}
                sx={{
                  textTransform: "none",
                  padding: 2.3,
                  height: "15px",
                  backgroundColor: "#FF3333",
                  color: "#ffffff",
                  border: "2px solid #FF3333",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#C00000",
                    borderColor: "#C00000",
                  },
                }}
              >
                <FaMinus style={{ marginRight: "5px", fontSize: "15px" }} />
                Dequeue
              </Button>

              <Button
                variant="contained"
                onClick={handleReset}
                disabled={queue.length === 0}
                sx={{
                  textTransform: "none",
                  padding: 2.3,
                  height: "15px",
                  backgroundColor: "#6b7280",
                  color: "#ffffff",
                  border: "2px solid #666a73",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#666a73",
                    borderColor: "#666a73",
                  },
                }}
              >
                <RiLoopLeftFill
                  style={{ marginRight: "7px", fontSize: "20px" }}
                />
                Reset
              </Button>
            </Box>

            {/* Queue Visualization */}
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={3}
              p={2}
            >
              <Box
                display="flex"
                gap={2}
                minHeight={"100px"}
                width={"600px"}
                backgroundColor={"#f5f5f5"}
                borderRadius={2}
                border={"1px solid lightgray"}
                p={2}
                sx={{
                  overflowX: "auto",
                  overflowY: "hidden",
                  "&::-webkit-scrollbar": { height: "6px" },
                }}
              >
                <AnimatePresence initial={false}>
                  {queue.map((item, index) => (
                    <motion.div
                      key={item + "-" + index}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{ position: "relative" }}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          minWidth: "60px",
                          textAlign: "center",
                          backgroundColor: "#90caf9",
                          fontWeight: "bold",
                          p: 1,
                          position: "relative",
                        }}
                      >
                        {item}
                      </Paper>

                      {/* Front Pointer */}
                      {index === 0 && (
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          position="absolute"
                          top="-45px"
                          left="50%"
                          sx={{ transform: "translateX(-50%)" }}
                        >
                          <Typography color="green">Front</Typography>
                          <FaArrowDownLong color="green" />
                        </Box>
                      )}

                      {/* Rear Pointer */}
                      {index === queue.length - 1 && (
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          position="absolute"
                          bottom="-45px"
                          left="50%"
                          sx={{ transform: "translateX(-50%)" }}
                        >
                          <FaArrowDownLong
                            color="red"
                            style={{ transform: "rotate(180deg)" }}
                          />
                          <Typography color="red">Rear</Typography>
                        </Box>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Box>
            </Box>

            {/* Info */}
            <Box display={"flex"} justifyContent={"center"} mt={2}>
              <Typography
                bgcolor="#e0f4ff"
                color="#2563eb"
                fontWeight={540}
                borderRadius={2}
                p={1}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <IoInformationCircleSharp
                  size={23}
                  style={{ color: "#2563eb", marginRight: 5 }}
                />
                Add elements to see the queue in action
              </Typography>
            </Box>
          </Box>

          <PracticeProblem />
        </Box>

        {/* Complexity Section */}
        <Box
          height={"600px"}
          width={"20%"}
          borderRadius={2}
          bgcolor={"#ffffff"}
          p={1.5}
        >
          <Typography variant="h6" fontWeight={600}>
            Complexity Analysis
          </Typography>
          <Box bgcolor={"#ebf4ff"} p={1.5} m={1} mb={2} borderRadius={2}>
            <Typography color="#438af7" fontWeight={600}>
              Time Complexity
            </Typography>
            <Box mt={1}>
              <Typography variant="body1">Enqueue: O(1)</Typography>
              <Typography variant="body1">Dequeue: O(1)</Typography>
              <Typography variant="body1">Front/Rear: O(1)</Typography>
              <Typography variant="body1">Search: O(n)</Typography>
            </Box>
          </Box>
          <Box bgcolor={"#f0fdf4"} p={1.5} m={1} borderRadius={2}>
            <Typography color="#1c8972" fontWeight={600} mb={1.5}>
              Space Complexity
            </Typography>
            <Typography variant="body1">Storage: O(n)</Typography>
            <Typography variant="body1">Auxiliary Space: O(1)</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DSAQueue;
