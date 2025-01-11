import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type InventoryItem = {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
};

type InventoryState = {
    items: InventoryItem[];
};

const initialState: InventoryState = {
    items: [],
};

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setInventoryData(state, action: PayloadAction<InventoryItem[]>) {
            state.items = action.payload;
        },
    },
});

export const { setInventoryData } = inventorySlice.actions;
export default inventorySlice.reducer;
