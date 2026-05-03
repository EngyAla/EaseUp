import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../validations/validLogin';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import api from '../../api/axiosInstance';


const LoginForm = () => {
    const navigate = useNavigate();
    const { handleSubmit, register, formState: {errors, isSubmitting }, control } = useForm({
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false, // قيمة مبدئية
        },
    });
    const onSubmit = async (data) => {
        try {
            const response = await api.post('/api/Auth/login', data);
            
            console.log("Login Successful:", response.data);
            
            localStorage.setItem("token", response.data.token);

            navigate("/dashboard");
        } catch (error) {
            console.error("Login Failed:", error.response?.data);
            alert(error.response?.data.message)
        }
    };

    // const handleGoogleLogin = () => {
    //     // هذا سيوجه المستخدم مباشرة لرابط الباك إند الخاص بك
    //     // الباك إند بدوره سيقوم بعمل Redirect لصفحة Google Login
    //     window.location.href = "http://localhost:5296/api/Auth/redirect-to-google";
    // };


    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{width: "100%", display: "flex", flexDirection: "column", gap: 3}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <label htmlFor='email'style={{ width: "fit-content"}}>Email Address</label>
                <TextField variant="outlined" id="email" sx={{width: {sm: "100%", md: "90%"},}}
                type='email' 
                placeholder='admin@gmail.com' 
                {...register('email')}
                error={!!errors.email}
                // helperText={errors.email?.message}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.email?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2,  }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: {xs: "100%", md: "90%"},}}>
                    <label htmlFor='password' style={{ width: "fit-content" }}>Password</label>
                    <Link to={'/forgetPassword'} style={{ color: "#00796B", textDecoration: "none", fontSize: 14 }}>
                        Forgot Password?
                    </Link>
                </Box>
                <TextField variant="outlined" id="password" sx={{width: {sm: "100%", md: "90%"},}}
                type='password' 
                placeholder='Enter your password'
                {...register('password')}
                error={!!errors.password}
                // helperText={errors.password?.message}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f", }}>{errors.password?.message}</Typography>
                {/* Checkbox لها تعامل خاص | لانها مكونه  */}
                <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                    <FormControlLabel
                    control={
                        <Checkbox
                        {...field}
                        checked={field.value} // مهم جداً تربطي الـ checked بـ field.value
                        onChange={(e) => field.onChange(e.target.checked)} // وتحدثي القيمة بـ checked
                        sx={{ color: "#CBD5E1" }}
                        />
                    }
                    label="Remember me for 30 days"
                    sx={{ color: "#475569", width: "fit-content", marginTop: errors.password?.message ? 0 : -3 }}
                    />
                )}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f", }}>{errors.rememberMe?.message}</Typography>
            </Box>
            <Button variant="contained"
            sx={{width: {xs: "100%", md: "90%"}, backgroundColor: "#00796B", py: 1.3 }}
            type="submit"
            disabled={isSubmitting}
            >
                login
            </Button>
            <Typography variant='body1' sx={{color: "#94A3B8", textAlign: "center", fontWeight: 500, fontSize: 14, marginTop: -1}}>
                Don't have an account? &nbsp;
                <Link to={'/signup'} style={{ color: "#00796B", textDecoration: "none" }}>
                    Create an account
                </Link>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, width: {xs: "100%", md: "90%"}, mt: 3, flexWrap: {xs: "wrap", md: "nowrap"}}}>
                <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ width: {xs: "100%", md: "50%"}, color: "#334155", borderColor: "#d3d7dd", textTransform: "capitalize" }}>
                    Google
                </Button>
                <Button variant="outlined" startIcon={<LinkedInIcon />} sx={{ width: {xs: "100%", md: "50%"}, color: "#334155", borderColor: "#d3d7dd", textTransform: "capitalize" }}>
                    LinkedIn
                </Button>
            </Box>
            <Typography variant='body1' sx={{color: "#94A3B8", textAlign: "center", fontWeight: 400, fontSize: 12, mt: 2}}>© 2026 EaseUp Wellness Platform. All rights reserved.</Typography>
        </Box>
    )
}

export default LoginForm;