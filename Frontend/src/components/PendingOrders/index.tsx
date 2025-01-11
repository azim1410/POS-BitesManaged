import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { SMALL_TXT_CLR } from "../../assets/colors";
import PendingOrderInfoBar from "../../atoms/PendingOrderInfoBar";

const AllPendingOrders = () => {
    const pendingOrdersList = useSelector((state: RootState) => state.pendingorders.items);
    console.log(pendingOrdersList);
  return (
    <Box>
        <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: SMALL_TXT_CLR, textAlign:'left' }}
            >
                Pending Orders
            </Typography>

            {pendingOrdersList.map((order, index) => (
                <PendingOrderInfoBar index={index} order={order}/>
            ))}
    </Box>
  )
}

export default AllPendingOrders