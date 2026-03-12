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
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppBar } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import AssignTeacher from './teacherRelated/AssignTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';
import { ViewStudent } from './studentRelated/ViewStudent';
import styled, { keyframes } from 'styled-components';
import AddFee from './feeRelated/AddFee';
import ShowAllFees from './feeRelated/ShowAllFees';
import ViewStudentFee from './feeRelated/ViewStudentFee';
import AllStudentMarks from './studentRelated/AllStudentMarks';
import ClassAttendance from './studentRelated/ClassAttendance';
import ShowSalary from './salaryRelated/ShowSalary';
import AddSalary from './salaryRelated/AddSalary';
import AddRoutine from './routineRelated/AddRoutine';
import ShowRoutines from './routineRelated/ShowRoutines';
import AdminExamRoutine from './examRoutineRelated/AdminExamRoutine';
import AdminNotes from './notesRelated/AdminNotes';
import AdminResults from './resultRelated/AdminResults';
import GenerateReportCards from './resultRelated/GenerateReportCards';

// Staff imports
import AddStaff from './staffRelated/AddStaff';
import ShowStaff from './staffRelated/ShowStaff';
import StaffDetails from './staffRelated/StaffDetails';
import TeacherAttendance from './teacherRelated/TeacherAttendance';
import StaffAttendance from './staffRelated/StaffAttendance';

// Parent imports
import AddParent from './parentRelated/AddParent';
import ShowParents from './parentRelated/ShowParents';
import ParentDetails from './parentRelated/ParentDetails';

// ID Card Generation
import GenerateIDCard from './studentRelated/GenerateIDCard';

// Redux
import { useSelector } from 'react-redux';

// Nepali Date
import { formatNepaliDate } from '../../utils/nepaliDate';

// Animation keyframes
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const AdminDashboard = () => {
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

    // Update date every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

const adminName = currentUser?.name || "Admin";
    
    const formatDate = (date) => {
        return formatNepaliDate(date, { format: 'full', showDayName: true });
    };

    // Drawer content - no Toolbar needed since AppBar provides the header
    const drawerContent = (
        <>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <List component="nav">
                <SideBar />
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
                            {open ? <ChevronLeftIcon /> : <MenuIcon />}
                        </IconButton>
                        <WelcomeText>Welcome back, {adminName}! 👋</WelcomeText>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <DateBadge>
                            📅 {formatDate(currentDate)}
                        </DateBadge>
                        <AccountMenu />
                    </Box>
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
                    <Route path="/" element={<AdminHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                    <Route path="/Admin/profile" element={<AdminProfile />} />
                    <Route path="/Admin/complains" element={<SeeComplains />} />

                    {/* Notice */}
                    <Route path="/Admin/addnotice" element={<AddNotice />} />
                    <Route path="/Admin/notices" element={<ShowNotices />} />

                    {/* Subject */}
                    <Route path="/Admin/subjects" element={<ShowSubjects />} />
                    <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                    <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />
                    <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                    <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

                    <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                    <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                    {/* Class */}
                    <Route path="/Admin/addclass" element={<AddClass />} />
                    <Route path="/Admin/editclass/:id" element={<AddClass />} />
                    <Route path="/Admin/classes" element={<ShowClasses />} />
                    <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                    <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                    {/* Student */}
                    <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                    <Route path="/Admin/students" element={<ShowStudents />} />
                    <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                    <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                    <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />
                    <Route path="/Admin/generate-id-cards" element={<GenerateIDCard />} />

                    {/* Teacher */}
                    <Route path="/Admin/teachers" element={<ShowTeachers />} />
                    <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                    <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                    <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                    <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                    <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />
                    <Route path="/Admin/teachers/addteacher" element={<AddTeacher />} />
                    <Route path="/Admin/teachers/assign" element={<AssignTeacher />} />

                    {/* Parent */}
                    <Route path="/Admin/addparent" element={<AddParent />} />
                    <Route path="/Admin/parents" element={<ShowParents />} />
                    <Route path="/Admin/parents/:id" element={<ParentDetails />} />

                    {/* Staff */}
                    <Route path="/Admin/addstaff" element={<AddStaff />} />
                    <Route path="/Admin/staff" element={<ShowStaff />} />
                    <Route path="/Admin/staff/:id" element={<StaffDetails />} />

                    {/* Fee */}
                    <Route path="/Admin/addfee" element={<AddFee />} />
                    <Route path="/Admin/fees" element={<ShowAllFees />} />
                    <Route path="/Admin/students/student/fee/:id" element={<ViewStudentFee />} />

                    {/* Notes */}
                    <Route path="/Admin/notes" element={<AdminNotes />} />

                    {/* Marks */}
                    <Route path="/Admin/allmarks" element={<AllStudentMarks />} />

                    {/* Results */}
                    <Route path="/Admin/results" element={<AdminResults />} />
                    
                    {/* Report Cards */}
                    <Route path="/Admin/report-cards" element={<GenerateReportCards />} />

                    {/* Attendance */}
                    <Route path="/Admin/attendance" element={<ClassAttendance />} />
                    <Route path="/Admin/teacher-attendance" element={<TeacherAttendance />} />
                    <Route path="/Admin/staff-attendance" element={<StaffAttendance />} />

                    {/* Salary */}
                    <Route path="/Admin/salary" element={<ShowSalary />} />
                    <Route path="/Admin/salary/add" element={<AddSalary />} />

                    {/* Routines */}
                    <Route path="/Admin/routines" element={<ShowRoutines />} />
                    <Route path="/Admin/routines/add" element={<AddRoutine />} />

                    {/* Exam Routine */}
                    <Route path="/Admin/exam-routine" element={<AdminExamRoutine />} />

                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Box>
        </DashboardContainer>
    );
};

export default AdminDashboard;

// ===== Styled Components =====
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
};

