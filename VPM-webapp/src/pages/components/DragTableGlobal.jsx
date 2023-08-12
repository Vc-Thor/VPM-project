import {
  crearArrayConNumeros,
  generateData,
  transformData,
} from '../../helpers/datas/data';
import DeleteIcon from '@mui/icons-material/Delete';
import Draggable from 'react-draggable';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  newPositionForVector,
  resultValueVectors,
} from '../../helpers/datas/calculations';
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { startDeleteVector } from '../../store/vector/thunks';
import { EditModal } from './editModal';

export const DragTableGlobal = () => {
  const distpach = useDispatch();
  const { vectors } = useSelector((state) => state.vector);
  const [state, setState] = useState({
    vectorId: '',
    position: {
      x: 0,
      y: 0,
    },
  });
  const [newVector] = useState(vectors);
  const { period } = useSelector((state) => state.setting);
  const { result } = generateData(period);
  const arrayPeriod = crearArrayConNumeros(period);

  const onStart = (e, ui) => {
    const position = vectors.find((x) => x.id === ui.node.id).position;
    setState({ vectorId: ui.node.id, position: { x: position, y: 0 } });
    // distpach(startGetVectors());
  };

  const onDrag = (e, ui) => {
    setState({
      vectorId: ui.node.id,
      position: { x: ui.lastX + ui.deltaX, y: ui.lastY + ui.deltaY },
    });
  };

  const onStop = async (e, ui) => {
    await newPositionForVector(vectors, state);
  };
  const onDeleteVector = async (id = '') => {
    distpach(startDeleteVector(id));
  };
  const calculateColumnWidth = () => {
    const tableWidth = 859;
    const numColumns = arrayPeriod.length;
    return tableWidth / numColumns;
  };

  const newData = transformData(result);
  const { vectorSums } = resultValueVectors(newData, newVector);

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
              {arrayPeriod.map((p, index) => (
                <TableCell key={index} variant='head'>
                  Period {p}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(vectors) && vectors.length !== 0 ? (
              vectors.map((vector) => (
                <Draggable
                  key={vector.id}
                  bounds={{ left: 0 }}
                  axis='x'
                  defaultPosition={{ x: vector.position, y: 0 }}
                  grid={[calculateColumnWidth(), 50]}
                  onStart={onStart}
                  onDrag={onDrag}
                  onStop={onStop}
                >
                  <TableRow id={vector.id} key={vector.id}>
                    <TableCell>
                      {vector.vector}
                      <IconButton onClick={() => onDeleteVector(vector.id)}>
                        <DeleteIcon color='error' fontSize='small' />
                      </IconButton>
                      <EditModal vector={vector} />
                    </TableCell>
                    {arrayPeriod.map((p) => {
                      const item = vector.vectors.find((v) => v.period === p);
                      return (
                        <TableCell key={p} style={{ textAlign: 'center' }}>
                          {item && item.value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </Draggable>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={arrayPeriod.length + 1}
                  style={{ textAlign: 'center' }}
                >
                  <Typography variant='h6'>No data</Typography>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Result</TableCell>
              {vectorSums
                ?.sort((a, b) => a.position - b.position)
                .map((r, index) => (
                  <TableCell key={index} style={{ textAlign: 'center' }}>
                    {r.value}
                  </TableCell>
                ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
