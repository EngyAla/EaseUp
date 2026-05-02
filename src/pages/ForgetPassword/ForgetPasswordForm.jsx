import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { frogetPassSchema } from '../../validations/validForgetPassword';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const ForgetPasswordForm = () => {
    const navigate = useNavigate();
    const { handleSubmit, register, formState: {errors, isSubmitting }, reset } = useForm({
        mode: 'onChange',
        resolver: zodResolver(frogetPassSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = ({email}) =>{
        const frogetPassData = { email };
        console.log(frogetPassData);
        reset();
        navigate("/otp")
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 2,  height: "50vh"}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <label htmlFor='email'style={{ width: "fit-content"}}>Email Address</label>
                <TextField variant="outlined" id="email" sx={{width: {sm: "100%", md: "90%"},}}
                type='email' 
                placeholder='mans@uni.edu' 
                {...register('email')}
                error={!!errors.email}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.email?.message}</Typography>
            </Box>

            <Button variant="contained"
            sx={{width: {xs: "100%", md: "90%"}, backgroundColor: "#00796B", py: 1.3 }}
            type="submit"
            disabled={isSubmitting}
            >
                Send Reset Link
            </Button>
            <Typography variant='body1' sx={{textAlign: "center", fontWeight: 500, fontSize: 14, marginTop: 2, width: {sm: "100%", md: "90%"},}}>
                <Link to={'/login'} style={{ color: "#64748B", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap:3 }}>
                    <KeyboardBackspaceIcon /> &nbsp; Back to Login
                </Link>
            </Typography>
            {/* <Typography variant='body1' sx={{color: "#94A3B8", textAlign: "center", fontWeight: 400, fontSize: 12, mt: 2}}>© 2026 EaseUp Wellness Platform. All rights reserved.</Typography> */}
        </Box>
    )
}

export default ForgetPasswordForm;