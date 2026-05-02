// @ts-nocheck
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chip from "@mui/material/Chip";
import { useLocation, useParams } from "react-router";


const drawerWidth = 240;

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
        transform: 'scale(.8)',
        opacity: 1,
        },
        '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
        },
    },
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
    })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#fff",
    boxShadow: "none",
    borderBottom: "1px solid #d3d3d3",
    variants: [
        {
        props: ({ open }) => open,
        style: {
            marginLeft: drawerWidth,
            backgroundColor: "#fff",
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
            }),
        },
        },
    ],
}));

const TopBar = ({ open, handleDrawerOpen }) => {
    const { studentID } = useParams();
    // console.log(studentID)
    const titles = [
        {
            "path": "/dashboard",
            "title": "Dashboard overview"
        },
        {
            "path": "/dashboard/usersList",
            "title": "Users Monitoring List"
        },
        {
            "path": "/dashboard/crisisLogs",
            "title": "Crisis Logs"
        },
        {
            "path": "/dashboard/adminManagement",
            "title": "Admin Management"
        },
        {
            "path": "/dashboard/settings",
            "title": "Profile Information"
        },
        {
            "path": `/dashboard/studentProfile/${studentID}`,
            "title": "Student Profile Information"
        },
    ];
    const location = useLocation();
    const currentTitle = titles.find(
        (title) => location.pathname === title.path
    );
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                color="black"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                    {
                    marginRight: 5,
                    },
                    open && { display: "none" },
                ]}
                >
                <MenuIcon />
                </IconButton>
                <Box>
                    {currentTitle && (
                        <Typography variant="h6" noWrap component="div" sx={{ color: "#0F172A" }}>
                        {currentTitle.title}
                        </Typography>
                    )}
                </Box>
                <Box sx={{flexGrow: 1}}></Box>
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <Box sx={{ display: "flex", position: "relative" }} >
                        <IconButton>
                            <NotificationsIcon sx={{color: "#475569", fontSize: 24,  }} />
                        </IconButton>
                        <Box sx={{ backgroundColor: "#EC5252", width: 8, height: 8, borderRadius: "50%", position: "absolute", left: "28px", top: "15px" }}></Box>
                    </Box>
                    <Chip label="System Online" variant="outlined" sx={{display: {xs: "none", md: "flex"}, flexDirection: "row-reverse", pr: 3, pl: 1, color: "#334155"}} icon={<StyledBadge overlap="circular" variant="dot" ></StyledBadge>}  />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;