import { configureStore } from '@reduxjs/toolkit';
import { artworksReducer } from '../redux/slice/produx';
import { formReducer } from './slice/create';


const store = configureStore({
  reducer: {
    artworks: artworksReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
