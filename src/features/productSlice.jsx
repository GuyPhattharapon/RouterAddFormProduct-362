import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, name: 'Product 1', price: '$10', description: 'This is product 1' },
  { id: 2, name: 'Product 2', price: '$20', description: 'This is product 2' },
  { id: 3, name: 'Product 3', price: '$30', description: 'This is product 3' },
  { id: 4, name: 'Product 4', price: '$40', description: 'This is product 4' },
  { id: 5, name: 'Product 5', price: '$50', description: 'This is product 5' }
];

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload); // เพิ่มสินค้าลงใน state
    },
    removeProduct: (state, action) => {
      return state.filter(product => product.id !== action.payload); // ลบสินค้าที่มี id ตรงกับ payload
    }
  }
});

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;