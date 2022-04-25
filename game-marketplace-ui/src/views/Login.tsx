import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Container,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { useLoginUserMutation } from '../redux/api/apiSlice';
import { updateUser } from '../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { useAddItemMutation } from '../redux/api/apiSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export const Login = () => {
  const [logUser, result] = useLoginUserMutation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();

  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(updateUser(result.data));
      navigation('/');
    } else if (result.isError) {
      setError('Invalid credentials');
    }
  }, [result, dispatch]);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const login = () => {
    logUser({
      email,
      password,
    });
  };

  const register = () => {
    navigation('/register');
  };

  return (
    <Container
      sx={{
        width: 300,
        height: 300,
        textAlign: 'center',
        marginTop: 20,
      }}
    >
      <Box>
        <Stack spacing={6}>
          <TextField
            id="email"
            variant="standard"
            label="Email"
            onChange={onEmailChange}
            error={result.isError}
            value={email}
            required
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type="password"
            required
            onChange={onPasswordChange}
            error={result.isError}
            value={password}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={login}
          >
            Log in
          </Button>
          <Button onClick={register}>Register</Button>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};
