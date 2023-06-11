import { Button, Container, Grid, TextField } from '@mui/material';
import React from 'react';

export const AddProject = () => {
  return (
    <Container sx={{ display: 'flex' }}>
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Grid item>
          <TextField />
          <Button>agregar</Button>
        </Grid>
        <Grid item>
          <TextField />
          <Button>agregar</Button>
        </Grid>
        <Grid item>
          <TextField />
          <Button>agregar</Button>
        </Grid>
        <Grid item>
          <TextField />
          <Button>agregar</Button>
        </Grid>
        <Grid item>
          <TextField />
          <Button>agregar</Button>
        </Grid>
        <Grid item>
          <h1>error</h1>
        </Grid>
      </Grid>
    </Container>
  );
};
