import React, { useState} from 'react';

import { 
  Box, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField 
} from '@mui/material';

const AddHabitForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      console.log('name', name);
      console.log('frequency', frequency);
    }}>
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
          fullWidth
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <FormControl fullWidth>
          <InputLabel id="frequency-select-label">Habit Frequency</InputLabel>
          <Select 
            value={frequency} 
            label="Habit Frequency" 
            onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
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
