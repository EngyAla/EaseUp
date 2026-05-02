import Grid from '@mui/material/Grid';
import LeftSide from '../../components/AuthLeftSide/LeftSide';
import { Box } from '@mui/material';
import RightSideHeader from '../../components/AuthRightSide/RightSideHeader';
import LoginForm from './LoginForm';
import SpaIcon from '@mui/icons-material/Spa';
import loginImage from '../../assets/loginImage.png'



const Login = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <LeftSide 
                    direction={"center"}
                    bgColor={"#A3C0BEB2"}
                    icon={<SpaIcon sx={{color: "#00796B", fontSize: "42px"}} />} 
                    iconBgColor={"#fff"}
                    title={"Find your inner calm and academic balance"} 
                    subTitle={"Join thousands of students who prioritize their mental well-being with EaseUp."}
                    imageSrc={loginImage}
                    />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", gap: 5, p: 3 }}>
                    <RightSideHeader backToHome={true} title={"Welcome Back"} subTitle={"Please enter your details to sign in to your account."} />
                    <LoginForm />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login;