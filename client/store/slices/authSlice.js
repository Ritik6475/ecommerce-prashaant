import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { create } from "domain";

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// -----------------------------
// REGISTER
// -----------------------------


export const fetchUser = createAsyncThunk(
'auth/fetchUser',
async (_, { rejectWithValue }) => {
  
  try {
    const { data } = await axios.get('/auth/me');
    return data.user;
  }
  
  catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch user'
    );
  }
}
)





export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/register", userData);
      return data.user; // cookie set on backend
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", credentials);
      return data.user; // cookie set on backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);


export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/auth/me");
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load user"
      );
    }
  }
);


export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/auth/profile", userData);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);

// -----------------------------
// LOGOUT (Clears HttpOnly cookie)
// -----------------------------

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await axios.post("/auth/logout"); // backend clears cookie
});



// -----------------------------
// SLICE
// -----------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    // Used by GoogleLoginButton or any social login
    loginSuccess: (state, action) => {
      const payload = action.payload;
      const user = payload?.user || payload;

      state.isAuthenticated = true;
      state.user = user || null;
      state.loading = false;
      state.error = null;
    },

    // Optional — manual logout (UI)
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOAD USER
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null; // IMPORTANT FIX
      })

      // UPDATE PROFILE
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, () => initialState)
  },
});


export const { clearError, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
