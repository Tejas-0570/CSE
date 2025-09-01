import { useState } from 'react';
import { Box, Typography, Button, Input } from '@mui/material'
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { IoInformationCircleSharp } from "react-icons/io5";
import PracticeProblem from '../../components/PracticeProblem';
import { FaPlay, FaSearch, FaUndo } from "react-icons/fa";  // added undo icon
import { RiLoopLeftFill } from "react-icons/ri";

const DSALinkedList = () => {
    const [nodes, setNodes] = useState([]);       // linked list values
    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState(null); // store searched node

    // Insert node at head
    const handleInsertHead = () => {
        if (inputValue.trim() === "") return;
        setNodes([inputValue, ...nodes]);
        setInputValue("");
        setSearchValue(null);
    };

    // Insert node at tail
    const handleInsertTail = () => {
        if (inputValue.trim() === "") return;
        setNodes([...nodes, inputValue]);
        setInputValue("");
        setSearchValue(null);
    };

    // Delete a node by value
    const handleDeleteNode = () => {
        if (inputValue.trim() === "") return;
        const index = nodes.indexOf(inputValue);
        if (index === -1) {
            alert("Node not found!");
            return;
        }
        const newNodes = [...nodes];
        newNodes.splice(index, 1);
        setNodes(newNodes);
        setInputValue("");
        setSearchValue(null);
    };

    // Search a node
    const handleSearchNode = () => {
        if (inputValue.trim() === "") return;
        if (nodes.includes(inputValue)) {
            setSearchValue(inputValue);
        } else {
            alert("Node not found!");
            setSearchValue(null);
        }
        setInputValue("");
    };

    // Reset linked list
    const handleReset = () => {
        setNodes([]);
        setInputValue("");
        setSearchValue(null);
    };

    return (
        <>
            <Box display={'flex'} justifyContent={'center'} width={'100%'} gap={2}>
                <Box width={'950px '} gap={2} display={'flex'} flexDirection={'column'}>

                    {/* Theory Section */}
                    <Box
                        sx={{
                            backgroundColor: "#ffffff",
                            padding: 3,
                            mb: 3,
                            borderRadius: 2,
                            boxShadow: 1,
                            height: "400px",
                            overflowY: "auto",
                            '&::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none',
                        }}
                    >
                        <Typography variant='h5' fontWeight={600} color='text.primary'>Linked List</Typography>
                        <Typography variant='body1' color='text.secondary'>
                            <p>A Linked List is a way to store a collection of data where each item (called a node) is connected to the next one in a chain-like structure.</p>
                        </Typography>
                        <Typography variant='body1' color='text.secondary'>
                            <p> Each node has two parts:</p>
                        </Typography>
                        <Typography variant='body1' color='text.secondary'>
                            <ul>
                                <li><strong>Data</strong> – The actual value or information.</li>
                                <li><strong>Pointer</strong> – A link to the next node in the list.</li>
                            </ul>
                        </Typography>
                    </Box>

                    {/* Interactive Section */}
                    <Box
                        sx={{
                            backgroundColor: "#ffffff",
                            padding: 3,
                            mb: 3,
                            borderRadius: 2,
                            boxShadow: 1,
                            height: "430px",
                            overflowY: 'auto',
                            '&::webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none'
                        }}
                    >
                        <Typography variant='h5' color='text.primary' fontWeight={600} display={'flex'} alignItems={'center'} gap={2}>
                            <FaPlay size={20} style={{ color: 'blue' }} /> Interactive Visualizer
                        </Typography>
                        <hr />

                        {/* Controls */}
                        <Box display={"flex"} justifyContent={"center"} flexWrap="wrap" gap={2} mt={3}>
                            <Input
                                placeholder="Enter Node"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disableUnderline
                                sx={{
                                    width: '140px',
                                    border: '1px solid gray',
                                    borderRadius: '10px',
                                    padding: '0 0 0 10px',
                                    fontSize: '16px',
                                    transition: 'border 0.1s ease',
                                    '&:focus-within': { border: '2px solid black' }
                                }}
                            />
                            <Button variant='contained' onClick={handleInsertHead} sx={{ backgroundColor: '#2563eb', "&:hover": { backgroundColor: '#1d4ed8' } }}>
                                <IoMdAdd style={{ marginRight: '5px' }} /> Insert Head
                            </Button>
                            <Button variant='contained' onClick={handleInsertTail} sx={{ backgroundColor: '#22c55e', "&:hover": { backgroundColor: '#07B00A' } }}>
                                <IoMdAdd style={{ marginRight: '5px' }} /> Insert Tail
                            </Button>
                            <Button variant='contained' onClick={handleDeleteNode} sx={{ backgroundColor: '#FF3333', "&:hover": { backgroundColor: '#C00000' } }}>
                                <MdDelete style={{ marginRight: '5px' }} /> Delete Node
                            </Button>
                            <Button variant='contained' onClick={handleSearchNode} sx={{ backgroundColor: '#f59e0b', "&:hover": { backgroundColor: '#d97706' } }}>
                                <FaSearch style={{ marginRight: '5px' }} /> Search
                            </Button>
                           
                            <Button
                                variant='contained'
                                onClick={handleReset}
                                sx={{
                                    textTransform: "none",
                                    padding: 2.3,
                                    height: '15px',
                                    backgroundColor: '#6b7280',
                                    color: '#ffffff',
                                    border: '2px solid #666a73',
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: '#666a73', // Darker blue on hover
                                        borderColor: '#666a73'
                                    }

                                }}

                            > <RiLoopLeftFill style={{ marginRight: '7px', fontSize: '20px' }} /> Reset
                            </Button>
                        </Box>

                        {/* Visualization */}
                        <Box
                            margin={2}
                            backgroundColor='#F3F3F3'
                            height={"290px"}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            p={2}
                            sx={{
                                overflowX: "auto",   // horizontal scroll
                                overflowY: "hidden",
                                maxWidth: "100%",    // prevent page from stretching
                                borderRadius: 2,
                                '&::-webkit-scrollbar': { height: '8px' },
                                '&::-webkit-scrollbar-thumb': { background: '#bbb', borderRadius: '4px' }
                            }}
                        >
                            {nodes.length === 0 ? (
                                <Typography variant='body1' color='text.secondary' display={'flex'} alignItems={'center'}>
                                    <IoInformationCircleSharp style={{ color: 'gray', marginRight: 5 }} /> Add nodes to visualize the linked list
                                </Typography>
                            ) : (
                                <Box display="flex" alignItems="center" gap={2} sx={{ width: "max-content", flexShrink: 0 }}>
                                    {nodes.map((node, index) => (
                                        <Box key={index} display="flex" alignItems="center" gap={2}>
                                            <Box
                                                sx={{
                                                    backgroundColor: searchValue === node ? "#fde68a" : "#fff",
                                                    border: "2px solid #2563eb",
                                                    borderRadius: "8px",
                                                    padding: "10px 20px",
                                                    minWidth: "60px",
                                                    textAlign: "center",
                                                    fontWeight: 600,
                                                    boxShadow: 1
                                                }}
                                            >
                                                {node}
                                            </Box>
                                            {index < nodes.length - 1 && <FaArrowRight size={24} color="#2563eb" />}
                                        </Box>
                                    ))}
                                    <Typography color="gray" fontSize="14px">(NULL)</Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    <PracticeProblem />
                </Box>

                {/* Complexity Analysis */}
                <Box height={'600px'} width={'20%'} borderRadius={2} bgcolor={'#ffffff'} p={1.5}>
                    <Typography variant="h6" fontWeight={600}>Complexity Analysis</Typography>
                    <Box bgcolor={'#ebf4ff'} p={1.5} m={1} borderRadius={2} mb={2}>
                        <Typography color="#438af7" fontWeight={600}>Time Complexity</Typography>
                        <Box mt={1}>
                            <Typography variant="body1">Insertion (Head) : O(1)</Typography>
                            <Typography variant="body1">Insertion (Tail) : O(n)</Typography>
                            <Typography variant="body1">Deletion: O(n)</Typography>
                            <Typography variant="body1">Search: O(n)</Typography>
                        </Box>
                    </Box>
                    <Box bgcolor={'#f0fdf4'} p={1.5} m={1} borderRadius={2}>
                        <Typography color="#1c8972" fontWeight={600} mb={1.5}>Space Complexity</Typography>
                        <Typography>Storage: O(n)</Typography>
                        <Typography>Auxiliary Space: O(1)</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default DSALinkedList;
