import Typography from "@mui/material/Typography";

export default function MostrarErrorCampo(props: mostrarErrorCampoProps){
    return (
        <Typography variant="body1" color="error.main">
        {props.mensaje} 
      </Typography>
        
    )
}

interface mostrarErrorCampoProps{
    mensaje: string;
}