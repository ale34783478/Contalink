import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [intentos, setIntentos] = useState(0)
    const [bloqueado, setBloqueado] = useState(false)
    const [contador, setContador] = useState(10)

    useEffect(() => {
        let timer

        if (bloqueado && contador > 0) {
            timer = setTimeout(() => {
                setContador((prev) => prev - 1)
            }, 1000)
        }

        if (contador === 0) {
            setBloqueado(false)
            setIntentos(0)
            setContador(10)
            setError("")
        }

        return () => clearTimeout(timer)
    }, [bloqueado, contador])

    const handleLogin = () => {
        if (bloqueado) return

        const usuarios = [
            {
                usuario: "Admin",
                password: "Contalink321",
                rol: "admin",
            },
            {
                usuario: "Empleado",
                password: "Empleado123",
                rol: "empleado",
            },
        ]

        const usuarioEncontrado = usuarios.find(
            (u) =>
                u.usuario === usuario &&
                u.password === password
        )

        if (usuarioEncontrado) {

            localStorage.setItem(
                "rol",
                usuarioEncontrado.rol
            )

            navigate("/dashboard")
            return
        }

        const nuevosIntentos = intentos + 1
        setIntentos(nuevosIntentos)

        if (nuevosIntentos >= 3) {
            setBloqueado(true)
            setError("Sistema bloqueado temporalmente")
        } else {
            setError(
                `Usuario o contraseña incorrectos`
            )
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-sky-100 px-4">
            <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                <div className="hidden md:flex relative overflow-hidden flex-col justify-between bg-gradient-to-br from-[#071739] via-[#0B2C66] to-[#0EA5E9] text-white p-12">

                    <div className="absolute inset-0 opacity-10">

                        <div className="absolute top-20 left-10 w-72 h-72 border border-cyan-300 rounded-full"></div>

                        <div className="absolute bottom-10 right-10 w-96 h-96 border border-white/30 rounded-full"></div>

                        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border border-cyan-200/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

                    </div>

                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                    <div className="absolute inset-0 opacity-[0.05]">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,white,transparent_35%)]"></div>
                    </div>

                    <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">

                        <div className="flex items-center gap-4 mb-14">

                            <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                                <span className="text-4xl font-bold">
                                    C
                                </span>
                            </div>

                            <div>
                                <h1 className="text-5xl font-black tracking-tight">
                                    Contalink
                                </h1>

                                <p className="text-cyan-100 text-sm mt-1">
                                    Software contable para PYMES
                                </p>
                            </div>

                        </div>

                        <div className="max-w-md">

                            <h2 className="text-3xl font-bold leading-tight mb-6">
                                Control financiero moderno para empresas en crecimiento
                            </h2>

                            <p className="text-blue-100 text-lg leading-relaxed mb-10">
                                Automatiza procesos contables, administra ingresos y genera reportes financieros claros desde cualquier lugar.
                            </p>

                            <div className="space-y-5">

                                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center text-xl">
                                        📊
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Reportes inteligentes
                                        </p>

                                        <p className="text-sm text-blue-100">
                                            Visualiza información financiera en tiempo real.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center text-xl">
                                        🔒
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Seguridad empresarial
                                        </p>

                                        <p className="text-sm text-blue-100">
                                            Protección avanzada para datos financieros.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center text-xl">
                                        ☁️
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Acceso en la nube
                                        </p>

                                        <p className="text-sm text-blue-100">
                                            Gestiona tu negocio desde cualquier dispositivo.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="relative z-10 mt-10 text-sm text-blue-100 border-t border-white/10 pt-6">
                        Plataforma tecnológica financiera enfocada en simplicidad, automatización y crecimiento empresarial.
                    </div>

                </div>

                <div className="p-10 md:p-14 flex flex-col justify-center">
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold text-blue-900 mb-2">
                            Bienvenido
                        </h2>

                        <p className="text-gray-500">
                            Ingresa tus credenciales para acceder al sistema.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">
                                Usuario
                            </label>

                            <input
                                type="text"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                disabled={bloqueado}
                                placeholder="Ingrese su usuario"
                                className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={bloqueado}
                                placeholder="Ingrese su contraseña"
                                className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        {bloqueado && (
                            <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 p-3 rounded-xl text-sm font-semibold">
                                Intenta nuevamente en {contador} segundos
                            </div>
                        )}

                        <button
                            onClick={handleLogin}
                            disabled={bloqueado}
                            className="mt-2 bg-blue-800 text-white p-4 rounded-xl font-semibold hover:bg-blue-900 transition shadow-lg shadow-blue-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {bloqueado ? "Sistema bloqueado" : "Ingresar"}
                        </button>

                        <div className="text-sm text-gray-500 bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4 space-y-2">
                            <div>
                                <p className="font-semibold text-blue-900">
                                    Administrador
                                </p>

                                <p><strong>Usuario:</strong> Admin</p>
                                <p><strong>Contraseña:</strong> Contalink321</p>
                            </div>

                            <div className="border-t pt-2">
                                <p className="font-semibold text-blue-900">
                                    Empleado
                                </p>

                                <p><strong>Usuario:</strong> Empleado</p>
                                <p><strong>Contraseña:</strong> Empleado123</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login