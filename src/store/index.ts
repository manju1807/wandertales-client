import { createWrapper } from 'next-redux-wrapper';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// Import your reducers here
import counterReducer from '@/store/slices/counter-slice';
import authReducer from '@/store/slices/auth-slice'

// This Function to create and configure the Redux store
// `configureStore` from Redux Toolkit helps set up the store with reducers and devTools
export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer, // Reducer for counter feature
      auth: authReducer,
    },
    devTools: true, // Enabled Redux DevTools Extension for debugging
  });

export type AppStore = ReturnType<typeof makeStore>; // Type for the AppStore, representing the structure of the store
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']; // Type for dispatching actions within the app
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
