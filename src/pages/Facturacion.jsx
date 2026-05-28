import { useMemo, useState } from "react"

function Facturacion() {
    const rol = localStorage.getItem("rol")
    const usuarioActivo = rol === "admin" ? "Administrador" : "Empleado 1"

    const crearFactura = (index) => {
        const clientes = [
            "Carlos Méndez",
            "Librería El Saber",
            "Ana López",
            "Papelería San José",
            "María Castillo",
            "Colegio Monte Azul",
            "José Ramírez",
            "Distribuidora La Económica",
            "Sofía Herrera",
            "Oficinas Prisma",
        ]

        const productos = [
            "Cuaderno universitario",
            "Lapicero azul",
            "Lápiz HB",
            "Borrador blanco",
            "Marcador permanente",
            "Folder carta",
            "Resma de papel",
            "Tijera escolar",
            "Calculadora básica",
            "Corrector líquido",
        ]

        const metodos = ["Efectivo", "Transferencia", "Tarjeta", "Cheque"]
        const estados = ["Emitida", "Pagada", "Pendiente"]

        const cantidad = (index % 5) + 1
        const precio = [15, 3, 2.5, 2, 8, 2, 48, 10, 42, 7][index % 10]
        const subtotal = cantidad * precio
        const iva = subtotal * 0.12
        const total = subtotal + iva

        return {
            id: index + 1,
            numero: `FAC-${String(index + 1).padStart(5, "0")}`,
            fecha: `${String(25 - (index % 9)).padStart(2, "0")}/05/2026`,
            cliente: clientes[index % clientes.length],
            nit: index % 3 === 0 ? "CF" : `${4567890 + index}-${index % 9}`,
            direccion: "Guatemala, Guatemala",
            producto: productos[index % productos.length],
            categoria: "Papelería",
            cantidad,
            precioUnitario: precio,
            subtotal,
            iva,
            total,
            metodoPago: metodos[index % metodos.length],
            estado: estados[index % estados.length],
            modificadoPor: index % 2 === 0 ? "Administrador" : "Empleado 1",
            motivoCancelacion: "",
            canceladaPor: "",
        }
    }

    const [facturas, setFacturas] = useState(
        Array.from({ length: 22 }, (_, index) => crearFactura(index))
    )

    const [paginaActual, setPaginaActual] = useState(1)
    const [busqueda, setBusqueda] = useState("")
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null)
    const [modalEditar, setModalEditar] = useState(false)
    const [modalCancelar, setModalCancelar] = useState(false)
    const [facturaEditando, setFacturaEditando] = useState(null)
    const [motivoCancelacion, setMotivoCancelacion] = useState("")
    const [toast, setToast] = useState(null)
    const facturasPorPagina = 10

    const facturasFiltradas = useMemo(() => {
        return facturas.filter((factura) =>
            factura.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
            factura.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
            factura.estado.toLowerCase().includes(busqueda.toLowerCase()) ||
            factura.metodoPago.toLowerCase().includes(busqueda.toLowerCase())
        )
    }, [facturas, busqueda])

    const totalPaginas = Math.max(
        1,
        Math.ceil(facturasFiltradas.length / facturasPorPagina)
    )

    const facturasPagina = facturasFiltradas.slice(
        (paginaActual - 1) * facturasPorPagina,
        paginaActual * facturasPorPagina
    )

    const filasVacias = Array.from({
        length: facturasPorPagina - facturasPagina.length,
    })

    const mostrarToast = (mensaje) => {
        setToast(mensaje)

        setTimeout(() => {
            setToast(null)
        }, 3500)
    }

    const abrirEditar = (factura) => {
        if (rol !== "admin") {
            alert("Solo el administrador puede editar facturas")
            return
        }

        if (factura.estado === "Cancelada") {
            alert("No se puede editar una factura cancelada")
            return
        }

        setFacturaEditando({ ...factura })
        setFacturaSeleccionada(null)
        setModalEditar(true)
    }

    const guardarEdicion = () => {
        const subtotal =
            Number(facturaEditando.cantidad) *
            Number(facturaEditando.precioUnitario)

        const iva = subtotal * 0.12
        const total = subtotal + iva

        setFacturas(
            facturas.map((factura) =>
                factura.id === facturaEditando.id
                    ? {
                        ...facturaEditando,
                        cantidad: Number(facturaEditando.cantidad),
                        precioUnitario: Number(facturaEditando.precioUnitario),
                        subtotal,
                        iva,
                        total,
                        modificadoPor: usuarioActivo,
                    }
                    : factura
            )
        )

        setModalEditar(false)
        setFacturaEditando(null)
    }

    const abrirCancelar = (factura) => {
        if (factura.estado === "Cancelada") return

        setFacturaEditando(factura)
        setMotivoCancelacion("")
        setModalCancelar(true)
    }

    const confirmarCancelacion = () => {
        if (!motivoCancelacion.trim()) {
            alert("Debe ingresar un motivo de cancelación")
            return
        }

        setFacturas(
            facturas.map((factura) =>
                factura.id === facturaEditando.id
                    ? {
                        ...factura,
                        estado: "Cancelada",
                        motivoCancelacion,
                        canceladaPor: usuarioActivo,
                    }
                    : factura
            )
        )

        setModalCancelar(false)
        setFacturaEditando(null)
        setMotivoCancelacion("")
        mostrarToast("Factura cancelada correctamente")
    }

    const descargarFactura = (factura) => {
        const contenido = `
            <html>
                <head>
                    <title>${factura.numero}</title>
                    <style>
                        * { box-sizing: border-box; }
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 28px;
                            color: #0f172a;
                            background: white;
                        }
                        .page {
                            width: 100%;
                            max-width: 800px;
                            margin: auto;
                            border: 1px solid #dbeafe;
                            border-radius: 18px;
                            padding: 28px;
                        }
                        .header {
                            display: flex;
                            justify-content: space-between;
                            gap: 24px;
                            border-bottom: 3px solid #1e3a8a;
                            padding-bottom: 18px;
                        }
                        .brand {
                            font-size: 30px;
                            font-weight: 800;
                            color: #1e3a8a;
                        }
                        .muted { color: #64748b; font-size: 13px; }
                        .invoice-title {
                            text-align: right;
                            color: #1e3a8a;
                        }
                        .box {
                            margin-top: 18px;
                            padding: 16px;
                            border: 1px solid #dbeafe;
                            border-radius: 14px;
                            background: #f8fafc;
                        }
                        .grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 16px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                            font-size: 13px;
                        }
                        th {
                            background: #eff6ff;
                            color: #1e3a8a;
                            text-align: left;
                            padding: 11px;
                        }
                        td {
                            border-bottom: 1px solid #e5e7eb;
                            padding: 11px;
                        }
                        .totals {
                            width: 300px;
                            margin-left: auto;
                            margin-top: 22px;
                        }
                        .line {
                            display: flex;
                            justify-content: space-between;
                            padding: 7px 0;
                        }
                        .grand {
                            border-top: 2px solid #1e3a8a;
                            font-size: 20px;
                            font-weight: 800;
                            color: #16a34a;
                            margin-top: 8px;
                            padding-top: 12px;
                        }
                        .footer {
                            margin-top: 24px;
                            font-size: 12px;
                            color: #64748b;
                            border-top: 1px solid #e5e7eb;
                            padding-top: 14px;
                        }
                        @media print {
                            body { padding: 0; }
                            .page { border: none; border-radius: 0; }
                        }
                    </style>
                </head>

                <body>
                    <div class="page">
                        <div class="header">
                            <div>
                                <div class="brand">CONTALINK</div>
                                <p class="muted">Sistema contable SaaS</p>
                                <p class="muted">Guatemala, Guatemala</p>
                                <p class="muted">NIT: 1234567-8</p>
                            </div>

                            <div class="invoice-title">
                                <h1>FACTURA</h1>
                                <p><strong>No:</strong> ${factura.numero}</p>
                                <p><strong>Fecha:</strong> ${factura.fecha}</p>
                                <p><strong>Estado:</strong> ${factura.estado}</p>
                            </div>
                        </div>

                        <div class="grid">
                            <div class="box">
                                <h3>Cliente</h3>
                                <p><strong>Nombre:</strong> ${factura.cliente}</p>
                                <p><strong>NIT:</strong> ${factura.nit}</p>
                                <p><strong>Dirección:</strong> ${factura.direccion}</p>
                            </div>

                            <div class="box">
                                <h3>Pago</h3>
                                <p><strong>Método:</strong> ${factura.metodoPago}</p>
                                <p><strong>Emitida por:</strong> ${factura.modificadoPor}</p>
                            </div>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Cantidad</th>
                                    <th>Precio unitario</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>${factura.producto}</td>
                                    <td>${factura.categoria}</td>
                                    <td>${factura.cantidad}</td>
                                    <td>Q ${factura.precioUnitario.toFixed(2)}</td>
                                    <td>Q ${factura.subtotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="totals">
                            <div class="line">
                                <span>Subtotal</span>
                                <strong>Q ${factura.subtotal.toFixed(2)}</strong>
                            </div>

                            <div class="line">
                                <span>IVA 12%</span>
                                <strong>Q ${factura.iva.toFixed(2)}</strong>
                            </div>

                            <div class="line grand">
                                <span>Total</span>
                                <strong>Q ${factura.total.toFixed(2)}</strong>
                            </div>
                        </div>

                        <div class="footer">
                            <p>Factura generada con fines de maquetado en CONTALINK.</p>
                            <p>Este documento es una representación visual no fiscal.</p>
                        </div>
                    </div>
                </body>
            </html>
        `

        const ventana = window.open("", "_blank")
        ventana.document.write(contenido)
        ventana.document.close()
        ventana.print()
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

    const IconoDescarga = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14a2 2 0 002-2v-2M3 17v2a2 2 0 002 2" />
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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-blue-900">
                        Facturación
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Gestión de facturas emitidas, pagadas y canceladas.
                    </p>
                </div>
            </div>

            {facturaSeleccionada ? (
                <div className="bg-white border border-blue-100 rounded-3xl shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 p-6 md:p-8 text-white">
                        <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                            <div>
                                <p className="text-blue-100 font-semibold">
                                    Vista detallada de factura
                                </p>

                                <h2 className="text-3xl md:text-4xl font-bold mt-1">
                                    {facturaSeleccionada.numero}
                                </h2>

                                <p className="text-blue-100 mt-2">
                                    Documento de maqueta generado por CONTALINK.
                                </p>
                            </div>

                            <button
                                onClick={() => setFacturaSeleccionada(null)}
                                className="bg-white text-blue-900 px-5 py-2 rounded-xl font-semibold hover:bg-blue-50 transition h-fit"
                            >
                                Volver
                            </button>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 border border-blue-100 rounded-3xl p-6">
                                <div className="flex justify-between border-b border-blue-100 pb-5">
                                    <div>
                                        <h3 className="text-2xl font-bold text-blue-900">
                                            CONTALINK
                                        </h3>
                                        <p className="text-gray-500">Sistema contable SaaS</p>
                                        <p className="text-gray-500">Guatemala, Guatemala</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-gray-500">Factura</p>
                                        <h3 className="text-xl font-bold text-blue-900">
                                            {facturaSeleccionada.numero}
                                        </h3>
                                        <p className="text-gray-500">{facturaSeleccionada.fecha}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="bg-blue-50 rounded-2xl p-5">
                                        <p className="text-gray-500">Cliente</p>
                                        <h4 className="font-bold text-blue-900">
                                            {facturaSeleccionada.cliente}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            NIT: {facturaSeleccionada.nit}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {facturaSeleccionada.direccion}
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-5">
                                        <p className="text-gray-500">Estado</p>
                                        <h4 className="font-bold text-blue-900">
                                            {facturaSeleccionada.estado}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Pago: {facturaSeleccionada.metodoPago}
                                        </p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto mt-6">
                                    <table className="min-w-[700px] w-full text-sm">
                                        <thead className="bg-blue-50 text-blue-900">
                                            <tr>
                                                <th className="p-4 text-left">Producto</th>
                                                <th className="p-4 text-left">Categoría</th>
                                                <th className="p-4 text-left">Cantidad</th>
                                                <th className="p-4 text-left">Precio</th>
                                                <th className="p-4 text-left">Subtotal</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr className="border-t border-blue-50">
                                                <td className="p-4 font-semibold">
                                                    {facturaSeleccionada.producto}
                                                </td>
                                                <td className="p-4">
                                                    {facturaSeleccionada.categoria}
                                                </td>
                                                <td className="p-4">
                                                    {facturaSeleccionada.cantidad}
                                                </td>
                                                <td className="p-4">
                                                    Q {facturaSeleccionada.precioUnitario.toFixed(2)}
                                                </td>
                                                <td className="p-4 font-semibold text-green-600">
                                                    Q {facturaSeleccionada.subtotal.toFixed(2)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="border border-blue-100 rounded-3xl p-6 h-fit">
                                <h3 className="text-xl font-bold text-blue-900 mb-5">
                                    Resumen
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <strong>Q {facturaSeleccionada.subtotal.toFixed(2)}</strong>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>IVA 12%</span>
                                        <strong>Q {facturaSeleccionada.iva.toFixed(2)}</strong>
                                    </div>

                                    <div className="border-t pt-4 flex justify-between text-xl">
                                        <span>Total</span>
                                        <strong className="text-green-600">
                                            Q {facturaSeleccionada.total.toFixed(2)}
                                        </strong>
                                    </div>
                                </div>

                                {facturaSeleccionada.estado === "Cancelada" && (
                                    <div className="mt-5 bg-red-50 border border-red-100 rounded-2xl p-4">
                                        <p className="font-semibold text-red-700">
                                            Factura cancelada
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {facturaSeleccionada.motivoCancelacion || "Sin motivo registrado."}
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={() => descargarFactura(facturaSeleccionada)}
                                    className="w-full mt-6 bg-blue-800 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-blue-900 transition"
                                >
                                    Descargar factura
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                        <input
                            type="text"
                            placeholder="Buscar por factura, cliente, estado o método de pago"
                            value={busqueda}
                            onChange={(e) => {
                                setBusqueda(e.target.value)
                                setPaginaActual(1)
                            }}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden min-h-[750px] flex flex-col">
                        <div className="p-6 border-b border-blue-100 shrink-0">
                            <h2 className="text-xl font-bold text-blue-900">
                                Registro de facturas
                            </h2>
                            <p className="text-sm text-gray-500">
                                Vista simplificada de facturas registradas.
                            </p>
                        </div>

                        <div className="overflow-x-auto flex-1">
                            <table className="min-w-[1050px] w-full text-sm table-fixed">
                                <thead className="bg-blue-50 text-blue-900">
                                    <tr>
                                        <th className="w-[150px] p-4 text-left">Factura</th>
                                        <th className="w-[140px] p-4 text-left">Fecha</th>
                                        <th className="w-[240px] p-4 text-left">Cliente</th>
                                        <th className="w-[140px] p-4 text-left">Total</th>
                                        <th className="w-[140px] p-4 text-left">Estado</th>
                                        <th className="w-[220px] p-4 text-left">Acciones</th>
                                    </tr>
                                </thead>

                                <tbody className="h-full">
                                    {facturasPagina.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6">
                                                <div className="min-h-[640px] flex flex-col items-center justify-center text-center">
                                                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                                        <span className="text-4xl">🧾</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-blue-900">
                                                        No se encontraron facturas
                                                    </h3>
                                                    <p className="text-gray-500 mt-2 max-w-md">
                                                        No existen registros que coincidan con la búsqueda realizada.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        facturasPagina.map((factura) => (
                                            <tr
                                                key={factura.id}
                                                className="h-[64px] border-t border-blue-50 hover:bg-blue-50/60 transition"
                                            >
                                                <td className="p-4 font-semibold text-blue-900">
                                                    {factura.numero}
                                                </td>
                                                <td className="p-4">{factura.fecha}</td>
                                                <td className="p-4 truncate">{factura.cliente}</td>
                                                <td className="p-4 font-semibold text-green-600">
                                                    Q {factura.total.toFixed(2)}
                                                </td>
                                                <td className="p-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${factura.estado === "Cancelada"
                                                            ? "bg-red-100 text-red-700"
                                                            : factura.estado === "Pendiente"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-green-100 text-green-700"
                                                            }`}
                                                    >
                                                        {factura.estado}
                                                    </span>
                                                </td>

                                                <td className="p-2 h-[64px]">
                                                    <div className="flex gap-2">
                                                        <BotonAccion
                                                            tooltip="Ver"
                                                            onClick={() => setFacturaSeleccionada(factura)}
                                                            className="bg-blue-100/60 hover:bg-blue-200/60 text-blue-800"
                                                        >
                                                            <IconoVer />
                                                        </BotonAccion>

                                                        <BotonAccion
                                                            tooltip="Editar"
                                                            onClick={() => abrirEditar(factura)}
                                                            disabled={factura.estado === "Cancelada"}
                                                            className="bg-yellow-100/60 hover:bg-yellow-200/60 text-yellow-700"
                                                        >
                                                            <IconoEditar />
                                                        </BotonAccion>

                                                        <BotonAccion
                                                            tooltip={
                                                                factura.estado === "Cancelada"
                                                                    ? "Factura cancelada"
                                                                    : "Cancelar"
                                                            }
                                                            onClick={() => abrirCancelar(factura)}
                                                            disabled={factura.estado === "Cancelada"}
                                                            className="bg-red-100/60 hover:bg-red-200/60 text-red-700"
                                                        >
                                                            <IconoBasurero />
                                                        </BotonAccion>

                                                        <BotonAccion
                                                            tooltip="Descargar"
                                                            onClick={() => descargarFactura(factura)}
                                                            className="bg-green-100/60 hover:bg-green-200/60 text-green-700"
                                                        >
                                                            <IconoDescarga />
                                                        </BotonAccion>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}

                                    {facturasPagina.length > 0 &&
                                        filasVacias.map((_, index) => (
                                            <tr key={index} className="h-[64px] border-t border-blue-50">
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

                        <div className="p-4 border-t border-blue-100 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
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

            {modalEditar && facturaEditando && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden max-h-[92vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 px-6 py-5 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">
                                    Gestión de facturación
                                </p>
                                <h2 className="text-2xl font-bold text-white">
                                    Editar factura
                                </h2>
                                <p className="text-blue-100 text-sm mt-1">
                                    Modifique los datos permitidos de la factura seleccionada.
                                </p>
                            </div>

                            <button
                                onClick={() => setModalEditar(false)}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl leading-none flex items-center justify-center transition"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Cliente
                                    </label>
                                    <input
                                        value={facturaEditando.cliente}
                                        onChange={(e) =>
                                            setFacturaEditando({
                                                ...facturaEditando,
                                                cliente: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        NIT
                                    </label>
                                    <input
                                        value={facturaEditando.nit}
                                        onChange={(e) =>
                                            setFacturaEditando({
                                                ...facturaEditando,
                                                nit: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Producto
                                    </label>
                                    <input
                                        value={facturaEditando.producto}
                                        onChange={(e) =>
                                            setFacturaEditando({
                                                ...facturaEditando,
                                                producto: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Categoría
                                    </label>
                                    <input
                                        value={facturaEditando.categoria}
                                        onChange={(e) =>
                                            setFacturaEditando({
                                                ...facturaEditando,
                                                categoria: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Cantidad
                                    </label>
                                    <input
                                        type="number"
                                        value={facturaEditando.cantidad}
                                        onChange={(e) =>
                                            setFacturaEditando({
                                                ...facturaEditando,
                                                cantidad: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Precio unitario
                                    </label>
                                    <input
                                        type="number"
                                        value={facturaEditando.precioUnitario}
                                        onChange={(e) =>
                                            setFacturaEditando({
                                                ...facturaEditando,
                                                precioUnitario: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Estado
                                    </label>
                                    <select
                                        value={facturaEditando.estado}
                                        onChange={(e) =>
                                            setFacturaEditando({
                                                ...facturaEditando,
                                                estado: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        <option>Emitida</option>
                                        <option>Pagada</option>
                                        <option>Pendiente</option>
                                        <option>Cancelada</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-8 border-t border-blue-100 pt-5">
                                <button
                                    onClick={() => setModalEditar(false)}
                                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={guardarEdicion}
                                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-800 text-white font-semibold hover:bg-blue-900 transition shadow-md shadow-blue-200"
                                >
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {toast && (
                <div className="fixed top-[54px] right-6 z-[1000000] animate-[fadeIn_.3s_ease]">
                    <div className="min-w-[320px] max-w-[420px] rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden bg-red-600/90 border-red-300">
                        <div className="flex items-start gap-4 p-5">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                                🗑️
                            </div>

                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg">
                                    Factura cancelada
                                </h3>

                                <p className="text-white/90 text-sm mt-1">
                                    {toast}
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

            {modalCancelar && facturaEditando && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-red-700 to-red-600 p-5 text-white">
                            <p className="text-sm text-red-100">Cancelada por:</p>
                            <h2 className="text-2xl font-bold">{usuarioActivo}</h2>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold text-red-700">
                                Cancelar factura {facturaEditando.numero}
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Ingrese una breve explicación para dejar constancia de la cancelación.
                            </p>

                            <textarea
                                value={motivoCancelacion}
                                onChange={(e) => setMotivoCancelacion(e.target.value)}
                                placeholder="Motivo de cancelación"
                                className="w-full mt-4 border border-red-100 rounded-xl px-4 py-3 min-h-28 outline-none focus:ring-2 focus:ring-red-200"
                            />

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
                                    Confirmar cancelación
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Facturacion