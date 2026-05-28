import { useState } from "react"

function Ingresos() {
    const rol = localStorage.getItem("rol")
    const usuarioActivo = rol === "admin" ? "Administrador" : "Empleado 1"

    const productosInventario = [
        { id: 1, producto: "Cuaderno universitario", categoria: "Papelería", stock: 120, precioVenta: 15 },
        { id: 2, producto: "Lapicero azul", categoria: "Útiles escolares", stock: 15, precioVenta: 3 },
        { id: 3, producto: "Lápiz HB", categoria: "Útiles escolares", stock: 80, precioVenta: 2.5 },
        { id: 4, producto: "Borrador blanco", categoria: "Papelería", stock: 35, precioVenta: 2 },
        { id: 5, producto: "Marcador permanente", categoria: "Oficina", stock: 50, precioVenta: 8 },
        { id: 6, producto: "Folder carta", categoria: "Oficina", stock: 200, precioVenta: 2 },
        { id: 7, producto: "Resma de papel", categoria: "Papelería", stock: 12, precioVenta: 48 },
        { id: 8, producto: "Tijera escolar", categoria: "Útiles escolares", stock: 28, precioVenta: 10 },
        { id: 9, producto: "Pegamento líquido", categoria: "Papelería", stock: 0, precioVenta: 6 },
        { id: 10, producto: "Calculadora básica", categoria: "Tecnología", stock: 18, precioVenta: 42 },
        { id: 11, producto: "Regla 30 cm", categoria: "Útiles escolares", stock: 90, precioVenta: 3 },
        { id: 12, producto: "Cartulina blanca", categoria: "Manualidades", stock: 70, precioVenta: 4 },
        { id: 13, producto: "Silicón líquido", categoria: "Manualidades", stock: 9, precioVenta: 12 },
        { id: 14, producto: "Agenda pequeña", categoria: "Oficina", stock: 22, precioVenta: 25 },
        { id: 15, producto: "Corrector líquido", categoria: "Papelería", stock: 40, precioVenta: 7 },
    ]

    const clientesRegistrados = [
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

    const [modalAbierto, setModalAbierto] = useState(false)
    const [editando, setEditando] = useState(null)
    const [ventaSeleccionada, setVentaSeleccionada] = useState(null)
    const [formularioOriginal, setFormularioOriginal] = useState(null)
    const [paginaActual, setPaginaActual] = useState(1)
    const [busqueda, setBusqueda] = useState("")
    const [toast, setToast] = useState(null)

    const [formulario, setFormulario] = useState({
        productoId: "",
        producto: "",
        categoria: "",
        cliente: "",
        cantidad: "",
        precioVenta: "",
        precioBase: "",
        precioVentaTotal: "",
        metodoPago: "Efectivo",
    })

    const [ingresos, setIngresos] = useState([
        { id: 1, fecha: "25/05/2026", productoId: 1, producto: "Cuaderno universitario", categoria: "Papelería", cliente: "Carlos Méndez", cantidad: 3, precioVenta: 15, precioBase: 15, precioVentaTotal: 45, metodoPago: "Efectivo", modificadoPor: "Administrador" },
        { id: 2, fecha: "25/05/2026", productoId: 2, producto: "Lapicero azul", categoria: "Útiles escolares", cliente: "Librería El Saber", cantidad: 10, precioVenta: 3.5, precioBase: 3, precioVentaTotal: 35, metodoPago: "Transferencia", modificadoPor: "Empleado 1" },
        { id: 3, fecha: "24/05/2026", productoId: 3, producto: "Lápiz HB", categoria: "Útiles escolares", cliente: "Ana López", cantidad: 12, precioVenta: 2.5, precioBase: 2.5, precioVentaTotal: 30, metodoPago: "Efectivo", modificadoPor: "Administrador" },
        { id: 4, fecha: "24/05/2026", productoId: 4, producto: "Borrador blanco", categoria: "Papelería", cliente: "Papelería San José", cantidad: 20, precioVenta: 2, precioBase: 2, precioVentaTotal: 40, metodoPago: "Tarjeta", modificadoPor: "Empleado 1" },
        { id: 5, fecha: "23/05/2026", productoId: 5, producto: "Marcador permanente", categoria: "Oficina", cliente: "María Castillo", cantidad: 5, precioVenta: 8, precioBase: 8, precioVentaTotal: 40, metodoPago: "Efectivo", modificadoPor: "Administrador" },
        { id: 6, fecha: "23/05/2026", productoId: 6, producto: "Folder carta", categoria: "Oficina", cliente: "Colegio Monte Azul", cantidad: 50, precioVenta: 2.25, precioBase: 2, precioVentaTotal: 112.5, metodoPago: "Transferencia", modificadoPor: "Empleado 1" },
        { id: 7, fecha: "22/05/2026", productoId: 7, producto: "Resma de papel", categoria: "Papelería", cliente: "José Ramírez", cantidad: 2, precioVenta: 48, precioBase: 48, precioVentaTotal: 96, metodoPago: "Efectivo", modificadoPor: "Administrador" },
        { id: 8, fecha: "22/05/2026", productoId: 8, producto: "Tijera escolar", categoria: "Útiles escolares", cliente: "Distribuidora La Económica", cantidad: 8, precioVenta: 10, precioBase: 10, precioVentaTotal: 80, metodoPago: "Cheque", modificadoPor: "Empleado 1" },
        { id: 9, fecha: "21/05/2026", productoId: 10, producto: "Calculadora básica", categoria: "Tecnología", cliente: "Sofía Herrera", cantidad: 1, precioVenta: 45, precioBase: 42, precioVentaTotal: 45, metodoPago: "Tarjeta", modificadoPor: "Administrador" },
        { id: 10, fecha: "21/05/2026", productoId: 11, producto: "Regla 30 cm", categoria: "Útiles escolares", cliente: "Oficinas Prisma", cantidad: 15, precioVenta: 3, precioBase: 3, precioVentaTotal: 45, metodoPago: "Efectivo", modificadoPor: "Empleado 1" },
        { id: 11, fecha: "20/05/2026", productoId: 12, producto: "Cartulina blanca", categoria: "Manualidades", cliente: "Carlos Méndez", cantidad: 10, precioVenta: 4, precioBase: 4, precioVentaTotal: 40, metodoPago: "Efectivo", modificadoPor: "Administrador" },
        { id: 12, fecha: "20/05/2026", productoId: 13, producto: "Silicón líquido", categoria: "Manualidades", cliente: "Librería El Saber", cantidad: 3, precioVenta: 12.5, precioBase: 12, precioVentaTotal: 37.5, metodoPago: "Transferencia", modificadoPor: "Empleado 1" },
        { id: 13, fecha: "19/05/2026", productoId: 14, producto: "Agenda pequeña", categoria: "Oficina", cliente: "Ana López", cantidad: 2, precioVenta: 25, precioBase: 25, precioVentaTotal: 50, metodoPago: "Tarjeta", modificadoPor: "Administrador" },
        { id: 14, fecha: "19/05/2026", productoId: 15, producto: "Corrector líquido", categoria: "Papelería", cliente: "Papelería San José", cantidad: 6, precioVenta: 7, precioBase: 7, precioVentaTotal: 42, metodoPago: "Efectivo", modificadoPor: "Empleado 1" },
    ])

    const ventasPorPagina = 10

    const ventasFiltradas = ingresos.filter((venta) =>
        venta.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
        venta.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
        venta.metodoPago.toLowerCase().includes(busqueda.toLowerCase())
    )

    const totalPaginas = Math.max(1, Math.ceil(ventasFiltradas.length / ventasPorPagina))

    const ventasPagina = ventasFiltradas.slice(
        (paginaActual - 1) * ventasPorPagina,
        paginaActual * ventasPorPagina
    )

    const filasVacias = Array.from({
        length: ventasPorPagina - ventasPagina.length,
    })

    const formularioModificado =
        JSON.stringify(formulario) !== JSON.stringify(formularioOriginal)

    const limpiarFormulario = () => {
        const formularioVacio = {
            productoId: "",
            producto: "",
            categoria: "",
            cliente: "",
            cantidad: "",
            precioVenta: "",
            precioBase: "",
            precioVentaTotal: "",
            metodoPago: "Efectivo",
        }

        setFormulario(formularioVacio)
        setFormularioOriginal(formularioVacio)
        setEditando(null)
    }

    const calcularTotal = (cantidad, precioVenta) => {
        return Number(cantidad || 0) * Number(precioVenta || 0)
    }

    const obtenerProductoSeleccionado = () => {
        return productosInventario.find(
            (producto) => producto.id === Number(formulario.productoId)
        )
    }

    const actualizarCampo = (campo, valor) => {
        if (campo === "productoId") {
            const productoSeleccionado = productosInventario.find(
                (producto) => producto.id === Number(valor)
            )

            if (!productoSeleccionado) return

            const cantidadValida =
                Number(formulario.cantidad || 0) > productoSeleccionado.stock
                    ? productoSeleccionado.stock
                    : formulario.cantidad

            setFormulario({
                ...formulario,
                productoId: productoSeleccionado.id,
                producto: productoSeleccionado.producto,
                categoria: productoSeleccionado.categoria,
                cantidad: cantidadValida,
                precioVenta: productoSeleccionado.precioVenta,
                precioBase: productoSeleccionado.precioVenta,
                precioVentaTotal: calcularTotal(cantidadValida, productoSeleccionado.precioVenta),
            })

            return
        }

        if (campo === "cantidad") {
            const productoSeleccionado = obtenerProductoSeleccionado()
            const stockDisponible = productoSeleccionado?.stock || 0
            const cantidadFinal = Number(valor) > stockDisponible ? stockDisponible : valor

            setFormulario({
                ...formulario,
                cantidad: cantidadFinal,
                precioVentaTotal: calcularTotal(cantidadFinal, formulario.precioVenta),
            })

            return
        }

        if (campo === "precioVenta") {
            const precioBase = Number(formulario.precioBase || 0)
            const precioFinal = Number(valor) < precioBase ? precioBase : valor

            setFormulario({
                ...formulario,
                precioVenta: precioFinal,
                precioVentaTotal: calcularTotal(formulario.cantidad, precioFinal),
            })

            return
        }

        setFormulario({
            ...formulario,
            [campo]: valor,
        })
    }

    const abrirNuevaVenta = () => {
        limpiarFormulario()
        setVentaSeleccionada(null)
        setModalAbierto(true)
    }

    const abrirEditar = (item) => {
        const datosFormulario = {
            productoId: item.productoId,
            producto: item.producto,
            categoria: item.categoria,
            cliente: item.cliente,
            cantidad: item.cantidad,
            precioVenta: item.precioVenta,
            precioBase: item.precioBase,
            precioVentaTotal: item.precioVentaTotal,
            metodoPago: item.metodoPago,
        }

        setEditando(item.id)
        setFormulario(datosFormulario)
        setFormularioOriginal(datosFormulario)
        setVentaSeleccionada(null)
        setModalAbierto(true)
    }

    const verVenta = (venta) => {
        setVentaSeleccionada(venta)
        setModalAbierto(false)
    }

    const mostrarToast = (tipo, mensaje) => {
        setToast({ tipo, mensaje })

        setTimeout(() => {
            setToast(null)
        }, 3500)
    }

    const eliminarIngreso = (id) => {
        setIngresos((prev) =>
            prev.filter((venta) => venta.id !== id)
        )

        mostrarToast("eliminar", "Venta eliminada correctamente")
    }

    const guardarIngreso = () => {
        const productoSeleccionado = obtenerProductoSeleccionado()

        if (
            !formulario.productoId ||
            !formulario.cliente ||
            !formulario.cantidad ||
            !formulario.precioVenta ||
            !formulario.metodoPago
        ) {
            alert("Complete todos los campos obligatorios")
            return
        }

        if (Number(formulario.cantidad) > Number(productoSeleccionado.stock)) {
            alert("La cantidad no puede ser mayor al stock disponible")
            return
        }

        if (Number(formulario.precioVenta) < Number(formulario.precioBase)) {
            alert("El precio de venta no puede ser menor al precio base del producto")
            return
        }

        const ventaGuardada = {
            ...formulario,
            cantidad: Number(formulario.cantidad),
            precioVenta: Number(formulario.precioVenta),
            precioBase: Number(formulario.precioBase),
            precioVentaTotal: calcularTotal(formulario.cantidad, formulario.precioVenta),
            modificadoPor: usuarioActivo,
        }

        if (editando) {
            setIngresos(
                ingresos.map((item) =>
                    item.id === editando ? { ...item, ...ventaGuardada } : item
                )
            )

            mostrarToast("editar", "Venta actualizada correctamente")
        } else {
            setIngresos([
                ...ingresos,
                {
                    id: ingresos.length + 1,
                    fecha: new Date().toLocaleDateString("es-GT"),
                    ...ventaGuardada,
                },
            ])

            mostrarToast("crear", "Venta registrada correctamente")
        }

        setModalAbierto(false)
        limpiarFormulario()
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-blue-900">
                        Ventas
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Registro de ventas realizadas a clientes existentes.
                    </p>
                </div>

                {!ventaSeleccionada && (
                    <button
                        onClick={abrirNuevaVenta}
                        className="w-full lg:w-auto bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-900 transition shadow-lg shadow-blue-200"
                    >
                        + Nueva venta
                    </button>
                )}
            </div>

            {ventaSeleccionada ? (
                <div className="bg-white border border-blue-100 rounded-3xl shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            <div>
                                <p className="text-blue-100 font-semibold">
                                    Detalle de venta
                                </p>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">
                                    {ventaSeleccionada.producto}
                                </h2>

                                <p className="text-blue-100 mt-2">
                                    Cliente: {ventaSeleccionada.cliente}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => abrirEditar(ventaSeleccionada)}
                                    className="bg-white/15 hover:bg-white/25 text-white px-6 py-3 rounded-2xl font-semibold transition"
                                >
                                    Editar venta
                                </button>

                                <button
                                    onClick={() => setVentaSeleccionada(null)}
                                    className="bg-white text-blue-900 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition"
                                >
                                    Volver a ventas
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 rounded-2xl p-5">
                                <p className="text-gray-500">Cantidad</p>
                                <h3 className="text-3xl font-bold text-blue-900">
                                    {ventaSeleccionada.cantidad}
                                </h3>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-5">
                                <p className="text-gray-500">Total venta</p>
                                <h3 className="text-3xl font-bold text-green-600">
                                    Q {ventaSeleccionada.precioVentaTotal.toFixed(2)}
                                </h3>
                            </div>

                            <div className="bg-yellow-50 rounded-2xl p-5">
                                <p className="text-gray-500">Precio unidad</p>
                                <h3 className="text-3xl font-bold text-yellow-600">
                                    Q {ventaSeleccionada.precioVenta.toFixed(2)}
                                </h3>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5">
                                <p className="text-gray-500">Pago</p>
                                <h3 className="text-2xl font-bold text-slate-700">
                                    {ventaSeleccionada.metodoPago}
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="border border-blue-100 rounded-2xl p-5">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">
                                    Información comercial
                                </h3>

                                <div className="space-y-2">
                                    <p><strong>Fecha:</strong> {ventaSeleccionada.fecha}</p>
                                    <p><strong>Producto:</strong> {ventaSeleccionada.producto}</p>
                                    <p><strong>Categoría:</strong> {ventaSeleccionada.categoria}</p>
                                    <p><strong>Cliente:</strong> {ventaSeleccionada.cliente}</p>
                                </div>
                            </div>

                            <div className="border border-blue-100 rounded-2xl p-5">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">
                                    Información financiera
                                </h3>

                                <div className="space-y-2">
                                    <p><strong>Precio base:</strong> Q {ventaSeleccionada.precioBase.toFixed(2)}</p>
                                    <p><strong>Precio aplicado:</strong> Q {ventaSeleccionada.precioVenta.toFixed(2)}</p>
                                    <p><strong>Total:</strong> Q {ventaSeleccionada.precioVentaTotal.toFixed(2)}</p>
                                    <p><strong>Modificado por:</strong> {ventaSeleccionada.modificadoPor}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder="Buscar por producto, cliente o método de pago"
                                value={busqueda}
                                onChange={(e) => {
                                    setBusqueda(e.target.value)
                                    setPaginaActual(1)
                                }}
                                className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden min-h-[750px] flex flex-col">
                        <div className="p-6 border-b border-blue-100 shrink-0">
                            <h2 className="text-xl font-bold text-blue-900">
                                Historial de ventas
                            </h2>

                            <p className="text-sm text-gray-500">
                                Vista simplificada con los datos esenciales de cada venta.
                            </p>
                        </div>

                        <div className="overflow-x-auto flex-1">
                            <table className="min-w-[850px] w-full text-sm table-fixed">
                                <thead className="bg-blue-50 text-blue-900">
                                    <tr>
                                        <th className="w-[120px] p-4 text-left">Fecha</th>
                                        <th className="w-[220px] p-4 text-left">Producto</th>
                                        <th className="w-[220px] p-4 text-left">Cliente</th>
                                        <th className="w-[110px] p-4 text-left">Cantidad</th>
                                        <th className="w-[140px] p-4 text-left">Total</th>
                                        <th className="w-[140px] p-4 text-left">Pago</th>
                                        <th className="w-[120px] p-4 text-left">Acción</th>
                                    </tr>
                                </thead>

                                <tbody className="h-full">
                                    {ventasPagina.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6">
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
                                                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H5a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-blue-900">
                                                        No se encontraron ventas
                                                    </h3>

                                                    <p className="text-gray-500 mt-2 max-w-md">
                                                        No existen registros que coincidan con la búsqueda realizada dentro del historial de ventas.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        ventasPagina.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="h-[64px] max-h-[64px] border-t border-blue-50 hover:bg-blue-50/60 transition"
                                            >
                                                <td className="p-4">{item.fecha}</td>

                                                <td className="p-4 font-semibold text-blue-900 truncate">
                                                    {item.producto}
                                                </td>

                                                <td className="p-4 truncate">
                                                    {item.cliente}
                                                </td>

                                                <td className="p-4">{item.cantidad}</td>

                                                <td className="p-4 font-semibold text-green-600">
                                                    Q {item.precioVentaTotal.toFixed(2)}
                                                </td>

                                                <td className="p-4">{item.metodoPago}</td>

                                                <td className="p-2 h-[64px]">
                                                    <div className="flex items-center gap-2">
                                                        <div className="relative group">
                                                            <button
                                                                onClick={() => verVenta(item)}
                                                                className="w-8 h-8 rounded-lg bg-blue-100/60 hover:bg-blue-200/60 text-blue-800 flex items-center justify-center transition"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            </button>

                                                            <div className="absolute left-1/2 -translate-x-1/2 bottom-12 opacity-0 group-hover:opacity-100 pointer-events-none transition bg-slate-900/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                                                                Ver
                                                            </div>
                                                        </div>

                                                        <div className="relative group">
                                                            <button
                                                                onClick={() => abrirEditar(item)}
                                                                className="w-8 h-8 rounded-lg bg-yellow-100/60 hover:bg-yellow-200/60 text-yellow-700 flex items-center justify-center transition"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </button>

                                                            <div className="absolute left-1/2 -translate-x-1/2 bottom-12 opacity-0 group-hover:opacity-100 pointer-events-none transition bg-slate-900/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                                                                Editar
                                                            </div>
                                                        </div>

                                                        <div className="relative group">
                                                            <button
                                                                onClick={() => eliminarIngreso(item.id)}
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

                                    {ventasPagina.length > 0 &&
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
                                className="w-full sm:w-auto px-5 py-2 rounded-xl border font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </>
            )}

            {toast && (
                <div className="fixed top-[54px] right-6 z-[1000000] animate-[fadeIn_.3s_ease]">
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
                                {toast.tipo === "crear" ? "✅" : toast.tipo === "editar" ? "✏️" : "🗑️"}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg">
                                    {toast.tipo === "crear"
                                        ? "Venta registrada"
                                        : toast.tipo === "editar"
                                            ? "Venta actualizada"
                                            : "Venta eliminada"}
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

            {modalAbierto && !ventaSeleccionada && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden max-h-[92vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 px-6 py-5 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">
                                    Gestión comercial
                                </p>

                                <h2 className="text-2xl font-bold text-white">
                                    {editando ? "Modificar venta" : "Nueva venta"}
                                </h2>

                                <p className="text-blue-100 text-sm mt-1">
                                    Seleccione un producto del inventario y un cliente registrado.
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
                                        Producto
                                    </label>

                                    <select
                                        value={formulario.productoId}
                                        onChange={(e) => actualizarCampo("productoId", e.target.value)}
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition"
                                    >
                                        <option value="">Seleccione un producto</option>
                                        {productosInventario.map((producto) => (
                                            <option
                                                key={producto.id}
                                                value={producto.id}
                                                disabled={producto.stock <= 0}
                                            >
                                                {producto.producto} — Stock: {producto.stock}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Categoría
                                    </label>

                                    <input
                                        value={formulario.categoria}
                                        disabled
                                        className="w-full border border-blue-100 bg-gray-100 px-4 py-3 rounded-xl text-gray-500 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Cliente
                                    </label>

                                    <select
                                        value={formulario.cliente}
                                        onChange={(e) => actualizarCampo("cliente", e.target.value)}
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition"
                                    >
                                        <option value="">Seleccione un cliente</option>
                                        {clientesRegistrados.map((cliente) => (
                                            <option key={cliente} value={cliente}>
                                                {cliente}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Cantidad
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        max={obtenerProductoSeleccionado()?.stock || 0}
                                        value={formulario.cantidad}
                                        onChange={(e) => actualizarCampo("cantidad", e.target.value)}
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition"
                                    />

                                    <p className="text-xs text-gray-500 mt-1">
                                        Stock disponible: {obtenerProductoSeleccionado()?.stock || 0}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Precio de venta por unidad
                                    </label>

                                    <input
                                        type="number"
                                        min={formulario.precioBase || 0}
                                        value={formulario.precioVenta}
                                        onChange={(e) => actualizarCampo("precioVenta", e.target.value)}
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition"
                                    />

                                    <p className="text-xs text-gray-500 mt-1">
                                        Precio base: Q {Number(formulario.precioBase || 0).toFixed(2)}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Precio de venta total
                                    </label>

                                    <input
                                        value={`Q ${Number(formulario.precioVentaTotal || 0).toFixed(2)}`}
                                        disabled
                                        className="w-full border border-green-100 bg-green-50 px-4 py-3 rounded-xl text-green-700 font-bold cursor-not-allowed"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Método de pago
                                    </label>

                                    <select
                                        value={formulario.metodoPago}
                                        onChange={(e) => actualizarCampo("metodoPago", e.target.value)}
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition"
                                    >
                                        <option>Efectivo</option>
                                        <option>Transferencia</option>
                                        <option>Tarjeta</option>
                                        <option>Cheque</option>
                                    </select>
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
                                    onClick={guardarIngreso}
                                    disabled={!formularioModificado}
                                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition shadow-md ${formularioModificado
                                        ? "bg-blue-800 text-white hover:bg-blue-900 shadow-blue-200"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                        }`}
                                >
                                    Guardar venta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Ingresos