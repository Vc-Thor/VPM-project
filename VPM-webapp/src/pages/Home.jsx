import { Alert, Button, Grid, Snackbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DragTableGlobal } from './components/DragTableGlobal';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startGetActivitys,
  startGetAreas,
  startGetCriterias,
  startGetSubareas,
  startGetVectors,
} from '../store';
import { DragTableArea } from './components/DragTableArea';
export const Home = () => {
  const [drag, setDrag] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { loading, errorMessage, message, ok } = useSelector(
    (state) => state.vector
  );

  const dispatch = useDispatch();

  const isNotLoaded = useMemo(() => loading === 'not-loaded', [loading]);
  useEffect(() => {
    if (ok === true) {
      setShowSnackbar(true);
    } else {
      setShowSnackbar(true);
    }
  }, [isNotLoaded]);
  useEffect(() => {
    dispatch(startGetVectors());
    dispatch(startGetCriterias());
    dispatch(startGetAreas());
    dispatch(startGetActivitys());
    dispatch(startGetSubareas());
  }, []);

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {ok === true ? (
          <Alert onClose={() => setShowSnackbar(false)} severity='success'>
            {message}
          </Alert>
        ) : (
          <Alert onClose={() => setShowSnackbar(false)} severity='error'>
            {errorMessage}
          </Alert>
        )}
      </Snackbar>
      <Grid item sx={{ mt: 3 }}>
        <Typography variant='h4'>Ventilation Project Manager</Typography>
      </Grid>
      <Grid container sx={{ display: 'flex', justifyContent: 'end' }}>
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'row',
            border: 'solid #1976d2 1px',
            borderRadius: '5px',
          }}
        >
          <Button variant='contained' onClick={() => setDrag(true)}>
            <ArrowBackIcon />
          </Button>
          <Typography sx={{ p: 1 }}>
            {drag === false ? 'Global' : 'Area'}
          </Typography>
          <Button variant='contained' onClick={() => setDrag(false)}>
            <ArrowForwardIcon />
          </Button>
        </Grid>
      </Grid>
      {drag === false ? (
        <Grid item>
          <DragTableGlobal />
        </Grid>
      ) : (
        <Grid item>
          <DragTableArea />
        </Grid>
      )}
    </Grid>
  );
};
