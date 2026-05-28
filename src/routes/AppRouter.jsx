import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import MainLayout from "../layouts/MainLayout"
import EmptyPage from "../pages/EmptyPage"
import Ingresos from "../pages/Ingresos"
import Inventario from "../pages/Inventario"
import Clientes from "../pages/Clientes"
import Facturacion from "../pages/Facturacion"
import CentroAyuda from "../pages/CentroAyuda"
import Gastos from "../components/Gastos"
import ReportesFinancieros from "../pages/ReportesFinancieros"
import Empleados from "../pages/Empleados"
import Configuracion from "../pages/Configuracion"

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/ingresos" element={<Ingresos />} />
                    <Route path="/facturacion" element={<Facturacion />} />
                    <Route path="/inventario" element={<Inventario />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/centro-ayuda" element={<CentroAyuda />} />

                    <Route path="/gastos" element={<Gastos />} />
                    <Route path="reportes-financieros" element={<ReportesFinancieros />} />
                    <Route path="/empleados" element={<Empleados />} />
                    <Route path="/configuracion" element={<Configuracion />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter