import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Container,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { updateUser } from '../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { useAddUserMutation } from '../redux/api/apiSlice';
import { useAppDispatch } from '../redux/hooks';

export const Register = () => {
  const [addUser, result] = useAddUserMutation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

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
  }, [result, dispatch, navigation]);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const createUser = () => {
    addUser({
      username,
      email,
      password,
    });
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
            id="username"
            variant="standard"
            label="User Name"
            onChange={onUsernameChange}
            error={result.isError}
            value={username}
            required
          />
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

          <Button onClick={createUser}>Register</Button>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};
