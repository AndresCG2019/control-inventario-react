export interface pedidoDTO {
    idPedido: number;
    fechaPedido: Date;
    idCliente: number;
    nombreCliente?: string;
    total?: number;
}

export interface articuloEgresoDTO {
    idEgreso: number;
    precioVenta: number;
    cantidad: number;
    claveArticulo: string;
    idPedido: number;
}

export interface detallesDialogState {
    open: boolean;
    idPedido: number;
}