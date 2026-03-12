import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import {
    Box, Typography, Paper, Container, Card,
    Grid, Chip, Button, IconButton, Collapse, Avatar
} from '@mui/material';
import NoteIcon from '@mui/icons-material/Note';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/Subject';
import axios from 'axios';

// Animation keyframes
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
`;

const AdminNotes = () => {
    const { currentUser } = useSelector((state) => state.user);
    
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [expandedClasses, setExpandedClasses] = useState({});

    const schoolId = currentUser?._id;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (schoolId) {
            fetchNotes();
        }
    }, [schoolId]);

    const fetchNotes = async () => {
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Notes/School/${schoolId}`);
            
            if (result.data && result.data.message) {
                setNotes([]);
                setMessage({ type: 'info', text: 'No notes have been uploaded by teachers yet' });
            } else if (result.data && result.data.length > 0) {
                setNotes(result.data);
                const classes = getClassesByGrouping(result.data);
                if (Object.keys(classes).length > 0) {
                    const firstClass = Object.keys(classes)[0];
                    setExpandedClasses({ [firstClass]: true });
                }
            } else {
                setNotes([]);
                setMessage({ type: 'info', text: 'No notes found' });
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
            setMessage({ type: 'error', text: 'Error loading notes' });
        }
        setLoading(false);
    };

    const handleDownload = (note) => {
        const link = note.filePath;
        if (link) {
            const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
            const fullUrl = `${baseUrl}/${link}`;
            window.open(fullUrl, '_blank');
        }
    };

    const handleDeleteNote = async (noteId) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;

        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/TeacherNote/${noteId}`);
            setMessage({ type: 'success', text: 'Note deleted successfully!' });
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
            setMessage({ type: 'error', text: 'Error deleting note' });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (fileType) => {
        if (fileType?.includes('pdf')) return 'PDF';
        if (fileType?.includes('word') || fileType?.includes('document')) return 'DOC';
        if (fileType?.includes('powerpoint') || fileType?.includes('presentation')) return 'PPT';
        return 'FILE';
    };

    const getFileColor = (fileType) => {
        if (fileType?.includes('pdf')) return '#e53935';
        if (fileType?.includes('word') || fileType?.includes('document')) return '#1565c0';
        if (fileType?.includes('powerpoint') || fileType?.includes('presentation')) return '#f57c00';
        return '#757575';
    };

    const getClassesByGrouping = (notesList) => {
        const grouped = {};
        notesList.forEach(note => {
            const className = note.sclass?.sclassName || 'Unknown Class';
            if (!grouped[className]) {
                grouped[className] = [];
            }
            grouped[className].push(note);
        });
        return grouped;
    };

    const handleExpandClass = (className) => {
        setExpandedClasses(prev => ({
            ...prev,
            [className]: !prev[className]
        }));
    };

    const groupedNotes = getClassesByGrouping(notes);

    return (
        <PageContainer>
            <Container maxWidth="xl">
                {/* Header Section */}
                <HeaderCard>
                    <HeaderContent>
                        <HeaderLeft>
                            <HeaderIcon>
                                <NoteIcon sx={{ fontSize: 40 }} />
                            </HeaderIcon>
                            <div>
                                <HeaderTitle>Teacher Notes</HeaderTitle>
                                <HeaderSubtitle>
                                    {notes.length} notes across {Object.keys(groupedNotes).length} classes
                                </HeaderSubtitle>
                            </div>
                        </HeaderLeft>
                        <RefreshButton 
                            variant="contained" 
                            onClick={fetchNotes}
                            startIcon={<RefreshIcon />}
                            disabled={loading}
                        >
                            Refresh
                        </RefreshButton>
                    </HeaderContent>
                </HeaderCard>

                {/* Message Alert */}
                {message.text && (
                    <AlertCard $type={message.type}>
                        <AlertText $type={message.type}>
                            {message.text}
                        </AlertText>
                    </AlertCard>
                )}

                {/* Content Section */}
                {loading ? (
                    <LoadingCard>
                        <LoadingText>Loading notes...</LoadingText>
                    </LoadingCard>
                ) : notes.length === 0 ? (
                    <EmptyStateCard>
                        <EmptyIcon>
                            <NoteIcon sx={{ fontSize: 80 }} />
                        </EmptyIcon>
                        <EmptyTitle>No Notes Available</EmptyTitle>
                        <EmptySubtitle>Teachers haven't uploaded any notes yet.</EmptySubtitle>
                    </EmptyStateCard>
                ) : (
                    <NotesGrid container spacing={3}>
                        {Object.entries(groupedNotes).map(([className, classNotes], index) => (
                            <Grid item xs={12} key={className}>
                                <ClassCard 
                                    sx={{ animation: css`${fadeIn} 0.5s ease-out ${index * 0.1}s both` } }
                                >
                                    <ClassCardHeader 
                                        onClick={() => handleExpandClass(className)}
                                    >
                                        <ClassInfo>
                                            <ClassChip 
                                                label={`Class ${className}`}
                                                sx={{ 
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    color: 'white',
                                                    fontWeight: 'bold'
                                                }}
                                            />
                                            <NoteCount>
                                                {classNotes.length} note{classNotes.length !== 1 ? 's' : ''}
                                            </NoteCount>
                                        </ClassInfo>
                                        <ExpandButton size="small">
                                            {expandedClasses[className] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </ExpandButton>
                                    </ClassCardHeader>

                                    <Collapse in={expandedClasses[className]}>
                                        <NotesGridInner container spacing={2}>
                                            {classNotes.map((note, noteIndex) => (
                                                <Grid item xs={12} md={6} lg={4} key={note._id}>
                                                    <NoteCard 
                                                        sx={{ animation: css`${fadeIn} 0.4s ease-out ${noteIndex * 0.05}s both` }}
                                                    >
                                                        <NoteHeader>
                                                            <FileTypeChip 
                                                                label={getFileIcon(note.fileType)}
                                                                sx={{ 
                                                                    bgcolor: getFileColor(note.fileType),
                                                                    color: 'white',
                                                                    fontWeight: 'bold'
                                                                }}
                                                            />
                                                            <ActionButtons>
                                                                <IconButton 
                                                                    color="primary" 
                                                                    size="small"
                                                                    onClick={() => handleDownload(note)}
                                                                    title="Download"
                                                                    sx={{ 
                                                                        bgcolor: 'rgba(25, 118, 210, 0.1)',
                                                                        '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.2)' }
                                                                    }}
                                                                >
                                                                    <DownloadIcon />
                                                                </IconButton>
                                                                <IconButton 
                                                                    color="error" 
                                                                    size="small"
                                                                    onClick={() => handleDeleteNote(note._id)}
                                                                    title="Delete"
                                                                    sx={{ 
                                                                        bgcolor: 'rgba(244, 67, 54, 0.1)',
                                                                        '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.2)' }
                                                                    }}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </ActionButtons>
                                                        </NoteHeader>

                                                        <NoteTitle>{note.title}</NoteTitle>

                                                        <NoteDescription>
                                                            {note.description}
                                                        </NoteDescription>

                                                        <NoteMeta>
                                                            <MetaItem>
                                                                <PersonIcon sx={{ fontSize: 14 }} />
                                                                <span>{note.teacher?.name || 'Unknown Teacher'}</span>
                                                            </MetaItem>
                                                            <MetaItem>
                                                                <SchoolIcon sx={{ fontSize: 14 }} />
                                                                <span>{note.subject?.subName || 'General'}</span>
                                                            </MetaItem>
                                                        </NoteMeta>

                                                        <NoteFooter>
                                                            <span>{formatDate(note.createdAt)}</span>
                                                            <span>•</span>
                                                            <span>{formatFileSize(note.fileSize)}</span>
                                                        </NoteFooter>

                                                        <FileName>
                                                            <DescriptionIcon sx={{ fontSize: 12 }} />
                                                            <span>{note.fileName}</span>
                                                        </FileName>
                                                    </NoteCard>
                                                </Grid>
                                            ))}
                                        </NotesGridInner>
                                    </Collapse>
                                </ClassCard>
                            </Grid>
                        ))}
                    </NotesGrid>
                )}
            </Container>
        </PageContainer>
    );
};

export default AdminNotes;

// Styled Components
const PageContainer = styled.div`
    min-height: calc(100vh - 100px);
    padding: 24px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
`;

const HeaderCard = styled(Paper)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    border-radius: 16px !important;
    padding: 24px !important;
    margin-bottom: 24px !important;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3) !important;
`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: 600px) {
        flex-direction: column;
        gap: 16px;
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const HeaderIcon = styled(Avatar)`
    background: rgba(255, 255, 255, 0.2) !important;
    width: 64px !important;
    height: 64px !important;
    color: white !important;
`;

const HeaderTitle = styled.h1`
    font-size: 1.75rem;
    font-weight: 700;
    color: white;
    margin: 0;
    
    @media (max-width: 600px) {
        font-size: 1.4rem;
    }
`;

const HeaderSubtitle = styled.p`
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 4px 0 0 0;
`;

const RefreshButton = styled(Button)`
    background: white !important;
    color: #667eea !important;
    font-weight: 600 !important;
    padding: 10px 24px !important;
    border-radius: 12px !important;
    transition: all 0.3s ease !important;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    }
`;

const AlertCard = styled(Paper)`
    padding: 16px 24px !important;
    margin-bottom: 24px !important;
    border-radius: 12px !important;
    background: ${({ $type }) => 
        $type === 'error' ? '#ffebee' : 
        $type === 'success' ? '#e8f5e9' : 
        '#e3f2fd'} !important;
    border-left: 4px solid ${({ $type }) => 
        $type === 'error' ? '#f44336' : 
        $type === 'success' ? '#4caf50' : 
        '#2196f3'} !important;
`;

const AlertText = styled(Typography)`
    color: ${({ $type }) => 
        $type === 'error' ? '#c62828' : 
        $type === 'success' ? '#2e7d32' : 
        '#1565c0'} !important;
    font-weight: 500 !important;
`;

const LoadingCard = styled(Paper)`
    padding: 60px !important;
    text-align: center !important;
    border-radius: 16px !important;
    background: white !important;
`;

const LoadingText = styled(Typography)`
    color: #667eea !important;
    font-size: 1.1rem !important;
    font-weight: 500 !important;
`;

const EmptyStateCard = styled(Paper)`
    padding: 80px 40px !important;
    text-align: center !important;
    border-radius: 16px !important;
    background: white !important;
`;

const EmptyIcon = styled.div`
    color: #ccc;
    margin-bottom: 16px;
    animation: ${pulse} 2s ease-in-out infinite;
`;

const EmptyTitle = styled.h2`
    color: #666;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 8px 0;
`;

const EmptySubtitle = styled.p`
    color: #999;
    font-size: 1rem;
    margin: 0;
`;

const NotesGrid = styled(Grid)`
    margin-bottom: 24px;
`;

const ClassCard = styled(Card)`
    border-radius: 16px !important;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08) !important;
    transition: all 0.3s ease !important;
    
    &:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12) !important;
    }
`;

const ClassCardHeader = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
    
    &:hover {
        background: linear-gradient(135deg, #f0f2f5 0%, #f5f5f5 100%);
    }
`;

const ClassInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const ClassChip = styled(Chip)`
    font-size: 0.9rem !important;
    padding: 4px 8px !important;
`;

const NoteCount = styled.span`
    color: #666;
    font-weight: 500;
`;

const ExpandButton = styled(IconButton)`
    background: rgba(102, 126, 234, 0.1) !important;
    color: #667eea !important;
    
    &:hover {
        background: rgba(102, 126, 234, 0.2) !important;
    }
`;

const NotesGridInner = styled(Grid)`
    padding: 24px;
    background: #fafafa;
`;

const NoteCard = styled(Paper)`
    padding: 20px !important;
    border-radius: 12px !important;
    background: white !important;
    height: 100%;
    transition: all 0.3s ease !important;
    border: 1px solid #eee !important;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
        border-color: #667eea !important;
    }
`;

const NoteHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const FileTypeChip = styled(Chip)`
    font-size: 0.75rem !important;
    height: 24px !important;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 4px;
`;

const NoteTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 8px 0;
    line-height: 1.4;
`;

const NoteDescription = styled.p`
    font-size: 0.85rem;
    color: #666;
    margin: 0 0 16px 0;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

const NoteMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: #666;
    
    svg {
        color: #667eea;
    }
`;

const NoteFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    color: #999;
    margin-bottom: 8px;
`;

const FileName = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: #999;
    background: #f5f5f5;
    padding: 6px 10px;
    border-radius: 6px;
    
    svg {
        color: #999;
    }
`;

