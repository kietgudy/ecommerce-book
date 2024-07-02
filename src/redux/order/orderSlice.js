import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  carts: [],
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    doAddBookAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;

      let isExistIndex = carts.findIndex((c) => c._id === item._id);
      if (isExistIndex > -1) {
        carts[isExistIndex].quantity =
          carts[isExistIndex].quantity + item.quantity;
        if (
          carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity
        ) {
          carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity;
        }
      } else {
        carts.push({
          quantity: item.quantity,
          _id: item._id,
          detail: item.detail,
        });
      }
      state.carts = carts;
      message.success("Thêm sản phẩm vào giỏ hàng thành công");
    },

    doUpdateCartAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;

      let isExistIndex = carts.findIndex((c) => c._id === item._id);
      if (isExistIndex > -1) {
        carts[isExistIndex].quantity = item.quantity;
        if (
          carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity
        ) {
          carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity;
        }
      } else {
        carts.push({
          quantity: item.quantity,
          _id: item._id,
          detail: item.detail,
        });
      }
      state.carts = carts;
    },
    doDeleteItemCartAction: (state, action) => {
      state.carts = state.carts.filter((c) => c._id !== action.payload._id);
    },
    doPlaceOrderAction: (state, action) => {
      state.carts = [];
    },
  },
});

export const { doAddBookAction, doUpdateCartAction, doDeleteItemCartAction, doPlaceOrderAction } =
  orderSlice.actions;

export default orderSlice.reducer;
