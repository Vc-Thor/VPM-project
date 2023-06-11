import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/auth/authSlice';

export const Sidebar = () => {
  const { user_name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onClickLogout = () => {
    dispatch(logout());
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
          <Link
            to={'projects'}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Projects
          </Link>
        </Button>
      </Drawer>
    </Box>
  );
};
