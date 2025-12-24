import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

/* ------------------ INITIAL STATE ------------------ */

const initialState = {
  products: [],        // 👈 used everywhere (UNCHANGED)
  product: null,

  filters: {
    categories: [],
    subcategories: [],
    brands: [],
    genders: [],
    occasions: [],
    sizes: [],
    fits: [],
    sleeves: [],
    materials: [],
    ratings: [5, 4, 3, 2, 1],
  },

  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  },

  loading: {
    list: false,
    product: false,
    filters: false,
  },

  error: null,
};

/* ------------------ THUNKS (NAMES UNCHANGED) ------------------ */

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/products", { params });
      return {
        products: data.products,
        pagination: data.pagination,
        meta: {
          limit: params.limit,
        },
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch product");
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "product/fetchProductBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/products/slug/${slug}`);
      return data.product;
    } catch (err) {
      return rejectWithValue("Failed to fetch product");
    }
  }
);

export const fetchFilterOptions = createAsyncThunk(
  "product/fetchFilterOptions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/products/filters/options");
      return data.filters;
    } catch (err) {
      return rejectWithValue("Failed to fetch filters");
    }
  }
);

/* ------------------ SLICE ------------------ */

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    clearProduct(state) {
      state.product = null;
    },
    clearProductError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* -------- PRODUCT LIST -------- */
      .addCase(fetchProducts.pending, (state) => {
        state.loading.list = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading.list = false;

        const requestedLimit = action.payload.meta?.limit;

        // 🔐 SAFETY: Enforce frontend limit if backend ignores it
        state.products = requestedLimit
          ? action.payload.products.slice(0, requestedLimit)
          : action.payload.products;

        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
      })

      /* -------- PRODUCT DETAILS -------- */
      .addCase(fetchProductById.pending, (state) => {
        state.loading.product = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading.product = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading.product = false;
        state.error = action.payload;
      })

      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading.product = true;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading.product = false;
        state.product = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading.product = false;
        state.error = action.payload;
      })

      /* -------- FILTER OPTIONS -------- */
      .addCase(fetchFilterOptions.pending, (state) => {
        state.loading.filters = true;
      })
      .addCase(fetchFilterOptions.fulfilled, (state, action) => {
        state.loading.filters = false;
        state.filters = action.payload;
      })
      .addCase(fetchFilterOptions.rejected, (state) => {
        state.loading.filters = false;
      });
  },
});

export const { clearProduct, clearProductError } = productSlice.actions;
export default productSlice.reducer;
