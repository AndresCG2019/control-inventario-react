export interface claim {
    nombre: string;
    valor: string;
  }
  
  export interface credencialesUsuario {
    email: string;
    password: string;
    nombre?: string;
    apellidos?: string;
    direccion?: string;
    telefono?: string;
  }
  
  export interface usuarioDisplayDTO {
    idAuth: string;
    id_rol: number;
    id_empresa: number;
    email: string;
    nombre: string;
    apellidos: string;
  }
  
  export interface usuarioEditarDTO{
    nombre: string;
    apellidos: string;
    direccion: string;
    telefono: string;
  }
  
  export interface respuestaAutenticacion {
    token: string;
    expiracion: Date;
  }
  
  export interface usuarioDTO {
    id: string;
    email: string;
  }
  