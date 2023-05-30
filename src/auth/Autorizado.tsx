import { ReactElement, useContext, useEffect, useState } from 'react';

import AutenticacionContext from './AutenticacionContext';

export default function Autorizado(props: autorizadoProps) {
  const [estaAutorizado, setEstaAutorizado] = useState(false);
  const { claims } = useContext(AutenticacionContext);

  useEffect(() => {
    setEstaAutorizado(claims.length > 0);
  }, [claims]);

  return <>{estaAutorizado ? props.autorizado : props.noAutorizado}</>;
}

interface autorizadoProps {
  autorizado: ReactElement;
  noAutorizado?: ReactElement;
}
