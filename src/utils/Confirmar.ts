import Swal, { SweetAlertIcon } from "sweetalert2";

export default function confirmar(
  onConfirm: any,
  titulo: string = "¿Desea borrar el registro?",
  textoBotonConfirmacion: string = "Borrar",
  textoBotonCancelar: string = "Cancelar"
) {
  Swal.fire({
    title: titulo,
    confirmButtonText: textoBotonConfirmacion,
    cancelButtonText: textoBotonCancelar,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
}

export function MensajeConfirmacion(
  onConfirm: any,
  titulo: string = "¿Desea continuar?",
  textoBotonConfirmacion: string = "OK",
  textoBotonCancelar: string = "Cancelar"
) {
  Swal.fire({
    title: titulo,
    confirmButtonText: textoBotonConfirmacion,
    cancelButtonText: textoBotonCancelar,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
}

export function informar(
  texto: string,
  titulo: string = "Atención",
  onConfirm: any = null
) {
  let textoBotonConfirmacion: string = "OK";

  Swal.fire({
    title: titulo,
    text: texto,
    confirmButtonText: textoBotonConfirmacion,
    allowOutsideClick: false,
    icon: "warning",
    showCancelButton: false,
    confirmButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    }
  });
}

export function ToastCompletado(
  texto: string,
  titulo: string = "Atención",
  onConfirm: any = null
) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: texto,
  });
}

export function ToastError(texto: string, tiempo: number = 3000) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: tiempo,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    title: texto,
  });
}

