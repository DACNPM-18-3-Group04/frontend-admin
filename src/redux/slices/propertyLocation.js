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
        if (row.province.id === undefined || row.province.name === undefined) {
          return;
        }
        formatted.push({
          id: row.id,
          name: row.name,
          provinceId: row.province.id,
          province: row.province.name,
        });
      });
      state.districts = formatted;
    },
    updateProvince: (state, action) => {
      const { provinceId, provinceName } = action.payload;
      if (provinceId === undefined || provinceName === undefined) {
        return;
      }
      const original = state.districts;

      const updated = original.map((row) => {
        if (`${row.provinceId}` !== `${provinceId}`) {
          return row;
        }
        return {
          ...row,
          province: provinceName,
        };
      });
      state.districts = updated;
    },
    addDistrict: (state, action) => {
      const { id, name, provinceId, provinceName } = action.payload;
      if (
        id === undefined ||
        name === undefined ||
        provinceId === undefined ||
        provinceName === undefined
      ) {
        return;
      }
      const newData = {
        id,
        name,
        provinceId,
        province: provinceName,
      };
      const updated = [...state.districts, newData];
      state.districts = updated;
    },
    updateDistrict: (state, action) => {
      const { id, name } = action.payload;
      if (id === undefined || name === undefined) {
        return;
      }
      const original = state.districts;
      const index = original.findIndex((x) => `${x.id}` === `${id}`);
      if (index === -1) return;

      const data = original[index];
      const newData = Object.assign({}, data, { id, name });
      const updated = [
        ...original.slice(0, index),
        newData,
        ...original.slice(index + 1),
      ];
      state.districts = updated;
    },
    removeDistrict: (state, action) => {
      const { id } = action.payload;
      if (id === undefined) {
        return;
      }
      const original = state.districts;
      const index = original.findIndex((x) => `${x.id}` === `${id}`);
      if (index === -1) return;

      const updated = [
        ...original.slice(0, index),
        ...original.slice(index + 1),
      ];
      state.districts = updated;
    },
  },
});

export const {
  updateLocationInfo,
  updateProvince,
  addDistrict,
  updateDistrict,
  removeDistrict,
} = PropertyLocationSlice.actions;
export const PropertyLocationReducer = PropertyLocationSlice.reducer;
export const selectPropertyLocation = (state) => state.propertyLocation;
export default PropertyLocationReducer;
