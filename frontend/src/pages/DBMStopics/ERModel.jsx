import React, { useState, useRef } from 'react';
import {
    Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { FaCube, FaLink, FaDownload } from 'react-icons/fa6';
import { FaSave } from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import html2canvas from 'html2canvas';


import {
    DndContext,
    useDraggable,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

const DraggableEntity = ({ id, name, x, y, onClick, selected }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const style = {
        transform: `translate(${x + (transform?.x || 0)}px, ${y + (transform?.y || 0)}px)`,
        border: selected ? '2px solid yellow' : 'none',
    };

    return (
        <Box
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onMouseDownCapture={() => onClick(id)}
            sx={{
                position: 'absolute',
                p: 2,
                bgcolor: '#2563eb',
                color: 'white',
                borderRadius: 2,
                boxShadow: 2,
                cursor: 'pointer',
                minWidth: 100,
                textAlign: 'center',
                userSelect: 'none',
                ...style,
            }}
        >
            <Typography variant="subtitle1" fontWeight={600}>{name}</Typography>
            <Typography variant="caption">Entity</Typography>
        </Box>
    );
};

const DraggableAttribute = ({ id, name, x, y }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const style = {
        transform: `translate(${x + (transform?.x || 0)}px, ${y + (transform?.y || 0)}px)`
    };

    return (
        <Box
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            sx={{
                position: 'absolute',
                width: 80,
                height: 40,
                borderRadius: '50%',
                border: '2px solid #2563eb',
                backgroundColor: '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 'bold',
                color: '#2563eb',
                userSelect: 'none',
                cursor: 'move',
                ...style
            }}
        >
            {name}
        </Box>
    );
};

const ERModel = () => {
    const [entities, setEntities] = useState([]);
    const [relationships, setRelationships] = useState([]);
    const [selectedEntities, setSelectedEntities] = useState([]);
    const canvasRef = useRef(null);
    const [selectingRelationship, setSelectingRelationship] = useState(false);
    const [transforms, setTransforms] = useState({});
    const [addingAttribute, setAddingAttribute] = useState(false);
    const [attributes, setAttributes] = useState([]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleAddEntity = () => {
        const name = prompt("Enter entity name:");
        if (!name) return;
        const id = Date.now().toString();
        setEntities([...entities, { id, name, x: 50, y: 50 }]);
    };

    const handleClear = () => {
        setEntities([]);
        setRelationships([]);
        setSelectedEntities([]);
        setAttributes([]);
    };

    const handleAddRelationship = () => {
        setSelectedEntities([]);
        setSelectingRelationship(true);
    };

    const handleAddAttribute = () => {
        setAddingAttribute(true);
    };

    const handleEntityClick = (id) => {
        if (selectingRelationship) {
            if (selectedEntities.includes(id)) return;
            const updated = [...selectedEntities, id];
            if (updated.length === 2) {
                const label = prompt("Enter relationship label:", "Relation");
                if (!label) {
                    setSelectedEntities([]);
                    setSelectingRelationship(false);
                    return;
                }
                setRelationships([...relationships, { from: updated[0], to: updated[1], label }]);
                setSelectedEntities([]);
                setSelectingRelationship(false);
            }
            else {
                setSelectedEntities(updated);
            }
            return;
        }

        if (addingAttribute) {
            const attrName = prompt("Enter attribute name:");
            if (!attrName) return;
            const attrId = Date.now().toString();
            setAttributes(prev => [...prev, { id: attrId, name: attrName, entityId: id, x: 100, y: 100 }]);
            setAddingAttribute(false);
        }
    };

    const handleDragMove = (event) => {
        const { active, delta } = event;
        setTransforms(prev => ({
            ...prev,
            [active.id]: delta
        }));
    };

    const handleDragEnd = (event) => {
        const { active, delta } = event;
        setTransforms(prev => {
            const copy = { ...prev };
            delete copy[active.id];
            return copy;
        });

        if (!canvasRef.current) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();

        const entity = entities.find((e) => e.id === active.id);
        if (entity) {
            const newX = entity.x + delta.x;
            const newY = entity.y + delta.y;
            const boxWidth = 120;
            const boxHeight = 60;
            const maxX = canvasRect.width - boxWidth;
            const maxY = canvasRect.height - boxHeight;
            const clampedX = Math.max(0, Math.min(newX, maxX));
            const clampedY = Math.max(0, Math.min(newY, maxY));
            setEntities((prev) => prev.map((e) => e.id === active.id ? { ...e, x: clampedX, y: clampedY } : e));
            return;
        }

        const attr = attributes.find((a) => a.id === active.id);
        if (attr) {
            const newX = attr.x + delta.x;
            const newY = attr.y + delta.y;
            const attrWidth = 80;
            const attrHeight = 40;
            const maxX = canvasRect.width - attrWidth;
            const maxY = canvasRect.height - attrHeight;
            const clampedX = Math.max(0, Math.min(newX, maxX));
            const clampedY = Math.max(0, Math.min(newY, maxY));
            setAttributes((prev) =>
                prev.map((a) => a.id === active.id ? { ...a, x: clampedX, y: clampedY } : a)
            );
        }
    };

    const handleSaveModel = () => {
        if (entities.length === 0 && relationships.length === 0 && attributes.length === 0) {
            alert("Nothing to save. Add entities or relationships first.");
            return;
        }
        const data = {
            entities,
            relationships,
            attributes
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'er_model.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleExportImage = () => {
        if (entities.length === 0 && relationships.length === 0 && attributes.length === 0) {
            alert("Nothing to export. Add entities or relationships first.");
            return;
        }

        const captureElement = document.getElementById('capture');
        html2canvas(captureElement, {
            backgroundColor: null, // preserves transparent background
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'er_diagram.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    };



    const fileInputRef = useRef(null);

    const handleLoadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.entities && data.relationships && data.attributes) {
                    setEntities(data.entities);
                    setRelationships(data.relationships);
                    setAttributes(data.attributes);
                    setSelectedEntities([]);
                } else {
                    alert("Invalid model file.");
                }
            } catch (error) {
                alert("Error parsing file.");
                console.error(error);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };



    return (
        <>
            <Box bgcolor={'#f0f8ff'} width={'100%'} mb={2}>
                <Accordion sx={{ borderRadius: 2, boxShadow: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography fontWeight={'bold'}>Theory & Examples</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6" mb={1}>Binary Search Tree</Typography>
                        <Typography mb={2}>
                            BST repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box width={'97.5%'} mb={2} height={'130vh'} bgcolor={'#ffffff'} borderRadius={2} boxShadow={1} p={2}>
                <Typography variant="h6" mb={2} fontWeight={600}>ER Diagram Builder</Typography>

                {/* Controls */}
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mr={2} p={2} width={'20%'}>
                        <Typography variant='body1'>Add Components</Typography>
                        <Button onClick={handleAddEntity} sx={{ bgcolor: '#2563eb', color: 'white', mt: 1, p: 1, width: '100%' }}>
                            <FaCube size={15} style={{ marginRight: 10 }} /> Add Entity
                        </Button>
                        <Button onClick={handleAddRelationship} sx={{ bgcolor: '#9333ea', color: 'white', mt: 1, p: 1, width: '100%' }}>
                            <FaLink size={15} style={{ marginRight: 10 }} /> Add Relationship
                        </Button>
                        <Button onClick={handleAddAttribute} sx={{ bgcolor: '#0ea5e9', color: 'white', mt: 1, p: 1, width: '100%' }}>
                            ➕ Add Attribute
                        </Button>

                    </Box>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} p={2} width={'20%'}>
                        <Typography variant='body1'>Actions</Typography>
                        <Button onClick={handleSaveModel} sx={{ bgcolor: '#16a34a', color: 'white', mt: 1, p: 1, width: '100%' }}>
                            <FaSave size={15} style={{ marginRight: 10 }} /> Save Model
                        </Button>
                        <Button onClick={handleExportImage} sx={{ bgcolor: '#4f46e5', color: 'white', mt: 1, p: 1, width: '100%' }}>
                            <FaDownload size={15} style={{ marginRight: 10 }} /> Export Image
                        </Button>
                    </Box>


                </Box>

                {/* Canvas Buttons */}
                <Box display={'flex'} justifyContent={'center'} mt={2} gap={2}>
                    <Button onClick={handleLoadClick} sx={{ bgcolor: '#2563eb', color: 'white', p: 1, width: '200px' }}>
                        <FaCube size={15} style={{ marginRight: 10 }} /> Load Sample
                    </Button>
                    <Button onClick={handleClear} sx={{ bgcolor: '#4b5563', color: 'white', p: 1, width: '200px' }}>
                        <DeleteIcon sx={{ fontSize: 18, mr: 1 }} /> Clear
                    </Button>
                </Box>
                <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                {/* Diagram Canvas */}
                
                    <Box
                        ref={canvasRef}
                        id="capture"
                        mt={4}
                        mx={'auto'}
                        height={'600px'}
                        width={'80%'}
                        bgcolor={'#f3f4f6'}
                        border={'2px dashed #cbd5e1'}
                        borderRadius={2}
                        position={'relative'}
                        sx={{ overflow: 'hidden' }}
                    >
                        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                            {relationships.map((rel, idx) => {
                                const from = entities.find(e => e.id === rel.from);
                                const to = entities.find(e => e.id === rel.to);
                                if (!from || !to) return null;

                                const fromTransform = transforms[rel.from] || { x: 0, y: 0 };
                                const toTransform = transforms[rel.to] || { x: 0, y: 0 };

                                const fromX = from.x + fromTransform.x + 60;
                                const fromY = from.y + fromTransform.y + 30;
                                const toX = to.x + toTransform.x + 60;
                                const toY = to.y + toTransform.y + 30;

                                const midX = (fromX + toX) / 2;
                                const midY = (fromY + toY) / 2;

                                const diamondSize = 30;

                                return (
                                    <g key={idx}>
                                        {/* Connection Line */}
                                        <line
                                            x1={fromX}
                                            y1={fromY}
                                            x2={toX}
                                            y2={toY}
                                            stroke="black"
                                            strokeWidth={1.5}
                                        />

                                        {/* Diamond */}
                                        <polygon
                                            points={`
                        ${midX},${midY - diamondSize}
                        ${midX + diamondSize},${midY}
                        ${midX},${midY + diamondSize}
                        ${midX - diamondSize},${midY}
                    `}
                                            fill="#facc15"
                                            stroke="black"
                                            strokeWidth={1.5}
                                        />

                                        {/* Label */}
                                        <text
                                            x={midX}
                                            y={midY + 5}
                                            textAnchor="middle"
                                            fontSize="12"
                                            fill="black"
                                            fontWeight="bold"
                                        >
                                            {rel.label}
                                        </text>
                                    </g>
                                );
                            })}
                            {attributes.map(attr => {
                                const entity = entities.find(e => e.id === attr.entityId);
                                if (!entity) return null;

                                const entityTransform = transforms[entity.id] || { x: 0, y: 0 };
                                const attrTransform = transforms[attr.id] || { x: 0, y: 0 };

                                const x1 = entity.x + entityTransform.x + 60;
                                const y1 = entity.y + entityTransform.y + 30;
                                const x2 = attr.x + attrTransform.x + 40;
                                const y2 = attr.y + attrTransform.y + 20;

                                return (
                                    <line
                                        key={attr.id}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke="gray"
                                        strokeWidth={1.5}
                                    />
                                );
                            })}
                        </svg>



                        <DndContext sensors={sensors} onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
                            {entities.map(entity => (
                                <DraggableEntity key={entity.id} {...entity} onClick={handleEntityClick} selected={selectedEntities.includes(entity.id)} />
                            ))}
                            {attributes.map(attr => (
                                <DraggableAttribute key={attr.id} {...attr} />
                            ))}
                        </DndContext>

                        {entities.length === 0 && (
                            <Typography color="gray" mt={25} textAlign="center">
                                Click "Add Entity" to start building your ER diagram
                            </Typography>
                        )}
                    </Box>
                
            </Box>
        </>
    );
};

export default ERModel;
