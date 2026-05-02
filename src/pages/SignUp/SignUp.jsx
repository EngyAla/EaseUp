import Grid from '@mui/material/Grid';
import LeftSide from '../../components/AuthLeftSide/LeftSide';
import { Box } from '@mui/material';
import RightSideHeader from '../../components/AuthRightSide/RightSideHeader';
import SchoolIcon from '@mui/icons-material/School';
import SignupForm from './SignupForm';



const SignUp = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <LeftSide 
                    direction={"start"}
                    bgColor={"#E2E8F0"}
                    icon={<SchoolIcon sx={{color: "#00796B", fontSize: "42px"}} />} 
                    iconBgColor={"#00796B1A"}
                    title={"Master your campus life."} 
                    subTitle={"Join the thousands of students using EaseUp to streamline their schedules, manage assignments, and focus on what really matters."}
                    featuresList={true}
                    />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", gap: 5, p: 3 }}>
                    <RightSideHeader backToHome={false} title={"Create your account"} subTitle={"Get started for free today."} />
                    <SignupForm /> 
                </Box>
            </Grid>
        </Grid>
    )
}

export default SignUp;