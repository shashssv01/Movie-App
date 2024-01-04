import { GlobalContext, actions } from 'context'
import { PostLoginLayout, PreLoginLayout } from 'layouts'
import React, { useContext, useEffect } from 'react'
import { PrivateRoute, PublicRoute } from 'routes'
import { Switch } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import Login from './login/login'
import Register from './register/register'
import Home from './home/home'
import MovieDetails from './movie-details/movie-details'
import Seats from './seats/seats'
import Bookings from './bookings/bookings'

const App = () => {
  const { state: { showLoader }, dispatch } = useContext(GlobalContext)
  const storeHandler = (type, payload) => dispatch({ type, payload })

  const validateLogin = async () => {
    let token = localStorage.getItem('authToken');
    storeHandler(actions.LOG_IN, !!token);
  }

  useEffect(() => {
    validateLogin();
  }, [])

  return (
    <>
      {showLoader && <Box
        sx={{
          position: 'fixed',
          display:'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#24292dcc',
          width: '100%',
          height: '100vh',
          zIndex: '1400',
        }}
      >
        <CircularProgress className='loader' />
      </Box>}
      <Switch>
        <PublicRoute
          exact
          path="/login"
          component={Login}
          layout={PreLoginLayout}
        />
        <PublicRoute
          exact
          path="/register"
          component={Register}
          layout={PreLoginLayout}
        />
        <PrivateRoute
          exact
          path="/"
          component={Home}
          layout={PostLoginLayout}
        />
        <PrivateRoute
          exact
          path="/home"
          component={Home}
          layout={PostLoginLayout}
        />
        <PrivateRoute
          exact
          path="/movie/:movieName"
          component={MovieDetails}
          layout={PostLoginLayout}
        />
        <PrivateRoute
          exact
          path="/movie/:movieName/:date/:time/seats"
          component={Seats}
          layout={PostLoginLayout}
        />
        <PrivateRoute
          exact
          path="/bookings"
          component={Bookings}
          layout={PostLoginLayout}
        />
      </Switch>
    </>
  )
}

export default App