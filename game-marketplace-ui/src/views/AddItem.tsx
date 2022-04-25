import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { timeDiffCalc } from '../utils';
import { useAddItemMutation } from '../redux/api/apiSlice';
import { ICreateItem, IAddItem } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectUser, updateUser } from '../redux/reducers/userSlice';
import { CreateForm } from '../Components/CreateForm';

const defaultVal = {
  value: '',
  helper: '',
  error: false,
};

export const AddItem = () => {
  const [state, setState] = useState<IAddItem>({
    name: defaultVal,
    description: defaultVal,
    price: { ...defaultVal, value: 0 },
    sale: defaultVal,
  });
  const user = useAppSelector(selectUser);
  const [addItem, { isSuccess, data }] = useAddItemMutation();

  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      if (data?.user) dispatch(updateUser(data.user));
      navigation('/items');
    }
  }, [isSuccess]);

  // FUNCTIONS
  const setError = (
    field?: string,
    helper?: string,
    value?: string | number | Date,
  ) => {
    if (field)
      setState({
        ...state,
        [field]: {
          value,
          helper,
          error: true,
        },
      });
    else {
      setState({
        ...state,
        name: {
          ...state.name,
          error: state.name.value === '',
        },
        price: {
          ...state.price,
          error: state.price.value === 0,
        },
        sale: {
          ...state.sale,
          error: state.sale.error || state.sale.value === '',
        },
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const now = Date.now();
    const selectedDate = new Date(e.target.value).getTime();

    if (now > selectedDate) {
      setError('sale', 'Sale Expiry must be a future date', e.target.value);
      return;
    }

    setState({
      ...state,
      sale: {
        value: e.target.value,
        helper: `Sale ends in ${timeDiffCalc(selectedDate, now)}`,
        error: false,
      },
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.id]: {
        value: e.target.value,
        helper: '',
        error: false,
      },
    });
  };

  const onSubmit = () => {
    const { price, name, description, sale } = state;

    if (price.value < 1 || name.value === '' || sale.value === '') {
      setError();
      return;
    }

    if (user) {
      const item: ICreateItem = {
        name: name.value.toString(),
        description: description.value.toString(),
        price: Number(price.value),
        sale: new Date(sale.value).getTime().toString(),
        owner: user.id,
      };
      addItem(item);
    }
  };

  return (
    <>
      <CreateForm
        state={state}
        handleDateChange={handleDateChange}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
    </>
  );
};
