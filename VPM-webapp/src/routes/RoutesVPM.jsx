import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RoutesAuth } from './RoutesAuth';
import { SignIn } from '../pages/SignIn';

export const RoutesVPM = () => {
  const { status } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        {status === 'authenticated' ? (
          <Route path='/VentilationProjectManager/*' element={<RoutesAuth />} />
        ) : (
          <Route path='/*' element={<SignIn />} />
        )}
      </Routes>
    </>
  );
};
