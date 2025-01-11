import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import TextInpSmall from '../../molecules/InputFeildsSmall';
import { SMALL_TXT_CLR } from '../../assets/colors';
import UtilityBtns from '../../molecules/UtilityBtns';
import { InventoryItem } from '../../features/inventory/inventoryService';
import { addItemToOrder, editOrderDetails, resetOrder } from '../../features/orders/OrderSlice';
import OrderSummary from '../../molecules/OrderSummary';
import { supabase } from '../../database/supabaseClient';
import { addtoPendingOrders } from '../../features/PendingOrders/PendingOrderSlice';
import { notifyAddedToPending, notifySuccess } from '../../atoms/Notifications/notifications';


const CreateOrder = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.inventory.items);
    const finalOrder = useSelector((state: RootState) => state.order);
    const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedValue = name === 'ph_number' ? parseInt(value, 10) || 0 : value;

        dispatch(
            editOrderDetails({
                id: finalOrder.id,
                data: { [name]: updatedValue },
            })
        );
    };

    const handleAddProducttoCart = (event: React.SyntheticEvent, newValue: InventoryItem | null) => {
        if (newValue) {
            setSelectedProduct(newValue);
            const item = {
                name: newValue.name,
                price: newValue.price.toString(),
                category: newValue.category,
                quantity: '1',
            }
            dispatch(addItemToOrder(item));
        }
    }

    const handleSave = () => {
        notifyAddedToPending();
        dispatch(addtoPendingOrders(finalOrder));
        handleReset();
    }


    const handleKOT = async () => {
        const newOrder = {
            customer_name: finalOrder.customer_name,
            ph_number: finalOrder.ph_number,
            order: {
                items: Object.entries(finalOrder.order.items).map(([id, product]) => ({
                    name: product.name,
                    price: product.price.toString(),
                    category: product.category,
                    quantity: product.quantity.toString(),
                })),
                total: finalOrder.order.total.toString(),
            },
        };

        try {
            const { data, error } = await supabase.from('OrderItem').insert([newOrder]);
            if (error) throw error;

            console.log('Order created:', data);
            notifySuccess();

            // Call the print function for KOT and customer bill after creating the order
            printBill(newOrder);
            printCBill(newOrder);
            handleReset();
        } catch (error) {
            console.error('Error creating order:', (error as Error).message);
            alert('Failed to create order, please try again.');
        }
    };

    const printCBill = (order: any) => {
        const customerBill = `
            <div style="text-align: center;">
                <h2>Customer Bill</h2>
                <p>Thank you for your purchase!</p>
                <p>Customer Name: ${order.customer_name}</p>
                <p>Phone Number: ${order.ph_number}</p>
                <p>Items:</p>
                <ul>
                    ${order.order.items.map((item: any) => `<li>${item.name} x ${item.quantity} - ${item.price}</li>`).join('')}
                </ul>
                <p>Total: ${order.order.total}</p>
                <p>Enjoy your meal!</p>
            </div>
        `;

        const printWindowCustomer = window.open('', '', 'height=400,width=600');
        printWindowCustomer?.document.write(customerBill);
        printWindowCustomer?.document.close();
        printWindowCustomer?.print();
    }

    // Function to create and print the bill
    const printBill = (order: any) => {
        // Create KOT and customer bill HTML content
        const kotBill = `
            <div style="text-align: center;">
                <h2>KOT</h2>
                <p>Customer Name: ${order.customer_name}</p>
                <p>Phone Number: ${order.ph_number}</p>
                <p>Items:</p>
                <ul>
                    ${order.order.items.map((item: any) => `<li>${item.name} x ${item.quantity} - ${item.price}</li>`).join('')}
                </ul>
                <p>Total: ${order.order.total}</p>
            </div>
        `;

        // Print the KOT Bill
        const printWindowKOT = window.open('', '', 'height=400,width=600');
        printWindowKOT?.document.write(kotBill);
        printWindowKOT?.document.close();
        printWindowKOT?.print();

    };

    const handleReset = () => {
        setSelectedProduct(null);
        dispatch(resetOrder());
    };

    return (
        <Box>
            <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: SMALL_TXT_CLR, }}
            >
                Customer Details
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <TextInpSmall value={finalOrder.customer_name} name='customer_name' label='Name' onChange={handleInputChange} />
                <TextInpSmall value={finalOrder.ph_number} name='ph_number' label='Phone number' onChange={handleInputChange} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: SMALL_TXT_CLR, }}
                >
                    Add Product
                </Typography>

                <UtilityBtns save={handleSave} kot={handleKOT} reset={handleReset} />
            </Box>
            <Autocomplete
                options={products || []}
                getOptionLabel={(option) => `${option.id} - ${option.name}`}
                value={selectedProduct}
                onChange={handleAddProducttoCart}
                size="small" // Reduces the TextField height
                sx={{
                    '& .MuiInputBase-root': {
                        height: '36px', // Custom height
                        borderRadius: 3,
                    },
                    '& .MuiInputBase-input': {
                        padding: '6px', // Adjust padding inside the input
                    },
                    '& .MuiFormLabel-root': {
                        fontSize: '0.75rem', // Adjust label font size
                    },
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Item"
                        variant="outlined"
                        fullWidth
                    />
                )}
                filterOptions={(options, state) => {
                    const inputValue = state.inputValue.toLowerCase();
                    return options.filter(
                        (option) =>
                            option.name.toLowerCase().includes(inputValue) ||
                            option.id.toString().includes(inputValue)
                    );
                }}
                slotProps={{
                    listbox: {
                        sx: {
                            maxHeight: '100px',
                            overflow: 'auto',
                        },
                    },
                }}
            />


            <OrderSummary />
        </Box>
    )
}

export default CreateOrder