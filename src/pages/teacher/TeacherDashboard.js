import { useState, useEffect } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Drawer as MuiDrawer,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar } from '../../components/styles';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';

import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';
import TakeAttendance from './TakeAttendance';
import Homework from './Homework';
import TeacherNotes from './TeacherNotes';
import TeacherMarks from './TeacherMarks';
import TeacherExamRoutine from './examRoutineRelated/TeacherExamRoutine';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { formatNepaliDate } from '../../utils/nepaliDate';

// Animation keyframes
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const TeacherDashboard = () => {
    const [open, setOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        } else {
            setOpen(!open);
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Close drawer when route changes on mobile
    useEffect(() => {
        if (isMobile && mobileOpen) {
            setMobileOpen(false);
        }
    }, [location.pathname, isMobile]);

    // Drawer content - no Toolbar needed since AppBar provides the header
    const drawerContent = (
        <>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <List component="nav">
                <TeacherSideBar />
            </List>
        </>
    );

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <StyledAppBar position='fixed'>
                    <Toolbar sx={{ pr: '24px', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{ marginRight: '16px' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <WelcomeText>Teacher Dashboard</WelcomeText>
                        </Box>
                        <AccountMenu />
                    </Toolbar>
                </StyledAppBar>
                
                {/* Mobile Drawer - Temporary */}
                {isMobile && (
                    <MuiDrawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        sx={styles.mobileDrawerStyled}
                        PaperProps={{
                            sx: styles.mobileDrawerPaper
                        }}
                    >
                        {drawerContent}
                    </MuiDrawer>
                )}
                
                {/* Desktop Drawer - Permanent */}
                {!isMobile && (
                    <MuiDrawer variant="permanent" open={open} sx={styles.drawerStyled} PaperProps={{ sx: styles.drawerPaperStyled }}>
                        {drawerContent}
                    </MuiDrawer>
                )}
                
                <Box 
                    component="main" 
                    sx={{
                        backgroundColor: '#f0f2f5',
                        flexGrow: 1,
                        minHeight: '100vh',
                        height: 'auto',
                        overflow: 'auto',
                        p: [2, 3],
                        ml: isMobile ? 0 : (open ? '240px' : '72px'),
                        transition: (theme) => theme.transitions.create(['margin'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                    }}
                >
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<TeacherHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                        <Route path="/Teacher/profile" element={<TeacherProfile />} />
                        <Route path="/Teacher/complain" element={<TeacherComplain />} />
                        <Route path="/Teacher/attendance" element={<TakeAttendance />} />
                        <Route path="/Teacher/homework" element={<Homework />} />
                        <Route path="/Teacher/notes" element={<TeacherNotes />} />
                        <Route path="/Teacher/marks" element={<TeacherMarks />} />

                        <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                        <Route path="/Teacher/class/:id" element={<TeacherClassDetails />} />
                        <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />

                        <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        <Route path="/Teacher/exam-routine" element={<TeacherExamRoutine />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default TeacherDashboard

const styles = {
    boxStyled: {
        backgroundColor: '#f0f2f5',
        flexGrow: 1,
        minHeight: '100vh',
        height: 'auto',
        overflow: 'auto',
        p: [2, 3],
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
        background: 'rgba(40, 40, 80, 0.95)',
        color: '#fff',
    },
    drawerStyled: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 1200,
    },
    drawerPaperStyled: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '240px',
        background: 'rgba(40, 40, 80, 0.95)',
        color: '#fff',
        overflowY: 'auto',
        borderRight: 'none',
        '& .MuiListItemButton-root': {
            color: 'rgba(255, 255, 255, 0.9)',
        },
        '& .MuiListItemButton-root:hover': {
            backgroundColor: 'rgba(127,86,218,0.3)',
        },
        '& .MuiListItemIcon-root': {
            color: 'rgba(255, 255, 255, 0.9)',
            minWidth: '40px',
        },
        '& .MuiSvgIcon-root': {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.4rem',
        },
    },
    chevronButton: {
        color: 'rgba(255, 255, 255, 0.9)',
    },
    // Mobile drawer styles
    mobileDrawerStyled: {
        display: 'flex',
        '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '280px',
            maxWidth: '85vw',
            background: 'rgba(40, 40, 80, 0.95)',
            color: '#fff',
        },
    },
    mobileDrawerPaper: {
        background: 'rgba(40, 40, 80, 0.95)',
        color: '#fff',
        '& .MuiListItemButton-root': {
            color: 'rgba(255, 255, 255, 0.9)',
        },
        '& .MuiListItemButton-root:hover': {
            backgroundColor: 'rgba(127,86,218,0.3)',
        },
        '& .MuiListItemIcon-root': {
            color: 'rgba(255, 255, 255, 0.9)',
            minWidth: '40px',
        },
        '& .MuiSvgIcon-root': {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.4rem',
        },
    },
}

// Styled Components
const StyledAppBar = styled(AppBar)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3) !important;
`;

const WelcomeText = styled(Typography)`
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
    animation: ${fadeIn} 0.5s ease-out;
    
    @media (max-width: 600px) {
        display: none;
    }
`;

