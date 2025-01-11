import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import { CONTAINER_BG_CLR } from '../assets/colors'
import PageHeader from '../components/PageHeader'
import OrderDetail from '../components/OrderDetail'

const Orders = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Navbar />
      <Box sx={{ width: "80%", height: "90vh", padding: "2rem", borderRadius: '20px', backgroundColor: CONTAINER_BG_CLR, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
        <PageHeader title="Orders" />
        <OrderDetail />
      </Box>
    </Box>
  )
}

export default Orders