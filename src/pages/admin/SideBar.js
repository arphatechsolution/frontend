import React, { useState } from 'react';
import {
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Collapse,
    Box,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Icons
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SchoolIcon from '@mui/icons-material/School';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import NotesIcon from '@mui/icons-material/Notes';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import QuizIcon from '@mui/icons-material/Quiz';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import WorkIcon from '@mui/icons-material/Work';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

// Color palette for different sections
const iconColors = {
    home: '#64b5f6',
    classes: '#81c784',
    subjects: '#ffb74d',
    teachers: '#ba68c8',
    students: '#4db6ac',
    idCards: '#7986cb',
    parents: '#f06292',
    staff: '#90a4ae',
    fees: '#4dd0e1',
    salary: '#aed581',
    examRoutine: '#ffcc80',
    notes: '#fff176',
    results: '#80cbc4',
    reportCards: '#b39ddb',
    attendance: '#ef9a9a',
    notices: '#90caf9',
    complains: '#ef5350',
    profile: '#ce93d8',
    logout: '#e57373'
};

const SideBar = () => {
    const location = useLocation();
    const [attendanceExpanded, setAttendanceExpanded] = useState(true);

    const handleAttendanceToggle = () => {
        setAttendanceExpanded(!attendanceExpanded);
    };

    const isAttendanceActive =
        location.pathname.startsWith("/Admin/attendance") ||
        location.pathname.startsWith("/Admin/teacher-attendance") ||
        location.pathname.startsWith("/Admin/staff-attendance");

    const isActive = (path) => {
        if (!path) return false;
        return location.pathname.startsWith(path);
    };

    const getIconColor = (path) => {
        return iconColors[path] || '#888';
    };

    const renderIcon = (path, IconComponent) => {
        const active = isActive(path);
        const color = getIconColor(path);
        
        return (
            <IconWrapper $active={active} $color={color}>
                <IconComponent sx={{ fontSize: 24 }} />
            </IconWrapper>
        );
    };

    return (
        <SidebarContainer>
            {/* Sidebar Header */}
            <SidebarHeader>
                <HeaderAvatar>
                    👑
                </HeaderAvatar>
                <HeaderTitle>Admin Portal</HeaderTitle>
            </SidebarHeader>
            
            {/* Home */}
            <NavItem 
                component={Link} 
                to="/"
                $active={isActive('/Admin/dashboard')}
            >
                {renderIcon('home', HomeIcon)}
                <NavText primary="Home" $active={isActive('/Admin/dashboard')} />
            </NavItem>

            {/* Section: MANAGEMENT */}
            <SidebarSubheader>MANAGEMENT</SidebarSubheader>

            <NavItem component={Link} to="/Admin/classes" $active={isActive('/Admin/classes')}>
                {renderIcon('classes', ClassOutlinedIcon)}
                <NavText primary="Classes" $active={isActive('/Admin/classes')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/subjects" $active={isActive('/Admin/subjects')}>
                {renderIcon('subjects', AssignmentIcon)}
                <NavText primary="Subjects" $active={isActive('/Admin/subjects')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/teachers" $active={isActive('/Admin/teachers')}>
                {renderIcon('teachers', SchoolIcon)}
                <NavText primary="Teachers" $active={isActive('/Admin/teachers')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/teachers/assign" $active={isActive('/Admin/teachers/assign')}>
                {renderIcon('teachers', AssignmentIcon)}
                <NavText primary="Assign Teacher" $active={isActive('/Admin/teachers/assign')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/students" $active={isActive('/Admin/students')}>
                {renderIcon('students', PersonOutlineIcon)}
                <NavText primary="Students" $active={isActive('/Admin/students')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/generate-id-cards" $active={isActive('/Admin/generate-id-cards')}>
                {renderIcon('idCards', BadgeIcon)}
                <NavText primary="ID Cards" $active={isActive('/Admin/generate-id-cards')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/parents" $active={isActive('/Admin/parents')}>
                {renderIcon('parents', FamilyRestroomIcon)}
                <NavText primary="Parents" $active={isActive('/Admin/parents')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/staff" $active={isActive('/Admin/staff')}>
                {renderIcon('staff', WorkIcon)}
                <NavText primary="Staff" $active={isActive('/Admin/staff')} />
            </NavItem>

            {/* Section: FINANCE */}
            <SidebarSubheader>FINANCE</SidebarSubheader>

            <NavItem component={Link} to="/Admin/fees" $active={isActive('/Admin/fees')}>
                {renderIcon('fees', PaymentIcon)}
                <NavText primary="Fees" $active={isActive('/Admin/fees')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/salary" $active={isActive('/Admin/salary')}>
                {renderIcon('salary', AttachMoneyIcon)}
                <NavText primary="Salary" $active={isActive('/Admin/salary')} />
            </NavItem>

            {/* Section: ACADEMICS */}
            <SidebarSubheader>ACADEMICS</SidebarSubheader>

            <NavItem component={Link} to="/Admin/exam-routine" $active={isActive('/Admin/exam-routine')}>
                {renderIcon('examRoutine', QuizIcon)}
                <NavText primary="Exam Routine" $active={isActive('/Admin/exam-routine')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/notes" $active={isActive('/Admin/notes')}>
                {renderIcon('notes', NotesIcon)}
                <NavText primary="Notes" $active={isActive('/Admin/notes')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/results" $active={isActive('/Admin/results')}>
                {renderIcon('results', AssessmentIcon)}
                <NavText primary="Results" $active={isActive('/Admin/results')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/report-cards" $active={isActive('/Admin/report-cards')}>
                {renderIcon('reportCards', DescriptionIcon)}
                <NavText primary="Report Cards" $active={isActive('/Admin/report-cards')} />
            </NavItem>

            {/* Section: ATTENDANCE */}
            <SidebarSubheader>ATTENDANCE</SidebarSubheader>

            <NavItem 
                onClick={handleAttendanceToggle}
                $active={isAttendanceActive}
            >
                {renderIcon('attendance', EventIcon)}
                <NavText primary="Attendance" $active={isAttendanceActive} />
                {attendanceExpanded ? 
                    <ExpandIcon><ExpandLess /></ExpandIcon> : 
                    <ExpandIcon><ExpandMore /></ExpandIcon>
                }
            </NavItem>

            {attendanceExpanded && (
                <NestedList>
                    <NestedItem component={Link} to="/Admin/attendance" $active={isActive('/Admin/attendance') && !isActive('/Admin/teacher-attendance') && !isActive('/Admin/staff-attendance')}>
                        <NestedIconWrapper $active={isActive('/Admin/attendance') && !isActive('/Admin/teacher-attendance') && !isActive('/Admin/staff-attendance')} $color={iconColors.students}>
                            <PersonIcon sx={{ fontSize: 18 }} />
                        </NestedIconWrapper>
                        <NavText primary="Student" $active={isActive('/Admin/attendance') && !isActive('/Admin/teacher-attendance') && !isActive('/Admin/staff-attendance')} />
                    </NestedItem>
                    <NestedItem component={Link} to="/Admin/teacher-attendance" $active={isActive('/Admin/teacher-attendance')}>
                        <NestedIconWrapper $active={isActive('/Admin/teacher-attendance')} $color={iconColors.teachers}>
                            <SchoolIcon sx={{ fontSize: 18 }} />
                        </NestedIconWrapper>
                        <NavText primary="Teacher" $active={isActive('/Admin/teacher-attendance')} />
                    </NestedItem>
                    <NestedItem component={Link} to="/Admin/staff-attendance" $active={isActive('/Admin/staff-attendance')}>
                        <NestedIconWrapper $active={isActive('/Admin/staff-attendance')} $color={iconColors.staff}>
                            <GroupsIcon sx={{ fontSize: 18 }} />
                        </NestedIconWrapper>
                        <NavText primary="Staff" $active={isActive('/Admin/staff-attendance')} />
                    </NestedItem>
                </NestedList>
            )}

            {/* Section: COMMUNICATION */}
            <SidebarSubheader>COMMUNICATION</SidebarSubheader>

            <NavItem component={Link} to="/Admin/notices" $active={isActive('/Admin/notices')}>
                {renderIcon('notices', AnnouncementOutlinedIcon)}
                <NavText primary="Notices" $active={isActive('/Admin/notices')} />
            </NavItem>

            <NavItem component={Link} to="/Admin/complains" $active={isActive('/Admin/complains')}>
                {renderIcon('complains', ReportIcon)}
                <NavText primary="Complains" $active={isActive('/Admin/complains')} />
            </NavItem>

            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

            {/* Section: ACCOUNT */}
            <SidebarSubheader>ACCOUNT</SidebarSubheader>

            <NavItem component={Link} to="/Admin/profile" $active={isActive('/Admin/profile')}>
                {renderIcon('profile', AccountCircleOutlinedIcon)}
                <NavText primary="Profile" $active={isActive('/Admin/profile')} />
            </NavItem>

            <NavItem component={Link} to="/logout" $active={isActive('/logout')}>
                {renderIcon('logout', ExitToAppIcon)}
                <NavText primary="Logout" $active={isActive('/logout')} />
            </NavItem>
        </SidebarContainer>
    );
};

export default SideBar;

// Styled Components
const SidebarContainer = styled(Box)`
    padding: 64px 16px 16px 16px;
    height: 100%;
    overflow: auto;
    background: #1a1a2e;
    color: white;
`;

const SidebarSubheader = styled.div`
    color: rgba(255,255,255,0.5);
    font-size: 0.7rem;
    font-weight: bold;
    letter-spacing: 1px;
    padding: 16px 16px 8px 16px;
    text-transform: uppercase;
`;

const NavItem = styled(ListItemButton)`
    border-radius: 12px !important;
    margin: 4px 8px !important;
    padding: 10px 12px !important;
    transition: all 0.3s ease !important;
    background: ${({ $active }) => $active ? 'rgba(127, 86, 218, 0.25)' : 'transparent'} !important;
    
    &:hover {
        background: ${({ $active }) => $active ? 'rgba(127, 86, 218, 0.3)' : 'rgba(255,255,255,0.1)'} !important;
    }
    
    ${({ $active }) => $active && `
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 30px;
            background: #7f56da;
            border-radius: 0 4px 4px 0;
        }
    `}
`;

const NestedList = styled.div`
    padding-left: 16px;
`;

const NestedItem = styled(ListItemButton)`
    border-radius: 8px !important;
    margin: 2px 0 !important;
    padding: 8px 12px !important;
    background: ${({ $active }) => $active ? 'rgba(127, 86, 218, 0.15)' : 'transparent'} !important;
    
    &:hover {
        background: ${({ $active }) => $active ? 'rgba(127, 86, 218, 0.2)' : 'rgba(255,255,255,0.05)'} !important;
    }
`;

const NestedIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: ${({ $active, $color }) => $active ? `${$color}50` : 'rgba(255,255,255,0.08)'};
    color: ${({ $active, $color }) => $active ? $color : 'rgba(255,255,255,0.75)'};
    margin-right: 10px;
    transition: all 0.2s ease;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: ${({ $active, $color }) => $active ? `${$color}50` : 'rgba(255,255,255,0.12)'};
    color: ${({ $active, $color }) => $active ? $color : 'rgba(255,255,255,0.85)'};
    margin-right: 12px;
    transition: all 0.25s ease;
    box-shadow: ${({ $active, $color }) => $active ? `0 0 12px ${$color}40` : 'none'};
    
    ${NavItem}:hover & {
        background: ${({ $active, $color }) => $active ? `${$color}50` : 'rgba(255,255,255,0.18)'};
        color: ${({ $active, $color }) => $active ? $color : '#ffffff'};
        box-shadow: ${({ $color }) => $color ? `0 0 8px ${$color}30` : 'none'};
    }
`;

const NavText = styled(ListItemText)`
    .MuiTypography-root {
        font-size: 0.9rem;
        font-weight: ${({ $active }) => $active ? '600' : '500'};
        color: ${({ $active }) => $active ? 'white' : 'rgba(255,255,255,0.8)'};
    }
`;

const ExpandIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.7);
    margin-left: auto;
`;

// Sidebar Header Components
const SidebarHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.1);
    border: none;
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
    color: rgba(255,255,255,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    
    &:hover {
        background: rgba(255,255,255,0.2);
        color: white;
    }
`;

const HeaderAvatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 8px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
`;

const HeaderTitle = styled.span`
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffffff;
`;

