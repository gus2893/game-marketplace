import React from 'react';
import { Box, TextField, Container, Button, Stack } from '@mui/material';
import { IAddItem } from '../../interfaces';

type CreateFormProps = {
  state: IAddItem;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export const CreateForm: React.FC<CreateFormProps> = ({
  state,
  onInputChange,
  handleDateChange,
  onSubmit,
}) => {
  return (
    <Container
      sx={{
        width: 300,
        height: 300,
        textAlign: 'center',
      }}
    >
      <Box>
        <Stack spacing={6}>
          <TextField
            id="name"
            variant="standard"
            label="Name"
            onChange={onInputChange}
            error={state.name.error}
            value={state.name.value}
            helperText={state.name.helper}
            required
          />
          <TextField
            id="description"
            label="Description"
            variant="standard"
            onChange={onInputChange}
            error={state.description.error}
            value={state.description.value}
            helperText={state.description.helper}
          />
          <TextField
            id="price"
            label="Price"
            type="number"
            variant="standard"
            onChange={onInputChange}
            error={state.price.error}
            value={state.price.value}
            helperText={`Transaction Fee: $${
              Math.round(state.price.value * 0.05 * 100) / 100
            }`}
            required
          />
          <TextField
            id="date"
            label="Sale Expiry"
            type="date"
            onChange={handleDateChange}
            error={state.sale.error}
            value={state.sale.value}
            helperText={state.sale.helper}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          {}
          <Button onClick={onSubmit}>Add</Button>
        </Stack>
      </Box>
    </Container>
  );
};
