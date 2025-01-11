import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderItem, orderSingleItem } from './OrderServices';

const initialState: OrderItem = {
    id: '',
    created_at: '',
    customer_name: '',
    ph_number: 0,
    order: {
        items: [],
        total: '0',
    },
    status: 'pending',
}

const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addItemToOrder: (state, action: PayloadAction<orderSingleItem>) => {
            state.order.items.push(action.payload);
            const itemTotal = parseFloat(action.payload.price) * parseInt(action.payload.quantity, 10);
            state.order.total = (parseFloat(state.order.total) + itemTotal).toFixed(2);
        },
        updateOrderStatus: (state, action: PayloadAction<OrderItem['status']>) => {
            state.status = action.payload;
        },
        resetOrder: () => initialState,
        editOrderDetails: (
            state,
            action: PayloadAction<{
                id: string;
                data: Partial<Pick<OrderItem, 'customer_name' | 'ph_number' | 'status'>>;
            }>
        ) => {
            if (state.id === action.payload.id) {
                const { customer_name, ph_number, status } = action.payload.data;
                if (customer_name !== undefined) state.customer_name = customer_name;
                if (ph_number !== undefined) state.ph_number = ph_number;
                if (status !== undefined) state.status = status;
            }
        },
        
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.order.items[action.payload];
            if (item) {
                item.quantity = (parseInt(item.quantity, 10) + 1).toString();
                const updatedTotal = state.order.items.reduce((total, item) => {
                    return total + parseFloat(item.price) * parseInt(item.quantity, 10);
                }, 0);
                state.order.total = updatedTotal.toFixed(2);
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.order.items[action.payload];
            if (item && parseInt(item.quantity, 10) > 1) {
                item.quantity = (parseInt(item.quantity, 10) - 1).toString();
                const updatedTotal = state.order.items.reduce((total, item) => {
                    return total + parseFloat(item.price) * parseInt(item.quantity, 10);
                }, 0);
                state.order.total = updatedTotal.toFixed(2);
            }
        },
        removeItemFromOrder: (state, action: PayloadAction<number>) => {
            const removedItem = state.order.items.splice(action.payload, 1);
            if (removedItem.length > 0) {
                const updatedTotal = state.order.items.reduce((total, item) => {
                    return total + parseFloat(item.price) * parseInt(item.quantity, 10);
                }, 0);
                state.order.total = updatedTotal.toFixed(2);
            }
        },
        replaceOrderDetails: (state, action: PayloadAction<OrderItem>) => {
            return { ...state, ...action.payload };
          },
        applyDiscount: (state, action: PayloadAction<number>) => {
            const currentTotal = parseFloat(state.order.total);
            const discountedTotal = currentTotal - action.payload;
            state.order.total = discountedTotal.toString();
        }
    }
});

export const { addItemToOrder, updateOrderStatus, resetOrder, editOrderDetails, increaseQuantity, decreaseQuantity, removeItemFromOrder, replaceOrderDetails, applyDiscount} = OrderSlice.actions;
export default OrderSlice.reducer;