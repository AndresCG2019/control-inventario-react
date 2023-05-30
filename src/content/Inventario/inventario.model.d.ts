import { categoriasDTO } from "../Categorias/categorias.model";

export interface ArticuloDTO {
    claveArticulo: string;
    descripcion: string;
    unidad: string;
    existencia: number;
    precioVenta: number;
    precioCompra: number;
    categoria: categoriasDTO;
    idCategoria: number;
    descripcionCategoria?: number;
    totalVendido?: number;
    totalComprado?: number;
}

export interface movimientosDialogState {
    open: boolean;
    articulo: ArticuloDTO;
}

export interface articuloIngresoDTO {
    idIngreso: number;
    precioCompra: number;
    cantidad: number;
    fechaIngreso?: Date;
    claveArticulo: string;
    idProveedor: number;
}

export interface movimientoDTO {
    claveArticulo: string;
    fecha: string;
    monto: number;
    cantidad: number;
    tipoMovimiento: string;
    nombreCliente: string;
    nombreProveedor: string;
}