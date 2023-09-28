import {
  crearArrayConNumeros,
  generateData,
  transformData,
} from '../../helpers/datas/data';
import DeleteIcon from '@mui/icons-material/Delete';
import Draggable from 'react-draggable';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  calculateGlobalLeakage,
  // calculateVectorLeakage,
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
import { getVectors } from '../../helpers/api/vector';

export const DragTableGlobal = ({ drag }) => {
  const dispatch = useDispatch();
  const { vectors } = useSelector((state) => state.vector);
  const [vector, setVector] = useState();
  const [leakVal, sertLeakVal] = useState();
  const [sums, SetSums] = useState({ sumVectors: [], sumLeakage: [] });
  const [state, setState] = useState({
    stop: false,
    vectorId: '',
    position: {
      x: 0,
      y: 0,
    },
  });
  const { period, leakage, value_leakage } = useSelector(
    (state) => state.setting
  );
  const { result } = generateData(period);
  const arrayPeriod = crearArrayConNumeros(period);
  const onStart = (e, ui) => {
    const position = vectors.find((x) => x.id === ui.node.id).position;
    setState({
      vectorId: ui.node.id,
      position: { x: position, y: 0 },
      stop: false,
    });
  };

  const onDrag = (e, ui) => {
    setState({
      vectorId: ui.node.id,
      position: { x: ui.lastX + ui.deltaX, y: ui.lastY + ui.deltaY },
    });
  };

  const onStop = async (e, ui) => {
    await newPositionForVector(vectors, state);
    setState({ stop: true });
  };
  const onDeleteVector = async (id = '') => {
    dispatch(startDeleteVector(id));
  };
  const calculateColumnWidth = () => {
    const tableWidth = 859;
    const numColumns = arrayPeriod.length;
    return tableWidth / numColumns;
  };

  const newData = transformData(result);
  useEffect(() => {
    const { vectorSums } = resultValueVectors(newData, vector);
    getVectors()
      .then((res) => setVector(res.data))
      .catch((err) => console.log(err));
    const { globalLeakage, sumsPos } = calculateGlobalLeakage(
      sums.sumVectors,
      value_leakage
    );
    // calculateVectorLeakage(vector, value_leakage);
    SetSums((prev) => ({
      ...prev,
      sumVectors: vectorSums,
      sumLeakage: sumsPos,
    }));
    sertLeakVal(globalLeakage);
  }, [state.position]);
  return (
    <Grid
      container
      sx={{
        mt: 3,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'scroll',
        flexDirection: 'row',
      }}
    >
      <Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant='head'>Equip Vector</TableCell>
                <TableCell variant='head'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(vectors) && vectors.length !== 0 ? (
                vectors.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.vector}</TableCell>
                    <TableCell size='small'>
                      <IconButton onClick={() => onDeleteVector(item.id)}>
                        <DeleteIcon color='error' fontSize='small' />
                      </IconButton>
                      <EditModal vector={item} />
                    </TableCell>
                  </TableRow>
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
              {leakage ? (
                <TableRow>
                  <TableCell>Leakage</TableCell>
                </TableRow>
              ) : (
                ''
              )}
              <TableRow>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {arrayPeriod.map((p, index) => (
                  <TableCell key={index} variant='head'>
                    Period {p}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(vectors) && vectors.length !== 0 ? (
                vectors.map((v) => (
                  <Draggable
                    key={v.id}
                    bounds={{ left: 0 }}
                    axis='x'
                    defaultPosition={{ x: v.position, y: 0 }}
                    grid={[calculateColumnWidth(), 50]}
                    onStart={onStart}
                    onDrag={onDrag}
                    onStop={onStop}
                  >
                    <TableRow id={v.id} key={v.id}>
                      {arrayPeriod.map((p) => {
                        const item = v.vectors.find((v) => v.period === p);
                        return (
                          <TableCell key={p} style={{ textAlign: 'center' }}>
                            {item && leakage
                              ? item.value
                              : item.value + (item.value * value_leakage) / 100}
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
              {leakage ? (
                <TableRow>
                  {leakVal &&
                    leakVal.map((lv) => (
                      <TableCell
                        key={lv.position}
                        style={{ textAlign: 'center' }}
                      >
                        {lv.value}
                      </TableCell>
                    ))}
                </TableRow>
              ) : (
                ''
              )}
              <TableRow>
                {sums.sumLeakage
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
    </Grid>
  );
};
