import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { AddModal } from './AddModal';
import { useAuthSotre } from '../../store/auth-store';

export const Sidebar = () => {
  const { user_name, resetUser } = useAuthSotre((state) => state)
  const nav = useNavigate();

  const onClickLogout = () => {
    localStorage.clear();
    resetUser()
    nav('/login');
  };
  return (
    <Box component='nav'>
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 170,
            background: '#0B5394',
          },
        }}
      >
        <Toolbar>
          <IconButton color='error' onClick={onClickLogout}>
            <LogoutIcon />
          </IconButton>
          <Link to={'home'} style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant='h6' color={'white'} noWrap component='div'>
              {user_name}
            </Typography>
          </Link>
        </Toolbar>
        <Divider />
        <Button>
          <Link to={'home'} style={{ textDecoration: 'none', color: 'white' }}>
            Table
          </Link>
        </Button>
        <AddModal />
        <Divider />
        <Button>
          <Link
            to={'graphs'}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Graphs
          </Link>
        </Button>
      </Drawer>
    </Box>
  );
};
