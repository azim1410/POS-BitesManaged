import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export type CategoryItem = {
    id: number,
    category_name: string,
}

export type CategoryState = {
    categories: CategoryItem[],
}

const initialState: CategoryState = {
    categories: [],
}

export const CategorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {
        setCategoryData(state, action: PayloadAction<CategoryItem[]>){
            state.categories = action.payload;
        }
    }
})

export const {setCategoryData} = CategorySlice.actions;
export default CategorySlice.reducer;