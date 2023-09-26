import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { ListZone } from './ListZone';
import { useDispatch, useSelector } from 'react-redux';
import { startGetSetting, startPutSetting } from '../../store';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
export const SettingModal = () => {
  const dispatch = useDispatch();
  const {
    unit: oldUnit,
    leakage: oldLeakage,
    value_leakage: oldValue,
    period: oldPeriod,
    id,
  } = useSelector((state) => state.setting);
  const formData = {
    unit: oldUnit || true, // ? definiendo el tipo de dato
    leakage: oldLeakage || false,
    value_leakage: oldValue || 0,
    m3kw: 0,
    period: oldPeriod || 0,
  };
  const [open, setOpen] = useState(false);
  const { areas } = useSelector((state) => state.area);
  const { subareas } = useSelector((state) => state.subarea);
  const { activitys } = useSelector((state) => state.activity);
  const {
    unit,
    leakage,
    value_leakage,
    m3kw,
    period,
    formState,
    onInputChange,
    onResetForm,
  } = useForm(formData);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onResetForm();
  };
  const handleCheckboxChange = (name) => {
    onInputChange({ target: { name, value: !formState[name] } });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const setting = {
      unit: formState.unit,
      leakage: formState.leakage,
      value_leakage: formState.value_leakage,
      period: formState.period,
      m3kw: formState.m3kw,
    };
    dispatch(startPutSetting(id, setting));
  };
  useEffect(() => {
    dispatch(startGetSetting('187a0acb-89cf-45f7-aea6-5b0c3e2c47ab'));
  }, []);

  return (
    <>
      <Button sx={{ color: 'white' }} onClick={handleOpen}>
        Settings
      </Button>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={onSubmit}>
          <Box sx={style}>
            <Typography sx={{ mb: 4, textAlign: 'center' }} variant='h5'>
              Setting
            </Typography>
            <Grid>
              <Grid
                container
                spacing={6}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '90%',
                }}
              >
                <Grid
                  item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ mr: 2 }}>Unit</Typography>
                  <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControlLabel
                      label='Metrica'
                      control={
                        <Checkbox
                          checked={unit}
                          onChange={() => handleCheckboxChange('unit')}
                        />
                      }
                    />
                    <FormControlLabel
                      label='Imperial'
                      control={
                        <Checkbox
                          checked={!unit}
                          onChange={() => handleCheckboxChange('unit')}
                        />
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControlLabel
                      label='Global'
                      control={
                        <Checkbox
                          checked={leakage}
                          onChange={() => handleCheckboxChange('leakage')}
                        />
                      }
                    />
                    <FormControlLabel
                      label='Vector'
                      control={
                        <Checkbox
                          checked={!leakage}
                          onChange={() => handleCheckboxChange('leakage')}
                        />
                      }
                    />
                  </Grid>

                  <FormControl sx={{ width: '90px' }} variant='outlined'>
                    <InputLabel>Leakage</InputLabel>
                    <OutlinedInput
                      type='number'
                      name='value_leakage'
                      value={value_leakage}
                      onChange={onInputChange}
                      label='Leakage'
                      inputProps={{ min: 0, max: 100 }}
                      endAdornment={
                        <InputAdornment position='end'>%</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl sx={{ width: '140px ' }} variant='outlined'>
                    <InputLabel>Equipment Requeriment</InputLabel>
                    <OutlinedInput
                      type='number'
                      name='m3kw'
                      value={m3kw}
                      onChange={onInputChange}
                      label={'Equipment Vector'}
                      endAdornment={
                        <InputAdornment position='end'>m3/kW</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl variant='outlined' sx={{ width: '80px' }}>
                    <InputLabel>Period</InputLabel>
                    <OutlinedInput
                      type='number'
                      name='period'
                      value={period}
                      onChange={onInputChange}
                      label={'Period'}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={10}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Grid item sx={{ mt: 2 }}>
                  <ListZone formState={formState} data={areas} title='Area' />
                </Grid>
                <Grid item sx={{ mt: 2 }}>
                  <ListZone
                    formState={formState}
                    data={subareas}
                    title='Sub Area'
                  />
                </Grid>
                <Grid item sx={{ mt: 2 }}>
                  <ListZone
                    formState={formState}
                    data={activitys}
                    title='Activity'
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button type='submit'>Set</Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};
