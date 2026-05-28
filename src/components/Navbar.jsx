import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
    const [menuAbierto, setMenuAbierto] = useState(false)

    const rol = localStorage.getItem("rol")
    const nombreUsuario = rol === "admin" ? "Administrador" : "Empleado 1"
    const menuRef = useRef(null)

    useEffect(() => {
        const cerrarMenu = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAbierto(false)
            }
        }

        const cerrarPorScroll = () => {
            setMenuAbierto(false)
        }

        document.addEventListener("mousedown", cerrarMenu)
        window.addEventListener("scroll", cerrarPorScroll, true)

        return () => {
            document.removeEventListener("mousedown", cerrarMenu)
            window.removeEventListener("scroll", cerrarPorScroll, true)
        }
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem("rol")
        navigate("/")
    }

    return (
        <header className="h-20 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm flex items-center justify-between px-8 sticky top-0 z-[999999]">
            <div>
                <h2 className="text-2xl font-bold text-blue-900">
                    Sistema Contable
                </h2>

                <p className="text-sm text-gray-500">
                    Gestión financiera y control empresarial
                </p>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center gap-3 bg-blue-50 border border-blue-100 px-4 py-2 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-blue-800 text-white flex items-center justify-center">
                        📊
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Estado
                        </p>

                        <p className="text-sm font-semibold text-blue-900">
                            Sistema activo
                        </p>
                    </div>
                </div>

                <div className="relative z-[9999]" ref={menuRef}>
                    <button
                        onClick={() => setMenuAbierto(!menuAbierto)}
                        className="flex items-center gap-3 bg-white border border-blue-100 hover:bg-blue-50 px-4 py-2 rounded-2xl transition shadow-sm"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-sky-500 text-white flex items-center justify-center font-bold">
                            {rol === "admin" ? "A" : "E"}
                        </div>

                        <div className="text-left">
                            <p className="text-sm font-bold text-blue-900">
                                {nombreUsuario}
                            </p>

                            <p className="text-xs text-gray-500">
                                {rol === "admin" ? "Rol administrador" : "Rol empleado"}
                            </p>
                        </div>

                        <span className="text-blue-900 text-sm">
                            ▾
                        </span>
                    </button>

                    {menuAbierto && (
                        <div className="fixed right-8 top-[5.25rem] w-56 bg-white border border-blue-100 rounded-2xl shadow-2xl overflow-hidden z-[1000000]">
                            <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
                                <p className="text-sm font-bold text-blue-900">
                                    {nombreUsuario}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Cuenta activa
                                </p>
                            </div>

                            <div className="p-2">
                                {rol === "admin" && (
                                    <button
                                        onClick={() => {
                                            const nuevoEstado =
                                                localStorage.getItem("modoAdmin") !== "true"

                                            localStorage.setItem("modoAdmin", nuevoEstado)

                                            window.dispatchEvent(
                                                new Event("modoAdminActualizado")
                                            )

                                            if (nuevoEstado) {
                                                navigate("/gastos")
                                            } else {
                                                navigate("/dashboard")
                                            }

                                            setMenuAbierto(false)
                                        }}
                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 text-sm font-medium text-gray-700"
                                    >
                                        {localStorage.getItem("modoAdmin") === "true"
                                            ? "Inicio"
                                            : "Administración"}
                                    </button>
                                )}

                                <button
                                    onClick={cerrarSesion}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 text-sm font-medium text-red-600"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar