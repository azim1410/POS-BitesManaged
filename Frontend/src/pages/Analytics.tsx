import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import { CONTAINER_BG_CLR } from '../assets/colors'
import PageHeader from '../components/PageHeader'
import { useEffect, useState } from 'react'
import { calculateSales, calculateTodaysSales } from '../features/Analytics/AnalyticsServices'
import SalesCard from '../atoms/SalesCard'
import PastSevenDaysChart from '../molecules/AnalyticsCharts/PastSevenDaysChart'


const Analytics = () => {
  const [todaysSales, setTodaysSales] = useState<string|number>();
  const [past7Days, setPast7Days] = useState<string | number>();
  const [pastMonth, setPastMonth] = useState<string | number>();
  const [pastYear, setPastYear] = useState<string | number>();

  const getTodaysSales = async () => {
      const response = await calculateTodaysSales();
      console.log(response);
      setTodaysSales(response);
  };

  const getSalesData = async () => {
    const response = await calculateSales();
    console.log(response);
    setPast7Days(response.past7Days);
    setPastMonth(response.pastMonth);
    setPastYear(response.pastYear);
  }



  useEffect(() => {
    getTodaysSales();
    getSalesData();
  }, []);


  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Navbar />
      <Box
        sx={{
          width: '80%',
          padding: '2rem',
          backgroundColor: CONTAINER_BG_CLR,
          borderRadius: '20px',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
        }}
      >
        <PageHeader title="Analytics" />

        <Box sx={{padding:'1rem'}}>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <SalesCard title='Todays Revenue' salesfigure={todaysSales}/>
          <SalesCard title='Past 7 days Revenue' salesfigure={past7Days}/>
          <SalesCard title='This Month Revenue' salesfigure={pastMonth}/>
          <SalesCard title='This Year revenue' salesfigure={pastYear}/>
        </Box>

          <PastSevenDaysChart />
        </Box>
      </Box>
    </Box>
  )
}

export default Analytics