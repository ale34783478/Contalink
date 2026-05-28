import { useEffect, useMemo, useRef, useState } from "react"

function Inventario() {
    const rol = localStorage.getItem("rol")
    const usuarioActivo = rol === "admin" ? "Administrador" : "Empleado 1"

    const inventarioInicial = [
        { id: 1, producto: "Cuaderno universitario", categoria: "Papelería", proveedor: "Distribuidora Escolar GT", stock: 120, stockMinimo: 20, costoCompra: 9, precioVenta: 15, modificadoPor: "Administrador" },
        { id: 2, producto: "Lapicero azul", categoria: "Útiles escolares", proveedor: "Mayorista Central", stock: 15, stockMinimo: 25, costoCompra: 1.5, precioVenta: 3, modificadoPor: "Empleado 1" },
        { id: 3, producto: "Lápiz HB", categoria: "Útiles escolares", proveedor: "Papelería Nacional", stock: 80, stockMinimo: 20, costoCompra: 1, precioVenta: 2.5, modificadoPor: "Administrador" },
        { id: 4, producto: "Borrador blanco", categoria: "Papelería", proveedor: "Importadora Escolar", stock: 35, stockMinimo: 15, costoCompra: 0.75, precioVenta: 2, modificadoPor: "Empleado 1" },
        { id: 5, producto: "Marcador permanente", categoria: "Oficina", proveedor: "Office Supply", stock: 50, stockMinimo: 10, costoCompra: 4.5, precioVenta: 8, modificadoPor: "Administrador" },
        { id: 6, producto: "Folder carta", categoria: "Oficina", proveedor: "Distribuidora Escolar GT", stock: 200, stockMinimo: 50, costoCompra: 1, precioVenta: 2, modificadoPor: "Empleado 1" },
        { id: 7, producto: "Resma de papel", categoria: "Papelería", proveedor: "Mayorista Central", stock: 12, stockMinimo: 20, costoCompra: 38, precioVenta: 48, modificadoPor: "Administrador" },
        { id: 8, producto: "Tijera escolar", categoria: "Útiles escolares", proveedor: "Papelería Nacional", stock: 28, stockMinimo: 10, costoCompra: 6, precioVenta: 10, modificadoPor: "Empleado 1" },
        { id: 9, producto: "Pegamento líquido", categoria: "Papelería", proveedor: "Importadora Escolar", stock: 0, stockMinimo: 10, costoCompra: 3.5, precioVenta: 6, modificadoPor: "Administrador" },
        { id: 10, producto: "Calculadora básica", categoria: "Tecnología", proveedor: "Tech Office", stock: 18, stockMinimo: 5, costoCompra: 30, precioVenta: 42, modificadoPor: "Empleado 1" },
        { id: 11, producto: "Regla 30 cm", categoria: "Útiles escolares", proveedor: "Distribuidora Escolar GT", stock: 45, stockMinimo: 10, costoCompra: 1.5, precioVenta: 3, modificadoPor: "Administrador" },
        { id: 12, producto: "Cartulina blanca", categoria: "Manualidades", proveedor: "Mayorista Central", stock: 60, stockMinimo: 20, costoCompra: 2.5, precioVenta: 4, modificadoPor: "Empleado 1" },
        { id: 13, producto: "Silicón líquido", categoria: "Manualidades", proveedor: "Papelería Nacional", stock: 22, stockMinimo: 8, costoCompra: 8, precioVenta: 12, modificadoPor: "Administrador" },
        { id: 14, producto: "Agenda pequeña", categoria: "Oficina", proveedor: "Office Supply", stock: 18, stockMinimo: 5, costoCompra: 18, precioVenta: 25, modificadoPor: "Empleado 1" },
        { id: 15, producto: "Corrector líquido", categoria: "Papelería", proveedor: "Importadora Escolar", stock: 40, stockMinimo: 10, costoCompra: 4, precioVenta: 7, modificadoPor: "Administrador" },
        { id: 16, producto: "Sacapuntas metálico", categoria: "Útiles escolares", proveedor: "Distribuidora Escolar GT", stock: 55, stockMinimo: 15, costoCompra: 2, precioVenta: 4, modificadoPor: "Empleado 1" },
    ]

    const [inventario, setInventario] = useState(inventarioInicial)
    const [paginaActual, setPaginaActual] = useState(1)
    const [busqueda, setBusqueda] = useState("")
    const [modalAbierto, setModalAbierto] = useState(false)
    const [editando, setEditando] = useState(null)
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const [formularioOriginal, setFormularioOriginal] = useState(null)
    const [mostrarCategorias, setMostrarCategorias] = useState(false)
    const [toast, setToast] = useState(null)
    const categoriasRef = useRef(null)

    const [formulario, setFormulario] = useState({
        producto: "",
        categoria: "",
        proveedor: "",
        stock: "",
        stockMinimo: "",
        costoCompra: "",
        precioVenta: "",
    })

    const productosPorPagina = 10

    const categoriasFiltradas = [
        ...new Set(
            inventario
                .map((producto) => producto.categoria)
                .filter((categoria) =>
                    categoria.toLowerCase().includes(formulario.categoria.toLowerCase())
                )
        ),
    ]

    useEffect(() => {
        const cerrarCategorias = (event) => {
            if (
                categoriasRef.current &&
                !categoriasRef.current.contains(event.target)
            ) {
                setMostrarCategorias(false)
            }
        }

        document.addEventListener("mousedown", cerrarCategorias)

        return () => {
            document.removeEventListener("mousedown", cerrarCategorias)
        }
    }, [])

    const inventarioFiltrado = useMemo(() => {
        return inventario.filter((producto) =>
            producto.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
            producto.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
            producto.proveedor.toLowerCase().includes(busqueda.toLowerCase())
        )
    }, [inventario, busqueda])

    const totalPaginas = Math.max(
        1,
        Math.ceil(inventarioFiltrado.length / productosPorPagina)
    )

    const inventarioPagina = inventarioFiltrado.slice(
        (paginaActual - 1) * productosPorPagina,
        paginaActual * productosPorPagina
    )

    const filasVacias = Array.from({
        length: productosPorPagina - inventarioPagina.length,
    })

    const formularioModificado =
        JSON.stringify(formulario) !== JSON.stringify(formularioOriginal)

    const obtenerEstado = (producto) => {
        if (Number(producto.stock) <= 0) return "Agotado"
        if (Number(producto.stock) <= Number(producto.stockMinimo)) return "Stock bajo"
        return "Disponible"
    }

    const limpiarFormulario = () => {
        const vacio = {
            producto: "",
            categoria: "",
            proveedor: "",
            stock: "",
            stockMinimo: "",
            costoCompra: "",
            precioVenta: "",
        }

        setFormulario(vacio)
        setFormularioOriginal(vacio)
        setEditando(null)
        setMostrarCategorias(false)
    }

    const abrirNuevoProducto = () => {
        limpiarFormulario()
        setProductoSeleccionado(null)
        setModalAbierto(true)
    }

    const abrirEditar = (producto) => {
        const datos = {
            producto: producto.producto,
            categoria: producto.categoria,
            proveedor: producto.proveedor,
            stock: producto.stock,
            stockMinimo: producto.stockMinimo,
            costoCompra: producto.costoCompra,
            precioVenta: producto.precioVenta,
        }

        setFormulario(datos)
        setFormularioOriginal(datos)
        setEditando(producto.id)
        setProductoSeleccionado(null)
        setModalAbierto(true)
    }

    const verProducto = (producto) => {
        setProductoSeleccionado(producto)
        setModalAbierto(false)
    }

    const mostrarToast = (tipo, mensaje) => {
        setToast({ tipo, mensaje })

        setTimeout(() => {
            setToast(null)
        }, 3500)
    }

    const eliminarProducto = (id) => {
        setInventario((prev) =>
            prev.filter((producto) => producto.id !== id)
        )

        mostrarToast("eliminar", "Producto eliminado correctamente")
    }

    const guardarProducto = () => {
        if (
            !formulario.producto ||
            !formulario.categoria ||
            !formulario.proveedor ||
            !formulario.stock ||
            !formulario.stockMinimo ||
            !formulario.costoCompra ||
            !formulario.precioVenta
        ) {
            alert("Complete todos los campos")
            return
        }

        const productoGuardado = {
            ...formulario,
            stock: Number(formulario.stock),
            stockMinimo: Number(formulario.stockMinimo),
            costoCompra: Number(formulario.costoCompra),
            precioVenta: Number(formulario.precioVenta),
            modificadoPor: usuarioActivo,
        }

        if (editando) {
            setInventario(
                inventario.map((producto) =>
                    producto.id === editando
                        ? { ...producto, ...productoGuardado }
                        : producto
                )
            )

            mostrarToast("editar", "Producto actualizado correctamente")
        } else {
            setInventario([
                ...inventario,
                {
                    id: inventario.length + 1,
                    ...productoGuardado,
                },
            ])

            mostrarToast("crear", "Producto creado correctamente")
        }

        setModalAbierto(false)
        limpiarFormulario()
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-blue-900">
                        Inventario
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Gestión de productos registrados dentro del inventario.
                    </p>
                </div>

                {!productoSeleccionado && (
                    <button
                        onClick={abrirNuevoProducto}
                        className="w-full lg:w-auto bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-900 transition shadow-lg shadow-blue-200"
                    >
                        + Nuevo producto
                    </button>
                )}
            </div>

            {productoSeleccionado ? (
                <div className="bg-white border border-blue-100 rounded-3xl shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            <div>
                                <p className="text-blue-100 font-semibold">
                                    Detalle del producto
                                </p>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">
                                    {productoSeleccionado.producto}
                                </h2>

                                <p className="text-blue-100 mt-2">
                                    {productoSeleccionado.categoria} · {productoSeleccionado.proveedor}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => abrirEditar(productoSeleccionado)}
                                    className="bg-white/15 hover:bg-white/25 text-white px-6 py-3 rounded-2xl font-semibold transition"
                                >
                                    Editar producto
                                </button>

                                <button
                                    onClick={() => setProductoSeleccionado(null)}
                                    className="bg-white text-blue-900 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition"
                                >
                                    Volver al inventario
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 rounded-2xl p-5">
                                <p className="text-gray-500">Stock disponible</p>
                                <h3 className="text-3xl font-bold text-blue-900 mt-1">
                                    {productoSeleccionado.stock}
                                </h3>
                            </div>

                            <div className="bg-yellow-50 rounded-2xl p-5">
                                <p className="text-gray-500">Stock mínimo</p>
                                <h3 className="text-3xl font-bold text-yellow-600 mt-1">
                                    {productoSeleccionado.stockMinimo}
                                </h3>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-5">
                                <p className="text-gray-500">Precio venta</p>
                                <h3 className="text-3xl font-bold text-green-600 mt-1">
                                    Q {productoSeleccionado.precioVenta.toFixed(2)}
                                </h3>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5">
                                <p className="text-gray-500">Estado</p>
                                <h3
                                    className={`text-2xl font-bold mt-1 ${obtenerEstado(productoSeleccionado) === "Disponible"
                                        ? "text-green-600"
                                        : obtenerEstado(productoSeleccionado) === "Stock bajo"
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {obtenerEstado(productoSeleccionado)}
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="border border-blue-100 rounded-2xl p-5">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">
                                    Información del producto
                                </h3>

                                <div className="space-y-2">
                                    <p>
                                        <strong>Categoría:</strong>{" "}
                                        {productoSeleccionado.categoria}
                                    </p>

                                    <p>
                                        <strong>Proveedor:</strong>{" "}
                                        {productoSeleccionado.proveedor}
                                    </p>

                                    <p>
                                        <strong>Costo de compra:</strong>{" "}
                                        Q {productoSeleccionado.costoCompra.toFixed(2)}
                                    </p>

                                    <p>
                                        <strong>Precio de venta:</strong>{" "}
                                        Q {productoSeleccionado.precioVenta.toFixed(2)}
                                    </p>

                                    <p>
                                        <strong>Modificado por:</strong>{" "}
                                        {productoSeleccionado.modificadoPor}
                                    </p>
                                </div>
                            </div>

                            <div className="border border-blue-100 rounded-2xl p-5">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">
                                    Análisis rápido
                                </h3>

                                <div className="space-y-2">
                                    <p>
                                        <strong>Valor en inventario:</strong>{" "}
                                        Q {(productoSeleccionado.stock * productoSeleccionado.costoCompra).toFixed(2)}
                                    </p>

                                    <p>
                                        <strong>Valor potencial de venta:</strong>{" "}
                                        Q {(productoSeleccionado.stock * productoSeleccionado.precioVenta).toFixed(2)}
                                    </p>

                                    <p>
                                        <strong>Ganancia estimada por unidad:</strong>{" "}
                                        Q {(productoSeleccionado.precioVenta - productoSeleccionado.costoCompra).toFixed(2)}
                                    </p>

                                    <p>
                                        <strong>Ganancia potencial:</strong>{" "}
                                        Q {(productoSeleccionado.stock * (productoSeleccionado.precioVenta - productoSeleccionado.costoCompra)).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                            <h3 className="text-xl font-bold text-blue-900 mb-2">
                                Recomendación de inventario
                            </h3>

                            <p className="text-gray-600">
                                {obtenerEstado(productoSeleccionado) === "Agotado"
                                    ? "Este producto se encuentra agotado. Se recomienda realizar una nueva compra al proveedor."
                                    : obtenerEstado(productoSeleccionado) === "Stock bajo"
                                        ? "Este producto está cerca o por debajo del stock mínimo. Se recomienda revisar reposición."
                                        : "El producto cuenta con disponibilidad suficiente para continuar registrando ventas."}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder="Buscar por producto, categoría o proveedor"
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
                                Registro de inventario
                            </h2>

                            <p className="text-sm text-gray-500">
                                Vista simplificada de productos registrados.
                            </p>
                        </div>

                        <div className="overflow-x-auto flex-1">
                            <table className="min-w-[1200px] w-full text-sm table-fixed">
                                <thead className="bg-blue-50 text-blue-900">
                                    <tr>
                                        <th className="w-[250px] p-4 text-left">Producto</th>
                                        <th className="w-[180px] p-4 text-left">Categoría</th>
                                        <th className="w-[220px] p-4 text-left">Proveedor</th>
                                        <th className="w-[120px] p-4 text-left">Stock</th>
                                        <th className="w-[160px] p-4 text-left">Precio venta</th>
                                        <th className="w-[160px] p-4 text-left">Estado</th>
                                        <th className="w-[160px] p-4 text-left">Acciones</th>
                                    </tr>
                                </thead>

                                <tbody className="h-full">
                                    {inventarioPagina.length === 0 ? (
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
                                                                d="M20 13V7a2 2 0 00-2-2h-3V3H9v2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-blue-900">
                                                        No se encontraron productos
                                                    </h3>

                                                    <p className="text-gray-500 mt-2 max-w-md">
                                                        No existen registros que coincidan con la búsqueda realizada dentro del inventario.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        inventarioPagina.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="h-[64px] max-h-[64px] border-t border-blue-50 hover:bg-blue-50/60 transition"
                                            >
                                                <td className="p-4 font-semibold text-blue-900 truncate">
                                                    {item.producto}
                                                </td>

                                                <td className="p-4 truncate">
                                                    {item.categoria}
                                                </td>

                                                <td className="p-4 truncate">
                                                    {item.proveedor}
                                                </td>

                                                <td className="p-4">
                                                    {item.stock}
                                                </td>

                                                <td className="p-4 font-semibold text-green-600">
                                                    Q {item.precioVenta.toFixed(2)}
                                                </td>

                                                <td className="p-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${obtenerEstado(item) === "Disponible"
                                                            ? "bg-green-100 text-green-700"
                                                            : obtenerEstado(item) === "Stock bajo"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {obtenerEstado(item)}
                                                    </span>
                                                </td>

                                                <td className="p-2 h-[64px]">
                                                    <div className="flex items-center gap-2">
                                                        <div className="relative group">
                                                            <button
                                                                onClick={() => verProducto(item)}
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
                                                                onClick={() => eliminarProducto(item.id)}
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

                                    {inventarioPagina.length > 0 &&
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
                                {toast.tipo === "crear"
                                    ? "✅"
                                    : toast.tipo === "editar"
                                        ? "✏️"
                                        : "🗑️"}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg">
                                    {toast.tipo === "crear"
                                        ? "Producto creado"
                                        : toast.tipo === "editar"
                                            ? "Producto actualizado"
                                            : "Producto eliminado"}
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

            {modalAbierto && !productoSeleccionado && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden max-h-[92vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 px-6 py-5 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">
                                    Gestión de inventario
                                </p>

                                <h2 className="text-2xl font-bold text-white">
                                    {editando ? "Modificar producto" : "Nuevo producto"}
                                </h2>

                                <p className="text-blue-100 text-sm mt-1">
                                    Complete la información del producto registrado.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setModalAbierto(false)
                                    setMostrarCategorias(false)
                                }}
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

                                    <input
                                        value={formulario.producto}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
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

                                    <div className="relative" ref={categoriasRef}>
                                        <input
                                            value={formulario.categoria}
                                            onChange={(e) => {
                                                setFormulario({
                                                    ...formulario,
                                                    categoria: e.target.value,
                                                })

                                                setMostrarCategorias(true)
                                            }}
                                            onFocus={() => setMostrarCategorias(true)}
                                            placeholder="Seleccione o escriba una categoría"
                                            className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                        />

                                        {mostrarCategorias && categoriasFiltradas.length > 0 && (
                                            <div
                                                onScroll={() => setMostrarCategorias(false)}
                                                className={`absolute z-20 mt-2 w-full overflow-y-auto rounded-xl border border-blue-100 bg-white/60 backdrop-blur-md shadow-lg ${categoriasFiltradas.length >= 4
                                                    ? "h-[208px]"
                                                    : ""
                                                    }`}
                                                style={{
                                                    maxHeight: "208px",
                                                }}
                                            >
                                                {categoriasFiltradas.map((categoria) => (
                                                    <button
                                                        key={categoria}
                                                        type="button"
                                                        onClick={() => {
                                                            setFormulario({
                                                                ...formulario,
                                                                categoria,
                                                            })

                                                            setMostrarCategorias(false)
                                                        }}
                                                        className="w-full h-[52px] text-left px-4 hover:bg-blue-50 transition"
                                                    >
                                                        {categoria}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Proveedor
                                    </label>

                                    <input
                                        value={formulario.proveedor}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                proveedor: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        value={formulario.stock}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                stock: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Stock mínimo
                                    </label>

                                    <input
                                        type="number"
                                        value={formulario.stockMinimo}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                stockMinimo: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Costo compra
                                    </label>

                                    <input
                                        type="number"
                                        value={formulario.costoCompra}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                costoCompra: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                                        Precio venta
                                    </label>

                                    <input
                                        type="number"
                                        value={formulario.precioVenta}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                precioVenta: e.target.value,
                                            })
                                        }
                                        className="w-full border border-blue-100 bg-blue-50/30 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-8 border-t border-blue-100 pt-5">
                                <button
                                    onClick={() => {
                                        setModalAbierto(false)
                                        setMostrarCategorias(false)
                                    }}
                                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={guardarProducto}
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

export default Inventario