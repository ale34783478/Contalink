import { useMemo, useState } from "react"

function Gastos() {
    const rol = localStorage.getItem("rol")
    const usuarioActivo = rol === "admin" ? "Administrador" : "Empleado 1"

    const gastosIniciales = Array.from({ length: 18 }, (_, index) => {
        const conceptos = [
            "Pago de alquiler",
            "Compra de mercadería",
            "Servicio de internet",
            "Pago de energía eléctrica",
            "Papelería administrativa",
            "Mantenimiento de equipo",
            "Transporte de productos",
            "Publicidad en redes sociales",
            "Servicio de agua",
            "Software administrativo",
        ]

        const categorias = [
            "Alquiler",
            "Mercadería",
            "Servicios básicos",
            "Servicios básicos",
            "Papelería",
            "Mantenimiento",
            "Transporte",
            "Marketing",
            "Servicios básicos",
            "Software",
        ]

        const metodos = ["Efectivo", "Transferencia", "Tarjeta", "Cheque"]
        const estados = ["Registrado", "Pagado", "Pendiente"]

        const monto = [2500, 1850, 350, 620, 180, 475, 300, 750, 145, 499][index % 10]

        return {
            id: index + 1,
            fecha: `${String(25 - (index % 9)).padStart(2, "0")}/05/2026`,
            concepto: conceptos[index % conceptos.length],
            categoria: categorias[index % categorias.length],
            proveedor: index % 2 === 0 ? "Proveedor Central" : "Servicios Empresariales GT",
            responsable: index % 2 === 0 ? "Administrador" : "Empleado 1",
            metodoPago: metodos[index % metodos.length],
            referencia: `REF-${String(index + 1).padStart(4, "0")}`,
            monto,
            estado: estados[index % estados.length],
            observaciones: "Gasto registrado para control administrativo.",
            modificadoPor: index % 2 === 0 ? "Administrador" : "Empleado 1",
            canceladoPor: "",
            motivoCancelacion: "",
        }
    })

    const [gastos, setGastos] = useState(gastosIniciales)
    const [paginaActual, setPaginaActual] = useState(1)
    const [busqueda, setBusqueda] = useState("")
    const [modalAbierto, setModalAbierto] = useState(false)
    const [modalCancelar, setModalCancelar] = useState(false)
    const [gastoSeleccionado, setGastoSeleccionado] = useState(null)
    const [editando, setEditando] = useState(null)
    const [gastoCancelando, setGastoCancelando] = useState(null)
    const [motivoCancelacion, setMotivoCancelacion] = useState("")
    const [formularioOriginal, setFormularioOriginal] = useState(null)

    const [formulario, setFormulario] = useState({
        fecha: "",
        concepto: "",
        categoria: "",
        proveedor: "",
        responsable: "",
        metodoPago: "Efectivo",
        referencia: "",
        monto: "",
        estado: "Registrado",
        observaciones: "",
    })

    const gastosPorPagina = 8
    const EMPTY_STATE_HEIGHT = 448

    const gastosFiltrados = useMemo(() => {
        return gastos.filter((gasto) =>
            gasto.concepto.toLowerCase().includes(busqueda.toLowerCase()) ||
            gasto.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
            gasto.proveedor.toLowerCase().includes(busqueda.toLowerCase()) ||
            gasto.estado.toLowerCase().includes(busqueda.toLowerCase())
        )
    }, [gastos, busqueda])

    const totalPaginas = Math.max(
        1,
        Math.ceil(gastosFiltrados.length / gastosPorPagina)
    )

    const gastosPagina = gastosFiltrados.slice(
        (paginaActual - 1) * gastosPorPagina,
        paginaActual * gastosPorPagina
    )

    const filasVacias = Array.from({
        length: gastosPorPagina - gastosPagina.length,
    })

    const formularioModificado =
        JSON.stringify(formulario) !== JSON.stringify(formularioOriginal)

    const limpiarFormulario = () => {
        const vacio = {
            fecha: "",
            concepto: "",
            categoria: "",
            proveedor: "",
            responsable: "",
            metodoPago: "Efectivo",
            referencia: "",
            monto: "",
            estado: "Registrado",
            observaciones: "",
        }

        setFormulario(vacio)
        setFormularioOriginal(vacio)
        setEditando(null)
    }

    const abrirNuevoGasto = () => {
        limpiarFormulario()
        setGastoSeleccionado(null)
        setModalAbierto(true)
    }

    const abrirEditar = (gasto) => {
        if (rol !== "admin") {
            alert("Solo el administrador puede editar gastos")
            return
        }

        if (gasto.estado === "Eliminado") {
            alert("No se puede editar un gasto cancelado")
            return
        }

        const datos = {
            fecha: gasto.fecha,
            concepto: gasto.concepto,
            categoria: gasto.categoria,
            proveedor: gasto.proveedor,
            responsable: gasto.responsable,
            metodoPago: gasto.metodoPago,
            referencia: gasto.referencia,
            monto: gasto.monto,
            estado: gasto.estado,
            observaciones: gasto.observaciones,
        }

        setFormulario(datos)
        setFormularioOriginal(datos)
        setEditando(gasto.id)
        setGastoSeleccionado(null)
        setModalAbierto(true)
    }

    const guardarGasto = () => {
        if (
            !formulario.fecha ||
            !formulario.concepto ||
            !formulario.categoria ||
            !formulario.proveedor ||
            !formulario.monto
        ) {
            alert("Complete todos los campos obligatorios")
            return
        }

        const gastoGuardado = {
            ...formulario,
            monto: Number(formulario.monto),
            modificadoPor: usuarioActivo,
        }

        if (editando) {
            setGastos(
                gastos.map((gasto) =>
                    gasto.id === editando
                        ? {
                            ...gasto,
                            ...gastoGuardado,
                        }
                        : gasto
                )
            )
        } else {
            setGastos([
                ...gastos,
                {
                    id: gastos.length + 1,
                    ...gastoGuardado,
                    canceladoPor: "",
                    motivoCancelacion: "",
                },
            ])
        }

        setModalAbierto(false)
        limpiarFormulario()
    }

    const abrirCancelar = (gasto) => {
        if (gasto.estado === "Eliminado") return

        setGastoCancelando(gasto)
        setMotivoCancelacion("")
        setModalCancelar(true)
    }

    const confirmarCancelacion = () => {

        setGastos(
            gastos.map((gasto) =>
                gasto.id === gastoCancelando.id
                    ? {
                        ...gasto,
                        estado: "Eliminado",
                        canceladoPor: usuarioActivo,
                        motivoCancelacion,
                    }
                    : gasto
            )
        )

        setModalCancelar(false)
        setGastoCancelando(null)
        setMotivoCancelacion("")
    }

    const IconoVer = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    )

    const IconoEditar = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    )

    const IconoBasurero = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m3-3h4a1 1 0 011 1v2H9V5a1 1 0 011-1z" />
        </svg>
    )

    const BotonAccion = ({ children, tooltip, className, disabled, onClick }) => (
        <div className="relative group">
            <button
                onClick={onClick}
                disabled={disabled}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
            >
                {children}
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-12 opacity-0 group-hover:opacity-100 pointer-events-none transition bg-slate-900/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                {tooltip}
            </div>
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-blue-800 p-6 shadow-xl text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div>
                        <p className="text-sm text-blue-100 mb-2">
                            Módulo administrativo
                        </p>

                        <h1 className="text-2xl md:text-3xl font-bold">
                            Gastos
                        </h1>

                        <p className="text-blue-100 mt-2 max-w-3xl">
                            Control administrativo de egresos, pagos, salidas de dinero,
                            responsables y estado de gastos registrados.
                        </p>
                    </div>

                    <button
                        onClick={abrirNuevoGasto}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 transition px-5 py-3 text-sm font-semibold backdrop-blur"
                    >
                        + Nuevo gasto
                    </button>
                </div>
            </div>

            {gastoSeleccionado ? (
                <div className="bg-white border border-blue-100 rounded-3xl shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 p-6 md:p-8 text-white">
                        <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                            <div>
                                <p className="text-blue-100 font-semibold">
                                    Detalle administrativo
                                </p>

                                <h2 className="text-3xl md:text-4xl font-bold mt-1">
                                    {gastoSeleccionado.concepto}
                                </h2>

                                <p className="text-blue-100 mt-2">
                                    {gastoSeleccionado.categoria} · {gastoSeleccionado.proveedor}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => setGastoSeleccionado(null)}
                                    className="bg-white text-blue-900 px-5 py-2 rounded-xl font-semibold hover:bg-blue-50 transition h-fit"
                                >
                                    Volver
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-red-50 rounded-2xl p-5">
                                <p className="text-gray-500">Monto del gasto</p>
                                <h3 className="text-3xl font-bold text-red-600">
                                    Q {gastoSeleccionado.monto.toFixed(2)}
                                </h3>
                            </div>

                            <div className="bg-blue-50 rounded-2xl p-5">
                                <p className="text-gray-500">Método de pago</p>
                                <h3 className="text-2xl font-bold text-blue-900">
                                    {gastoSeleccionado.metodoPago}
                                </h3>
                            </div>

                            <div className="bg-yellow-50 rounded-2xl p-5">
                                <p className="text-gray-500">Estado</p>
                                <h3 className="text-2xl font-bold text-yellow-600">
                                    {gastoSeleccionado.estado}
                                </h3>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5">
                                <p className="text-gray-500">Fecha</p>
                                <h3 className="text-2xl font-bold text-slate-700">
                                    {gastoSeleccionado.fecha}
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="border border-blue-100 rounded-2xl p-5">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">
                                    Información general
                                </h3>

                                <div className="space-y-2 text-gray-700">
                                    <p><strong>Concepto:</strong> {gastoSeleccionado.concepto}</p>
                                    <p><strong>Categoría:</strong> {gastoSeleccionado.categoria}</p>
                                    <p><strong>Proveedor:</strong> {gastoSeleccionado.proveedor}</p>
                                    <p><strong>Referencia:</strong> {gastoSeleccionado.referencia}</p>
                                </div>
                            </div>

                            <div className="border border-blue-100 rounded-2xl p-5">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">
                                    Control interno
                                </h3>

                                <div className="space-y-2 text-gray-700">
                                    <p><strong>Responsable:</strong> {gastoSeleccionado.responsable}</p>
                                    <p><strong>Modificado por:</strong> {gastoSeleccionado.modificadoPor}</p>
                                    <p><strong>Observaciones:</strong> {gastoSeleccionado.observaciones}</p>
                                </div>
                            </div>
                        </div>

                        {gastoSeleccionado.estado === "Eliminado" && (
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                                <h3 className="text-xl font-bold text-red-700">
                                    Eliminar gasto
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    <strong>Cancelado por:</strong> {gastoSeleccionado.canceladoPor}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Motivo:</strong> {gastoSeleccionado.motivoCancelacion}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="rounded-3xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">
                                        Registro de gastos
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Vista administrativa simplificada de egresos registrados.
                                    </p>
                                </div>

                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>

                                    <input
                                        type="text"
                                        placeholder="Buscar gasto..."
                                        value={busqueda}
                                        onChange={(e) => {
                                            setBusqueda(e.target.value)
                                            setPaginaActual(1)
                                        }}
                                        className="w-full sm:w-72 rounded-2xl border border-gray-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-[1050px] w-full text-sm table-fixed">
                                <thead className="bg-gray-50 text-gray-500">
                                    <tr>
                                        <th className="w-[140px] p-4 text-left">Fecha</th>
                                        <th className="w-[260px] p-4 text-left">Concepto</th>
                                        <th className="w-[180px] p-4 text-left">Categoría</th>
                                        <th className="w-[160px] p-4 text-left">Método</th>
                                        <th className="w-[140px] p-4 text-left">Monto</th>
                                        <th className="w-[140px] p-4 text-left">Estado</th>
                                        <th className="w-[160px] p-4 text-left">Acciones</th>
                                    </tr>
                                </thead>

                                <tbody className="h-full">
                                    {gastosPagina.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6">
                                                <div
                                                    className="flex flex-col items-center justify-center text-center"
                                                    style={{ height: EMPTY_STATE_HEIGHT }}
                                                >
                                                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                                        <span className="text-4xl">💸</span>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-blue-900">
                                                        No se encontraron gastos
                                                    </h3>

                                                    <p className="text-gray-500 mt-2 max-w-md">
                                                        No existen registros que coincidan con la búsqueda realizada.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        gastosPagina.map((gasto) => (
                                            <tr
                                                key={gasto.id}
                                                className="h-[56px] border-b border-gray-100 hover:bg-blue-50/40 transition"
                                            >
                                                <td className="p-4">{gasto.fecha}</td>

                                                <td className="p-4 font-semibold text-blue-900 truncate">
                                                    {gasto.concepto}
                                                </td>

                                                <td className="p-4 truncate">{gasto.categoria}</td>

                                                <td className="p-4">{gasto.metodoPago}</td>

                                                <td className="p-4 font-semibold text-red-600">
                                                    Q {gasto.monto.toFixed(2)}
                                                </td>

                                                <td className="p-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${gasto.estado === "Eliminado"
                                                            ? "bg-red-100 text-red-700"
                                                            : gasto.estado === "Pendiente"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-green-100 text-green-700"
                                                            }`}
                                                    >
                                                        {gasto.estado}
                                                    </span>
                                                </td>

                                                <td className="p-2 h-[64px]">
                                                    <div className="flex gap-2">
                                                        <BotonAccion
                                                            tooltip="Ver"
                                                            onClick={() => setGastoSeleccionado(gasto)}
                                                            className="bg-blue-100/60 hover:bg-blue-200/60 text-blue-800"
                                                        >
                                                            <IconoVer />
                                                        </BotonAccion>

                                                        <BotonAccion
                                                            tooltip="Editar"
                                                            onClick={() => abrirEditar(gasto)}
                                                            disabled={gasto.estado === "Eliminado"}
                                                            className="bg-yellow-100/60 hover:bg-yellow-200/60 text-yellow-700"
                                                        >
                                                            <IconoEditar />
                                                        </BotonAccion>

                                                        <BotonAccion
                                                            tooltip={
                                                                gasto.estado === "Eliminado"
                                                                    ? "Gasto eliminado"
                                                                    : "Eliminar"
                                                            }
                                                            onClick={() => abrirCancelar(gasto)}
                                                            disabled={gasto.estado === "Eliminado"}
                                                            className="bg-red-100/60 hover:bg-red-200/60 text-red-700"
                                                        >
                                                            <IconoBasurero />
                                                        </BotonAccion>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}

                                    {gastosPagina.length > 0 &&
                                        filasVacias.map((_, index) => (
                                            <tr key={index} className="h-[56px] border-b border-gray-100">
                                                <td className="p-4 text-gray-300">—</td>
                                                <td className="p-4 text-gray-300">—</td>
                                                <td className="p-4 text-gray-300">—</td>
                                                <td className="p-4 text-gray-300">—</td>
                                                <td className="p-4 text-gray-300">—</td>
                                                <td className="p-4 text-gray-300">—</td>
                                                <td className="p-4 text-gray-300">—</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
                            <button
                                onClick={() => setPaginaActual(paginaActual - 1)}
                                disabled={paginaActual === 1}
                                className="w-full sm:w-auto px-5 py-2 rounded-xl border font-semibold disabled:opacity-40"
                            >
                                Anterior
                            </button>

                            <div className="flex gap-2">
                                {Array.from({ length: totalPaginas }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setPaginaActual(index + 1)}
                                        className={`w-10 h-10 rounded-xl font-semibold ${paginaActual === index + 1
                                            ? "bg-blue-800 text-white"
                                            : "bg-blue-50 text-blue-800"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setPaginaActual(paginaActual + 1)}
                                disabled={paginaActual === totalPaginas}
                                className="w-full sm:w-auto px-5 py-2 rounded-xl border font-semibold disabled:opacity-40"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </>
            )}

            {modalAbierto && !gastoSeleccionado && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden max-h-[92vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 px-6 py-5 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">
                                    Gestión administrativa
                                </p>
                                <h2 className="text-2xl font-bold text-white">
                                    {editando ? "Modificar gasto" : "Nuevo gasto"}
                                </h2>
                                <p className="text-blue-100 text-sm mt-1">
                                    Registre y controle salidas de dinero del negocio.
                                </p>
                            </div>

                            <button
                                onClick={() => setModalAbierto(false)}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl leading-none flex items-center justify-center transition"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Campo label="Fecha">
                                    <input
                                        value={formulario.fecha}
                                        onChange={(e) => setFormulario({ ...formulario, fecha: e.target.value })}
                                        placeholder="dd/mm/aaaa"
                                        className="inputAdmin"
                                    />
                                </Campo>

                                <Campo label="Concepto">
                                    <input
                                        value={formulario.concepto}
                                        onChange={(e) => setFormulario({ ...formulario, concepto: e.target.value })}
                                        className="inputAdmin"
                                    />
                                </Campo>

                                <Campo label="Categoría">
                                    <select
                                        value={formulario.categoria}
                                        onChange={(e) => setFormulario({ ...formulario, categoria: e.target.value })}
                                        className="inputAdmin"
                                    >
                                        <option value="">Seleccione una categoría</option>
                                        <option>Servicios básicos</option>
                                        <option>Alquiler</option>
                                        <option>Sueldos</option>
                                        <option>Mercadería</option>
                                        <option>Transporte</option>
                                        <option>Marketing</option>
                                        <option>Mantenimiento</option>
                                        <option>Papelería</option>
                                        <option>Software</option>
                                        <option>Otros</option>
                                    </select>
                                </Campo>

                                <Campo label="Proveedor o responsable">
                                    <input
                                        value={formulario.proveedor}
                                        onChange={(e) => setFormulario({ ...formulario, proveedor: e.target.value })}
                                        className="inputAdmin"
                                    />
                                </Campo>

                                <Campo label="Responsable interno">
                                    <input
                                        value={formulario.responsable}
                                        onChange={(e) => setFormulario({ ...formulario, responsable: e.target.value })}
                                        className="inputAdmin"
                                    />
                                </Campo>

                                <Campo label="Monto">
                                    <input
                                        type="number"
                                        value={formulario.monto}
                                        onChange={(e) => setFormulario({ ...formulario, monto: e.target.value })}
                                        className="inputAdmin"
                                    />
                                </Campo>

                                <Campo label="Método de pago">
                                    <select
                                        value={formulario.metodoPago}
                                        onChange={(e) => setFormulario({ ...formulario, metodoPago: e.target.value })}
                                        className="inputAdmin"
                                    >
                                        <option>Efectivo</option>
                                        <option>Transferencia</option>
                                        <option>Tarjeta</option>
                                        <option>Cheque</option>
                                    </select>
                                </Campo>

                                <Campo label="Estado">
                                    <select
                                        value={formulario.estado}
                                        onChange={(e) => setFormulario({ ...formulario, estado: e.target.value })}
                                        className="inputAdmin"
                                    >
                                        <option>Registrado</option>
                                        <option>Pagado</option>
                                        <option>Pendiente</option>
                                        <option>Cancelado</option>
                                    </select>
                                </Campo>

                                <div className="md:col-span-2">
                                    <Campo label="Referencia o comprobante">
                                        <input
                                            value={formulario.referencia}
                                            onChange={(e) => setFormulario({ ...formulario, referencia: e.target.value })}
                                            className="inputAdmin"
                                        />
                                    </Campo>
                                </div>

                                <div className="md:col-span-2">
                                    <Campo label="Observaciones">
                                        <textarea
                                            value={formulario.observaciones}
                                            onChange={(e) => setFormulario({ ...formulario, observaciones: e.target.value })}
                                            className="inputAdmin min-h-28 resize-none"
                                        />
                                    </Campo>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-8 border-t border-blue-100 pt-5">
                                <button
                                    onClick={() => setModalAbierto(false)}
                                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={guardarGasto}
                                    disabled={!formularioModificado}
                                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition shadow-md ${formularioModificado
                                        ? "bg-blue-800 text-white hover:bg-blue-900 shadow-blue-200"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                        }`}
                                >
                                    Guardar gasto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {modalCancelar && gastoCancelando && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-red-700 to-red-600 p-5 text-white">
                            <p className="text-sm text-red-100">Cancelado por:</p>
                            <h2 className="text-2xl font-bold">{usuarioActivo}</h2>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold text-red-700">
                                Eliminar gasto
                            </h3>

                            <p className="text-gray-500 mt-2">
                                ¿Está seguro que desea eliminar este gasto?
                            </p>

                            <div className="flex justify-end gap-3 mt-5">
                                <button
                                    onClick={() => setModalCancelar(false)}
                                    className="px-5 py-3 rounded-xl border"
                                >
                                    Volver
                                </button>

                                <button
                                    onClick={confirmarCancelacion}
                                    className="px-6 py-3 rounded-xl bg-red-700 text-white font-semibold"
                                >
                                    Eliminar gasto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function Campo({ label, children }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
                {label}
            </label>
            {children}
        </div>
    )
}

export default Gastos