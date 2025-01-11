import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getInventoryData } from '../features/inventory/inventoryService';
import { setInventoryData } from '../features/inventory/inventorySlice';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import { CONTAINER_BG_CLR } from '../assets/colors';
import PageHeader from '../components/PageHeader';
import CreateOrder from '../components/CreateOrder';
import AllPendingOrders from '../components/PendingOrders';

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const response = await getInventoryData();
      dispatch(setInventoryData(response));
    };
    getData();
  }, [dispatch]);

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
        <PageHeader title="Billing" />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Box sx={{ width: '60%', textAlign: 'left' }}>
            <CreateOrder />
          </Box>

          <Box sx={{ width: '30%', height:'max-content', padding:'1rem', borderRadius: 3, boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}>
            <AllPendingOrders />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home