import { useState } from "react";
import { Box, Typography, Button, Input } from "@mui/material";
import { FaArrowDown, FaArrowUp, FaPlay } from "react-icons/fa";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { RiLoopLeftFill } from "react-icons/ri";
import { IoInformationCircleSharp } from "react-icons/io5";
import PracticeProblem from "../../components/PracticeProblem";
import { motion, AnimatePresence } from "framer-motion";


const DSAStack = () => {
    const [stack, setStack] = useState([]);
    const [inputValue, setInputValue] = useState("");

    // Push operation
    const handlePush = () => {
        if (inputValue.trim() === "") return;
        setStack((prev) => [...prev, inputValue]);
        setInputValue("");
    };

    // Pop operation
    const handlePop = () => {
        if (stack.length === 0) return;
        setStack((prev) => prev.slice(0, -1));
    };

    // Reset operation
    const handleReset = () => {
        setStack([]);
    };


    return (
        <>
            <Box display={"flex"} justifyContent={"center"} width={"100%"} gap={2}>
                <Box width={"80%"} gap={2} display={"flex"} flexDirection={"column"}>
                    {/* -------- THEORY SECTION -------- */}
                    <Box
                        sx={{
                            backgroundColor: "#ffffff",
                            padding: 3,
                            mb: 3,
                            borderRadius: 2,
                            boxShadow: 1,
                            height: "430px",
                            overflowY: "auto",
                            "&::webkit-scrollbar": { display: "none" },
                            scrollbarWidth: "none",
                        }}
                    >
                        <Typography variant="h5" fontWeight={600} color="text.primary">
                            Stack
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <p>
                                A stack is a linear data structure that follows the LIFO (Last
                                In, First Out) principle. This means the last element added to
                                the stack is the first one to be removed.
                            </p>
                        </Typography>

                        <Box
                            sx={{
                                backgroundColor: "#e8f4fd",
                                height: "60%",
                                width: "100%",
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Box display={"flex"} justifyContent={"center"} gap={1.5}>
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                    gap={2}
                                >
                                    <Box
                                        p={2}
                                        bgcolor={"#2563eb"}
                                        color={"#ffffff"}
                                        borderRadius={2}
                                        height={"20px"}
                                        mt={4}
                                    >
                                        Push
                                    </Box>
                                    <FaArrowDown style={{ color: "#2563eb" }} />
                                </Box>

                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    justifyContent={"center"}
                                    gap={1.5}
                                    p={2}
                                    border={"2px solid #2563eb"}
                                    bgcolor={"#ffffff"}
                                    borderRadius={2}
                                >
                                    <Box
                                        display={"flex"}
                                        justifyContent={"center"}
                                        p={1}
                                        bgcolor={"pink"}
                                        borderRadius={1}
                                    >
                                        Top
                                    </Box>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"center"}
                                        p={1}
                                        bgcolor={"yellow"}
                                        borderRadius={1}
                                    >
                                        Middle
                                    </Box>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"center"}
                                        p={1}
                                        bgcolor={"lightgreen"}
                                        borderRadius={1}
                                    >
                                        Bottom
                                    </Box>
                                </Box>

                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                    gap={1.5}
                                    mt={10}
                                >
                                    <FaArrowUp style={{ color: "#FF3333" }} />
                                    <Box
                                        p={2}
                                        bgcolor={"#FF3333"}
                                        color={"#ffffff"}
                                        borderRadius={2}
                                        height={"20px"}
                                    >
                                        Pop
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Typography variant="body1" color="text.secondary">
                            <h3>Real-life Example of Stack</h3>
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Think of a stack of plates:
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <ul>
                                <li>You add plates one on top of the other.</li>
                                <li>You always remove the top plate first.</li>
                                <li>You can't take a plate from the middle or bottom.</li>
                            </ul>
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            <h3>Basic Operations of Stack</h3>
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <ul>
                                <li>
                                    <strong>Push(): </strong>Adds an element to the top of the
                                    stack
                                </li>
                                <li>
                                    <strong>Pop(): </strong>Removes and returns the top element
                                    from the stack
                                </li>
                                <li>
                                    <strong>Peek(): </strong>Returns the top element without
                                    removing it
                                </li>
                                <li>
                                    <strong>isEmpty(): </strong>Checks if the stack is empty
                                </li>
                                <li>
                                    <strong>size(): </strong>Returns the number of elements in the
                                    stack
                                </li>
                            </ul>
                        </Typography>

                        {/* --- Code Section 1 --- */}
                        <Typography variant="body1" color="text.secondary">
                            <h3>1. Stack using Array</h3>
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: "#111827",
                                height: "350px",
                                borderRadius: 2,
                                overflowX: "auto",
                                overflowY: "auto",
                                "&::webkit-scrollbar": { display: "none" },
                                scrollbarWidth: "none",
                            }}
                        >
                            <SyntaxHighlighter
                                language="cpp"
                                style={atomOneDark}
                                customStyle={{ background: "transparent", fontSize: "20px" }}
                            >{`
int stack[100]; // array-based stack
int top = -1;   // points to the top of the stack

void push(int x) {
    stack[++top] = x;
}

int pop() {
    return stack[top--];
}

int peek() {
    return stack[top];
}
              `}</SyntaxHighlighter>
                        </Box>

                        {/* --- Code Section 2 --- */}
                        <Typography variant="body1" color="text.secondary">
                            <h3>2. Stack using Linked List</h3>
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: "#111827",
                                height: "350px",
                                borderRadius: 2,
                                overflowX: "auto",
                                overflowY: "auto",
                                "&::webkit-scrollbar": { display: "none" },
                                scrollbarWidth: "none",
                            }}
                        >
                            <SyntaxHighlighter
                                language="cpp"
                                style={atomOneDark}
                                customStyle={{ background: "transparent", fontSize: "20px" }}
                            >{`
struct Node {
    int data;
    Node* next;
};

Node* top = NULL;

void push(int x) {
    Node* newNode = new Node();
    newNode->data = x;
    newNode->next = top;
    top = newNode;
}

int pop() {
    if (top == NULL) return -1;
    int val = top->data;
    top = top->next;
    return val;
}
              `}</SyntaxHighlighter>
                        </Box>
                    </Box>

                    {/* -------- INTERACTIVE SECTION -------- */}
                    <Box
                        sx={{
                            backgroundColor: "#ffffff",
                            padding: 3,
                            mb: 3,
                            borderRadius: 2,
                            boxShadow: 1,
                            minHeight: "430px",
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
                            Interactive Stack Simulation
                        </Typography>
                        <hr />

                        {/* Buttons */}
                        <Box display={"flex"} justifyContent={"center"} gap={2} mt={3}>
                            <Input
                                placeholder="Enter Value"
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disableUnderline
                                sx={{
                                    width: "110px",
                                    border: "1px solid gray",
                                    borderRadius: "10px",
                                    padding: "0 0 0 10px",
                                    fontSize: "16px",
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handlePush}
                                sx={{
                                    textTransform: "none",
                                    padding: 2.3,
                                    height: "15px",
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff",
                                    border: "2px solid #2563eb",
                                    borderRadius: 2,
                                }}
                            >
                                <IoMdAdd style={{ marginRight: "5px", fontSize: "20px" }} />
                                Push
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handlePop}
                                sx={{
                                    textTransform: "none",
                                    padding: 2.3,
                                    height: "15px",
                                    backgroundColor: "#FF3333",
                                    color: "#ffffff",
                                    border: "2px solid #FF3333",
                                    borderRadius: 2,
                                }}
                            >
                                <FaMinus style={{ marginRight: "5px", fontSize: "15px" }} />
                                Pop
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleReset}
                                sx={{
                                    textTransform: "none",
                                    padding: 2.3,
                                    height: "15px",
                                    backgroundColor: "#6b7280",
                                    color: "#ffffff",
                                    border: "2px solid #666a73",
                                    borderRadius: 2,
                                }}
                            >
                                <RiLoopLeftFill
                                    style={{ marginRight: "7px", fontSize: "20px" }}
                                />{" "}
                                Reset
                            </Button>
                        </Box>

                        {/* Visualization */}
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                            mt={3}
                            p={2}
                            minHeight={"400px"}
                        >
                            <Box
                                display="flex"
                                flexDirection="column-reverse"
                                alignItems="center"
                                justifyContent="flex-start"
                                gap={1.5}
                                minHeight={"400px"}
                                width={"200px"}
                                backgroundColor={"#f5f5f5"}
                                borderRadius={2}
                                border={"1px solid lightgray"}
                                p={2}
                                sx={{
                                    overflowY: "auto",
                                    "&::-webkit-scrollbar": { width: "6px" },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "#ccc",
                                        borderRadius: "3px",
                                    },
                                }}
                            >
                                <AnimatePresence>
                                    {stack.length === 0 ? (
                                        <Typography color="gray">Stack is empty</Typography>
                                    ) : (
                                        stack.map((item, index) => (
                                            <motion.div
                                                key={item + index}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -30 }}
                                                transition={{ duration: 0.4 }}
                                                style={{
                                                    width: "80%",
                                                }}
                                            >
                                                <Box
                                                    p={1.5}
                                                    bgcolor="#2563eb"
                                                    color="white"
                                                    textAlign="center"
                                                    borderRadius={1}
                                                    fontWeight={600}
                                                >
                                                    {item}
                                                </Box>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                            </Box>
                        </Box>

                        <Box display={"flex"} justifyContent={"center"}>
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
                                Add elements to see the stack in action
                            </Typography>
                        </Box>
                    </Box>

                    <PracticeProblem />
                </Box>

                {/* -------- SIDE BAR -------- */}
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
                    <Box bgcolor={"#ebf4ff"} p={1.5} m={1} borderRadius={2} mb={2}>
                        <Typography color="#438af7" fontWeight={600}>
                            Time Complexity
                        </Typography>
                        <Box mt={1}>
                            <Typography variant="body1" color="text.primary" mb={0.1}>
                                Push: O(1)
                            </Typography>
                            <Typography variant="body1" color="text.primary" mb={0.1}>
                                Pop: O(1)
                            </Typography>
                            <Typography variant="body1" color="text.primary" mb={0.1}>
                                Peek/Top: O(1)
                            </Typography>
                            <Typography variant="body1" color="text.primary" mb={0.1}>
                                Search: O(n)
                            </Typography>
                        </Box>
                    </Box>

                    <Box bgcolor={"#f0fdf4"} p={1.5} m={1} borderRadius={2}>
                        <Typography color="#1c8972" fontWeight={600} mb={1.5}>
                            Space Complexity
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            Storage: O(n)
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            Auxiliary Space: O(1)
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mt={1}
                            mb={0.1}
                        >
                            Note: Stack operations are very efficient with constant time
                            complexity for basic operations.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DSAStack;
