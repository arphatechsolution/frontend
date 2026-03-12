import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
    useMediaQuery,
    useTheme,
} from "@mui/material";

const drawerWidth = 240

// Responsive drawer that collapses on mobile
export const drawerWidthCollapsed = 72;

// Custom hook for checking mobile devices
export const useIsMobile = () => {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down('md'));
};

export const useIsTablet = () => {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.between('md', 'lg'));
};

// Custom hook for checking very small screens (below 500px)
export const useIsVerySmall = () => {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down(500));
};

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
})(({ theme, open, isMobile }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && !isMobile && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(isMobile && {
        width: '100%',
    }),
    // Ensure AppBar is always on top on mobile
    [theme.breakpoints.down('md')]: {
        zIndex: 1300,
    },
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile' })(
    ({ theme, open, isMobile }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: isMobile ? '100%' : drawerWidth,
            background: 'rgba(40, 40, 80, 0.95)',
            color: '#fff',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(isMobile && {
                width: '85%',
                maxWidth: 300,
            }),
            ...(!open && !isMobile && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
