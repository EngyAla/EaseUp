import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

// دالة لتحديد اللون بناءً على قيمة الـ Sentiment
const getColor = (value) => {
  if (value === 0) return '#f0f0f0'; // لون الأيام الفارغة/لا بيانات
  if (value < 3) return '#c6e1d2';   // لون خفيف
  if (value < 7) return '#7ab78e';   // لون متوسط
  return '#00796B';                 // لون غامق (أعلى قيمة)
};

const StuHeatmap = () => {
    const daysLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    const mockData = [
    [0, 2, 0, 5, 0, 4, 3], // الأسبوع 1
    [8, 5, 0, 0, 9, 4, 4], // الأسبوع 2
    [9, 0, 0, 0, 0, 0, 9], // الأسبوع 3
    [8, 7, 6, 5, 4, 4, 0], // الأسبوع 4
    [8, 0, 0, 5, 9, 0, 3], // الأسبوع 5
    [9, 9, 4, 9, 9, 4, 9], // الأسبوع 6
];

return (
        <Box sx={{ display: 'flex', gap: '140px', alignItems: 'center', mt: 5, ml: 10,}}>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', mr: 1 }}>
            {daysLabels.map((day, i) => (
            <Box key={i} sx={{ height: 30, display: 'flex', alignItems: 'center',  }}>
                {day}
            </Box>
            ))}
        </Box>

        {mockData?.map((week, weekIndex) => (
        <Box key={weekIndex} sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {week.map((dayValue, dayIndex) => (
                <Tooltip title={`Value: ${dayValue}`} key={dayIndex}>
                <Box
                    sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: getColor(dayValue),
                    borderRadius: '2px',
                    cursor: 'pointer',
                    }}
                />
                </Tooltip>
            ))}
            </Box>
        ))}
    </Box>
    );
};

export default StuHeatmap;