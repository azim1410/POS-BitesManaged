import { Box, Button, Typography } from '@mui/material'
import { PRIMARY_CLR, SMALL_TXT_CLR } from '../../assets/colors'
import { IoAdd } from 'react-icons/io5'
import { FiMinus } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeItemFromOrder } from '../../features/orders/OrderSlice';

type ItemBarProps = {
    index: number; // The index of the item in the order array
    name: string;
    price: string;
    quantity: string;
};

const ItemBar = ({index, name, price , quantity}: ItemBarProps) => {
    const dispatch = useDispatch();
    const handleIncrQuantity = () => {
        dispatch(increaseQuantity(index))
    }

    const handleDecrQuantity = () => {
        if(quantity === '1'){
            dispatch(removeItemFromOrder(index));
        }
        else dispatch(decreaseQuantity(index));
    }
  return (
    <Box sx={{display:'flex', justifyContent:'space-between', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',padding:'0.2rem', marginBottom:'0.7rem', borderRadius: 4, paddingLeft:'1rem'}}>
        <Box>
            <Typography sx={{fontWeight: 500, color: SMALL_TXT_CLR, fontSize:'1rem', fontFamily:'monospace'}}>{name}</Typography>
            <Typography sx={{fontWeight: 700, color: SMALL_TXT_CLR}}>₹{price}</Typography>
        </Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
                <Button onClick={handleIncrQuantity}  sx={{ color: PRIMARY_CLR, fontSize: 20 }}>
                    <IoAdd />
                </Button>
                <Typography sx={{ color: SMALL_TXT_CLR, fontSize: 20 }}>{quantity}</Typography>
                <Button onClick={handleDecrQuantity}  sx={{ color: PRIMARY_CLR, fontSize: 20 }}>
                <FiMinus />
                </Button>
            </Box>
    </Box>
  )
}

export default ItemBar