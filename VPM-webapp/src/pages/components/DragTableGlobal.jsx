// import {
//   Grid,
//   IconButton,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import {
//   newPositionForVector,
//   resultValueVectors,
// } from '../../helpers/data/calculations';
import { result, transformData } from '../../helpers/datas/data';
// import { startGetVectors } from '../../store';
// import DeleteIcon from '@mui/icons-material/Delete';
import Draggable from 'react-draggable';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resultValueVectors } from '../../helpers/datas/calculations';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

// export const DragTableGlobal = () => {
//   const dispatch = useDispatch();
//   const [resultSum, setResultSum] = useState([]);
//   const [state, setState] = useState({
//     vectorId: '',
//     position: {
//       x: 0,
//       y: 0,
//     },
//   });
//   const { vectors } = useSelector((state) => state.vector);
//   const period = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//   const onStart = (e, ui) => {
//     const position = vectors.find((x) => x.id === ui.node.id);
//     console.log({ id: ui.node.id, vectors });
//     setState({ vectorId: ui.node.id, position: { x: position, y: 0 } });
//   };

//   const onDrag = (e, ui) => {
//     setState({
//       vectorId: ui.node.id,
//       position: { x: ui.lastX + ui.deltaX, y: ui.lastY + ui.deltaY },
//     });
//   };

//   const onStop = async (e, ui) => {
//     // await newPositionForVector(vectors, state);
//     // const { newData } = await transformData(result);
//     // const { newResults } = await resultValueVectors(newData, vectors);
//     // setResultSum(newResults);
//   };

//   useEffect(() => {
//     const { newData } = transformData(result);
//     const { newResults } = resultValueVectors(newData, vectors);
//     setResultSum(newResults);
//   }, []);

//   return (
//     <Grid
//       container
//       sx={{
//         mt: 3,
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         overflow: 'scroll',
//       }}
//     >
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell variant='head'>Equip Vector</TableCell>
//               {period.map((p, index) => (
//                 <TableCell key={index} variant='head'>
//                   Period {p}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Array.isArray(vectors) &&
//               vectors.map((vector) => (
//                 <TableRow key={vector.id}>
//                   <TableCell>{vector.vector}</TableCell>
//                   {period.map((p) => {
//                     const item = vector.vectors.find((v) => v.period === p);
//                     return (
//                       <Draggable key={item.id} axis='x'>
//                         <TableCell>{item && item.value}</TableCell>
//                       </Draggable>
//                     );
//                   })}
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {/* {vectors.length === undefined ? (
//         <Grid item sx={{ mt: 3 }}>
//           <Typography variant='h6' color='blue'>
//             NO HAY DATOS...
//           </Typography>
//         </Grid>
//       ) : (
//         <Grid container sx={{ mt: 3, gap: 8 }}>
//           <Grid item>
//             {Array.isArray(vectors) &&
//               vectors.map((item) => (
//                 <Grid
//                   item
//                   key={item.id}
//                   sx={{ display: 'flex', flexDirection: 'row' }}
//                 >
//                   <Typography
//                     key={item.id}
//                     variant='h6'
//                     sx={{ fontSize: 15, p: 1 }}
//                   >
//                     {item.vector}
//                   </Typography>
//                   <IconButton color='error'>
//                     <DeleteIcon fontSize='small' />
//                   </IconButton>
//                   <IconButton color='error'>
//                     <DeleteIcon fontSize='small' />
//                   </IconButton>
//                 </Grid>
//               ))}
//           </Grid>
//           <Grid
//             item
//             sx={{
//               ml: 1,
//               display: 'flex',
//               flexDirection: 'column',
//             }}
//           >
//             {Array.isArray(vectors) &&
//               vectors.map((vector) => (
//                 <Draggable
//                   key={vector.id}
//                   axis='x'
//                   bounds={{ left: 0 }}
//                   grid={[100, 100]}
//                   defaultPosition={{ x: vector.position, y: 0 }}
//                   onStart={onStart}
//                   onDrag={onDrag}
//                   onStop={onStop}
//                 >
//                   <Grid
//                     id={vector.id}
//                     key={vector.id}
//                     item
//                     sx={{
//                       width: '100%',
//                       display: 'flex',
//                       gap: '70px',
//                       justifyContent: 'center',
//                       borderRadius: '3px',
//                       pt: '12px',
//                       fontSize: '15px',
//                     }}
//                   >
//                     {vector.vectors
//                       .slice()
//                       .sort((a, b) => a.period - b.period)
//                       .map((item) => (
//                         <Typography
//                           key={item.id}
//                           variant='h6'
//                           sx={{ fontSize: 17 }}
//                         >
//                           {item.value}
//                         </Typography>
//                       ))}
//                   </Grid>
//                 </Draggable>
//               ))}
//           </Grid>
//           <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
//             <Grid item>
//               <Typography variant='h6' sx={{ fontSize: '17px' }}>
//                 RESULT
//               </Typography>
//             </Grid>
//             <Grid item sx={{ ml: '115px', gap: '80px', display: 'flex' }}>
//               {resultSum.map((d, index) => (
//                 <Typography key={index}>{d.value}</Typography>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       )} */}
//     </Grid>
//   );
// };

export const DragTableGlobal = () => {
  const dispatch = useDispatch();
  const [resultSum, setResultSum] = useState([]);
  const { vectors } = useSelector((state) => state.vector);
  const period = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const onStart = (e, ui) => {
    // Aquí puedes realizar acciones específicas al comenzar a arrastrar la fila
  };

  const onDrag = (e, ui) => {
    // Aquí puedes realizar acciones específicas durante el arrastre de la fila
  };

  const onStop = (e, ui) => {
    console.log(ui);
  };
  const calculateColumnWidth = () => {
    const tableWidth = 859; // Ancho total de la tabla (ajústalo según tus necesidades)
    const numColumns = period.length; // Número de columnas
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
                  grid={[calculateColumnWidth(), 50]}
                  onStart={onStart}
                  onDrag={onDrag}
                  onStop={onStop}
                >
                  <TableRow key={vector.id}>
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
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
