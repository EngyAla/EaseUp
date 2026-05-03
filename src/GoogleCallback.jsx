// import { useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import api from './axiosInstance';

// const GoogleCallback = () => {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const code = searchParams.get("code"); // استخراج الكود من الرابط

//         if (code) {
//             // إرسال الكود للباك إند للحصول على الـ Token
//             api.get(`/api/Auth/google-callback?code=${code}`)
//                 .then(response => {
//                     // هنا ستحصل على الـ Token من الباك إند
//                     console.log("Logged in with Google", response.data);
                    
//                     // حفظ الـ Token والتحويل للوحة التحكم
//                     localStorage.setItem("token", response.data.token);
//                     navigate("/dashboard");
//                 })
//                 .catch(err => {
//                     console.error("Google Auth failed", err);
//                     navigate("/login"); // في حال فشل العملية
//                 });
//         }
//     }, [searchParams, navigate]);

//     return <div>جاري تسجيل الدخول عبر جوجل...</div>;
// };

// export default GoogleCallback;