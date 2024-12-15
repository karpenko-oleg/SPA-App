import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

interface Artwork {
  id: number;
  title: string;
  description: string;
  image_id: string;
}

interface ArtworkState {
  items: Artwork[];
  favorites: Artwork[];
  favoriteCount: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: ArtworkState = {
  items: [],
  favorites: [],
  favoriteCount: 0,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
};

// асинхронный createAsyncThunk
export const fetchArtworks = createAsyncThunk(
  'artworks/fetchArtworks',
  async (params: { page: number; limit: number; search?: string }, { rejectWithValue }) => {
    try {
      const { page, limit, search } = params;
      const response = await axios.get(`${API_BASE_URL}`, {
        params: {
          page,
          limit,
          q: search || '',
          fields: 'id,title,description,image_id',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const artworksSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Artwork>) => {
      state.favorites.push(action.payload);
      state.favoriteCount += 1;
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(artwork => artwork.id !== action.payload);
      state.favoriteCount -= 1;
    },
    deleteArtwork: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(artwork => artwork.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          image_id: item.image_id,
        }));
        state.totalPages = Math.ceil(action.payload.pagination.total / action.payload.pagination.limit);
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addFavorite, removeFavorite, deleteArtwork } = artworksSlice.actions;
export const { reducer: artworksReducer } = artworksSlice;
