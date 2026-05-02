import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router';



// @ts-ignore
const Cards = ({data}) => {
    const {
        mainTitle,
        result,
        colors = {}
    } = data;

    const {
        subTxtColor,
        mainNumColor,
        cardBgColor = "#fff"
    } = colors;

    return (
        <Card sx={{bgcolor: cardBgColor, boxShadow: "1px 1px 5px rgba(189, 189, 189, 0.3)", height: "110px"}}>
            <CardActionArea sx={{ height: '100%',}}>
                <CardContent sx={{ height: '100%' }}>
                    <Box sx={{display: "flex", flexDirection: "column", gap: .5, justifyContent: "center", alignItems: "center"}}>
                        <Typography variant='h5'  sx={{fontWeight: 700, mt: 1, color: mainNumColor, }}>{mainTitle}</Typography>
                        <Typography variant='body2' sx={{fontSize: 18, color: subTxtColor}}>{result}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Cards;