import React, { useEffect, useState } from 'react';
import { IUser } from '../interfaces';
import { useLazyGetUserQuery } from '../redux/api/apiSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectuser, updateUser } from '../redux/reducers/userSlice';

export const Home = () => {
  const [getUser, result] = useLazyGetUserQuery();
  const user = useAppSelector(selectuser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUser('1');
  }, []);

  useEffect(() => {
    if (result.isSuccess) dispatch(updateUser(result.data));
  }, [result, dispatch]);

  console.log('USER', user);
  return <div>HOme</div>;
};
