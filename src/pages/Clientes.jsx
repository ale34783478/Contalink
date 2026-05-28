import { useMemo, useState } from "react"

function Clientes() {
    const clientesIniciales = [
        {
            id: 1,
            nombre: "Carlos Méndez",
            telefono: "5456-7878",
            correo: "carlos@email.com",
            direccion: "Zona 1",
            estado: "Activo",
            ultimaCompra: "25/05/2026",
            observaciones: "Cliente frecuente",
        },
        {
            id: 2,
            nombre: "Ana López",
            telefono: "4521-1111",
            correo: "ana@email.com",
            direccion: "Zona 5",
            estado: "Activo",
            ultimaCompra: "24/05/2026",
            observaciones: "",
        },
        {
            id: 3,
            nombre: "Papelería San José",
            telefono: "5656-2121",
            correo: "sanjose@email.com",
            direccion: "Zona 3",
            estado: "Activo",
            ultimaCompra: "24/05/2026",
            observaciones: "",
        },
        {
            id: 4,
            nombre: "Librería El Saber",
            telefono: "4411-9090",
            correo: "saber@email.com",
            direccion: "Zona 7",
            estado: "Activo",
            ultimaCompra: "23/05/2026",
            observaciones: "",
        },
        {
            id: 5,
            nombre: "José Ramírez",
            telefono: "5123-7878",
            correo: "jose@email.com",
            direccion: "Mixco",
            estado: "Inactivo",
            ultimaCompra: "22/05/2026",
            observaciones: "",
        },
        {
            id: 6,
            nombre: "María Castillo",
            telefono: "4787-3333",
            correo: "maria@email.com",
            direccion: "Villa Nueva",
            estado: "Activo",
            ultimaCompra: "21/05/2026",
            observaciones: "",
        },
        {
            id: 7,
            nombre: "Colegio Monte Azul",
            telefono: "5454-9898",
            correo: "monte@email.com",
            direccion: "Zona 10",
            estado: "Activo",
            ultimaCompra: "21/05/2026",
            observaciones: "",
        },
        {
            id: 8,
            nombre: "Oficinas Prisma",
            telefono: "5999-3434",
            correo: "prisma@email.com",
            direccion: "Zona 9",
            estado: "Activo",
            ultimaCompra: "20/05/2026",
            observaciones: "",
        },
        {
            id: 9,
            nombre: "Sofía Herrera",
            telefono: "5333-7878",
            correo: "sofia@email.com",
            direccion: "Zona 4",
            estado: "Activo",
            ultimaCompra: "20/05/2026",
            observaciones: "",
        },
        {
            id: 10,
            nombre: "Distribuidora La Económica",
            telefono: "5777-1000",
            correo: "economica@email.com",
            direccion: "Zona 12",
            estado: "Activo",
            ultimaCompra: "19/05/2026",
            observaciones: "",
        },
        {
            id: 11,
            nombre: "Daniel Morales",
            telefono: "5000-1111",
            correo: "daniel@email.com",
            direccion: "Zona 15",
            estado: "Activo",
            ultimaCompra: "18/05/2026",
            observaciones: "",
        },
        {
            id: 12,
            nombre: "Andrea Gómez",
            telefono: "5222-9898",
            correo: "andrea@email.com",
            direccion: "Zona 2",
            estado: "Inactivo",
            ultimaCompra: "17/05/2026",
            observaciones: "",
        },
    ]

    const [clientes, setClientes] = useState(clientesIniciales)
    const [paginaActual, setPaginaActual] = useState(1)
    const [busqueda, setBusqueda] = useState("")
    const [modalAbierto, setModalAbierto] = useState(false)
    const [toast, setToast] = useState(null)
    const [editando, setEditando] = useState(null)
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
    const [formularioOriginal, setFormularioOriginal] = useState(null)

    const [formulario, setFormulario] = useState({
        nombre: "",
        telefono: "",
        correo: "",
        direccion: "",
        observaciones: "",
        estado: "Activo",
    })

    const clientesPorPagina = 10

    const clientesFiltrados = useMemo(() => {
        return clientes.filter((cliente) =>
            cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            cliente.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
            cliente.telefono.toLowerCase().includes(busqueda.toLowerCase())
        )
    }, [clientes, busqueda])

    const totalPaginas = Math.max(
        1,
        Math.ceil(clientesFiltrados.length / clientesPorPagina)
    )

    const clientesPagina = clientesFiltrados.slice(
        (paginaActual - 1) * clientesPorPagina,
        paginaActual * clientesPorPagina
    )

    const filasVacias = Array.from({
        length: clientesPorPagina - clientesPagina.length,
    })

    const formularioModificado =
        JSON.stringify(formulario) !== JSON.stringify(formularioOriginal)

    const limpiarFormulario = () => {
        const vacio = {
            nombre: "",
            telefono: "",
            correo: "",
            direccion: "",
            observaciones: "",
            estado: "Activo",
        }

        setFormulario(vacio)
        setFormularioOriginal(vacio)
        setEditando(null)
    }

    const abrirNuevoCliente = () => {
        limpiarFormulario()
        setModalAbierto(true)
    }

    const abrirEditar = (cliente) => {
        const datos = {
            nombre: cliente.nombre,
            telefono: cliente.telefono,
            correo: cliente.correo,
            direccion: cliente.direccion,
            observaciones: cliente.observaciones,
            estado: cliente.estado,
        }

        setFormulario(datos)
        setFormularioOriginal(datos)
        setEditando(cliente.id)

        setModalAbierto(true)
    }

    const verCliente = (cliente) => {
        setClienteSeleccionado(cliente)
    }

    const eliminarCliente = (id) => {
        setClientes(
            clientes.filter((cliente) => cliente.id !== id)
        )

        setToast({
            tipo: "eliminar",
            mensaje: "Cliente eliminado correctamente",
        })

        setTimeout(() => {
            setToast(null)
        }, 3500)
    }

    const guardarCliente = () => {
        if (
            !formulario.nombre ||
            !formulario.telefono ||
            !formulario.correo
        ) {
            alert("Complete todos los campos obligatorios")
            return
        }

        if (editando) {
            setClientes(
                clientes.map((cliente) =>
                    cliente.id === editando
                        ? {
                            ...cliente,
                            ...formulario,
                        }
                        : cliente
                )
            )

            setToast({
                tipo: "editar",
                mensaje: "Cliente actualizado correctamente",
            })
        } else {
            setClientes([
                ...clientes,
                {
                    id: clientes.length + 1,
                    ...formulario,
                    ultimaCompra: "Sin compras",
                },
            ])

            setToast({
                tipo: "crear",
                mensaje: "Cliente creado correctamente",
            })
        }

        setTimeout(() => {
            setToast(null)
        }, 3500)

        setModalAbierto(false)
        limpiarFormulario()
    }

    return (
        <div className="space-y-6">
            {clienteSeleccionado ? (
                <div className="bg-white border border-blue-100 rounded-3xl shadow-sm p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div>
                            <p className="text-blue-700 font-semibold">
                                Detalle del cliente
                            </p>

                            <h1 className="text-3xl font-bold text-blue-900">
                                {clienteSeleccionado.nombre}
                            </h1>

                            <p className="text-gray-500 mt-1">
                                {clienteSeleccionado.direccion}
                            </p>

                            <p className="text-gray-500">
                                Cliente recurrente del sistema.
                            </p>
                        </div>

                        <button
                            onClick={() => setClienteSeleccionado(null)}
                            className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-2xl font-semibold transition"
                        >
                            Volver al registro
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-blue-50 rounded-2xl p-5">
                            <p className="text-gray-500">
                                Crédito permitido
                            </p>

                            <h2 className="text-3xl font-bold text-blue-800 mt-1">
                                Q 500.00
                            </h2>
                        </div>

                        <div className="bg-red-50 rounded-2xl p-5">
                            <p className="text-gray-500">
                                Saldo pendiente
                            </p>

                            <h2 className="text-3xl font-bold text-red-600 mt-1">
                                Q 0.00
                            </h2>
                        </div>

                        <div className="bg-green-50 rounded-2xl p-5">
                            <p className="text-gray-500">
                                Total comprado
                            </p>

                            <h2 className="text-3xl font-bold text-green-600 mt-1">
                                Q 2450.00
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                        <div className="border border-blue-100 rounded-2xl p-5">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">
                                Información general
                            </h3>

                            <div className="space-y-2">
                                <p>
                                    <strong>Teléfono:</strong>{" "}
                                    {clienteSeleccionado.telefono}
                                </p>

                                <p>
                                    <strong>Correo:</strong>{" "}
                                    {clienteSeleccionado.correo}
                                </p>

                                <p>
                                    <strong>Estado:</strong>{" "}
                                    {clienteSeleccionado.estado}
                                </p>

                                <p>
                                    <strong>Última compra:</strong>{" "}
                                    {clienteSeleccionado.ultimaCompra}
                                </p>
                            </div>
                        </div>

                        <div className="border border-blue-100 rounded-2xl p-5">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">
                                Observaciones
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                {clienteSeleccionado.observaciones ||
                                    "Sin observaciones registradas."}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-blue-900 mb-5">
                            Historial reciente de compras
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-blue-50 text-blue-900">
                                    <tr>
                                        <th className="p-4 text-left">
                                            Fecha
                                        </th>

                                        <th className="p-4 text-left">
                                            Producto
                                        </th>

                                        <th className="p-4 text-left">
                                            Total
                                        </th>

                                        <th className="p-4 text-left">
                                            Método
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="border-t border-blue-50">
                                        <td className="p-4">
                                            25/05/2026
                                        </td>

                                        <td className="p-4">
                                            Cuadernos universitarios
                                        </td>

                                        <td className="p-4 font-semibold text-green-600">
                                            Q 450.00
                                        </td>

                                        <td className="p-4">
                                            Efectivo
                                        </td>
                                    </tr>

                                    <tr className="border-t border-blue-50">
                                        <td className="p-4">
                                            22/05/2026
                                        </td>

                                        <td className="p-4">
                                            Resmas de papel
                                        </td>

                                        <td className="p-4 font-semibold text-green-600">
                                            Q 720.00
                                        </td>

                                        <td className="p-4">
                                            Transferencia
                                        </td>
                                    </tr>

                                    <tr className="border-t border-blue-50">
                                        <td className="p-4">
                                            18/05/2026
                                        </td>

                                        <td className="p-4">
                                            Útiles escolares varios
                                        </td>

                                        <td className="p-4 font-semibold text-green-600">
                                            Q 315.00
                                        </td>

                                        <td className="p-4">
                                            Tarjeta
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-blue-900">
                            Clientes
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Gestión de clientes registrados dentro del sistema.
                        </p>
                    </div>

                    <button
                        onClick={abrirNuevoCliente}
                        className="w-full lg:w-auto bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-900 transition shadow-lg shadow-blue-200"
                    >
                        + Nuevo cliente
                    </button>
                </div>
            )}

            {!clienteSeleccionado && (
                <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Buscar por cliente, correo o teléfono"
                            value={busqueda}
                            onChange={(e) => {
                                setBusqueda(e.target.value)
                                setPaginaActual(1)
                            }}
                            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                </div>
            )}

            {!clienteSeleccionado && (
                <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden min-h-[750px] flex flex-col">
                    <div className="p-6 border-b border-blue-100 shrink-0">
                        <h2 className="text-xl font-bold text-blue-900">
                            Registro de clientes
                        </h2>

                        <p className="text-sm text-gray-500">
                            Vista simplificada de clientes registrados.
                        </p>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-[1200px] w-full text-sm table-fixed">
                            <thead className="bg-blue-50 text-blue-900">
                                <tr>
                                    <th className="w-[260px] p-4 text-left">
                                        Cliente
                                    </th>

                                    <th className="w-[220px] p-4 text-left">
                                        Teléfono
                                    </th>

                                    <th className="w-[320px] p-4 text-left">
                                        Correo
                                    </th>

                                    <th className="w-[180px] p-4 text-left">
                                        Estado
                                    </th>

                                    <th className="w-[180px] p-4 text-left">
                                        Acción
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="h-full">
                                {clientesPagina.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6">
                                            <div className="min-h-[640px] flex flex-col items-center justify-center text-center px-6">
                                                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-10 h-10 text-blue-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M17 20h5V4H2v16h5m10 0v-5a3 3 0 00-6 0v5m6 0H7"
                                                        />
                                                    </svg>
                                                </div>

                                                <h3 className="text-xl font-bold text-blue-900">
                                                    No se encontraron clientes
                                                </h3>

                                                <p className="text-gray-500 mt-2 max-w-md">
                                                    No existen registros que coincidan
                                                    con la búsqueda realizada dentro del
                                                    listado de clientes.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    clientesPagina.map((cliente) => (
                                        <tr
                                            key={cliente.id}
                                            className="h-[64px] max-h-[64px] border-t border-blue-50 hover:bg-blue-50/60 transition"
                                        >
                                            <td className="p-4 font-semibold text-blue-900 truncate">
                                                {cliente.nombre}
                                            </td>

                                            <td className="p-4 truncate">
                                                {cliente.telefono}
                                            </td>

                                            <td className="p-4 truncate">
                                                {cliente.correo}
                                            </td>

                                            <td className="p-2 h-[64px]">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${cliente.estado === "Activo"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {cliente.estado}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="relative group">
                                                        <button
                                                            onClick={() => verCliente(cliente)}
                                                            className="w-8 h-8 rounded-lg bg-blue-100/60 hover:bg-blue-200/60 text-blue-800 flex items-center justify-center transition"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />

                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                />
                                                            </svg>
                                                        </button>

                                                        <div className="absolute left-1/2 -translate-x-1/2 bottom-12 opacity-0 group-hover:opacity-100 pointer-events-none transition bg-slate-900/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                                                            Ver
                                                        </div>
                                                    </div>

                                                    <div className="relative group">
                                                        <button
                                                            onClick={() => {
                                                                setClienteSeleccionado(null)
                                                                abrirEditar(cliente)
                                                            }}
                                                            className="w-8 h-8 rounded-lg bg-yellow-100/60 hover:bg-yellow-200/60 text-yellow-700 flex items-center justify-center transition"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                />
                                                            </svg>
                                                        </button>

                                                        <div className="absolute left-1/2 -translate-x-1/2 bottom-12 opacity-0 group-hover:opacity-100 pointer-events-none transition bg-slate-900/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                                                            Editar
                                                        </div>
                                                    </div>

                                                    <div className="relative group">
                                                        <button
                                                            onClick={() => eliminarCliente(cliente.id)}
                                                            className="w-8 h-8 rounded-lg bg-red-100/60 hover:bg-red-200/60 text-red-700 flex items-center justify-center transition"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m3-3h4a1 1 0 011 1v2H9V5a1 1 0 011-1z"
                                                                />
                                                            </svg>
                                                        </button>

                                                        <div className="absolute left-1/2 -translate-x-1/2 bottom-12 opacity-0 group-hover:opacity-100 pointer-events-none transition bg-slate-900/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                                                            Eliminar
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}

                                {clientesPagina.length > 0 &&
                                    filasVacias.map((_, index) => (
                                        <tr
                                            key={`fila-vacia-${index}`}
                                            className="h-[64px] border-t border-blue-50"
                                        >
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

                    <div className="p-4 border-t border-blue-100 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
                        <button
                            onClick={() => setPaginaActual(paginaActual - 1)}
                            disabled={paginaActual === 1}
                            className="w-full sm:w-auto px-5 py-2 rounded-xl border font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>

                        <div className="flex gap-2">
                            {Array.from(
                                { length: totalPaginas },
                                (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setPaginaActual(index + 1)
                                        }
                                        className={`w-10 h-10 rounded-xl font-semibold ${paginaActual === index + 1
                                            ? "bg-blue-800 text-white"
                                            : "bg-blue-50 text-blue-800"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                )
                            )}
                        </div>

                        <button
                            onClick={() => setPaginaActual(paginaActual + 1)}
                            disabled={paginaActual === totalPaginas}
                            className="w-full sm:w-auto px-5 py-2 rounded-xl border font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {toast && (
                <div className="fixed top-[100px] right-6 z-[100] animate-[fadeIn_.3s_ease]">
                    <div
                        className={`min-w-[320px] max-w-[420px] rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden ${toast.tipo === "crear"
                                ? "bg-green-500/90 border-green-300"
                                : toast.tipo === "editar"
                                    ? "bg-blue-600/90 border-blue-300"
                                    : "bg-red-600/90 border-red-300"
                            }`}
                    >
                        <div className="flex items-start gap-4 p-5">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg">
                                    {toast.tipo === "eliminar" ? "Registro eliminado" : "Acción completada"}
                                </h3>

                                <p className="text-white/90 text-sm mt-1">
                                    {toast.mensaje}
                                </p>
                            </div>

                            <button
                                onClick={() => setToast(null)}
                                className="text-white/80 hover:text-white text-xl leading-none"
                            >
                                ×
                            </button>
                        </div>

                        <div className="h-1 bg-white/20 overflow-hidden">
                            <div className="h-full bg-white animate-[toastProgress_3.5s_linear]" />
                        </div>
                    </div>
                </div>
            )}

            {modalAbierto && !clienteSeleccionado && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden max-h-[92vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 px-6 py-5 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">
                                    Gestión de clientes
                                </p>

                                <h2 className="text-2xl font-bold text-white">
                                    {editando
                                        ? "Modificar cliente"
                                        : "Nuevo cliente"}
                                </h2>

                                <p className="text-blue-100 text-sm mt-1">
                                    Complete la información del cliente registrado.
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
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Nombre
                                    </label>

                                    <input
                                        value={formulario.nombre}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                nombre: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Teléfono
                                    </label>

                                    <input
                                        value={formulario.telefono}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                telefono: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Correo
                                    </label>

                                    <input
                                        value={formulario.correo}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                correo: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Estado
                                    </label>

                                    <select
                                        value={formulario.estado}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                estado: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        <option>Activo</option>
                                        <option>Inactivo</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Dirección
                                    </label>

                                    <input
                                        value={formulario.direccion}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                direccion: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Observaciones
                                    </label>

                                    <textarea
                                        rows={4}
                                        value={formulario.observaciones}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                observaciones:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-blue-300"
                                    />
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
                                    onClick={guardarCliente}
                                    disabled={!formularioModificado}
                                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition shadow-md ${formularioModificado
                                        ? "bg-blue-800 text-white hover:bg-blue-900 shadow-blue-200"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                        }`}
                                >
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Clientes