import Grid from '@mui/material/Grid';
import LeftSide from '../../components/AuthLeftSide/LeftSide';
import { Box, Typography } from '@mui/material';
import RightSideHeader from '../../components/AuthRightSide/RightSideHeader';
import SchoolIcon from '@mui/icons-material/School';
import passwordImage from '../../../public/assets/forgetPassword.png'
import ForgetPasswordForm from './ForgetPasswordForm';



const ForgetPassword = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{backgroundColor: "#A3C0BE", minHeight: {xs: "fit-content", md: "100vh"}, height: {xs: "fit-content", md: "100%"}, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5, p: 3, borderRadius: {xs: "0px 0px 30px 30px", md: "0px"} }}>
                    <Box sx={{
                        width: { xs: 180, md: 296 },
                        height: { xs: 180, md: 296 }, 
                        borderRadius: "10px",
                        overflow: "hidden",
                        border: "14px solid #fff",
                        boxShadow: 3 ,
                        display: { xs: "none", md: "flex" },}}>
                        <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "5px" }} src={passwordImage} alt="login image" loading='lazy' width={"100%"} height={"100%"}  />
                    </Box>
                    <Box sx={{textAlign: "center"}}>
                        <Typography variant='h5' component='h1' sx={{ color: '#0F172A', fontWeight: 600, fontSize: { xs: 28, md: 32 } }} >Your security is our priority</Typography>
                        <Typography variant='body1' sx={{ color: '#475569', fontWeight: 400, fontSize: 16, mt: 2 }} >EaseUp uses industry-standard encryption to ensure your data stays safe while you reset your credentials.</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", gap: 5, p: 3 }}>
                    <RightSideHeader backToHome={false} title={"Forgot Password?"} subTitle={"No worries! Enter the email address associated with your account and we'll send you a link to reset your password."} />
                    <ForgetPasswordForm /> 
                </Box>
            </Grid>
        </Grid>
    )
}

export default ForgetPassword;