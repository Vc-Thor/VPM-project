import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Grid, TextField } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { Counter } from './Counter';
import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../../store/auth/thunks';
import { useMemo } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const formData = {
  pass: '',
};
export const ModalLogin = () => {
  const { errorMessage, email: userEmail } = useSelector((state) => state.auth);
  const { pass, passValid, onInputChange, formState } = useForm(formData);
  const isChecking = useMemo(() => status === 'checking', [status]);
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: userEmail,
      pass: formState.pass,
    };
    dispatch(startLogin(user));
  };
  return (
    <form onSubmit={onSubmit}>
      <Box sx={style}>
        <Typography sx={{ mb: 4, textAlign: 'center' }} variant='h5'>
          The session is about to expire
        </Typography>
        <Counter />
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid item xs={3.2}>
            <TextField
              sx={{ width: 500, mt: 1 }}
              name={'pass'}
              type={'password'}
              value={pass}
              label={'Your password'}
              onChange={onInputChange}
              error={!!passValid}
              helperText={passValid}
            />
          </Grid>
        </Grid>
        <Grid
          container
          display={!!errorMessage ? '' : 'none'}
          sx={{ mt: 1, justifyContent: 'center' }}
        >
          <Grid item xs={6}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
        </Grid>
        <Button
          disabled={isChecking}
          type='submit'
          variant='contained'
          sx={{ width: 500, mt: 1 }}
        >
          Login
        </Button>
      </Box>
    </form>
  );
};