// @ts-nocheck
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from '../../public/assets/logo3.png'
import Avatar from "@mui/material/Avatar";
import { Button, Tooltip } from "@mui/material";

import DashboardIcon from '@mui/icons-material/Dashboard';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import QuizIcon from '@mui/icons-material/Quiz';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';



const drawerWidth = 240;

const Drawer = styled(
    MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
    })(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    backgroundColor: "red",
    variants: [
        {
        props: ({ open }) => open,
        style: {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
        },
        },
        {
        props: ({ open }) => !open,
        style: {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        },
        },
    ],
})
);

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#fff"
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: "#fff"

});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));



let sideBarSections = [
    {
        "text": "Dashboard",
        "icon": <DashboardIcon />,
        "path": "/dashboard"
    },
    {
        "text": "Journal",
        "icon": <EditDocumentIcon />,
        "path": "/dashboard/journaling"
    },
    {
        "text": "Surveys",
        "icon": <QuizIcon />,
        "path": "/dashboard/survey"
    },
    {
        "text": "Goals",
        "icon": <TrackChangesIcon />,
        "path": "/dashboard/goals"
    },
    {
        "text": "Exercises",
        "icon": <SelfImprovementIcon />,
        "path": "/dashboard/exercises"
    },
    {
        "text": "AI Chat",
        "icon": <SmartToyIcon />,
        "path": "/dashboard/chatbot"
    },
    // {
    //     "text": "Community",
    //     "icon": <GroupsIcon />,
    //     "path": "/dashboard/communitychat"
    // },
    // {
    //     "text": "Gemenification",
    //     "icon": <EmojiEventsIcon />,
    //     "path": "/dashboard/settings"
    // },
]

const SideBar = ({open, handleDrawerClose}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    

    return (
        <Drawer variant="permanent" open={open} >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    { theme.direction === "rtl" ? (<ChevronRightIcon />) : (<ChevronLeftIcon />) }
                </IconButton>
            </DrawerHeader>
            <Divider />
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 1.5, py: 1.3}}>
                <img src={logo} alt="logo" width={55} height={55} />
                <Box sx={[ open ? {display: "block"}: {display: "none"} ]}>
                    <Typography variant="h6" sx={{color: "#0F172A", fontWeight: 700, fontSize: "18px"}}>Ease Up</Typography>
                    <Typography variant="body1" sx={{color: "#64748B", fontWeight: 400, fontSize: "14px"}}>Student Well-Being</Typography>
                </Box>
            </Box>
            <Divider />
            <List sx={{flexGrow: 1}}>
                {sideBarSections.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                    <ListItemButton onClick={() => navigate(item.path)}
                    sx={[
                        {
                        minHeight: 48,
                        px: 2.5,
                        mx: 1,
                        mb: .4,
                        bgcolor: location.pathname === item.path ? "#E0F2F1" : null,
                        borderRadius: location.pathname === item.path ? 2 : null,
                        borderRight: location.pathname === item.path && open ? "3px solid #00796B" : null,
                        color: location.pathname === item.path ? "#00796B" : "#475569"
                        },
                        open
                        ? {
                            justifyContent: "initial",
                            }
                        : {
                            justifyContent: "center",
                            },
                    ]}
                    >
                    <ListItemIcon
                        sx={[
                        {
                            minWidth: 0,
                            justifyContent: "center",
                            color: location.pathname === item.path ? "#00796B" : "#475569"
                        },
                        open
                            ? {
                                mr: 3,
                            }
                            : {
                                mr: "auto",
                            },
                        ]}
                    >
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={item.text}
                        sx={[
                        open
                            ? {
                                opacity: 1,
                            }
                            : {
                                opacity: 0,
                            },
                        ]}
                    />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            {/* <Divider /> */}
                <Box sx={{ display: open ? "" : "none", bgcolor: "#308CE80D", border: "1px solid #308CE81A", borderRadius: "8px", m: 2, p: 2}}>
                    <Typography variant="h6" sx={{ color: "#334155", fontSize: "17px"}}>Need help?</Typography>
                    <Typography variant="body2" sx={{ color: "#64748B" }}>Speak to a counselor now.</Typography>
                    <Link to={'/dashboard/chatbot'}>
                        <Button variant="contained"  sx={{ textAlign: "center", mt: 2, width: "100%"}}>Get Support</Button>
                    </Link>
                </Box>
        </Drawer>
    );
};

export default SideBar;