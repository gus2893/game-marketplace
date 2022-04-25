import React, { useEffect, useState } from 'react';
import { AppBar, Grid, Button, Typography, Toolbar, Box } from '@mui/material';
import { selectUser, updateUser } from '../../redux/reducers/userSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(updateUser(undefined));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="div">
            Game Marketplace
          </Typography>
          <Grid style={{ marginLeft: 35, flexGrow: 1 }}>
            <Button color="inherit" onClick={() => navigate('/')}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={() => navigate('/items')}>
              Items
            </Button>
            <Button color="inherit" onClick={() => navigate('/items/new')}>
              Add Item
            </Button>
          </Grid>
          {!user ? (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          ) : (
            <>
              <Typography variant="body2" component="div">
                Balance: ${user.token_balance}
              </Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
