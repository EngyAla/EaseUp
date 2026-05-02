import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '../../validations/validSignup';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';


const SignupForm = () => {
    const navigate = useNavigate();
    const { handleSubmit, register, formState: {errors, isSubmitting }, reset } = useForm({
        mode: 'onChange',
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            currentPassword: "",
            confirmPassword: ""
        },
    });
    const onSubmit = ({name, email, currentPassword, confirmPassword}) =>{
        const studentSignupData = { name, email, currentPassword, confirmPassword };
        console.log(studentSignupData);
        reset();
        navigate("/login")
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{width: "100%", display: "flex", flexDirection: "column", gap: 2}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <label htmlFor='fullname'style={{ width: "fit-content"}}>Full Name</label>
                <TextField variant="outlined" id="fullname" sx={{width: {sm: "100%", md: "90%"},}}
                type='text' 
                placeholder='Alex Johnson' 
                {...register('name')}
                error={!!errors.name}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.name?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <label htmlFor='email'style={{ width: "fit-content"}}>University Email</label>
                <TextField variant="outlined" id="email" sx={{width: {sm: "100%", md: "90%"},}}
                type='email' 
                placeholder='mans@uni.edu' 
                {...register('email')}
                error={!!errors.email}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.email?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2,  }}>
                <label htmlFor='currentPassword' style={{ width: "fit-content" }}>Password</label>
                <TextField variant="outlined" id="currentPassword" sx={{width: {sm: "100%", md: "90%"},}}
                type='password' 
                placeholder='Enter your password'
                {...register('currentPassword')}
                error={!!errors.currentPassword}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f", }}>{errors.currentPassword?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2,  }}>
                <label htmlFor='confirmPassword' style={{ width: "fit-content" }}>Confirm Password</label>
                <TextField variant="outlined" id="confirmPassword" sx={{width: {sm: "100%", md: "90%"},}}
                type='confirmPassword' 
                placeholder='Confirm your password'
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f", }}>{errors.confirmPassword?.message}</Typography>
            </Box>



            <Button variant="contained"
            sx={{width: {xs: "100%", md: "90%"}, backgroundColor: "#00796B", py: 1.3 }}
            type="submit"
            disabled={isSubmitting}
            >
                Register
            </Button>
            <Typography variant='body1' sx={{color: "#94A3B8", textAlign: "center", fontWeight: 500, fontSize: 14, marginTop: -1}}>
                Already have an account? &nbsp;
                <Link to={'/login'} style={{ color: "#00796B", textDecoration: "none" }}>
                    Back to Login
                </Link>
            </Typography>
            {/* <Typography variant='body1' sx={{color: "#94A3B8", textAlign: "center", fontWeight: 400, fontSize: 12, mt: 2}}>© 2026 EaseUp Wellness Platform. All rights reserved.</Typography> */}
        </Box>
    )
}

export default SignupForm;