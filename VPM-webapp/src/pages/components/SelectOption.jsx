import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const SelectOption = ({
  value,
  onInputChange,
  title,
  name,
  size,
  data = [],
}) => {
  return (
    <div>
      <FormControl sx={{ width: `${size}px` }}>
        <InputLabel>{title}</InputLabel>
        <Select
          value={value}
          onChange={onInputChange}
          name={name}
          label={title}
        >
          {data.map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
