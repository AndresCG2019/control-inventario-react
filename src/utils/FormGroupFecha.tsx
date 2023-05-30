import { useFormikContext } from 'formik';
import MostrarErrorCampo from './../utils/MostrarErrorCampo';

export default function FormGroupFecha(props: formGroupFechaProps) {
  const { values, validateForm, touched, errors } = useFormikContext<any>();
  if (values[props.campo]?.length > 19) {
    values[props.campo] = new Date(values[props.campo]?.substr(0, 19));
  }
  values[props.campo] = new Date(values[props.campo]);
  return (
    <div className="form-group">
      <label htmlFor={props.campo}>{props.label}</label>
      <input
        type="date"
        className="form-control"
        id={props.campo}
        name={props.campo}
        disabled={props.disabled}
        defaultValue={`${values[props.campo]?.getFullYear()}-${(
          '0' +
          (values[props.campo]?.getMonth() + 1)
        ).slice(-2)}-${('0' + values[props.campo]?.getDate()).slice(-2)}`}
        onChange={(e) => {
          const fecha = new Date(e.currentTarget.value + 'T00:00:00');
          values[props.campo] = fecha;
          validateForm();
        }}
      />
      {touched[props.campo] && errors[props.campo] ? (
        <MostrarErrorCampo mensaje={errors[props.campo]?.toString()!} />
      ) : null}
    </div>
  );
}

interface formGroupFechaProps {
  campo: string;
  label: string;
  disabled: boolean;
}

FormGroupFecha.defaultProps = {
  disabled: false
}
