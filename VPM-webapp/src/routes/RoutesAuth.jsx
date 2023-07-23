import { Route, Routes } from 'react-router-dom';
import { Sidebar } from '../pages/components/Sidebar';
import { AreaGraphs, Home, Projects } from '../pages';
import { Container } from '@mui/material';

export const RoutesAuth = () => {
  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}
    >
      <Sidebar />
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='projects' element={<Projects />} />
        <Route path='graphs' element={<AreaGraphs />} />
      </Routes>
    </Container>
  );
};
