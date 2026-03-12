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
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import ViewFee from './ViewFee';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar } from '../../components/styles';
import StudentHomework from './StudentHomework';
import StudentExamRoutine from './examRoutineRelated/StudentExamRoutine';
import StudentNotes from './StudentNotes';
import StudentResults from './StudentResults';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { formatNepaliDate } from '../../utils/nepaliDate';

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const { currentUser } = useSelector((state) => state.user);
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

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

const studentName = currentUser?.name || "Student";
    
    const formatDate = (date) => {
        return formatNepaliDate(date, { format: 'full', showDayName: true });
    };

    // Drawer content - no Toolbar needed since AppBar provides the header
    const drawerContent = (
        <>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <List component="nav">
                <StudentSideBar />
            </List>
        </>
    );

    return (
        <DashboardContainer>
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
                        <WelcomeText>Welcome back, {studentName}! 👋</WelcomeText>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <DateBadge>
                            📅 {formatDate(currentDate)}
                        </DateBadge>
                        <AccountMenu />
                    </Box>
                </Toolbar>
            </StyledAppBar>
            
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
            
            {!isMobile && (
                <MuiDrawer 
                    variant="permanent" 
                    open={open} 
                    sx={styles.drawerStyled}
                    PaperProps={{
                        sx: styles.drawerPaperStyled
                    }}
                >
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
                    <Route path="/" element={<StudentHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Student/dashboard" element={<StudentHomePage />} />
                    <Route path="/Student/profile" element={<StudentProfile />} />
                    <Route path="/Student/subjects" element={<StudentSubjects />} />
                    <Route path="/Student/notes" element={<StudentNotes />} />
                    <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                    <Route path="/Student/fee" element={<ViewFee />} />
                    <Route path="/Student/complain" element={<StudentComplain />} />
                    <Route path="/Student/homework" element={<StudentHomework />} />
                    <Route path="/Student/exam-routine" element={<StudentExamRoutine />} />
                    <Route path="/Student/results" element={<StudentResults />} />

                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Box>
        </DashboardContainer>
    );
}

export default StudentDashboard

const DashboardContainer = styled(Box)`
    display: flex;
    background: linear-gradient(135deg, #1f1f38, #2c2c6c);
    min-height: 100vh;
`;

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

const DateBadge = styled(Box)`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    color: white;
    font-weight: 500;
    font-size: 0.85rem;
    backdrop-filter: blur(10px);
    animation: ${fadeIn} 0.5s ease-out 0.2s both;
    
    &:hover {
        background: rgba(255, 255, 255, 0.25);
    }
    
    @media (max-width: 600px) {
        display: none;
    }
`;

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
};

