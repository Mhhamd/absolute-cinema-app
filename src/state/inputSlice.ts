import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputState {
    value: string;
}

const initialState: InputState = {
    value: '',
};

const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setInputValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setInputValue } = inputSlice.actions;
export default inputSlice.reducer;
