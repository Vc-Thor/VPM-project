import { result, transformData } from '../../helpers/datas/data';
// import { startGetVectors } from '../../store';
// import DeleteIcon from '@mui/icons-material/Delete';
import Draggable from 'react-draggable';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  newPositionForVector,
  resultValueVectors,
} from '../../helpers/datas/calculations';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export const DragTableGlobal = () => {
  const [resultSum, setResultSum] = useState([]);
  const [state, setState] = useState({
    vectorId: '',
    position: {
      x: 0,
      y: 0,
    },
  });
  const { vectors } = useSelector((state) => state.vector);
  const period = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const onStart = (e, ui) => {
    const position = vectors.find((x) => x.id === ui.node.id).position;
    setState({ vectorId: ui.node.id, position: { x: position, y: 0 } });
  };

  const onDrag = (e, ui) => {
    setState({
      vectorId: ui.node.id,
      position: { x: ui.lastX + ui.deltaX, y: ui.lastY + ui.deltaY },
    });
    console.log('arrastrando');
  };

  const onStop = async (e, ui) => {
    await newPositionForVector(vectors, state);
    const { newData } = await transformData(result);
    const { newResults } = await resultValueVectors(newData, vectors);
    console.log(newData);
    setResultSum(newResults);
  };
  const calculateColumnWidth = () => {
    const tableWidth = 859;
    const numColumns = period.length;
    return tableWidth / numColumns;
  };

  useEffect(() => {
    const { newData } = transformData(result);
    const { newResults } = resultValueVectors(newData, vectors);
    setResultSum(newResults);
  }, []);

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
            {Array.isArray(vectors) &&
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
                    <TableCell>{vector.vector}</TableCell>
                    {period.map((p) => {
                      const item = vector.vectors.find((v) => v.period === p);
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
              {resultSum.map((r, index) => (
                <TableCell key={index} style={{ textAlign: 'center' }}>
                  {' '}
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
