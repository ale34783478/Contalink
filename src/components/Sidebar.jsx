import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"

function Sidebar() {
    const rol = localStorage.getItem("rol")
    const [modoAdmin, setModoAdmin] = useState(false)
    const [sidebarOculto, setSidebarOculto] = useState(false)

    useEffect(() => {
        const actualizarModo = () => {
            setModoAdmin(localStorage.getItem("modoAdmin") === "true")
        }

        actualizarModo()
        window.addEventListener("storage", actualizarModo)
        window.addEventListener("modoAdminActualizado", actualizarModo)

        return () => {
            window.removeEventListener("storage", actualizarModo)
            window.removeEventListener("modoAdminActualizado", actualizarModo)
        }
    }, [])

    const opcionesUsuario = [
        { ruta: "/dashboard", icono: "📊", texto: "Dashboard" },
        { ruta: "/ingresos", icono: "🛒", texto: "Ventas" },
        { ruta: "/facturacion", icono: "🧾", texto: "Facturación" },
        { ruta: "/inventario", icono: "📦", texto: "Inventario" },
        { ruta: "/clientes", icono: "👥", texto: "Clientes" },
        { ruta: "/centro-ayuda", icono: "💬", texto: "Centro de Ayuda" },
    ]

    const opcionesAdmin = [
        { ruta: "/gastos", icono: "💸", texto: "Gastos" },
        { ruta: "/reportes-financieros", icono: "📊", texto: "Reportes Financieros" },
        { ruta: "/empleados", icono: "👨‍💼", texto: "Empleados" },
        { ruta: "/configuracion", icono: "⚙️", texto: "Configuración" },
    ]

    const opcionesMostrar =
        rol === "admin" && modoAdmin ? opcionesAdmin : opcionesUsuario

    return (
        <aside
            className={`h-screen bg-gradient-to-b from-[#071739] via-[#0B2C66] to-[#123D8D] text-white shadow-2xl flex flex-col transition-all duration-300 shrink-0 ${sidebarOculto ? "w-20 px-3 py-5" : "w-72 p-6"
                }`}
        >
            <div className="mb-8">
                <div
                    className={`flex ${sidebarOculto
                        ? "flex-col items-center gap-5"
                        : "items-center justify-between gap-3"
                        }`}
                >
                    <div className={`flex items-center ${sidebarOculto ? "" : "gap-3"}`}>
                        <div
                            className={`rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-bold ${sidebarOculto ? "w-11 h-11 text-lg" : "w-12 h-12 text-xl"
                                }`}
                        >
                            C
                        </div>

                        {!sidebarOculto && (
                            <div>
                                <h1 className="text-2xl font-black leading-none">
                                    Contalink
                                </h1>
                                <p className="text-xs text-blue-100 mt-1">
                                    Sistema financiero
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="relative group">
                        <button
                            type="button"
                            onClick={() => setSidebarOculto(!sidebarOculto)}
                            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition"
                        >
                            <div className="flex flex-col gap-[3px]">
                                <span className="w-4 h-[2px] bg-white rounded-full" />
                                <span className="w-4 h-[2px] bg-white rounded-full" />
                                <span className="w-4 h-[2px] bg-white rounded-full" />
                            </div>
                        </button>

                        <div className="absolute left-1/2 -translate-x-1/2 top-12 opacity-0 group-hover:opacity-100 pointer-events-none bg-slate-900/70 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap shadow-lg transition z-50">
                            {sidebarOculto ? "Mostrar menú" : "Ocultar menú"}
                        </div>
                    </div>
                </div>

                {!sidebarOculto && (
                    <div className="bg-white/10 border border-white/10 rounded-2xl p-3 mt-5">
                        <p className="text-xs text-blue-100">Usuario activo</p>
                        <p className="text-sm font-bold mt-1">
                            {rol === "admin" ? "Administrador" : "Empleado"}
                        </p>
                    </div>
                )}
            </div>

            <nav className="flex flex-col gap-2">
                {opcionesMostrar.map((opcion) => (
                    <div key={opcion.ruta} className="relative group">
                        <NavLink
                            to={opcion.ruta}
                            className={({ isActive }) =>
                                `flex items-center rounded-xl text-white transition relative z-10 ${sidebarOculto
                                    ? "justify-center w-12 h-12 mx-auto"
                                    : "gap-3 px-4 py-3"
                                } ${isActive
                                    ? "bg-white/20"
                                    : "hover:bg-white/10"
                                }`
                            }
                        >
                            <span className="text-lg">{opcion.icono}</span>

                            {!sidebarOculto && (
                                <span className="font-medium">
                                    {opcion.texto}
                                </span>
                            )}
                        </NavLink>

                        {sidebarOculto && (
                            <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none bg-slate-900/80 text-white text-sm px-3 py-2 rounded-xl whitespace-nowrap shadow-lg transition z-50">
                                {opcion.texto}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar