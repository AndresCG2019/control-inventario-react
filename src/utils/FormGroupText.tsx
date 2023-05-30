import { Field, ErrorMessage } from "formik";
import MostrarErrorCampo from "./MostrarErrorCampo";

export default function FormGroupText(props: formGroupTextProps) {
  function onKeyUp() {
    props.onKeyUp(props.valor, props.allValues);
  }

  let style = "{text-align:right}"
  if (props.type === "number") {
    style = "{text-align:right}"
  }
  
  return (
    <div style={{ width: props.width }} className="form-group">
      {props.label ? <label htmlFor={props.campo}>{props.label}</label> : null}
      <Field
        name={props.campo}
        className="form-control" //text-right <-- para alinear el texto dentro del input a la derecha...
        type={props.type}
        as={props.as}
        placeholder={props.placeholder}
        step=".01"
        onKeyUp={props.onKeyUp ? onKeyUp : null}
        disabled={props.disabled}
      />
      <ErrorMessage name={props.campo}>
        {(mensaje) => <MostrarErrorCampo mensaje={mensaje} />}
      </ErrorMessage>
    </div>
  );
}

interface formGroupTextProps {
  allValues?: any;
  valor?: any;
  onKeyUp?: any;
  campo: string;
  label?: string;
  placeholder?: string;
  type: "text" | "password" | "hidden" | "number" | "date";
  width: string;
  as: "input" | "textarea";
  disabled: boolean
}

FormGroupText.defaultProps = {
  type: "text",
  width: "auto",
  as: "input",
  onKeyUp: null,
  disabled: false
};
