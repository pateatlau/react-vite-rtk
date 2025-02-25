import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { deleteHabit, Habit, toggleHabit } from '../store/habit-slice';

import { Alert, Box, Button, Grid, LinearProgress, Paper, Snackbar, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const HabitsList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();

  const [toggleOpen, setToggleOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleToggleHabit = (habit: Habit) => {
    dispatch(toggleHabit({ id: habit.id, date: today }));
    setToggleOpen(true);
  };

  const handleDeleteHabit = (habit: Habit) => {
    dispatch(deleteHabit({ id: habit.id }));
    setDeleteOpen(true);
  };

  const getStreak = (habit: Habit) => {
    const today = new Date().toISOString().split('T')[0];
    const completedDates = habit.completedDates;

    return completedDates.filter((date) => date === today).length;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 4,
      }}
    >
      <Typography variant="h4" component="h2" align="center">
        Habits List
      </Typography>
      {
        habits.map((habit) => (
          <Paper key={habit.id} sx={{ p: 2 }}>
            <Grid container alignItems={'center'}>
              <Grid  item xs={12} sm={6}>
                <Typography variant="h5">{habit.name}</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
                  {habit.frequency}
                </Typography>
              </Grid>
              <Grid  item xs={12} sm={6}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                  <Button 
                    variant="contained" 
                    color={habit.completedDates.includes(today) ? 'success' : 'primary'}
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleToggleHabit(habit)}
                  >
                    Mark Complete
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteHabit(habit)}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2}}>
              <Typography variant="body2" color="textSecondary">
                Current streak: {getStreak(habit)} days
              </Typography>
              <LinearProgress variant="determinate" value={(getStreak(habit) / 30) * 100} />
            </Box>
          </Paper>
        ))
      }

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={toggleOpen}
        onClose={() => setToggleOpen(false)}
        autoHideDuration={1000}
      >
        <Alert
          onClose={() => setToggleOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Habit toggled successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        autoHideDuration={1000}
      >
        <Alert
          onClose={() => setDeleteOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Habit deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default HabitsList;