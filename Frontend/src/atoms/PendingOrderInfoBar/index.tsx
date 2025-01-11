import { Box, Button, Typography } from "@mui/material"
import { SMALL_TXT_CLR } from "../../assets/colors"
import { MdDeleteForever, MdModeEdit } from "react-icons/md"
import { useDispatch } from "react-redux"
import { removeFromPendingOrders } from "../../features/PendingOrders/PendingOrderSlice"
import { OrderItem } from "../../features/orders/OrderServices"
import { replaceOrderDetails } from "../../features/orders/OrderSlice"
import { IoTimerOutline } from "react-icons/io5";

type infoBarProps = {
    index: number,
    order: OrderItem,
}

const PendingOrderInfoBar = ({ index, order }: infoBarProps) => {
    const dispatch = useDispatch();
    const removeItemfromPO = (ind: number) => {
        dispatch(removeFromPendingOrders(ind))
    }
    const handleReplaceOrder = (currentOrder: OrderItem) => {
        dispatch(replaceOrderDetails(currentOrder))
        removeItemfromPO(index);
    }
    return (
        <Box sx={{
            boxShadow: 'rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px',
            display: 'flex', padding: '0.5rem', marginBottom: '0.2rem', borderRadius: 2, justifyContent: 'space-between', alignItems: 'center',
        }}>
            <Box sx={{width:'50%', display: 'flex', alignItems: 'center' }}>
                {/* <Typography sx={{ fontWeight: 600, color: SMALL_TXT_CLR }}>{index}</Typography> */}
                <IoTimerOutline fontSize={30} />
                <Box sx={{ textAlign: 'left', marginLeft:'0.2rem' }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 200 }}>{order.customer_name}</Typography>
                    <Typography sx={{ fontWeight: 600, color: SMALL_TXT_CLR }}>₹{order.order.total}</Typography>
                </Box>
            </Box>
            <Box sx={{width:'50%', display: 'flex' }}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    onClick={() => handleReplaceOrder(order)}
                >
                    <MdModeEdit />
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    size="medium"
                    onClick={() => removeItemfromPO(index)}
                    sx={{ marginLeft: "0.5rem" }}
                >
                    <MdDeleteForever />
                </Button>
            </Box>
        </Box>
    )
}

export default PendingOrderInfoBar