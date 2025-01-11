import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from "../features/inventory/inventorySlice"
import OrderReducer from "../features/orders/OrderSlice";
import PendingOrdersReducer from '../features/PendingOrders/PendingOrderSlice';
import CategoryReducer from '../features/Category/CategorySlice';
export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    order: OrderReducer,
    pendingorders: PendingOrdersReducer,
    category: CategoryReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch