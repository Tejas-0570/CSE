import React from "react";
import LabNavbar from "../components/LabNavbar";
import Sidebar from "../components/Sidebar";
import { FaAngleRight, FaLink, FaHashtag } from "react-icons/fa";
import { MdDataArray } from "react-icons/md";
import { FiAlignJustify } from "react-icons/fi";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { PiQueueDuotone } from "react-icons/pi";
import { PiSortAscendingDuotone, PiGraphBold } from "react-icons/pi";
import { TbBinaryTreeFilled, TbDatabaseSearch } from "react-icons/tb";
import { Box } from "@mui/material";




const DSALab = () => {
  return (
    <>

      <LabNavbar
        title="DSA Lab"
        breadcrumbs={[
          { label: 'Home', link: '/home' },
          { label: 'DSA Lab', link: '/dsa' },
          { label: 'Introduction' },
        ]}
      />

      <Box display={"flex"} flexGrow={1} bgcolor="#f8fafc" justifyContent="left">
        <Sidebar

          title={"DSA Topics"}
          items={[
            { label: 'Introduction', icon: <FiAlignJustify /> },
            { label: 'Arrays', icon: <MdDataArray /> },
            { label: 'Linked List', icon: <FaLink /> },
            { label: 'Stack', icon: <HiMiniSquare3Stack3D /> },
            { label: 'Queue', icon: <PiQueueDuotone /> },
            { label: 'Sorting', icon: <PiSortAscendingDuotone /> },
            { label: 'Trees', icon: <TbBinaryTreeFilled /> },
            { label: 'Graphs', icon: <PiGraphBold /> },
            { label: 'Searching', icon: <TbDatabaseSearch /> },
            { label: 'Hashing', icon: <FaHashtag /> },

          ]}

        />
        <Box display={"flex"} flexDirection={"column"} bgcolor={"#f0f7ff"} width={"100%"} >
          <Box
            width={"100%"}
            p={3}
            sx={{
              backgroundColor: "#f0f7ff",
              minHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#ffffff",
                padding: 3,
                borderRadius: 2,
                boxShadow: 1,
                height: "400px", // Fixed height
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                '&::-webkit-scrollbar': {
                  display: 'none', // Chrome, Safari, Edge
                },
              }}
            >
              <Box>
                <h2>Introduction to DSA</h2>
                <h5>What is DSA?</h5>
                <p>
                  Data Structures and Algorithms (DSA) are fundamental concepts in computer science that enable efficient data management and problem-solving. Data structures are ways to organize and store data, while algorithms are step-by-step procedures for performing tasks or solving problems.
                </p>
                <h5>Importance of DSA</h5>
                <p>
                  Understanding DSA is crucial for software development, as it helps in optimizing code performance, managing resources effectively, and solving complex problems efficiently. Mastery of DSA is often a key requirement in technical interviews and competitive programming.
                </p>
                <h5>Key Topics in DSA</h5>
                <ul>
                  <li>Arrays</li>
                  <li>Linked Lists</li>
                  <li>Stacks</li>
                  <li>Queues</li>
                  <li>Sorting Algorithms</li>
                  <li>Trees</li>
                  <li>Graphs</li>
                  <li>Searching Algorithms</li>
                  <li>Hashing Techniques</li>
                </ul>
              </Box>
            </Box>
          </Box>

          <Box
            width={"100%"}
            p={3}
            sx={{
              backgroundColor: "#f0f7ff",
              minHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#ffffff",
                padding: 3,
                borderRadius: 2,
                boxShadow: 1,
                height: "400px", // Fixed height
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                '&::-webkit-scrollbar': {
                  display: 'none', // Chrome, Safari, Edge
                },
              }}
            >
              <Box>
                <h2>Introduction to DSA</h2>
                <h5>What is DSA?</h5>
                <p>
                  Data Structures and Algorithms (DSA) are fundamental concepts in computer science that enable efficient data management and problem-solving. Data structures are ways to organize and store data, while algorithms are step-by-step procedures for performing tasks or solving problems.
                </p>
                <h5>Importance of DSA</h5>
                <p>
                  Understanding DSA is crucial for software development, as it helps in optimizing code performance, managing resources effectively, and solving complex problems efficiently. Mastery of DSA is often a key requirement in technical interviews and competitive programming.
                </p>
                <h5>Key Topics in DSA</h5>
                <ul>
                  <li>Arrays</li>
                  <li>Linked Lists</li>
                  <li>Stacks</li>
                  <li>Queues</li>
                  <li>Sorting Algorithms</li>
                  <li>Trees</li>
                  <li>Graphs</li>
                  <li>Searching Algorithms</li>
                  <li>Hashing Techniques</li>
                </ul>
              </Box>
            </Box>
          </Box>
        </Box>



      </Box>
    </>
  );
}

export default DSALab;