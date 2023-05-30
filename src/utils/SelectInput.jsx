import { useField } from "formik";
import Select from "react-select";

function SelectInput({ label, ...props }) {
  
  // eslint-disable-next-line
  const [field, meta, { setValue, setTouched }] = useField(props);
  const options = props.children.map((option) => ({
    value: option.props.value,
    label: option.props.children,

  }));

  const onChange = ({ value }) => { 
    setValue(value);
    if (props.callback) {
      props.callback(value);
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
        // estos props son para que las opciones no se sobrepongan a otros elementos
        menuPortalTarget={document.body} 
        menuPosition={'fixed'} 
      />
      {meta.touched && meta.error ? (
        <div className="form-text text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
}
export default SelectInput;