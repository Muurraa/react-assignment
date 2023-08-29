import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedFigure: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedFigure: (state, action) => {
            state.selectedFigure = action.payload
        },
    },
})

export const { setSelectedFigure } = userSlice.actions
export default userSlice.reducer;