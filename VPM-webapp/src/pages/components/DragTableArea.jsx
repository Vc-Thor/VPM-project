import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';
import { tranformAreaVectors } from '../../helpers/datas/transformation';

export const DragTableArea = () => {
  const { vectors } = useSelector((state) => state.vector);
  const { areaVectors } = tranformAreaVectors(vectors);
  const period = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const calculateColumnWidth = () => {
    const tableWidth = 859;
    const numColumns = period.length;
    return tableWidth / numColumns;
  };
  const onStart = () => {};
  const onDrag = () => {};
  const onStop = () => {};
  return (
    <Grid
      container
      sx={{
        mt: 3,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'scroll',
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant='head'>Equip Vector</TableCell>
              {period.map((p, index) => (
                <TableCell key={index} variant='head'>
                  Period {p}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(areaVectors) &&
              areaVectors.map((items) => (
                <Draggable
                  key={items.id}
                  bounds={{ left: 0 }}
                  axis='x'
                  defaultPosition={{ x: items.position, y: 0 }}
                  grid={[calculateColumnWidth(), 50]}
                  onStart={onStart}
                  onDrag={onDrag}
                  onStop={onStop}
                >
                  <TableRow id={items.id} key={items.id}>
                    <TableCell>{items.area}</TableCell>
                    {period.map((p) => {
                      const item = items.vectors.find((v) => v.period === p);
                      return (
                        <TableCell key={p} style={{ textAlign: 'center' }}>
                          {item && item.value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </Draggable>
              ))}
            <TableRow>
              <TableCell>Result</TableCell>
              {/* {resultSum
                .slice()
                .sort((a, b) => a.position - b.position)
                .map((r, index) => (
                  <TableCell key={index} style={{ textAlign: 'center' }}>
                    {r.value}
                  </TableCell>
                ))} */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
