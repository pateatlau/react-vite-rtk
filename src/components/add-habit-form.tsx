import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addHabit } from '../store/habit-slice';

import { 
  Box, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField 
} from '@mui/material';

import { Frequencies } from '../store/habit-slice';

const AddHabitForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [frequency, setFrequency] = useState<Frequencies>('daily');

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('handle submit');
    if (name.trim()) {
      dispatch(addHabit({ name, frequency }));
      setName('');
      setFrequency('daily');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField 
          label="Habit Name" 
          placeholder="Enter habit name"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <FormControl fullWidth>
          <InputLabel id="frequency-select-label">Habit Frequency</InputLabel>
          <Select 
            value={frequency} 
            label="Habit Frequency" 
            onChange={(e) => setFrequency(e.target.value as Frequencies)}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit" color="primary">
          Add Habit
        </Button>
      </Box>
    </form>
  )
}

export default AddHabitForm;
