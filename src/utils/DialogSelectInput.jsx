import { useField } from 'formik';
import Select from 'react-select';
import Typography from '@mui/material/Typography';

function DialogSelectInput({ label, ...props }) {
  // eslint-disable-next-line
  const [field, meta, { setValue, setTouched }] = useField(props);
  const options = props.children.map((option) => ({
    value: option.props.value,
    label: option.props.children
  }));

  const onChange = ({ value }) => {
    setValue(value);
    if (props.callback) {
      props.callback(value, props.formikProps);
    }
  };

  return (
    <div>
      <label htmlFor={props.id || props.name} className="form-label">
        {label}
      </label>
      <Select
        options={options}
        onChange={onChange}
        onBlur={setTouched}
        placeholder={props.placeholder}
        value={props.value}
        className="mb-3"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      />
      {meta.touched && meta.error ? (
        <div>
          {
            <Typography variant="body1" color="error.main">
              {meta.error}
            </Typography>
          }
        </div>
      ) : null}
    </div>
  );
}
export default DialogSelectInput;
