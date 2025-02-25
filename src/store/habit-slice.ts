import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Frequencies = 'daily' | 'weekly' | 'monthly';
export interface Habit {
  id: string;
  name: string;
  frequency: Frequencies;
  completedDates: string[];
  createdAt: string;
};

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
};

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000)); 
  
  const mockHabits: Habit[] = [
    {
      id: '1',
      name: 'Exercise',
      frequency: 'daily',
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Meditate',
      frequency: 'weekly',
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Read a book',
      frequency: 'monthly',
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
  ];

  return mockHabits;
});

export const habitSlice = createSlice({
  name: 'habits',
  initialState,

  reducers: {
    addHabit: (state, action: PayloadAction<{ name: string; frequency: Frequencies }>) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };

      state.habits.push(newHabit);
    },

    deleteHabit: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.habits.findIndex((habit) => habit.id === action.payload.id);
      if (index > -1) {
        state.habits.splice(index, 1);
      }
    },

    toggleHabit: (state, action: PayloadAction<{ id: string; date: string }>) => {
      const habit = state.habits.find((habit) => habit.id === action.payload.id);
      if (!habit) return;
      const index = habit.completedDates.indexOf(action.payload.date);
      if (index === -1) {
        habit.completedDates.push(action.payload.date);
      } else {
        habit.completedDates.splice(index, 1);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchHabits.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchHabits.fulfilled, (state, action) => {
      state.habits = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(fetchHabits.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch habits';
    });
  },
});

export const { addHabit, deleteHabit, toggleHabit } = habitSlice.actions;

export default habitSlice.reducer;
