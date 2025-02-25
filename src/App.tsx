import store from './store/store'
import { Provider } from 'react-redux'

import { Container, Typography } from '@mui/material'

import './App.css'

import AddHabitForm from './components/add-habit-form';

function App() {
  return (
    <>
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" align="center">Habit Tracker</Typography>
        <AddHabitForm />
      </Container>
    </Provider>
    </>
  )
}

export default App
