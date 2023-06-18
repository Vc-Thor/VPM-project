import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutesAuth } from './RoutesAuth';
import { SignIn } from '../pages/SignIn';
import jwtDecode from 'jwt-decode';
import Modal from '@mui/material/Modal';
import { ModalLogin } from '../pages/components/ModalLogin';

export const RoutesVPM = () => {
  const { status, expiresAt, token } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(false);
    if (status === 'authenticated') {
      const { exp } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeRemaining = exp - currentTime;

      if (timeRemaining < 300) {
        console.log('El token está a punto de expirar');
        setShowModal(true);
      }
      const timeout = setTimeout(() => {
        setShowModal(true);
      }, (expiresAt - Math.floor(Date.now() / 1000) - 300) * 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [status, expiresAt, token]);

  return (
    <>
      <Routes>
        {status === 'authenticated' ? (
          <Route path='/VentilationProjectManager/*' element={<RoutesAuth />} />
        ) : (
          <Route path='/*' element={<SignIn />} />
        )}
      </Routes>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <ModalLogin />
      </Modal>
    </>
  );
};