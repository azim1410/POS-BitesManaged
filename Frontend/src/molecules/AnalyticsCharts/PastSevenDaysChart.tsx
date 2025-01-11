
// import { useEffect, useState } from 'react';
// import { calculateSalesPerDayLast7Days } from '../../features/Analytics/AnalyticsServices';
// import { Box, Typography } from '@mui/material';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { PRIMARY_CLR, SMALL_TXT_CLR } from '../../assets/colors';

// const PastSevenDaysChart = () => {
//     const [data, setData] = useState<number[]>([]);

//     const getData = async () => {
//         const response = await calculateSalesPerDayLast7Days();
//         console.log(response);
//         setData(response);
//     };

//     useEffect(() => {
//         getData();
//     }, []);

//     const chartData = data.map((sales, index) => ({
//         day: `Day ${7 - index}`,
//         sales
//     }));

//     return (
//         <Box sx={{ width: '70%', height: '50vh' , padding:'2rem', margin:'auto'}}>
//             <Typography
//                 variant="h6"
//                 sx={{ fontWeight: 600, color: SMALL_TXT_CLR, }}
//             >
//                 Your past 7 days sales
//             </Typography>
//             <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="day" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="sales" fill={PRIMARY_CLR} />
//                 </BarChart>
//             </ResponsiveContainer>
//         </Box>
//     );
// };

// export default PastSevenDaysChart;


import { useEffect, useState } from 'react';
import { calculateSalesPerDayLast7Days } from '../../features/Analytics/AnalyticsServices';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { PRIMARY_CLR, SMALL_TXT_CLR } from '../../assets/colors';

const PastSevenDaysChart = () => {
    const [data, setData] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const response = await calculateSalesPerDayLast7Days();
        setData(response);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const chartData = data.map((sales, index) => ({
        day: `Day ${7 - index}`,
        sales
    }));

    if (loading) {
        return <Typography sx={{fontWeight: 600, color:PRIMARY_CLR, marginTop:'3rem'}}>Loading Chart...</Typography>;
    }

    return (
        <Box 
            sx={{ 
                width: { xs: '90%', sm: '80%', md: '70%' }, 
                height: '50vh', 
                padding: '2rem', 
                margin: 'auto',
                marginTop:'2rem',
            }}
        >
            <Typography
                variant="h6"
                sx={{ 
                    fontWeight: 600, 
                    color: SMALL_TXT_CLR, 
                    marginBottom: '1rem',
                    textAlign: 'center',
                }}
            >
                Your Sales Over the Last 7 Days
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="day" 
                        stroke={SMALL_TXT_CLR}
                        tick={{ fill: SMALL_TXT_CLR }}
                        fontSize="14px"
                    />
                    <YAxis 
                        stroke={SMALL_TXT_CLR}
                        tick={{ fill: SMALL_TXT_CLR }}
                        fontSize="14px"
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '5px' }} />
                    <Legend />
                    <Bar dataKey="sales" fill='#6994ff' radius={[15, 15, 0, 0]}>
                        <LabelList dataKey="sales" position="top" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default PastSevenDaysChart;
