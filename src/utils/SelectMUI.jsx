import { Autocomplete, TextField } from "@mui/material";

export default function FormikAutocomplete ({ textFieldProps, ...props }) {
  const {
    form: { setTouched, setFieldValue }
  } = props;

  const { name } = field;

  return (
    <Autocomplete
      {...field}
      {...props}
      onChange={(_, data) => {
        setFieldValue("gender", data.gender_name_short);
      }}
      onBlur={() => setTouched({ [name]: true })}
      // getOptionLabel={item => item.gender_name_long} //<----see here
      getOptionLabel={item => {
        // console.log( '====>' , typeof item === "string" ? props.options.find(i => i.gender_name_short === item).gender_name_long : item.gender_name_long)
        return typeof item === "string"
          ? props.options.find(i => i.gender_name_short === item)
              .gender_name_long
          : item.gender_name_long;
      }}
      // getOptionLabel={item => typeof item === 'string' ? props.options.find(i => i.gender_name_short === item).gender_name_long : item.gender_name_long}
      getOptionSelected={(item, current) => {
        return item.gender_name_short === current;
      }}
      // defaultValue={'hi'}
      renderInput={props => (
        <TextField
          {...props}
          {...textFieldProps}
          helperText={helperText}
          error={error}
        />
      )}
    />
  );
};