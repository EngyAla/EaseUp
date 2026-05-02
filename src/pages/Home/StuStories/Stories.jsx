import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Avatar } from '@mui/material';
import styles from './Stories.module.css';



const Stores = () => {
    let cardData = [
        {circleBgColor: "#00796B33", circleTxtColor: "#00796B", name: "Sarah Chen", status: "Sophomore, Psychology Major", story: '"EaseUp helped me realize I was burning out way before I actually hit a wall. The mood tracking made patterns obvious, and the AI chatbot gave me the courage to book my first counseling session."'},
        {circleBgColor: "#9333EA33", circleTxtColor: "#9333EA", name: "Marcus Keller", status: "Junior, Engineering Major", story: '"As an international student, I often felt isolated. Having a 24/7 safe space to vent and get resources in my pocket made a world of difference during my first semester."'},
        {circleBgColor: "#2aaacd33", circleTxtColor: "#2aaacd", name: "Sarah Chen", status: "Sophomore, Psychology Major", story: '"EaseUp helped me realize I was burning out way before I actually hit a wall. The mood tracking made patterns obvious, and the AI chatbot gave me the courage to book my first counseling session."'},
        {circleBgColor: "#ea33e433", circleTxtColor: "#ea33e4fd", name: "Marcus Keller", status: "Junior, Engineering Major", story: '"As an international student, I often felt isolated. Having a 24/7 safe space to vent and get resources in my pocket made a world of difference during my first semester."'},
    ]
    const renderCards = (data) =>(
        <Box className={styles.brand_cards}>
            {data.map((e, index) =>{
                return(
                    <Box className={styles.brand_card} key={index} sx={{ bgcolor: "#F1F5F9", p: 3, borderRadius: 3 }}>
                        <Box sx={{  display: "flex", }}>
                            <Box sx={{ flexGrow: 1}}/>
                            <FormatQuoteIcon sx={{ fontSize: 40, color: "#00796B33" }} />
                        </Box>
                        <Typography variant="body2" sx={{ color: '#64748B', my: 2 }}>
                            {e.story}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2}}>
                            <Avatar sx={{ bgcolor: e.circleBgColor, color: e.circleTxtColor }} alt={e.name} src='#' />
                            <Box>
                                <Typography variant="h6" sx={{ color: "#0F172A", fontWeight: 500 }}>{e.name}</Typography>
                                <Typography variant="body2" sx={{ color: '#64748B'}}>{e.status}</Typography>
                            </Box>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
    return (
        <Box id={'Stories'} sx={{ display: "flex", flexDirection: "column", alignItems: "center",  px: 5, py: 7, bgcolor: "#F8FAFC", }}>
            <Typography variant='h4' sx={{ color: "#0F172A", fontWeight: 500, textAlign: "center", mb: 5}}>Stories from Our Community</Typography>
            <Box className={styles.carousel}>
                {renderCards(cardData)}
                {renderCards(cardData)}
            </Box>
        </Box>
    )
}

export default Stores;