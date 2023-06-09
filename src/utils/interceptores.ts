import axios from "axios";
import { obtenerToken } from "../auth/ManejadorJWT";

export function configurarInterceptor() {
    axios.interceptors.request.use(
        function(config) {
            const token = obtenerToken();
            if (token) {
                config.headers.Authorization = `bearer ${token}`
            }
            return config;
        },
        function(error) {
            return Promise.reject(error);
        }
    );
}