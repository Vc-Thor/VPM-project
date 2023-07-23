import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { tranformAreaVectors } from '../helpers/datas/transformation';
import { Grid, Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const AreaGraphs = () => {
  const { vectors } = useSelector((state) => state.vector);
  const period = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const { areaVectors } = tranformAreaVectors(vectors);
  const generarColorAleatorio = () => {
    const hexColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${'0'.repeat(6 - hexColor.length)}${hexColor}80`;
  };
  const data = {
    labels: period.map((item) => item),
    datasets: areaVectors.map((item) => ({
      fill: true,
      label: item.area,
      data: item.vectors
        .sort((a, b) => a.period - b.period)
        .map((vector) => vector.value),
      backgroundColor: generarColorAleatorio(),
    })),
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid item sx={{ mt: 4 }}>
        <Typography variant='h5'>Area Graphs</Typography>
      </Grid>
      {Array.isArray(areaVectors) && areaVectors.length !== 0 ? (
        <Grid item sx={{ mt: 4, width: '100%', flexGrow: 1 }}>
          <Line options={options} data={data} />
        </Grid>
      ) : (
        <Grid item sx={{ mt: 16 }}>
          <Typography variant='h4'>No data</Typography>
        </Grid>
      )}{' '}
    </Grid>
  );
};
