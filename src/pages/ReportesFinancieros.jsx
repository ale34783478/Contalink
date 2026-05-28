import React, { useMemo, useState } from "react"
import {
    Search,
    Eye,
    Download,
    X,
    TrendingUp,
    TrendingDown,
    BarChart3,
    Wallet,
    FileText,
    ShieldAlert,
    CalendarDays,
    DollarSign,
    Users,
    Package,
} from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const movimientos = [
    {
        id: 1,
        fecha: "2026-05-01",
        tipo: "Ingreso",
        concepto: "Venta mostrador",
        categoria: "Ventas",
        responsable: "Carlos Méndez",
        monto: 1250,
        estado: "Confirmado",
        metodo: "Efectivo",
        observaciones: "Venta registrada desde módulo de ingresos.",
    },
    {
        id: 2,
        fecha: "2026-05-02",
        tipo: "Gasto",
        concepto: "Pago proveedor",
        categoria: "Inventario",
        responsable: "Admin Principal",
        monto: 780,
        estado: "Confirmado",
        metodo: "Transferencia",
        observaciones: "Compra de producto para reposición.",
    },
    {
        id: 3,
        fecha: "2026-05-03",
        tipo: "Ingreso",
        concepto: "Factura emitida",
        categoria: "Facturación",
        responsable: "María López",
        monto: 2150,
        estado: "Confirmado",
        metodo: "Tarjeta",
        observaciones: "Factura pagada completamente.",
    },
    {
        id: 4,
        fecha: "2026-05-05",
        tipo: "Gasto",
        concepto: "Servicio de internet",
        categoria: "Servicios",
        responsable: "Admin Principal",
        monto: 320,
        estado: "Pendiente",
        metodo: "Débito",
        observaciones: "Gasto administrativo mensual.",
    },
    {
        id: 5,
        fecha: "2026-05-06",
        tipo: "Ingreso",
        concepto: "Venta crédito cliente",
        categoria: "Clientes",
        responsable: "José Ramírez",
        monto: 980,
        estado: "Pendiente",
        metodo: "Crédito",
        observaciones: "Pago pendiente por cliente frecuente.",
    },
    {
        id: 6,
        fecha: "2026-05-08",
        tipo: "Gasto",
        concepto: "Mantenimiento equipo",
        categoria: "Operación",
        responsable: "Admin Principal",
        monto: 450,
        estado: "Confirmado",
        metodo: "Efectivo",
        observaciones: "Mantenimiento preventivo.",
    },
    {
        id: 7,
        fecha: "2026-05-10",
        tipo: "Ingreso",
        concepto: "Venta mayorista",
        categoria: "Ventas",
        responsable: "Carlos Méndez",
        monto: 3450,
        estado: "Confirmado",
        metodo: "Transferencia",
        observaciones: "Venta a cliente empresarial.",
    },
    {
        id: 8,
        fecha: "2026-05-12",
        tipo: "Gasto",
        concepto: "Papelería",
        categoria: "Administrativo",
        responsable: "María López",
        monto: 160,
        estado: "Confirmado",
        metodo: "Efectivo",
        observaciones: "Compra menor administrativa.",
    },
    {
        id: 9,
        fecha: "2026-05-14",
        tipo: "Ingreso",
        concepto: "Venta rápida",
        categoria: "Ventas",
        responsable: "José Ramírez",
        monto: 690,
        estado: "Confirmado",
        metodo: "Efectivo",
        observaciones: "Venta directa.",
    },
    {
        id: 10,
        fecha: "2026-05-15",
        tipo: "Gasto",
        concepto: "Pago transporte",
        categoria: "Logística",
        responsable: "Admin Principal",
        monto: 275,
        estado: "Confirmado",
        metodo: "Efectivo",
        observaciones: "Entrega de mercadería.",
    },
    {
        id: 11,
        fecha: "2026-05-16",
        tipo: "Ingreso",
        concepto: "Factura cliente frecuente",
        categoria: "Facturación",
        responsable: "María López",
        monto: 1890,
        estado: "Confirmado",
        metodo: "Transferencia",
        observaciones: "Factura generada correctamente.",
    },
    {
        id: 12,
        fecha: "2026-05-18",
        tipo: "Gasto",
        concepto: "Reposición inventario",
        categoria: "Inventario",
        responsable: "Admin Principal",
        monto: 1320,
        estado: "Confirmado",
        metodo: "Transferencia",
        observaciones: "Compra de productos de alta rotación.",
    },
]

const reportesDisponibles = [
    {
        id: 1,
        titulo: "Reporte general financiero",
        descripcion: "Resumen de ingresos, gastos, utilidad estimada y movimientos críticos.",
        tipo: "Financiero",
        periodo: "Mensual",
    },
    {
        id: 2,
        titulo: "Reporte de ingresos",
        descripcion: "Detalle de ventas, facturación, métodos de pago y responsables.",
        tipo: "Ingresos",
        periodo: "Mensual",
    },
    {
        id: 3,
        titulo: "Reporte de gastos administrativos",
        descripcion: "Control de gastos por categoría, responsable y estado.",
        tipo: "Gastos",
        periodo: "Mensual",
    },
    {
        id: 4,
        titulo: "Reporte de rentabilidad",
        descripcion: "Comparación entre ingresos, egresos y margen operativo.",
        tipo: "Análisis",
        periodo: "Trimestral",
    },
]

const formatCurrency = (value) =>
    new Intl.NumberFormat("es-GT", {
        style: "currency",
        currency: "GTQ",
    }).format(value)

const emptyRows = Array.from({ length: 10 })

export default function ReportesFinancieros() {
    const [search, setSearch] = useState("")
    const [filterTipo, setFilterTipo] = useState("Todos")
    const [selectedMovimiento, setSelectedMovimiento] = useState(null)
    const [selectedReporte, setSelectedReporte] = useState(null)
    const [activeView, setActiveView] = useState("movimientos")

    const filteredMovimientos = useMemo(() => {
        return movimientos.filter((item) => {
            const matchesSearch =
                item.concepto.toLowerCase().includes(search.toLowerCase()) ||
                item.categoria.toLowerCase().includes(search.toLowerCase()) ||
                item.responsable.toLowerCase().includes(search.toLowerCase())

            const matchesTipo = filterTipo === "Todos" || item.tipo === filterTipo

            return matchesSearch && matchesTipo
        })
    }, [search, filterTipo])

    const ingresos = movimientos
        .filter((item) => item.tipo === "Ingreso" && item.estado === "Confirmado")
        .reduce((acc, item) => acc + item.monto, 0)

    const gastos = movimientos
        .filter((item) => item.tipo === "Gasto" && item.estado === "Confirmado")
        .reduce((acc, item) => acc + item.monto, 0)

    const utilidad = ingresos - gastos
    const pendientes = movimientos.filter((item) => item.estado === "Pendiente").length

    const visibleRows = filteredMovimientos.slice(0, 10)
    const rowsToRender = [...visibleRows, ...emptyRows].slice(0, 10)

    const exportarResumenPDF = () => {
        const doc = new jsPDF()

        doc.setFontSize(18)
        doc.text("CONTALINK - Resumen Financiero", 14, 20)

        doc.setFontSize(11)
        doc.text(`Ingresos confirmados: ${formatCurrency(ingresos)}`, 14, 35)
        doc.text(`Gastos confirmados: ${formatCurrency(gastos)}`, 14, 43)
        doc.text(`Utilidad estimada: ${formatCurrency(utilidad)}`, 14, 51)
        doc.text(`Movimientos pendientes: ${pendientes}`, 14, 59)

        autoTable(doc, {
            startY: 72,
            head: [["Fecha", "Tipo", "Concepto", "Categoría", "Responsable", "Monto", "Estado"]],
            body: movimientos.map((item) => [
                item.fecha,
                item.tipo,
                item.concepto,
                item.categoria,
                item.responsable,
                formatCurrency(item.monto),
                item.estado,
            ]),
        })

        doc.save("Resumen_Financiero_CONTALINK.pdf")
    }

    const generarReportePDF = (reporte) => {
        const doc = new jsPDF()

        doc.setFontSize(18)
        doc.text(`CONTALINK - ${reporte.titulo}`, 14, 20)

        doc.setFontSize(11)
        doc.text(`Tipo: ${reporte.tipo}`, 14, 35)
        doc.text(`Periodo: ${reporte.periodo}`, 14, 43)
        doc.text(`Descripción: ${reporte.descripcion}`, 14, 51)

        autoTable(doc, {
            startY: 65,
            head: [["Fecha", "Tipo", "Concepto", "Categoría", "Responsable", "Monto", "Estado"]],
            body: movimientos.map((item) => [
                item.fecha,
                item.tipo,
                item.concepto,
                item.categoria,
                item.responsable,
                formatCurrency(item.monto),
                item.estado,
            ]),
        })

        doc.save(`${reporte.titulo.replaceAll(" ", "_")}_CONTALINK.pdf`)
    }

    return (
        <section className="w-full space-y-6">
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-blue-800 p-6 shadow-xl text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div>
                        <p className="text-sm text-blue-100 mb-2">Módulo administrativo</p>
                        <h1 className="text-2xl md:text-3xl font-bold">
                            Reportes Financieros
                        </h1>
                        <p className="text-blue-100 mt-2 max-w-3xl">
                            Panel privado para análisis financiero, control de ingresos,
                            gastos, rentabilidad, reportes administrativos y movimientos
                            críticos del negocio.
                        </p>
                    </div>

                    <button
                        onClick={exportarResumenPDF}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 transition px-5 py-3 text-sm font-semibold backdrop-blur"
                    >
                        <Download size={18} />
                        Exportar resumen
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <MetricCard
                    title="Ingresos confirmados"
                    value={formatCurrency(ingresos)}
                    icon={<TrendingUp size={22} />}
                    detail="+12.5% respecto al periodo anterior"
                    tone="blue"
                />
                <MetricCard
                    title="Gastos confirmados"
                    value={formatCurrency(gastos)}
                    icon={<TrendingDown size={22} />}
                    detail="Control administrativo activo"
                    tone="red"
                />
                <MetricCard
                    title="Utilidad estimada"
                    value={formatCurrency(utilidad)}
                    icon={<Wallet size={22} />}
                    detail="Antes de ajustes contables finales"
                    tone="emerald"
                />
                <MetricCard
                    title="Movimientos pendientes"
                    value={pendientes}
                    icon={<ShieldAlert size={22} />}
                    detail="Requieren revisión administrativa"
                    tone="amber"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <div className="xl:col-span-2 rounded-3xl bg-white shadow-sm border border-gray-100 p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                Análisis financiero general
                            </h2>
                            <p className="text-sm text-gray-500">
                                Resumen visual del comportamiento económico del negocio.
                            </p>
                        </div>

                        <div className="flex rounded-2xl bg-gray-100 p-1">
                            <button
                                onClick={() => setActiveView("movimientos")}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${activeView === "movimientos"
                                    ? "bg-white text-blue-700 shadow-sm"
                                    : "text-gray-500"
                                    }`}
                            >
                                Movimientos
                            </button>
                            <button
                                onClick={() => setActiveView("reportes")}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${activeView === "reportes"
                                    ? "bg-white text-blue-700 shadow-sm"
                                    : "text-gray-500"
                                    }`}
                            >
                                Reportes
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InfoBlock
                            icon={<DollarSign size={20} />}
                            title="Margen operativo"
                            value="68.4%"
                        />
                        <InfoBlock
                            icon={<Users size={20} />}
                            title="Clientes con ventas"
                            value="38"
                        />
                        <InfoBlock
                            icon={<Package size={20} />}
                            title="Productos de alta rotación"
                            value="14"
                        />
                    </div>

                    <div className="mt-5 rounded-3xl bg-gradient-to-br from-blue-50 to-slate-50 p-5 border border-blue-100">
                        <div className="flex items-center gap-3 mb-4">
                            <BarChart3 className="text-blue-700" />
                            <div>
                                <h3 className="font-bold text-gray-800">Diagnóstico financiero</h3>
                                <p className="text-sm text-gray-500">
                                    Interpretación administrativa del periodo actual.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600">
                            <p>
                                El negocio mantiene una utilidad positiva estimada de{" "}
                                <span className="font-bold text-emerald-700">
                                    {formatCurrency(utilidad)}
                                </span>
                                , con ingresos confirmados superiores a los gastos registrados.
                            </p>
                            <p>
                                Existen{" "}
                                <span className="font-bold text-amber-700">{pendientes}</span>{" "}
                                movimientos pendientes que deben revisarse antes de cerrar el
                                periodo financiero.
                            </p>
                            <p>
                                Se recomienda validar gastos de inventario, ventas a crédito y
                                facturas pendientes para evitar diferencias en reportes finales.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl bg-white shadow-sm border border-gray-100 p-5">
                    <h2 className="text-lg font-bold text-gray-800 mb-1">
                        Alertas administrativas
                    </h2>
                    <p className="text-sm text-gray-500 mb-5">
                        Información privada para usuarios administradores.
                    </p>

                    <div className="space-y-3">
                        <AlertItem
                            title="Ventas a crédito pendientes"
                            text="Revisar clientes con saldo pendiente antes del cierre."
                        />
                        <AlertItem
                            title="Gastos de inventario elevados"
                            text="Validar compras recientes contra stock disponible."
                        />
                        <AlertItem
                            title="Cierre financiero sugerido"
                            text="Generar reporte mensual antes de exportar datos finales."
                        />
                    </div>
                </div>
            </div>

            {activeView === "movimientos" ? (
                <div className="rounded-3xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Movimientos financieros
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Ingresos, gastos, responsables, métodos de pago y estado.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Buscar movimiento..."
                                        className="w-full sm:w-72 rounded-2xl border border-gray-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <select
                                    value={filterTipo}
                                    onChange={(e) => setFilterTipo(e.target.value)}
                                    className="rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>Todos</option>
                                    <option>Ingreso</option>
                                    <option>Gasto</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="min-w-[1000px] h-[750px]">
                            <table className="w-full table-fixed">
                                <thead className="bg-gray-50 text-gray-500 text-sm">
                                    <tr>
                                        <th className="px-5 py-4 text-left w-[13%]">Fecha</th>
                                        <th className="px-5 py-4 text-left w-[13%]">Tipo</th>
                                        <th className="px-5 py-4 text-left w-[22%]">Concepto</th>
                                        <th className="px-5 py-4 text-left w-[15%]">Categoría</th>
                                        <th className="px-5 py-4 text-left w-[16%]">Responsable</th>
                                        <th className="px-5 py-4 text-left w-[11%]">Monto</th>
                                        <th className="px-5 py-4 text-left w-[10%]">Acciones</th>
                                    </tr>
                                </thead>

                                <tbody className="text-sm">
                                    {rowsToRender.map((item, index) =>
                                        item ? (
                                            <tr
                                                key={item.id}
                                                className="border-b border-gray-100 hover:bg-blue-50/40 transition h-[66px]"
                                            >
                                                <td className="px-5 py-4 text-gray-600">{item.fecha}</td>
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-bold ${item.tipo === "Ingreso"
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {item.tipo}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 font-semibold text-gray-800 truncate">
                                                    {item.concepto}
                                                </td>
                                                <td className="px-5 py-4 text-gray-600">
                                                    {item.categoria}
                                                </td>
                                                <td className="px-5 py-4 text-gray-600">
                                                    {item.responsable}
                                                </td>
                                                <td className="px-5 py-4 font-bold text-gray-800">
                                                    {formatCurrency(item.monto)}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <button
                                                        onClick={() => setSelectedMovimiento(item)}
                                                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-100/60 text-blue-700 hover:bg-blue-200 transition"
                                                        title="Ver"
                                                    >
                                                        <Eye size={17} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key={`empty-${index}`} className="h-[66px] border-b border-gray-100">
                                                <td colSpan="7" />
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>

                            {filteredMovimientos.length === 0 && (
                                <div className="h-[650px] flex items-center justify-center">
                                    <div className="text-center">
                                        <Search className="mx-auto text-gray-300 mb-3" size={42} />
                                        <h3 className="font-bold text-gray-700">
                                            Sin resultados encontrados
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Intenta con otro término de búsqueda o filtro.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-5 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                        <span>Mostrando 10 registros por página</span>
                        <span>Página 1 de 1</span>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    {reportesDisponibles.map((reporte) => (
                        <button
                            key={reporte.id}
                            onClick={() => setSelectedReporte(reporte)}
                            className="text-left rounded-3xl bg-white border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-1 transition"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                                <FileText size={22} />
                            </div>

                            <h3 className="font-bold text-gray-800 mb-2">{reporte.titulo}</h3>
                            <p className="text-sm text-gray-500 mb-4">{reporte.descripcion}</p>

                            <div className="flex items-center justify-between text-xs">
                                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-semibold">
                                    {reporte.tipo}
                                </span>
                                <span className="text-blue-700 font-bold">{reporte.periodo}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {selectedMovimiento && (
                <MovimientoModal
                    movimiento={selectedMovimiento}
                    onClose={() => setSelectedMovimiento(null)}
                />
            )}

            {selectedReporte && (
                <ReporteModal
                    reporte={selectedReporte}
                    onClose={() => setSelectedReporte(null)}
                    generarReportePDF={generarReportePDF}
                />
            )}
        </section>
    )
}

function MetricCard({ title, value, icon, detail, tone }) {
    const tones = {
        blue: "from-blue-600 to-blue-800 bg-blue-50 text-blue-700",
        red: "from-red-600 to-red-800 bg-red-50 text-red-700",
        emerald: "from-emerald-600 to-emerald-800 bg-emerald-50 text-emerald-700",
        amber: "from-amber-500 to-amber-700 bg-amber-50 text-amber-700",
    }

    return (
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tones[tone].split(" ").slice(2).join(" ")}`}>
                    {icon}
                </div>
            </div>

            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
            <p className="text-xs text-gray-400 mt-2">{detail}</p>
        </div>
    )
}

function InfoBlock({ icon, title, value }) {
    return (
        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <p className="text-xs text-gray-500">{title}</p>
                    <h4 className="font-bold text-gray-800">{value}</h4>
                </div>
            </div>
        </div>
    )
}

function AlertItem({ title, text }) {
    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
            <div className="flex gap-3">
                <ShieldAlert className="text-amber-600 shrink-0 mt-0.5" size={19} />
                <div>
                    <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{text}</p>
                </div>
            </div>
        </div>
    )
}

function MovimientoModal({ movimiento, onClose }) {
    return (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
                <div className="bg-gradient-to-r from-slate-900 to-blue-800 text-white p-5 rounded-t-3xl flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Detalle financiero</h2>
                        <p className="text-sm text-blue-100">
                            Información crítica del movimiento seleccionado.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Detail label="Fecha" value={movimiento.fecha} />
                    <Detail label="Tipo" value={movimiento.tipo} />
                    <Detail label="Concepto" value={movimiento.concepto} />
                    <Detail label="Categoría" value={movimiento.categoria} />
                    <Detail label="Responsable" value={movimiento.responsable} />
                    <Detail label="Método de pago" value={movimiento.metodo} />
                    <Detail label="Estado" value={movimiento.estado} />
                    <Detail label="Monto" value={formatCurrency(movimiento.monto)} />

                    <div className="md:col-span-2 rounded-2xl bg-gray-50 p-4 border border-gray-100">
                        <p className="text-sm font-bold text-gray-700 mb-1">Observaciones</p>
                        <p className="text-sm text-gray-500">{movimiento.observaciones}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ReporteModal({ reporte, onClose, generarReportePDF }) {
    return (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
                <div className="bg-gradient-to-r from-slate-900 to-blue-800 text-white p-5 rounded-t-3xl flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">{reporte.titulo}</h2>
                        <p className="text-sm text-blue-100">{reporte.descripcion}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <Detail label="Tipo de reporte" value={reporte.tipo} />
                    <Detail label="Periodo" value={reporte.periodo} />
                    <Detail label="Fecha de generación" value="2026-05-26" />
                    <Detail label="Usuario autorizado" value="Administrador" />

                    <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <CalendarDays className="text-blue-700" size={20} />
                            <h3 className="font-bold text-gray-800">Contenido incluido</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Este reporte incluye ingresos, gastos, utilidad estimada,
                            movimientos pendientes, responsables, métodos de pago y diagnóstico
                            administrativo del periodo.
                        </p>
                    </div>

                    <button
                        onClick={() => generarReportePDF(reporte)}
                        className="w-full rounded-2xl bg-blue-700 hover:bg-blue-800 text-white py-3 font-semibold flex items-center justify-center gap-2 transition"
                    >
                        <Download size={18} />
                        Descargar reporte PDF
                    </button>
                </div>
            </div>
        </div>
    )
}

function Detail({ label, value }) {
    return (
        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase">{label}</p>
            <p className="text-sm font-bold text-gray-800 mt-1">{value}</p>
        </div>
    )
}