import { Box, Grid, Typography } from '@mui/material';
import Cards from '../../components/Cards';
import StuLineChart from './LineChart';
import StuHeatmap from './Heatmap';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { useState } from 'react';


const Dashboard = () => {
    // const [age, setAge] = useState('');

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };
    const cardsData = [
        {
            mainTitle: "Despresion",
            result: "Mild",
            colors: {
            subTxtColor: "#94A3B8",
            mainNumColor: "#0F172A"
            }
        },
        {
            mainTitle: "Anxiety",
            result: "Minimal",
            colors: {
            subTxtColor: "#94A3B8",
            mainNumColor: "#0F172A"
            }
        },
        {
            mainTitle: "Stress",
            result: "Moderate",
            colors: {
            subTxtColor: "#94A3B8",
            mainNumColor: "#0F172A"
            }
        }
    ];

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }}  >
                {/* <Grid size={{ xs: 12 }} sx={{ bgcolor: "#fff", border: "1px solid #e1e0e0a9", p: 2, borderRadius: "5px"}}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography variant='body1' sx={{ flexGrow: 1}}>Your state dashboard</Typography>
                        <Box sx={{ minWidth: 170 }} >
                            <FormControl fullWidth size="small" variant="standard">
                                <InputLabel id="demo-simple-select-label">Select Decorator</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="decorator"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Grid> */}
                <Grid size={{ xs: 12, md: 2 }}>
                    <Grid container spacing={2}>
                        {cardsData.map((card, index) => (
                            <Grid key={index} size={{ xs: 12 }}>
                                <Cards data={card} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid size={{ xs: 12, md: 10}}>
                    <Box sx={{ bgcolor: "#fff", border: "1px solid #e1e0e0a9", p: 2, borderRadius: "5px" }}>
                        <Typography variant='body1' sx={{ flexGrow: 1}}>Your <span style={{ fontWeight: "bold", fontSize: "20px"}}>stress</span> over weeks</Typography>
                        <StuLineChart />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Box sx={{ bgcolor: "#fff", border: "1px solid #e1e0e0a9", p: 2, borderRadius: "5px", }}>
                        <Typography variant='body1' sx={{ flexGrow: 1}}>Your <span style={{ fontWeight: "bold", fontSize: "20px",}}>Sentiment</span> Over Time</Typography>
                        <StuHeatmap />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard;