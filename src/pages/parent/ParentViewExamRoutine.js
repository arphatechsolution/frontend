import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box, Typography, Paper, Container, Card, CardContent,
    Grid, Chip, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, CircularProgress, Divider, IconButton, 
    List, ListItem, ListItemText, ListItemIcon, Fab
} from '@mui/material';
import {
    Schedule as ScheduleIcon,
    Download as DownloadIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import axios from 'axios';
import { formatNepaliDate } from '../../utils/nepaliDate';
import ParentSideBar from './ParentSideBar';

const ParentViewExamRoutine = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { userDetails: parentUserDetails } = useSelector((state) => state.parent);

    const [examRoutines, setExamRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Get school ID from currentUser or parent details
    const getSchoolId = () => {
        return currentUser?.school?._id || parentUserDetails?.school?._id;
    };

    // Get class ID for the student
    const getStudentClassId = () => {
        const student = parentUserDetails?.students?.find(s => s.studentId === studentId);
        return student?.classId || '';
    };

    useEffect(() => {
        const schoolId = getSchoolId();
        const classId = getStudentClassId();

        if (schoolId && classId && studentId) {
            fetchExamRoutines(schoolId, classId);
        }
    }, [studentId, currentUser, parentUserDetails]);

    const fetchExamRoutines = async (schoolId, classId) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/ExamRoutine/Student/${schoolId}/${classId}`
            );
            setExamRoutines(response.data);
        } catch (err) {
            console.error('Error fetching exam routines:', err);
            setError('Failed to load exam routines');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (filePath) => {
        window.open(`http://localhost:5000/${filePath}`, '_blank');
    };

    const child = parentUserDetails?.students?.find(s => s.studentId === studentId);

    if (loading) {
        return (
            <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
            {/* Header */}
            <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton onClick={() => navigate(`/Parent/child/${studentId}`)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" fontWeight="bold">
                        <ScheduleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Exam Routines - {child?.name}
                    </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                    Class: {child?.class} | Roll No: {child?.rollNum}
                </Typography>
            </Paper>

            {error ? (
                <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#ffebee' }}>
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={() => window.location.reload()}
                        sx={{ mt: 2 }}
                    >
                        Retry
                    </Button>
                </Paper>
            ) : examRoutines.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center' }}>
                    <ScheduleIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        No Exam Routines Found
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Exam routines will appear here when uploaded by teachers/admin.
                    </Typography>
                </Paper>
            ) : (
                <>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                        {examRoutines.length} Exam Routine{examRoutines.length !== 1 ? 's' : ''}
                    </Typography>

                    <Grid container spacing={3}>
                        {examRoutines.map((routine, index) => (
                            <Grid item xs={12} md={6} lg={4} key={routine._id}>
                                <Paper sx={{ p: 3, height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 8 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <ScheduleIcon sx={{ fontSize: 32, color: '#7f56da', mr: 2 }} />
                                        <Box>
                                            <Typography variant="h6" fontWeight="bold">
                                                {routine.name || routine.examType}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {routine.class?.sclassName || 'All Classes'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    
                                    <Divider sx={{ mb: 2 }} />
                                    
                                    <List dense>
                                        <ListItem>
                                            <ListItemIcon sx={{ minWidth: 40 }}>
                                                <Typography variant="body2" fontWeight="medium">📅</Typography>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Exam Date"
                                                secondary={routine.examDate ? formatNepaliDate(new Date(routine.examDate)) : 'TBD'}
                                            />
                                        </ListItem>
                                        {routine.examStartTime && (
                                            <ListItem>
                                                <ListItemIcon sx={{ minWidth: 40 }}>
                                                    <Typography variant="body2" fontWeight="medium">🕐</Typography>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Time"
                                                    secondary={`${routine.examStartTime} - ${routine.examEndTime}`}
                                                />
                                            </ListItem>
                                        )}
                                    </List>

                                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                                        <Fab 
                                            color="primary" 
                                            size="medium"
                                            onClick={() => handleDownload(routine.filePath)}
                                            sx={{ boxShadow: 0 }}
                                        >
                                            <DownloadIcon />
                                        </Fab>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Tap to View/Download PDF
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default ParentViewExamRoutine;

