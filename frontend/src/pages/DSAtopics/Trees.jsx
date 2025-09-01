import { Box, Typography, Button, Input } from "@mui/material";
import { RiLoopLeftFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaMinus, FaRandom } from "react-icons/fa";
import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PracticeProblem from '../../components/PracticeProblem'

// Tree Node Class
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Insert into BST
const insertNode = (root, value) => {
    if (!root) return new TreeNode(value);
    if (value < root.value) root.left = insertNode(root.left, value);
    else if (value > root.value) root.right = insertNode(root.right, value);
    return root;
};

// Delete from BST
const deleteNode = (root, value) => {
    if (!root) return null;
    if (value < root.value) root.left = deleteNode(root.left, value);
    else if (value > root.value) root.right = deleteNode(root.right, value);
    else {
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        let minRight = root.right;
        while (minRight.left) minRight = minRight.left;
        root.value = minRight.value;
        root.right = deleteNode(root.right, minRight.value);
    }
    return root;
};

// Tree Height
const getHeight = (node) => {
    if (!node) return 0;
    return 1 + Math.max(getHeight(node.left), getHeight(node.right));
};

// Count Nodes
const countNodes = (node) => {
    if (!node) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
};

// Proper Tree Layout: returns nodes with coordinates + links
const getTreeLayout = (root, x = 500, y = 50, gap = 220) => {
    if (!root) return { nodes: [], links: [] };

    let thisNode = { id: root.value, value: root.value, x, y };
    let nodes = [thisNode];
    let links = [];

    if (root.left) {
        let leftLayout = getTreeLayout(root.left, x - gap, y + 100, gap / 1.5);
        nodes = [...nodes, ...leftLayout.nodes];
        links.push({ from: thisNode, to: leftLayout.nodes[0] });
        links = [...links, ...leftLayout.links];
    }

    if (root.right) {
        let rightLayout = getTreeLayout(root.right, x + gap, y + 100, gap / 1.5);
        nodes = [...nodes, ...rightLayout.nodes];
        links.push({ from: thisNode, to: rightLayout.nodes[0] });
        links = [...links, ...rightLayout.links];
    }

    return { nodes, links };
};

const DSATrees = () => {
    const [root, setRoot] = useState(null);
    const [input, setInput] = useState("");

    const handleInsert = () => {
        if (!input) return;
        setRoot((prev) => insertNode(prev, parseInt(input)));
        setInput("");
    };

    const handleDelete = () => {
        if (!input) return;
        setRoot((prev) => deleteNode(prev, parseInt(input)));
        setInput("");
    };

    const handleRandom = () => {
        let arr = Array.from({ length: 7 }, () =>
            Math.floor(Math.random() * 90) + 10
        );
        let newRoot = null;
        arr.forEach((val) => {
            newRoot = insertNode(newRoot, val);
        });
        setRoot(newRoot);
    };

    const handleReset = () => setRoot(null);

    const { nodes, links } = getTreeLayout(root);
    let nodeCount = countNodes(root);
    let height = getHeight(root);

    // calculate width dynamically (consider leftmost and rightmost nodes)
    let minX = nodes.length > 0 ? Math.min(...nodes.map(n => n.x)) : 0;
    let maxX = nodes.length > 0 ? Math.max(...nodes.map(n => n.x)) : 0;
    let svgWidth = nodes.length > 0 ? maxX - minX + 200 : "100%";

    return (
        <>
            <Box display="flex" justifyContent="center" width="100%" gap={2}>
                <Box width="80%" gap={2} display="flex" flexDirection="column">
                    <Box bgcolor="#ffffff" borderRadius={2} p={3}>
                        <Typography variant="h6" fontWeight={600}>
                            Interactive Tree Builder
                        </Typography>

                        {/* Controls */}
                        <Box display="flex" gap={2} mt={3}>
                            <Input
                                placeholder="Enter Value"
                                disableUnderline
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                sx={{
                                    width: "110px",
                                    border: "1px solid gray",
                                    borderRadius: "10px",
                                    padding: "0 0 0 10px",
                                    fontSize: "16px",
                                }}
                            />
                            <Button
                                onClick={handleInsert}
                                sx={{ bgcolor: "#3b82f6", color: "#fff", borderRadius: 2.5 }}
                            >
                                <IoMdAdd style={{ marginRight: 5 }} /> Insert
                            </Button>
                            <Button
                                onClick={handleDelete}
                                sx={{ bgcolor: "#ef4444", color: "#fff", borderRadius: 2.5 }}
                            >
                                <FaMinus style={{ marginRight: 5 }} /> Delete
                            </Button>
                            <Button
                                onClick={handleRandom}
                                sx={{ bgcolor: "#22c55e", color: "#fff", borderRadius: 2.5 }}
                            >
                                <FaRandom style={{ marginRight: 5 }} /> Random
                            </Button>
                            <Button
                                onClick={handleReset}
                                sx={{ bgcolor: "#6b7280", color: "#fff", borderRadius: 2.5 }}
                            >
                                <RiLoopLeftFill style={{ marginRight: 5 }} /> Reset
                            </Button>
                        </Box>

                        {/* Visualization */}
                        <Box
                            sx={{
                                maxHeight: "80vh", // fits within screen
                                minHeight: "300px",
                                width: "100%",
                                border: "2px solid #dedfe0",
                                borderRadius: 2,
                                mt: 3,
                                display: "block", // important (not flex)
                                overflowX: "auto", // horizontal scroll enabled
                                overflowY: "auto", // vertical scroll enabled
                                whiteSpace: "nowrap", // prevent wrapping
                            }}
                        >
                            <div style={{ display: "inline-block" }}>
                                <svg
                                    width={svgWidth}
                                    height={height * 120} // dynamic height
                                >
                                    {/* Links */}
                                    {links.map((link, idx) => (
                                        <line
                                            key={idx}
                                            x1={link.from.x - minX + 100}
                                            y1={link.from.y}
                                            x2={link.to.x - minX + 100}
                                            y2={link.to.y}
                                            stroke="black"
                                        />
                                    ))}

                                    {/* Nodes */}
                                    {nodes.map((node) => (
                                        <g key={node.id}>
                                            <circle
                                                cx={node.x - minX + 100}
                                                cy={node.y}
                                                r={20}
                                                fill="#3b82f6"
                                            />
                                            <text
                                                x={node.x - minX + 100}
                                                y={node.y + 5}
                                                textAnchor="middle"
                                                fill="white"
                                                fontWeight="bold"
                                            >
                                                {node.value}
                                            </text>
                                        </g>
                                    ))}
                                </svg>
                            </div>
                        </Box>


                        {/* Stats */}
                        <Box display="flex" justifyContent="center" mt={3} gap={3}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                height="75px"
                                width="30%"
                                bgcolor="#ebf4ff"
                                borderRadius={2}
                            >
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Typography color="text.secondary">Nodes</Typography>
                                    <Typography variant="h5" color="#2563eb">
                                        {nodeCount}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                height="75px"
                                width="30%"
                                bgcolor="#ebf4ff"
                                borderRadius={2}
                            >
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Typography color="text.secondary">Height</Typography>
                                    <Typography variant="h5" color="#2563eb">
                                        {height}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                height="75px"
                                width="30%"
                                bgcolor="#ebf4ff"
                                borderRadius={2}
                            >
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Typography color="text.secondary">Type</Typography>
                                    <Typography variant="h6" color="#2563eb">
                                        BST
                                    </Typography>
                                </Box>
                            </Box>
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

export default DSATrees;