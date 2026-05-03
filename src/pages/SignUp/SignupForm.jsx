import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '../../validations/validSignup';
import api from '../../api/axiosInstance';


const SignupForm = () => {
    const navigate = useNavigate();
    
    // تأكد من تحديث الـ signupSchema ليشمل الحقول الجديدة (firstName, lastName, address, phoneNumber)
    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm({
        mode: 'onChange',
        resolver: zodResolver(signupSchema), 
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            phoneNumber: ""
        },
    });

    const onSubmit = async (data) => {
        try {
            // إرسال البيانات للـ API
            const response = await api.post('/api/Auth/register', data);
            console.log("Success:", response.data);
            reset();
            navigate("/login");
        } catch (error) {
            console.error("Error signing up:", error.response?.data || error.message);
            alert(error.response?.data);
            // يمكنك إضافة تنبيه للمستخدم هنا (Toast notification)
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{width: "100%", display: "flex", flexDirection: "column", gap: 2}}>
            <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
                {/* <label htmlFor='fullname'style={{ width: "fit-content"}}>Full Name</label>
                <TextField variant="outlined" id="fullname" sx={{width: {sm: "100%", md: "90%"},}}
                type='text' 
                placeholder='Alex Johnson' 
                {...register('name')}
                error={!!errors.name}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.name?.message}</Typography> */}
                <TextField sx={{width: {sm: "100%", md: "44%"},}} placeholder="First Name" {...register('firstName')} error={!!errors.firstName} helperText={errors.firstName?.message} />
                <TextField sx={{width: {sm: "100%", md: "44%"},}} placeholder="Last Name" {...register('lastName')} error={!!errors.lastName} helperText={errors.lastName?.message} />
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                {/* <label htmlFor='email'style={{ width: "fit-content"}}>University Email</label> */}
                <TextField variant="outlined" id="email" sx={{width: {sm: "100%", md: "90%"},}}
                type='email' 
                placeholder='mans@uni.edu' 
                {...register('email')}
                error={!!errors.email}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.email?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2,  }}>
                {/* <label htmlFor='currentPassword' style={{ width: "fit-content" }}>Password</label> */}
                <TextField variant="outlined" id="currentPassword" sx={{width: {sm: "100%", md: "90%"},}}
                type='password' 
                placeholder='Enter your password'
                {...register('password')}
                error={!!errors.password}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f", }}>{errors.password?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2,  }}>
                {/* <label htmlFor='confirmPassword' style={{ width: "fit-content" }}>Confirm Password</label> */}
                <TextField variant="outlined" id="confirmPassword" sx={{width: {sm: "100%", md: "90%"},}}
                type='password' 
                placeholder='Confirm your password'
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f", }}>{errors.confirmPassword?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", gap: 2,  }}>
                <TextField sx={{width: {sm: "100%", md: "44%"},}}  placeholder="Address" {...register('address')} error={!!errors.address} helperText={errors.address?.message} />
            
                <TextField sx={{width: {sm: "100%", md: "44%"},}}  placeholder="Phone Number" {...register('phoneNumber')} error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />
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
        </Box>
    )
}

export default SignupForm;