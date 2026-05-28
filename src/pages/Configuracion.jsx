import React, { useState } from "react"
import {
    Settings,
    Building2,
    Receipt,
    ShieldCheck,
    Users,
    Palette,
    Database,
    FileText,
    Bell,
    Lock,
    CheckCircle2,
    X,
    SlidersHorizontal,
} from "lucide-react"

const configuracionesBase = [
    {
        id: 1,
        titulo: "Datos de la empresa",
        descripcion: "Nombre comercial, NIT, dirección, teléfono, correo y datos fiscales básicos.",
        icono: <Building2 size={22} />,
    },
    {
        id: 2,
        titulo: "Facturación",
        descripcion: "Configuración de series, correlativos, datos de factura, notas y formato de impresión.",
        icono: <Receipt size={22} />,
    },
    {
        id: 3,
        titulo: "Usuarios y permisos",
        descripcion: "Roles, accesos por módulo, permisos administrativos y control de empleados.",
        icono: <Users size={22} />,
    },
    {
        id: 4,
        titulo: "Seguridad",
        descripcion: "Control de acceso, bloqueo de usuarios, auditoría de cambios y protección de información.",
        icono: <ShieldCheck size={22} />,
    },
    {
        id: 5,
        titulo: "Diseño del sistema",
        descripcion: "Colores corporativos, logo, nombre visible del sistema y ajustes visuales básicos.",
        icono: <Palette size={22} />,
    },
    {
        id: 6,
        titulo: "Respaldo de información",
        descripcion: "Opciones de respaldo, exportación de datos y conservación de registros importantes.",
        icono: <Database size={22} />,
    },
]

const configuracionesSolicitables = [
    "Personalización de módulos según el tipo de PYME.",
    "Campos adicionales para ventas, clientes, productos o gastos.",
    "Reportes personalizados según necesidades administrativas.",
    "Diseño visual adaptado a la identidad del negocio.",
    "Permisos especiales para roles específicos.",
    "Automatización de procesos internos.",
    "Integración con manuales, políticas o flujos propios del cliente.",
    "Ajustes en facturación, inventario, ventas o control financiero.",
]

export default function Configuracion() {
    const [modal, setModal] = useState(null)

    return (
        <section className="w-full space-y-6">
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-blue-800 p-6 shadow-xl text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div>
                        <p className="text-sm text-blue-100 mb-2">
                            Módulo administrativo
                        </p>

                        <h1 className="text-2xl md:text-3xl font-bold">
                            Configuración
                        </h1>

                        <p className="text-blue-100 mt-2 max-w-3xl">
                            Apartado adaptable según las necesidades de cada cliente.
                            CONTALINK permite configurar opciones base del sistema y
                            solicitar ajustes personalizados para cada PYME.
                        </p>
                    </div>

                    <button
                        onClick={() => setModal("solicitud")}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 transition px-5 py-3 text-sm font-semibold backdrop-blur"
                    >
                        <SlidersHorizontal size={18} />
                        Solicitar ajuste
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard
                    icon={<Settings size={22} />}
                    title="Configuración flexible"
                    text="El sistema puede adaptarse al flujo de trabajo de cada negocio."
                    tone="blue"
                />

                <InfoCard
                    icon={<Lock size={22} />}
                    title="Uso administrativo"
                    text="Los cambios importantes deben ser gestionados únicamente por administradores."
                    tone="amber"
                />

                <InfoCard
                    icon={<CheckCircle2 size={22} />}
                    title="Base incluida"
                    text="Incluye configuraciones comunes para operar el sistema desde el inicio."
                    tone="emerald"
                />
            </div>

            <div className="rounded-3xl bg-white shadow-sm border border-gray-100 p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-gray-800">
                        Configuraciones base del sistema
                    </h2>
                    <p className="text-sm text-gray-500">
                        Estas opciones representan las configuraciones comunes que puede
                        manejar cualquier cliente dentro del sistema.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {configuracionesBase.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setModal(item)}
                            className="text-left rounded-3xl border border-gray-100 bg-gray-50 hover:bg-blue-50/60 hover:border-blue-100 transition p-5"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                                {item.icono}
                            </div>

                            <h3 className="font-bold text-gray-800 mb-2">
                                {item.titulo}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {item.descripcion}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                <div className="rounded-3xl bg-white shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                            <FileText size={21} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                Configuraciones solicitables
                            </h2>
                            <p className="text-sm text-gray-500">
                                Opciones que pueden desarrollarse según el cliente.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {configuracionesSolicitables.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 rounded-2xl bg-gray-50 border border-gray-100 p-4"
                            >
                                <CheckCircle2
                                    size={18}
                                    className="text-emerald-600 shrink-0 mt-0.5"
                                />
                                <p className="text-sm text-gray-600">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl bg-white shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                            <Bell size={21} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                Nota importante
                            </h2>
                            <p className="text-sm text-gray-500">
                                Este módulo es el más variable del sistema.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-100 p-5 space-y-4">
                        <p className="text-sm text-gray-600">
                            El apartado de configuración puede cambiar dependiendo
                            del tipo de negocio que solicite CONTALINK. Una tienda,
                            una ferretería, una distribuidora o un pequeño comercio
                            pueden requerir opciones distintas.
                        </p>

                        <p className="text-sm text-gray-600">
                            Por esa razón, este módulo muestra configuraciones base,
                            pero también permite dejar claro que el sistema puede
                            adaptarse a las necesidades reales del cliente.
                        </p>

                        <p className="text-sm text-gray-600">
                            Las configuraciones avanzadas pueden agregarse a pedido,
                            manteniendo siempre la misma identidad visual, seguridad,
                            diseño responsive y estructura profesional del sistema.
                        </p>
                    </div>
                </div>
            </div>

            {modal && (
                <ConfiguracionModal
                    data={modal}
                    onClose={() => setModal(null)}
                />
            )}
        </section>
    )
}

function InfoCard({ icon, title, text, tone }) {
    const tones = {
        blue: "bg-blue-50 text-blue-700",
        amber: "bg-amber-50 text-amber-700",
        emerald: "bg-emerald-50 text-emerald-700",
    }

    return (
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-4">
                <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${tones[tone]}`}
                >
                    {icon}
                </div>

                <div>
                    <h3 className="font-bold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{text}</p>
                </div>
            </div>
        </div>
    )
}

function ConfiguracionModal({ data, onClose }) {
    const isSolicitud = data === "solicitud"

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-900 to-blue-800 text-white p-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">
                            {isSolicitud
                                ? "Solicitud de configuración personalizada"
                                : data.titulo}
                        </h2>

                        <p className="text-sm text-blue-100">
                            {isSolicitud
                                ? "Opciones que pueden adaptarse según el cliente."
                                : "Detalle de configuración base del sistema."}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {isSolicitud ? (
                        <>
                            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                                <h3 className="font-bold text-gray-800 mb-2">
                                    ¿Qué puede solicitar el cliente?
                                </h3>

                                <p className="text-sm text-gray-600">
                                    El cliente puede solicitar ajustes visuales,
                                    nuevos campos, reportes especiales, permisos
                                    personalizados, módulos adicionales o cambios
                                    en el flujo de trabajo del sistema.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                                <h3 className="font-bold text-gray-800 mb-2">
                                    Ejemplo
                                </h3>

                                <p className="text-sm text-gray-600">
                                    Si una PYME necesita controlar entregas,
                                    proveedores, sucursales o reportes específicos,
                                    estos apartados pueden agregarse como parte de
                                    una personalización del sistema.
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                                <h3 className="font-bold text-gray-800 mb-2">
                                    Descripción
                                </h3>

                                <p className="text-sm text-gray-600">
                                    {data.descripcion}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                                <h3 className="font-bold text-gray-800 mb-2">
                                    Aplicación dentro de CONTALINK
                                </h3>

                                <p className="text-sm text-gray-600">
                                    Esta configuración forma parte de las opciones
                                    base que permiten adaptar el sistema contable a
                                    la operación diaria del negocio.
                                </p>
                            </div>
                        </>
                    )}

                    <div className="flex justify-end pt-3">
                        <button
                            onClick={onClose}
                            className="rounded-2xl px-5 py-3 text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 transition"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}