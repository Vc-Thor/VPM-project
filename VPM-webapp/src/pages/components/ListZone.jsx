import {
  Box,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList } from 'react-window';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  startDeleteSubareas,
  startDeleteActivity,
  startDeleteArea,
} from '../../store';
import { AddZoneModal } from './AddZoneModal';

export const ListZone = ({ data = [], title }) => {
  const [searching, setSearching] = useState('');
  const dispatch = useDispatch();

  const deleteZone = async (id = '', title = '') => {
    if (title === 'Area') {
      dispatch(startDeleteArea(id));
    }
    if (title === 'Sub Area') {
      dispatch(startDeleteSubareas(id));
    }
    if (title === 'Activity') {
      dispatch(startDeleteActivity(id));
    }
  };
  const handleSearch = (e) => {
    setSearching(e.target.value);
  };

  const filterData =
    data && Array.isArray(data)
      ? data.filter((item) =>
          item.name.toLowerCase().includes(searching.toLowerCase())
        )
      : [];
  const filteredList = filterData.length > 0 ? filterData : data;
  const dataList = ({ index, style }) => (
    <ListItem style={style} key={index} component='div' disablePadding>
      {filteredList[index] ? (
        <>
          <ListItemText primary={filteredList[index].name} />
          <IconButton
            color='error'
            onClick={() => deleteZone(filteredList[index].id, title)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ) : (
        <ListItemText primary='' />
      )}
    </ListItem>
  );
  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography>{title}</Typography>
        <Grid item sx={{ mt: 1 }}>
          <TextField
            size='small'
            label={`Search ${title}`}
            type='text'
            value={searching}
            onChange={handleSearch}
          />
        </Grid>

        <FixedSizeList
          height={250}
          width={220}
          itemSize={35}
          itemCount={filteredList.length || 0}
          overscanCount={5}
        >
          {dataList}
        </FixedSizeList>
        <Grid item sx={{ mt: 1 }}>
          <AddZoneModal title={title} />
        </Grid>
      </Grid>
    </Box>
  );
};
