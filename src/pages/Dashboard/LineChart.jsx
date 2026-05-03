import Box from '@mui/material/Box';
import { LineChart, lineClasses } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const amtData = [2000, 1000, 4000, 2000, 3000, 4000, 1000];

const xLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'];

export default function StuLineChart() {
    return (
        <Box sx={{ width: '100%', height: 300 }}>
        <LineChart
            series={[
            { data: pData, label: 'Stress', id: 'pvId',  },     
            { data: uData, label: 'Anxiety', id: 'uvId' },     
            { data: amtData, label: 'Depression', id: 'amtId', color: "#229083" }, 
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}
            yAxis={[{ width: 50 }]}
            sx={{
            [`& .${lineClasses.line}[data-series="pvId"]`]: {
                strokeDasharray: '5 5',
            },
            [`& .${lineClasses.line}[data-series="uvId"]`]: {
                strokeDasharray: '3 4 5 2',
            },
            [`& .${lineClasses.line}[data-series="amtId"]`]: {
                strokeWidth: 6, 
            },
            }}
            margin={{ right: 24 }}
        />
        </Box>
    );
}