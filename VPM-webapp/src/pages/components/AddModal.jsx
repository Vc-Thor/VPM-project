import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { SelectOption } from './SelectOption';
import { useForm } from '../../hooks/useForm';
import { TextFieldCustom } from './TexfieldCustom';
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
  availability: 0,
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
  console.log(formState);
  return (
    <>
      <Button sx={{ color: 'white' }} onClick={handleOpen}>
        Equip Vector
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography sx={{ mb: 4, textAlign: 'center' }} variant='h5'>
            Equip Vector
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3.2}>
              <TextFieldCustom
                size={260}
                title={'Vector Name'}
                name={'vector'}
                type={'text'}
                value={vector}
                onInputChange={onInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectOption
                value={area}
                onInputChange={onInputChange}
                title={'Area'}
                name={'area'}
                size={160}
              />
            </Grid>
            <Grid item xs={2}>
              <SelectOption
                value={sub_area}
                onInputChange={onInputChange}
                title={'Sub Area'}
                name={'sub_area'}
                size={160}
              />
            </Grid>
            <Grid item xs={2.2}>
              <SelectOption
                value={activity}
                onInputChange={onInputChange}
                title={'Activity'}
                name={'activity'}
                size={175}
              />
            </Grid>
            <Grid item xs={2.2}>
              <TextFieldCustom
                name={'availability'}
                size={100}
                dfValue={100 || availability}
                type={'number'}
                title={'Availability'}
                symbol={'%'}
                min={1}
                max={100}
                onInputChange={onInputChange}
              />
            </Grid>
            <Grid item xs={2.3}>
              <SelectOption
                value={criteria}
                onInputChange={onInputChange}
                title={'Criteria'}
                name={'criteria'}
                size={180}
              />
            </Grid>
            <Grid item xs={1.85}>
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
            <Grid item xs={1.85}>
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
            <Grid item xs={1.8}>
              <TextFieldCustom
                name={'area_m2'}
                size={140}
                title={'Air m2'}
                type={'number'}
                min={0}
                value={area_m2}
                onInputChange={onInputChange}
              />
            </Grid>
            <Grid item xs={1}>
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
