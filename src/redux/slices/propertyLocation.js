import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  districts: [],
};

export const PropertyLocationSlice = createSlice({
  name: 'propertyLocation',
  initialState: initialState,
  reducers: {
    updateLocationInfo: (state, action) => {
      const updatedDistricts = action.payload;
      const formatted = [];
      updatedDistricts.forEach((row) => {
        if (
          row.id === undefined ||
          row.name === undefined ||
          row.province === undefined
        ) {
          return;
        }
        if (row.province.name === undefined) {
          return;
        }
        formatted.push({
          id: row.id,
          name: row.name,
          province: row.province.name,
        });
      });
      state.districts = formatted;
    },
  },
});

export const { updateLocationInfo } = PropertyLocationSlice.actions;
export const PropertyLocationReducer = PropertyLocationSlice.reducer;
export const selectPropertyLocation = (state) => state.propertyLocation;
export default PropertyLocationReducer;
