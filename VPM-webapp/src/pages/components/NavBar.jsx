import { Box, Drawer } from '@mui/material';
import { SettingModal } from './SettingModal';

export const NavBar = () => {
  return (
    <Box component='nav' sx={{}}>
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            display: 'flex',
            flexDirection: 'row',
            boxSizing: 'border-box',
            width: '91%',
            height: 50,
            background: '#0B5394',
            ml: 21,
          },
        }}
      >
        <SettingModal />
      </Drawer>
    </Box>
  );
};
