import React, { useEffect} from 'react';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits } from '../store/habit-slice';
import { LinearProgress, Paper, Typography } from '@mui/material';
import{ Habit } from '../store/habit-slice';

const HabitStats: React.FC = () => {
  const { habits, isLoading, error } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();

  const getCompletedToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return habits.filter((habit) => habit.completedDates.includes(today)).length;
  };

  const getStreak = (habit: Habit) => {
    const today = new Date().toISOString().split('T')[0];

    return habit.completedDates.filter((date: string) => date === today).length;
  };

  const getLongestStreak = () => Math.max(...habits.map(getStreak), 0);

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  return (
    <>
      {isLoading && <LinearProgress />}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      {!isLoading && !error && habits.length > 0 && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h4" component="h2" align="center">
            Habit Stats
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {`Total: ${habits.length} habits`}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {`CompletedToday: ${getCompletedToday()} habits`}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {`Longest Streak: ${getLongestStreak()} habits`}
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default HabitStats;
