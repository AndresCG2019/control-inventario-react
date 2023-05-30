import { TextField } from '@mui/material';
import { ErrorMessage } from 'formik';
import MostrarErrorCampo from './MostrarErrorCampo';

export default function FormGroupTextMUI(props: formGroupTextMUIProps) {
  return (
    <div>
      <TextField
        fullWidth
        margin="normal"
        autoFocus
        label={props.label}
        name={props.name}
        type={props.type}
        variant="outlined"
        onChange={props.handleChange}
        value={props.value}
      />

      <ErrorMessage name={props.name}>
        {(mensaje) => <MostrarErrorCampo mensaje={mensaje} />}
      </ErrorMessage>
    </div>
  );
}

interface formGroupTextMUIProps {
  handleChange: any;
  label: string;
  type: string;
  name: string;
  value: string;
}
