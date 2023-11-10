import React from 'react'
import DashboardList from 'components/DashboardList'
import { StyledEngineProvider } from '@mui/material'

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <DashboardList />
    </StyledEngineProvider>
  )
}
