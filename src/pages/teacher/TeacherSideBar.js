import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotesIcon from '@mui/icons-material/Notes';
import GradeIcon from '@mui/icons-material/Grade';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClassIcon from '@mui/icons-material/Class';
import QuizIcon from '@mui/icons-material/Quiz';
import { useSelector } from 'react-redux';

// Color palette
const iconColors = {
    home: '#64b5f6',
    profile: '#ce93d8',
    attendance: '#81c784',
    homework: '#ffb74d',
    notes: '#fff176',
    marks: '#ba68c8',
    classes: '#4db6ac',
    examRoutine: '#4dd0e1',
    logout: '#e57373'
};

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    const getIconColor = (path) => {
        return iconColors[path] || '#888';
    };

    const renderIcon = (path, IconComponent) => {
        const active = isActive(path);
        const color = getIconColor(path);
        
        return (
            <IconWrapper $active={active} $color={color}>
                <IconComponent sx={{ fontSize: 22 }} />
            </IconWrapper>
        );
    };

    return (
        <SidebarContainer>
            <SidebarHeader>
                    <HeaderAvatar>
                        👨‍🏫
                    </HeaderAvatar>
                    <HeaderTitle>Teacher Portal</HeaderTitle>
                </SidebarHeader>
            <NavItem 
                component={Link} 
                to="/"
                $active={isActive('/Teacher/dashboard')}
            >
                {renderIcon('home', HomeIcon)}
                <NavText primary="Home" $active={isActive('/Teacher/dashboard')} />
            </NavItem>

            <SidebarSubheader>ACADEMIC</SidebarSubheader>

            <NavItem component={Link} to="/Teacher/profile" $active={isActive('/Teacher/profile')}>
                {renderIcon('profile', AccountCircleOutlinedIcon)}
                <NavText primary="Profile" $active={isActive('/Teacher/profile')} />
            </NavItem>

            <NavItem component={Link} to="/Teacher/attendance" $active={isActive('/Teacher/attendance')}>
                {renderIcon('attendance', CheckCircleIcon)}
                <NavText primary="Take Attendance" $active={isActive('/Teacher/attendance')} />
            </NavItem>

            <NavItem component={Link} to="/Teacher/homework" $active={isActive('/Teacher/homework')}>
                {renderIcon('homework', AssignmentIcon)}
                <NavText primary="Homework" $active={isActive('/Teacher/homework')} />
            </NavItem>

            <NavItem component={Link} to="/Teacher/notes" $active={isActive('/Teacher/notes')}>
                {renderIcon('notes', NotesIcon)}
                <NavText primary="Notes" $active={isActive('/Teacher/notes')} />
            </NavItem>

            <NavItem component={Link} to="/Teacher/marks" $active={isActive('/Teacher/marks')}>
                {renderIcon('marks', GradeIcon)}
                <NavText primary="Marks" $active={isActive('/Teacher/marks')} />
            </NavItem>

            <SidebarSubheader>CLASSES</SidebarSubheader>

            <NavItem component={Link} to="/Teacher/class" $active={isActive('/Teacher/class')}>
                {renderIcon('classes', ClassIcon)}
                <NavText primary="My Classes" $active={isActive('/Teacher/class')} />
            </NavItem>

            <NavItem component={Link} to="/Teacher/exam-routine" $active={isActive('/Teacher/exam-routine')}>
                {renderIcon('examRoutine', QuizIcon)}
                <NavText primary="Exam Routine" $active={isActive('/Teacher/exam-routine')} />
            </NavItem>

            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

            <SidebarSubheader>ACCOUNT</SidebarSubheader>

            <NavItem component={Link} to="/logout" $active={isActive('/logout')}>
                {renderIcon('logout', ExitToAppIcon)}
                <NavText primary="Logout" $active={isActive('/logout')} />
            </NavItem>
        </SidebarContainer>
    )
}

export default TeacherSideBar;

// Styled Components
const SidebarContainer = styled.div`
    padding: 64px 8px 8px 8px;
    height: 100%;
    overflow-y: auto;
    background: #1a1a2e;
    color: white;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
    }
`;
const SidebarHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
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

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: ${({ $active, $color }) => $active ? `${$color}40` : 'rgba(255,255,255,0.1)'};
    color: ${({ $active, $color }) => $active ? $color : 'rgba(255,255,255,0.7)'};
    margin-right: 12px;
    transition: all 0.2s ease;
    
    ${NavItem}:hover & {
        background: ${({ $color }) => `${$color}40`};
        color: ${({ $color }) => $color};
    }
`;

const NavText = styled(ListItemText)`
    .MuiTypography-root {
        font-size: 0.9rem;
        font-weight: ${({ $active }) => $active ? '600' : '500'};
        color: ${({ $active }) => $active ? 'white' : 'rgba(255,255,255,0.8)'};
    }
`;

