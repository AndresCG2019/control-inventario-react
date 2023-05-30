import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import {useNavigate, useParams } from "react-router-dom";
import Cargando from "./Cargando";
import MostrarErrores from "./MostrarErrores";

export default function EditarEntidad<TCreacion, TLectura>(
  props: editarEntidadProps<TCreacion, TLectura>
) {
  const { id }: any = useParams();
  const [entidad, setEntidad] = useState<TCreacion>();
  const [errores, setErrores] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID: ", id);
    
    let isApiSubscribed = true;
    // props.url es la direccion a la que se hace la peticion para cargar la entidad que se va a editar
    axios
      .get(`${props.url}/${id}`)
      .then((respuesta: AxiosResponse<TLectura>) => {
        if (isApiSubscribed) {
          setEntidad(props.transformar(respuesta.data));
        }
      });
    return () => {
      isApiSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function editar(entidadEditar: TCreacion) {
    try {
      if (props.transformarFromData) {
        const formData = props.transformarFromData(entidadEditar);
        console.log("EL VALOR DE FORM DATA ES: ", formData);
        await axios({
          method: "put",
          url: `${props.url}/${id}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.put(`${props.url}/${id}`, entidadEditar);
      }
      navigate(`${props.urlIndice}`);
    } catch (error: any) {
      try {
        setErrores(error.response.data);
      } catch (error) {}
    }
  }

  return (
    <>
      {/* <h2>Editar {props.nombreEntidad}</h2> */}
      <MostrarErrores errores={errores} />
      {entidad ? props.children(entidad, editar) : <Cargando />}
    </>
  );
}

interface editarEntidadProps<TCreacion, TLectura> {
  url: string;
  urlIndice: string;
  nombreEntidad: string;
  children(
    entidad: TCreacion,
    editar: (entidad: TCreacion) => void
  ): ReactElement;
  transformar(entidad: TLectura): TCreacion;
  transformarFromData?(modelo: TCreacion): FormData;
}

EditarEntidad.defaultProps = {
  transformar: (entidad: any) => entidad,
};
