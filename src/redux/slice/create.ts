
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  about: string;
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  about: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateForm } = formSlice.actions;
export const { reducer: formReducer } = formSlice;
