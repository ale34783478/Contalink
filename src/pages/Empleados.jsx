import React, { useEffect, useMemo, useState } from "react"
import {
    Search,
    Eye,
    Pencil,
    Trash2,
    X,
    UserPlus,
    ShieldCheck,
    Users,
    UserCheck,
    UserX,
    Clock,
    Mail,
    Phone,
    Briefcase,
    KeyRound,
} from "lucide-react"

const ROWS_PER_PAGE = 8
const EMPTY_STATE_HEIGHT = 448

const empleadosIniciales = [
    {
        id: 1,
        nombre: "Carlos Méndez",
        dpi: "2458 96321 0101",
        telefono: "5551-2233",
        correo: "carlos.mendez@contalink.com",
        puesto: "Cajero",
        rol: "Empleado",
        accesoPortal: "Activo",
        estado: "Activo",
        ultimoAcceso: "2026-05-26 08:45",
        creadoPor: "Admin Principal",
        permisos: ["Ventas", "Clientes", "Facturación"],
        observaciones: "Empleado autorizado para registrar ventas y emitir facturas.",
    },
    {
        id: 2,
        nombre: "María López",
        dpi: "3021 77441 0202",
        telefono: "5520-1188",
        correo: "maria.lopez@contalink.com",
        puesto: "Supervisora",
        rol: "Supervisor",
        accesoPortal: "Activo",
        estado: "Activo",
        ultimoAcceso: "2026-05-25 17:30",
        creadoPor: "Admin Principal",
        permisos: ["Ventas", "Clientes", "Inventario", "Facturación"],
        observaciones: "Supervisa registros diarios y control operativo.",
    },
    {
        id: 3,
        nombre: "José Ramírez",
        dpi: "1987 66325 0303",
        telefono: "5577-9081",
        correo: "jose.ramirez@contalink.com",
        puesto: "Auxiliar de inventario",
        rol: "Empleado",
        accesoPortal: "Activo",
        estado: "Activo",
        ultimoAcceso: "2026-05-24 14:10",
        creadoPor: "Admin Principal",
        permisos: ["Inventario", "Ventas"],
        observaciones: "Encargado de actualización de stock y apoyo en ventas.",
    },
    {
        id: 4,
        nombre: "Ana Castillo",
        dpi: "4125 88963 0404",
        telefono: "5512-7744",
        correo: "ana.castillo@contalink.com",
        puesto: "Administradora",
        rol: "Administrador",
        accesoPortal: "Activo",
        estado: "Activo",
        ultimoAcceso: "2026-05-26 09:20",
        creadoPor: "Admin Principal",
        permisos: ["Todos los módulos"],
        observaciones: "Usuario con acceso administrativo completo.",
    },
    {
        id: 5,
        nombre: "Luis Herrera",
        dpi: "2785 44120 0505",
        telefono: "5599-1200",
        correo: "luis.herrera@contalink.com",
        puesto: "Vendedor",
        rol: "Empleado",
        accesoPortal: "Suspendido",
        estado: "Inactivo",
        ultimoAcceso: "2026-04-30 16:05",
        creadoPor: "Ana Castillo",
        permisos: ["Ventas"],
        observaciones: "Acceso suspendido temporalmente por revisión administrativa.",
    },
    {
        id: 6,
        nombre: "Sofía Morales",
        dpi: "3344 12987 0606",
        telefono: "5566-3344",
        correo: "sofia.morales@contalink.com",
        puesto: "Atención al cliente",
        rol: "Empleado",
        accesoPortal: "Activo",
        estado: "Activo",
        ultimoAcceso: "2026-05-23 11:45",
        creadoPor: "Admin Principal",
        permisos: ["Clientes", "Ventas"],
        observaciones: "Gestiona información básica de clientes y ventas menores.",
    },
    {
        id: 7,
        nombre: "Fernando Ruiz",
        dpi: "2299 88552 0707",
        telefono: "5541-6677",
        correo: "fernando.ruiz@contalink.com",
        puesto: "Contabilidad",
        rol: "Supervisor",
        accesoPortal: "Activo",
        estado: "Activo",
        ultimoAcceso: "2026-05-22 15:35",
        creadoPor: "Ana Castillo",
        permisos: ["Gastos", "Reportes Financieros", "Facturación"],
        observaciones: "Apoya en revisión financiera y control de gastos.",
    },
    {
        id: 8,
        nombre: "Gabriela Pérez",
        dpi: "3658 77412 0808",
        telefono: "5532-9090",
        correo: "gabriela.perez@contalink.com",
        puesto: "Vendedora",
        rol: "Empleado",
        accesoPortal: "Sin acceso",
        estado: "Activo",
        ultimoAcceso: "No registra",
        creadoPor: "Admin Principal",
        permisos: ["Sin permisos asignados"],
        observaciones: "Empleado activo sin acceso habilitado al portal.",
    },
]

const roles = ["Administrador", "Supervisor", "Empleado"]

const permisosDisponibles = [
    "Ventas",
    "Clientes",
    "Inventario",
    "Facturación",
    "Gastos",
    "Reportes Financieros",
]

export default function Empleados() {
    const [empleados, setEmpleados] = useState(empleadosIniciales)
    const [search, setSearch] = useState("")
    const [filterRol, setFilterRol] = useState("Todos")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedEmpleado, setSelectedEmpleado] = useState(null)
    const [editingEmpleado, setEditingEmpleado] = useState(null)
    const [deleteEmpleado, setDeleteEmpleado] = useState(null)

    const filteredEmpleados = useMemo(() => {
        return empleados.filter((item) => {
            const matchesSearch =
                item.nombre.toLowerCase().includes(search.toLowerCase()) ||
                item.correo.toLowerCase().includes(search.toLowerCase()) ||
                item.puesto.toLowerCase().includes(search.toLowerCase())

            const matchesRol = filterRol === "Todos" || item.rol === filterRol

            return matchesSearch && matchesRol
        })
    }, [empleados, search, filterRol])

    const totalPages = Math.ceil(filteredEmpleados.length / ROWS_PER_PAGE) || 1

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    const empleadosActivos = empleados.filter((item) => item.estado === "Activo").length
    const accesoActivo = empleados.filter((item) => item.accesoPortal === "Activo").length
    const administradores = empleados.filter((item) => item.rol === "Administrador").length
    const suspendidos = empleados.filter((item) => item.accesoPortal !== "Activo").length

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE
    const endIndex = startIndex + ROWS_PER_PAGE
    const visibleRows = filteredEmpleados.slice(startIndex, endIndex)

    const emptyRows = Array.from({
        length: Math.max(ROWS_PER_PAGE - visibleRows.length, 0),
    })

    const rowsToRender = [...visibleRows, ...emptyRows]

    const handleSaveEmpleado = (formData) => {
        if (formData.id) {
            setEmpleados((prev) =>
                prev.map((item) => (item.id === formData.id ? formData : item))
            )
        } else {
            const nuevoEmpleado = {
                ...formData,
                id: Date.now(),
                ultimoAcceso: "No registra",
                creadoPor: "Admin Principal",
            }

            setEmpleados((prev) => [nuevoEmpleado, ...prev])
            setCurrentPage(1)
        }

        setEditingEmpleado(null)
    }

    const handleDeleteEmpleado = () => {
        setEmpleados((prev) => prev.filter((item) => item.id !== deleteEmpleado.id))
        setDeleteEmpleado(null)
    }

    return (
        <section className="w-full space-y-6">
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-blue-800 p-6 shadow-xl text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div>
                        <p className="text-sm text-blue-100 mb-2">Módulo administrativo</p>
                        <h1 className="text-2xl md:text-3xl font-bold">Empleados</h1>
                        <p className="text-blue-100 mt-2 max-w-3xl">
                            Gestión interna de empleados, accesos al portal, roles,
                            permisos, estado laboral y control administrativo del personal.
                        </p>
                    </div>

                    <button
                        onClick={() => setEditingEmpleado(createEmptyEmpleado())}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 transition px-5 py-3 text-sm font-semibold backdrop-blur"
                    >
                        <UserPlus size={18} />
                        Agregar empleado
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <MetricCard title="Empleados activos" value={empleadosActivos} detail="Personal registrado como activo" icon={<Users size={22} />} tone="blue" />
                <MetricCard title="Acceso al portal" value={accesoActivo} detail="Usuarios con acceso habilitado" icon={<KeyRound size={22} />} tone="emerald" />
                <MetricCard title="Administradores" value={administradores} detail="Usuarios con permisos críticos" icon={<ShieldCheck size={22} />} tone="amber" />
                <MetricCard title="Accesos suspendidos" value={suspendidos} detail="Usuarios sin acceso activo" icon={<UserX size={22} />} tone="red" />
            </div>

            <div className="rounded-3xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Registro de empleados</h2>
                            <p className="text-sm text-gray-500">
                                Información general, rol, permisos y acceso al sistema.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                        setCurrentPage(1)
                                    }}
                                    placeholder="Buscar empleado..."
                                    className="w-full sm:w-72 rounded-2xl border border-gray-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <select
                                value={filterRol}
                                onChange={(e) => {
                                    setFilterRol(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Todos</option>
                                {roles.map((rol) => (
                                    <option key={rol}>{rol}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[1050px]">
                        <table className="w-full table-fixed">
                            <thead className="bg-gray-50 text-gray-500 text-sm">
                                <tr>
                                    <th className="px-5 py-4 text-left w-[20%]">Empleado</th>
                                    <th className="px-5 py-4 text-left w-[17%]">Puesto</th>
                                    <th className="px-5 py-4 text-left w-[13%]">Rol</th>
                                    <th className="px-5 py-4 text-left w-[14%]">Portal</th>
                                    <th className="px-5 py-4 text-left w-[14%]">Estado</th>
                                    <th className="px-5 py-4 text-left w-[14%]">Último acceso</th>
                                    <th className="px-5 py-4 text-left w-[8%]">Acciones</th>
                                </tr>
                            </thead>

                            <tbody className="text-sm">
                                {filteredEmpleados.length > 0 &&
                                    rowsToRender.map((item, index) =>
                                        item ? (
                                            <tr key={item.id} className="border-b border-gray-100 hover:bg-blue-50/40 transition h-[56px]">
                                                <td className="px-5 py-3">
                                                    <p className="font-bold text-gray-800 truncate">{item.nombre}</p>
                                                    <p className="text-xs text-gray-400 truncate">{item.correo}</p>
                                                </td>
                                                <td className="px-5 py-3 text-gray-600">{item.puesto}</td>
                                                <td className="px-5 py-3"><Badge value={item.rol} type="rol" /></td>
                                                <td className="px-5 py-3"><Badge value={item.accesoPortal} type="portal" /></td>
                                                <td className="px-5 py-3"><Badge value={item.estado} type="estado" /></td>
                                                <td className="px-5 py-3 text-gray-600">{item.ultimoAcceso}</td>
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <ActionButton title="Ver" icon={<Eye size={16} />} onClick={() => setSelectedEmpleado(item)} color="blue" />
                                                        <ActionButton title="Editar" icon={<Pencil size={16} />} onClick={() => setEditingEmpleado(item)} color="amber" />
                                                        <ActionButton title="Eliminar" icon={<Trash2 size={16} />} onClick={() => setDeleteEmpleado(item)} color="red" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key={`empty-${index}`} className="h-[56px] border-b border-gray-100">
                                                <td colSpan="7" />
                                            </tr>
                                        )
                                    )}
                            </tbody>
                        </table>

                        {filteredEmpleados.length === 0 && (
                            <div className="flex items-center justify-center" style={{ height: EMPTY_STATE_HEIGHT }}>
                                <div className="text-center">
                                    <Search className="mx-auto text-gray-300 mb-3" size={42} />
                                    <h3 className="font-bold text-gray-700">No se encontraron empleados</h3>
                                    <p className="text-sm text-gray-500">
                                        No existen registros que coincidan con la búsqueda realizada.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-5 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="rounded-xl border px-4 py-2 font-semibold disabled:opacity-50"
                    >
                        Anterior
                    </button>

                    <span>Página {currentPage} de {totalPages}</span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="rounded-xl border px-4 py-2 font-semibold disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            {selectedEmpleado && (
                <EmpleadoDetalleModal empleado={selectedEmpleado} onClose={() => setSelectedEmpleado(null)} />
            )}

            {editingEmpleado && (
                <EmpleadoFormModal empleado={editingEmpleado} onClose={() => setEditingEmpleado(null)} onSave={handleSaveEmpleado} />
            )}

            {deleteEmpleado && (
                <DeleteModal empleado={deleteEmpleado} onClose={() => setDeleteEmpleado(null)} onConfirm={handleDeleteEmpleado} />
            )}
        </section>
    )
}

function createEmptyEmpleado() {
    return {
        id: null,
        nombre: "",
        dpi: "",
        telefono: "",
        correo: "",
        puesto: "",
        rol: "Empleado",
        accesoPortal: "Activo",
        estado: "Activo",
        ultimoAcceso: "No registra",
        creadoPor: "Admin Principal",
        permisos: [],
        observaciones: "",
    }
}

function MetricCard({ title, value, detail, icon, tone }) {
    const tones = {
        blue: "bg-blue-50 text-blue-700",
        emerald: "bg-emerald-50 text-emerald-700",
        amber: "bg-amber-50 text-amber-700",
        red: "bg-red-50 text-red-700",
    }

    return (
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${tones[tone]}`}>
                    {icon}
                </div>

                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 leading-tight">{value}</h3>
                    <p className="text-xs text-gray-400 mt-1">{detail}</p>
                </div>
            </div>
        </div>
    )
}

function ActionButton({ title, icon, onClick, color }) {
    const colors = {
        blue: "bg-blue-100/60 text-blue-700 hover:bg-blue-200",
        amber: "bg-amber-100/60 text-amber-700 hover:bg-amber-200",
        red: "bg-red-100/60 text-red-700 hover:bg-red-200",
    }

    return (
        <button
            onClick={onClick}
            title={title}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-xl transition ${colors[color]}`}
        >
            {icon}
        </button>
    )
}

function Badge({ value, type }) {
    let className = "bg-gray-100 text-gray-600"

    if (type === "rol") {
        if (value === "Administrador") className = "bg-blue-100 text-blue-700"
        if (value === "Supervisor") className = "bg-purple-100 text-purple-700"
        if (value === "Empleado") className = "bg-gray-100 text-gray-700"
    }

    if (type === "portal") {
        if (value === "Activo") className = "bg-emerald-100 text-emerald-700"
        if (value === "Suspendido") className = "bg-red-100 text-red-700"
        if (value === "Sin acceso") className = "bg-gray-100 text-gray-600"
    }

    if (type === "estado") {
        if (value === "Activo") className = "bg-emerald-100 text-emerald-700"
        if (value === "Inactivo") className = "bg-red-100 text-red-700"
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${className}`}>
            {value}
        </span>
    )
}

function EmpleadoDetalleModal({ empleado, onClose }) {
    return (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
                <div className="bg-gradient-to-r from-slate-900 to-blue-800 text-white p-5 rounded-t-3xl flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Detalle del empleado</h2>
                        <p className="text-sm text-blue-100">
                            Información interna, permisos y acceso al sistema.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Detail icon={<UserCheck size={18} />} label="Nombre" value={empleado.nombre} />
                        <Detail icon={<Briefcase size={18} />} label="Puesto" value={empleado.puesto} />
                        <Detail icon={<ShieldCheck size={18} />} label="Rol" value={empleado.rol} />
                        <Detail icon={<Mail size={18} />} label="Correo" value={empleado.correo} />
                        <Detail icon={<Phone size={18} />} label="Teléfono" value={empleado.telefono} />
                        <Detail icon={<Clock size={18} />} label="Último acceso" value={empleado.ultimoAcceso} />
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                        <h3 className="font-bold text-gray-800 mb-3">Permisos asignados</h3>
                        <div className="flex flex-wrap gap-2">
                            {empleado.permisos.map((permiso) => (
                                <span
                                    key={permiso}
                                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold"
                                >
                                    {permiso}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                        <h3 className="font-bold text-gray-800 mb-2">Observaciones</h3>
                        <p className="text-sm text-gray-600">{empleado.observaciones}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EmpleadoFormModal({ empleado, onClose, onSave }) {
    const [form, setForm] = useState(empleado)

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const togglePermiso = (permiso) => {
        setForm((prev) => {
            const exists = prev.permisos.includes(permiso)

            return {
                ...prev,
                permisos: exists
                    ? prev.permisos.filter((item) => item !== permiso)
                    : [...prev.permisos, permiso],
            }
        })
    }

    const hasChanges = JSON.stringify(form) !== JSON.stringify(empleado)
    const isValid = form.nombre && form.correo && form.puesto && form.telefono

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
                <div className="bg-gradient-to-r from-slate-900 to-blue-800 text-white p-5 rounded-t-3xl flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">
                            {empleado.id ? "Editar empleado" : "Agregar empleado"}
                        </h2>
                        <p className="text-sm text-blue-100">
                            Gestiona datos generales, acceso al portal y permisos.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        <Input label="Nombre completo" value={form.nombre} onChange={(v) => handleChange("nombre", v)} />
                        <Input label="DPI" value={form.dpi} onChange={(v) => handleChange("dpi", v)} />
                        <Input label="Teléfono" value={form.telefono} onChange={(v) => handleChange("telefono", v)} />
                        <Input label="Correo" value={form.correo} onChange={(v) => handleChange("correo", v)} />
                        <Input label="Puesto" value={form.puesto} onChange={(v) => handleChange("puesto", v)} />

                        <Select label="Rol" value={form.rol} options={roles} onChange={(v) => handleChange("rol", v)} />
                        <Select label="Acceso al portal" value={form.accesoPortal} options={["Activo", "Suspendido", "Sin acceso"]} onChange={(v) => handleChange("accesoPortal", v)} />
                        <Select label="Estado" value={form.estado} options={["Activo", "Inactivo"]} onChange={(v) => handleChange("estado", v)} />
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                        <h3 className="font-bold text-gray-800 mb-3">Permisos del portal</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {permisosDisponibles.map((permiso) => (
                                <label
                                    key={permiso}
                                    className="flex items-center gap-3 rounded-2xl bg-white border border-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={form.permisos.includes(permiso)}
                                        onChange={() => togglePermiso(permiso)}
                                        className="w-4 h-4"
                                    />
                                    {permiso}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Observaciones
                        </label>
                        <textarea
                            value={form.observaciones}
                            onChange={(e) => handleChange("observaciones", e.target.value)}
                            className="w-full min-h-[120px] rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-100 pt-5">
                        <button
                            onClick={onClose}
                            className="rounded-2xl px-5 py-3 text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={() => onSave(form)}
                            disabled={!hasChanges || !isValid}
                            className="rounded-2xl px-5 py-3 text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function DeleteModal({ empleado, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-700 to-red-500 text-white p-5">
                    <h2 className="text-xl font-bold">Eliminar empleado</h2>
                    <p className="text-sm text-red-100">
                        Esta acción eliminará el registro seleccionado.
                    </p>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-600">
                        ¿Deseas eliminar a{" "}
                        <span className="font-bold text-gray-800">{empleado.nombre}</span>?
                    </p>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="rounded-2xl px-5 py-3 text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={onConfirm}
                            className="rounded-2xl px-5 py-3 text-sm font-semibold bg-red-700 text-white hover:bg-red-800 transition"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Detail({ icon, label, value }) {
    return (
        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
                {icon}
                <p className="text-xs font-semibold uppercase">{label}</p>
            </div>
            <p className="text-sm font-bold text-gray-800">{value}</p>
        </div>
    )
}

function Input({ label, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

function Select({ label, value, options, onChange }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}