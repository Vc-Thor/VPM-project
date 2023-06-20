import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { SelectOption } from './SelectOption';
import { useForm } from '../../hooks/useForm';
import { TextFieldCustom } from './TexfieldCustom';
import { useDispatch, useSelector } from 'react-redux';
import {
  startGetCriterias,
  startGetAreas,
  startGetActivitys,
  startGetSubareas,
} from '../../store';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const formData = {
  vector: '',
  availability: 100,
  power_input: 0,
  air_velocity: 0,
  area_m2: 0,
  fix_q: 0,
  position: 0,
  area: '',
  sub_area: '',
  activity: '',
  criteria: '',
};
export const AddModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    vector,
    availability,
    power_input,
    air_velocity,
    area_m2,
    fix_q,
    area,
    sub_area,
    activity,
    criteria,
    onInputChange,
    formState,
  } = useForm(formData);

  const { criterias } = useSelector((state) => state.criteria);
  const { areas } = useSelector((state) => state.area);
  const { subareas } = useSelector((state) => state.subarea);
  const { activitys } = useSelector((state) => state.activity);
  console.log(formState);
  useEffect(() => {
    dispatch(startGetCriterias());
    dispatch(startGetAreas());
    dispatch(startGetActivitys());
    dispatch(startGetSubareas());
  }, []);

  return (
    <>
      <Button sx={{ color: 'white' }} onClick={handleOpen}>
        Equip Vector
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ mb: 4, textAlign: 'center' }} variant='h5'>
            Equip Vector
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid item>
              <TextFieldCustom
                size={260}
                title={'Vector Name'}
                name={'vector'}
                type={'text'}
                value={vector}
                onInputChange={onInputChange}
              />
            </Grid>
            <Grid item>
              <SelectOption
                value={area}
                onInputChange={onInputChange}
                title={'Area'}
                name={'area'}
                size={160}
                data={areas}
              />
            </Grid>
            <Grid item>
              <SelectOption
                value={sub_area}
                onInputChange={onInputChange}
                title={'Sub Area'}
                name={'sub_area'}
                size={160}
                data={subareas}
              />
            </Grid>
            <Grid item>
              <SelectOption
                value={activity}
                onInputChange={onInputChange}
                title={'Activity'}
                name={'activity'}
                size={175}
                data={activitys}
              />
            </Grid>
            <Grid item>
              <TextFieldCustom
                name={'availability'}
                size={100}
                dfValue={availability}
                type={'number'}
                title={'Availability'}
                symbol={'%'}
                min={1}
                max={100}
                onInputChange={onInputChange}
              />
            </Grid>
            <Grid item>
              <SelectOption
                value={criteria}
                onInputChange={onInputChange}
                title={'Criteria'}
                name={'criteria'}
                size={180}
                data={criterias}
              />
            </Grid>
            <Grid item>
              <TextFieldCustom
                name={'power_input'}
                size={145}
                title={'Power Input'}
                symbol={'KW'}
                type={'number'}
                min={0}
                value={power_input}
                onInputChange={onInputChange}
              />
            </Grid>
            <Grid item>
              <TextFieldCustom
                name={'air_velocity'}
                size={145}
                title={'Air Velocity'}
                symbol={'m/s'}
                type={'number'}
                min={0}
                value={air_velocity}
                onInputChange={onInputChange}
              />
            </Grid>
            <Grid item>
              <TextFieldCustom
                name={'area_m2'}
                size={140}
                title={'Area m2'}
                type={'number'}
                min={0}
                value={area_m2}
                onInputChange={onInputChange}
              />
            </Grid>
            <Grid item>
              <TextFieldCustom
                name={'fix_q'}
                size={140}
                title={'Fix Q'}
                symbol={'m3/s'}
                type={'number'}
                min={0}
                value={fix_q}
                onInputChange={onInputChange}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
