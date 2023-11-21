import { Button, Grid, Snackbar, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { DragTableGlobal } from './components/DragTableGlobal'
import { useEffect, useState } from 'react'
import { DragTableArea } from './components/DragTableArea'
import { useActivityStore } from '../store/activity-store'
import { useAreaStore } from '../store/area-store'
import { useSubAreaStore } from '../store/sub-area-store'
import { useCriteriaStore } from '../store/criteria-store'
import { useVectorStore } from '../store/vector-store'
export const Home = () => {
  const [drag, setDrag] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const getActivys = useActivityStore((state) => state.getActivys)
  const getAreas = useAreaStore((state) => state.getAreas)
  const getSubAreas = useSubAreaStore((state) => state.getSubAreas)
  const getCriteria = useCriteriaStore((state) => state.getCriteria)
  const getVectors = useVectorStore((state) => state.getVectors)

  useEffect(() => {
    getVectors()
    getCriteria()
    getAreas()
    getActivys()
    getSubAreas()
  }, [])

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* {ok === true ? (
          <Alert onClose={() => setShowSnackbar(false)} severity='success'>
            {message}
          </Alert>
        ) : (
          <Alert onClose={() => setShowSnackbar(false)} severity='error'>
            {errorMessage}
          </Alert>
        )} */}
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
          <DragTableGlobal drag={drag} />
        </Grid>
      ) : (
        <Grid item>
          <DragTableArea />
        </Grid>
      )}
    </Grid>
  )
}
