import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

export const fetchOrderById = createAsyncThunk(
  "orderDetails/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/orders/${id}`);
      return data.order;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load order details");
    }
  }
);

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: { order: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => { state.loading = true; })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default orderDetailsSlice.reducer;
