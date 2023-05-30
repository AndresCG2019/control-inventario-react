import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";

export default function SelectInputEditable(props: selectInputEditableProps) {
  const [cbxChecked, setCbxChecked] = useState<boolean>(false);

  const handleChange = (e: any) => {
    if (e.target.checked) {
      setCbxChecked(true);
    } else {
      setCbxChecked(false);
    }
  };

  return (
    <>
      {props.editando ? (
        <Card>
          <CardContent>
            {props.editando ? (
              <div>
                <input id="cbx" type="checkbox" style={{display: props.canEdit}} onChange={handleChange}></input>

                <label htmlFor="cbxAnio" style={{display: props.canEdit}} className="ml-1">
                  Editar {props.nombre}
                </label>

                {cbxChecked ? (
                  props.children
                ) : (
                  <h5>{`${props.nombre} actual: ${props.valorActual}`}</h5>
                )}
              </div>
            ) : (
              props.children
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {props.editando ? (
            <div>
              <input id="cbx" type="checkbox" onChange={handleChange}></input>

              <label htmlFor="cbxAnio" className="ml-1">
                Editar {props.nombre}
              </label>

              {cbxChecked ? (
                props.children
              ) : (
                <h5>{`${props.nombre} actual: ${props.valorActual}`}</h5>
              )}
            </div>
          ) : (
            props.children
          )}
        </>
      )}
    </>
  );
}

interface selectInputEditableProps {
  editando: boolean;
  children: ReactElement;
  valorActual?: string;
  nombre: string;
  canEdit?: string
}

SelectInputEditable.defaultProps = {
  editando: false,
  canEdit: ""
};
