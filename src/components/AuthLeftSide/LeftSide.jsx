import Box from '@mui/material/Box'
import SpaIcon from '@mui/icons-material/Spa';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LeftSide = ({ direction, bgColor, icon, iconBgColor, title, subTitle, imageSrc, featuresList }) => {
    return (
        <Box sx={{backgroundColor: bgColor, minHeight: {xs: "fit-content", md: "100vh"}, height: {xs: "fit-content", md: "100%"}, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: direction === "center" ? "center" : "flex-start", gap: 5, p: 3, borderRadius: {xs: "0px 0px 30px 30px", md: "0px"} }}>
            <Box sx={{bgcolor: iconBgColor, p: 1, borderRadius: 2}}>
                {icon}
            </Box>
            <Box sx={{textAlign: direction}}>
                <Typography variant='h5' component='h1' sx={{ color: '#0F172A', fontWeight: 600, fontSize: { xs: 28, md: 32 } }} >{title}</Typography>
                <Typography variant='body1' sx={{ color: '#475569', fontWeight: 400, fontSize: 16, mt: 2 }} >{subTitle}</Typography>
            </Box>
            {imageSrc &&(
                <Box sx={{
                        width: { xs: 180, md: 256 },
                        height: { xs: 180, md: 256 }, 
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "4px solid #fff",
                        boxShadow: 3 ,
                        display: { xs: "none", md: "flex" },}}>
                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={imageSrc} alt="login image" loading='lazy' width={"100%"} height={"100%"}  />
                </Box>
            )}
            {featuresList &&(
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant='body1' sx={{ display: "flex", alignItems: "center", gap: 1, color: "#334155" }}><CheckCircleIcon sx={{color: "#00796B" }}/> Personalized academic dashboard</Typography>
                    <Typography variant='body1' sx={{ display: "flex", alignItems: "center", gap: 1, color: "#334155" }}><CheckCircleIcon sx={{color: "#00796B" }}/> Smart assignment reminders</Typography>
                    <Typography variant='body1' sx={{ display: "flex", alignItems: "center", gap: 1, color: "#334155" }}><CheckCircleIcon sx={{color: "#00796B" }}/> Collaborative study groups</Typography>
                </Box>
            )}
        </Box>
    )
}

export default LeftSide;