import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';

export const DragTableGlobal = () => {
  const { vectors } = useSelector((state) => state.vector);
  const period = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log(vectors);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Equip Vector</TableCell>
            {period.map((x, index) => (
              <TableCell align='right' key={index}>
                {x}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <Draggable cancel='.no-drag'>
          <TableBody>
            {vectors?.msg === 'no data in DB' ? (
              <Typography variant='h5' color='error'>
                {vectors?.msg}
              </Typography>
            ) : (
              vectors.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>{v.vector}</TableCell>
                  {v.vectors
                    .slice()
                    .sort((a, b) => a.period - b.period)
                    .map((vector) => (
                      <TableCell key={vector.id}>{vector.value}</TableCell>
                    ))}
                </TableRow>
              ))
            )}
            <TableRow>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableBody>
        </Draggable>
      </Table>
    </TableContainer>
  );
};
