import Box from '@mui/material/Box';
import { LineChart, lineClasses } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const amtData = [2000, 1000, 4000, 2000, 3000, 4000, 1000];

const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];

export default function StuLineChart() {
    return (
        <Box sx={{ width: '100%', height: 300 }}>
        <LineChart
            series={[
            { data: pData, label: 'pv', id: 'pvId',  },     // سيكون متقطعاً
            { data: uData, label: 'uv', id: 'uvId' },     // سيكون متقطعاً
            { data: amtData, label: 'amt', id: 'amtId', color: "#229083" }, // سيكون متصلاً (عادي)
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}
            yAxis={[{ width: 50 }]}
            sx={{
            // تحديد النمط للخط الأول
            [`& .${lineClasses.line}[data-series="pvId"]`]: {
                strokeDasharray: '5 5',
            },
            // تحديد النمط للخط الثاني
            [`& .${lineClasses.line}[data-series="uvId"]`]: {
                strokeDasharray: '3 4 5 2',
            },
            // الخط الثالث (amtId) لن نطبق عليه أي نمط، فيبقى افتراضياً (Solid)
            [`& .${lineClasses.line}[data-series="amtId"]`]: {
                strokeWidth: 6, // يمكنك زيادة الرقم لزيادة السمك
            },
            }}
            margin={{ right: 24 }}
        />
        </Box>
    );
}