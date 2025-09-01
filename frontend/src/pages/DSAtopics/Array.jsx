// pages/dsa/Array.jsx
import { Box, Button, Typography } from '@mui/material';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FaPlay } from "react-icons/fa";
import { RiLoopLeftFill } from "react-icons/ri";
import React, { useState, useEffect, useRef } from 'react';
import PracticeProblem from '../../components/PracticeProblem';


const DSAArray = () => {
  const [array] = useState([5, 2, 8, 1, 9]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);


  //Traversal Logic
  // 1. Array traversal interval
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          if (prevIndex < array.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return prevIndex; // Don't increment beyond last index
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, array]);

  // 2. Step log on index change
  useEffect(() => {
    if (isPlaying && currentIndex < array.length) {
      setSteps(prev => [
        ...prev,
        `Accessing element at index ${currentIndex}. value is ${array[currentIndex]}.`
      ]);
    }
  }, [currentIndex, isPlaying]);




  const handlePlay = () => {
    if (!isPlaying) {
      setSteps([]);         // Clear steps first
      setCurrentIndex(0);   // Start from index 0
      setIsPlaying(true);   // Start traversal
    }
  };



  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    setCurrentIndex(0);
    setSteps([]);
  }
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: 3,
          mb: 3,
          borderRadius: 2,
          boxShadow: 1,
          height: "400px",
          overflowY: "auto",

          // Custom scrollbar hiding
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none', // Firefox
        }}
      >
        <Typography
          variant='h5'
          fontWeight={600}
          color='text.primary'
        >
          Array
        </Typography>
        <Typography variant='body1' color='text.secondary'><h3>What is an Array?</h3></Typography>
        <Typography variant='body1' color='text.secondary'>
          An array is a data structure that stores a fixed-size sequential collection of elements of the same type. It is one of the simplest and most commonly used data structures in programming.
        </Typography>
        <Typography variant='body1' color='text.secondary'><h3>Characteristics of Arrays</h3></Typography>

        <Typography variant='body1' color='text.secondary'>
          <ul>
            <li>Fixed Size: The size of an array is defined at the time of its creation and cannot be changed.</li>
            <li>Homogeneous Elements: All elements in an array are of the same data type.</li>
            <li>Contiguous Memory Allocation: Elements are stored in contiguous memory locations, allowing for efficient access.</li>
            <li>Random Access: Elements can be accessed directly using their index, which makes retrieval fast.</li>
            <li>Zero-based Indexing: In most programming languages, array indexing starts from 0.</li>
          </ul>
        </Typography>
        <Typography variant='body1' color='text.secondary'><h3>Common Operations on Arrays</h3></Typography>
        <Typography variant='body1' color='text.secondary'>
          <ul>
            <li>Insertion: Adding an element at a specific index.</li>
            <li>Deletion: Removing an element from a specific index.</li>
            <li>Traversal: Accessing each element in the array sequentially.</li>
            <li>Searching: Finding the index of a specific element.</li>
            <li>Sorting: Arranging elements in a specific order (ascending or descending).</li>
          </ul>
        </Typography>
        <Typography variant='body1' color='text.secondary'><h3>Time Complexity</h3></Typography>
        <Typography variant='body1' color='text.secondary' ml={3}>
          Access:    O(1) <br />
          Search:    O(n) <br />
          Insertion: O(n) <br />
          Deletion:  O(n)
        </Typography>
        <Typography variant='body1' color='text.secondary'><h3>Example</h3></Typography>
        <Box
          sx={{
            backgroundColor: "#111827",
            borderRadius: 2,
            overflowX: "auto",
          }}
        >
          <SyntaxHighlighter language='cpp' style={atomOneDark} customStyle={{ background: "transparent", fontSize: "20px" }}>
            {`
          int arr[] = {5, 2, 8, 4, 1};
          int n = 5;

          // Access Element
          int element = arr[2] // return 8
          `}
          </SyntaxHighlighter>

        </Box>
      </Box>





      <Box
        backgroundColor="#ffffff"
        padding={3}
        mb={3}
        borderRadius={2}
        boxShadow={1}
        height={"350px"}
        maxWidth={"1210px"}
        display={"flex"}
        flexDirection={"column"}
        alignContent={"center"}
      >
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography variant='h5' color='text.primary' fontWeight={600} display={'flex'} alignItems={'center'} gap={2}><FaPlay size={20} style={{ color: 'blue' }} /> Interactive Visualizer</Typography>

          <Box>
            <Button
              variant='contained'
              onClick={handlePlay}
              sx={{
                padding: 2.3,
                mr: '10px',
                height: '15px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: '2px solid #2563eb',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#1d4ed8', // Darker blue on hover
                  borderColor: '#1d4ed8'
                }

              }}

            >
              <FaPlay style={{ marginRight: '7px' }} /> Play
            </Button>
            <Button
              variant='contained'
              onClick={handleReset}
              sx={{
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

            > <RiLoopLeftFill style={{ marginRight: '7px', fontSize: '20px' }} /> Reset</Button>
          </Box>
        </Box>


        <Box display={"flex"} justifyContent={"center"} gap={1}>
          {array.map((value, index) => (
            <Box
              key={index}
              height={"40px"}
              width={"40px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={2}
              fontSize={"20px"}
              fontWeight={"bold"}
              padding={2}
              sx={{
                backgroundColor: index === currentIndex ? '#2563eb' : '#e5e7eb',
                color: index === currentIndex ? '#ffffff' : '#000000'
              }}
            >
              {value}
            </Box>
          ))}

        </Box>



        <Box display={"flex"} justifyContent={"center"} mt={4} gap={2}>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={'center'}>
            <Typography variant='body1' color='text.secondary'>Current Index</Typography>
            <Typography variant='h5' color='#2563eb' fontWeight={600}>{currentIndex}</Typography>
          </Box>
          <Box>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={'center'}>
              <Typography variant='body1' color='text.secondary'>Cureent Value</Typography>
              <Typography variant='h5' color='#2563eb' fontWeight={600}>{array[currentIndex]}</Typography>
            </Box>
          </Box>
        </Box>


        <Box
          sx={{
            backgroundColor: "#ebf4ff",
            borderRadius: 2,
            border: "1px solid #cfddfa",
            minHeight: "50px",
            padding: "20px",
            overflowY: 'auto',
            mt: 2,
          }}
        >
          {steps.map((step, idx) => (
            <Typography key={idx}>
              <span style={{ color: "#2563eb" }}>Step {idx + 1}:</span> {step}
            </Typography>

          ))}


        </Box>
      </Box>

      <PracticeProblem />

    </>
  );

};

export default DSAArray;
