import { Route, Routes } from 'react-router-dom';
import { Sidebar, NavBar } from '../pages/components';
import { AreaGraphs, Home } from '../pages';
import { Container, Grid } from '@mui/material';

export const RoutesAuth = () => {
  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}
    >
      <Sidebar />
      <NavBar />
      <Grid item sx={{ mt: 5 }}>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='graphs' element={<AreaGraphs />} />
        </Routes>
      </Grid>
    </Container>
  );
};
