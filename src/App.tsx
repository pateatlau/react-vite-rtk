import store from './store/store'
import { Provider } from 'react-redux'

import { Container, Divider, Typography } from '@mui/material'

import './App.css'

import AddHabitForm from './components/add-habit-form';
import HabitsList from './components/habits-list';
import HabitStats from './components/habit-stats';

function App() {
  return (
    <>
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" align="center" margin={3}>
          My Habits Tracker
        </Typography>
        <AddHabitForm />
        <Divider sx={{ margin: '30px 0' }} />
        <HabitsList />
        <Divider sx={{ margin: '30px 0' }} />
        <HabitStats />
      </Container>
    </Provider>
    </>
  )
}

export default App
