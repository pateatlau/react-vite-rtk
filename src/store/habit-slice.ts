import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
};

const initialState: HabitState = {
  habits: [],
};

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
});

export const { addHabit, deleteHabit, toggleHabit } = habitSlice.actions;

export default habitSlice.reducer;
