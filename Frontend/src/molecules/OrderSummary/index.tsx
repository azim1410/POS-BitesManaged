import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { orderSingleItem } from '../../features/orders/OrderServices';
import ItemBar from '../../atoms/ItemBar';
import { HEADER_TXT_CLR, PRIMARY_CLR, SMALL_TXT_CLR } from '../../assets/colors';
import { useState } from 'react';
import { VscPercentage } from "react-icons/vsc";
import { MdOutlineNumbers } from "react-icons/md";
import { applyDiscount } from '../../features/orders/OrderSlice';

const OrderSummary = () => {
    const dispatch = useDispatch();
    const currentOrder = useSelector((state: RootState) => state.order.order);
    const totalAmount = useSelector((state: RootState) => state.order.order.total);
    const [discount, setDiscount] = useState<number>(0); // Discount value
    const [discTypeAmnt, setDiscType] = useState<boolean>(true); // true for amount, false for percentage

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setDiscount(value);
    };

    const selectDiscount = () => {
        setDiscType(!discTypeAmnt);
    };

    const handleapplyDiscount = () => {
        if (discTypeAmnt) {
            // Fixed discount amount
            dispatch(applyDiscount(discount));
        } else {
            // Percentage discount
            if (discount >= 0 && discount <= 100) {
                const calculatedDiscount = (totalAmount * discount) / 100;
                dispatch(applyDiscount(calculatedDiscount));
            } else {
                alert("Percentage must be between 0 and 100");
            }
        }
    };

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Typography variant="h6" sx={{ color: SMALL_TXT_CLR, fontWeight: 700 }}>
                Order
            </Typography>
            <Box sx={{ marginTop: '1rem' }}>
                {currentOrder.items.map((item: orderSingleItem, index: number) => (
                    <ItemBar key={index} index={index} name={item.name} price={item.price} quantity={item.quantity} />
                ))}
            </Box>
            <Box
                sx={{
                    marginBottom: '1rem',
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <TextField
                        label="Enter Discount"
                        name="discount"
                        value={discount}
                        onChange={handleDiscountChange}
                        type="number"
                        sx={{ marginRight: '0.5rem' }}
                    />
                    <Button
                        sx={{ backgroundColor: discTypeAmnt === false ? '#cbdbfe' : '#ffffff' }}
                        onClick={selectDiscount}
                    >
                        <VscPercentage />
                    </Button>
                    <Button
                        sx={{ backgroundColor: discTypeAmnt === true ? '#cbdbfe' : '#ffffff' }}
                        onClick={selectDiscount}
                    >
                        <MdOutlineNumbers />
                    </Button>
                </Box>
                <Button
                    variant="contained"
                    onClick={handleapplyDiscount}
                    sx={{
                        backgroundColor: PRIMARY_CLR,
                        borderRadius: '8px',
                        boxShadow: 'none',
                        marginRight: '0.5rem',
                    }}
                >
                    Apply
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    boxShadow: 'rgba(175, 213, 255, 0.46) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
                    borderRadius: 4,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, color: PRIMARY_CLR }}>
                    Total
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: HEADER_TXT_CLR }}>
                    ₹ {totalAmount}
                </Typography>
            </Box>
        </Box>
    );
};

export default OrderSummary;
