import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
} from '@mui/material';
import styled from 'styled-components';

import { Link, useLocation } from 'react-router-dom';

// Icons
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import GroupsIcon from '@mui/icons-material/Groups';

// Color palette - matching Admin SideBar
const iconColors = {
    home: '#64b5f6',
    children: '#81c784',
    attendance: '#ba68c8',
    homework: '#ff8a65',
    fees: '#4dd0e1',
    notices: '#ffb74d',
    complain: '#f06292',
    profile: '#ce93d8',
    logout: '#e57373',
};

const ParentSideBar = () => {
    const location = useLocation();

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
                <IconComponent sx={{ fontSize: 22 }} />
            </IconWrapper>
        );
    };

    return (
        <SidebarContainer>
            {/* Sidebar Header */}
            <SidebarHeader>
                <HeaderAvatar>
                    👨‍👩‍👧
                </HeaderAvatar>
                <HeaderTitle>Parent Portal</HeaderTitle>
            </SidebarHeader>
            
            {/* Home */}
            <NavItem 
                component={Link} 
                to="/Parent/dashboard"
                $active={isActive('/Parent/dashboard')}
            >
                {renderIcon('home', HomeIcon)}
                <NavText primary="Home" $active={isActive('/Parent/dashboard')} />
            </NavItem>

            {/* Section: MY CHILDREN */}
            <SidebarSubheader>MY CHILDREN</SidebarSubheader>

            <NavItem component={Link} to="/Parent/children" $active={isActive('/Parent/children')}>
                {renderIcon('children', GroupsIcon)}
                <NavText primary="My Children" $active={isActive('/Parent/children')} />
            </NavItem>

            {/* Section: ACADEMICS */}
            <SidebarSubheader>ACADEMICS</SidebarSubheader>

            <NavItem component={Link} to="/Parent/attendance" $active={isActive('/Parent/attendance')}>
                {renderIcon('attendance', CalendarTodayIcon)}
                <NavText primary="Attendance" $active={isActive('/Parent/attendance')} />
            </NavItem>

            <NavItem component={Link} to="/Parent/homework" $active={isActive('/Parent/homework')}>
                {renderIcon('homework', AssignmentIcon)}
                <NavText primary="Homework" $active={isActive('/Parent/homework')} />
            </NavItem>

            {/* Section: FINANCE */}
            <SidebarSubheader>FINANCE</SidebarSubheader>

            <NavItem component={Link} to="/Parent/fees" $active={isActive('/Parent/fees')}>
                {renderIcon('fees', PaymentIcon)}
                <NavText primary="Fee Details" $active={isActive('/Parent/fees')} />
            </NavItem>

            {/* Section: COMMUNICATION */}
            <SidebarSubheader>COMMUNICATION</SidebarSubheader>

            <NavItem component={Link} to="/Parent/notices" $active={isActive('/Parent/notices')}>
                {renderIcon('notices', AnnouncementOutlinedIcon)}
                <NavText primary="Notices" $active={isActive('/Parent/notices')} />
            </NavItem>

            <NavItem component={Link} to="/Parent/complain" $active={isActive('/Parent/complain')}>
                {renderIcon('complain', FeedbackIcon)}
                <NavText primary="Send Complain" $active={isActive('/Parent/complain')} />
            </NavItem>

            {/* Section: ACCOUNT */}
            <SidebarSubheader>ACCOUNT</SidebarSubheader>

            <NavItem component={Link} to="/Parent/profile" $active={isActive('/Parent/profile')}>
                {renderIcon('profile', AccountCircleOutlinedIcon)}
                <NavText primary="Profile" $active={isActive('/Parent/profile')} />
            </NavItem>

            <NavItem component={Link} to="/logout" $active={isActive('/logout')}>
                {renderIcon('logout', ExitToAppIcon)}
                <NavText primary="Logout" $active={isActive('/logout')} />
            </NavItem>
        </SidebarContainer>
    );
};

export default ParentSideBar;

// Styled Components - matching Admin SideBar exactly
const SidebarContainer = styled(Box)`
    padding: 64px 8px 8px 8px;
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

const NavItem = styled(ListItem)`
    display: block;
    padding: 0;
`;

const StyledListItemButton = styled.button`
    border-radius: 12px;
    margin: 4px 8px;
    padding: 10px 12px;
    transition: all 0.3s ease;
    background: ${({ $active }) => $active ? 'rgba(127, 86, 218, 0.25)' : 'transparent'};
    border: none;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: inherit;
    position: relative;
    
    &:hover {
        background: ${({ $active }) => $active ? 'rgba(127, 86, 218, 0.3)' : 'rgba(255,255,255,0.1)'};
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
    
    &:hover {
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

// Sidebar Header Components
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

