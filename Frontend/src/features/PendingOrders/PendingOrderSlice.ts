import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderItem } from '../orders/OrderServices';

type PendingItemState = {
    items: OrderItem[];
}

const initialState: PendingItemState = {
    items: []
}

const PendingOrderSlice = createSlice({
    name: 'pendingorders',
    initialState,
    reducers: {
        addtoPendingOrders(state, action: PayloadAction<OrderItem>){
            state.items.push(action.payload);
        },
        removeFromPendingOrders(state, action: PayloadAction<number>) {
            state.items.splice(action.payload, 1);
        }
    }
})

export const {addtoPendingOrders, removeFromPendingOrders} = PendingOrderSlice.actions;
export default PendingOrderSlice.reducer;
