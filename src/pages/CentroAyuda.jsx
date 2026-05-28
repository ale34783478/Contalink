import { useState } from "react"

function CentroAyuda() {
    const [busqueda, setBusqueda] = useState("")
    const [categoriaActiva, setCategoriaActiva] = useState("Todos")

    const categorias = [
        "Todos",
        "Ventas",
        "Inventario",
        "Clientes",
        "Facturación",
        "Soporte",
    ]

    const preguntas = [
        {
            categoria: "Ventas",
            pregunta: "¿Cómo registro una nueva venta?",
            respuesta:
                "Ingrese al módulo Ventas, presione Nueva venta, seleccione un producto del inventario, elija un cliente registrado, indique cantidad y método de pago. El sistema calculará el total automáticamente.",
        },
        {
            categoria: "Inventario",
            pregunta: "¿Por qué no puedo vender más productos?",
            respuesta:
                "La cantidad de venta no puede superar el stock disponible. Revise el producto en Inventario y actualice existencias si corresponde.",
        },
        {
            categoria: "Clientes",
            pregunta: "¿Cómo consulto el detalle de un cliente?",
            respuesta:
                "En Clientes, presione el botón con lupa. Se ocultará la tabla y se mostrará la información completa del cliente.",
        },
        {
            categoria: "Facturación",
            pregunta: "¿Cómo cancelo una factura?",
            respuesta:
                "En Facturación, presione el botón de basurero. El sistema solicitará un motivo de cancelación y registrará quién realizó la acción.",
        },
        {
            categoria: "Facturación",
            pregunta: "¿Cómo descargo una factura?",
            respuesta:
                "Presione el botón de descarga en la tabla o dentro del detalle de factura. Se abrirá una vista imprimible para guardar como PDF.",
        },
        {
            categoria: "Soporte",
            pregunta: "¿Qué hago si encuentro un error?",
            respuesta:
                "Revise primero el Centro de Ayuda. Si el problema continúa, tome captura, indique el módulo afectado y contacte al administrador.",
        },
    ]

    const preguntasFiltradas = preguntas.filter((item) => {
        const coincideCategoria =
            categoriaActiva === "Todos" || item.categoria === categoriaActiva

        const coincideBusqueda =
            item.pregunta.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.respuesta.toLowerCase().includes(busqueda.toLowerCase())

        return coincideCategoria && coincideBusqueda
    })

    const accesos = [
        {
            titulo: "Ventas",
            descripcion: "Registrar ventas, consultar historial y editar registros.",
            ruta: "/ingresos",
            icono: "🛒",
        },
        {
            titulo: "Inventario",
            descripcion: "Administrar productos, stock, precios y proveedores.",
            ruta: "/inventario",
            icono: "📦",
        },
        {
            titulo: "Clientes",
            descripcion: "Gestionar clientes y consultar información comercial.",
            ruta: "/clientes",
            icono: "👥",
        },
        {
            titulo: "Facturación",
            descripcion: "Consultar, editar, cancelar y descargar facturas.",
            ruta: "/facturacion",
            icono: "🧾",
        },
    ]

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-blue-200">
                <p className="text-blue-100 font-semibold">
                    Soporte y asistencia
                </p>

                <h1 className="text-3xl md:text-4xl font-bold mt-2">
                    Centro de Ayuda
                </h1>

                <p className="text-blue-100 mt-3 max-w-3xl">
                    Encuentre respuestas rápidas, guías de uso, solución de problemas
                    y acceso al manual completo de CONTALINK.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-blue-900">
                        ¿En qué necesita ayuda?
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                        Busque por módulo, problema o palabra clave.
                    </p>

                    <input
                        type="text"
                        placeholder="Buscar ayuda..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full mt-5 border border-blue-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                    />

                    <div className="flex flex-wrap gap-2 mt-5">
                        {categorias.map((categoria) => (
                            <button
                                key={categoria}
                                onClick={() => setCategoriaActiva(categoria)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${categoriaActiva === categoria
                                    ? "bg-blue-800 text-white"
                                    : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                                    }`}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">
                        📘
                    </div>

                    <h2 className="text-xl font-bold text-blue-900 mt-4">
                        Manual de usuario
                    </h2>

                    <p className="text-gray-500 text-sm mt-2">
                        Descargue una guía completa con el funcionamiento de
                        Dashboard, Ventas, Inventario, Clientes, Facturación y Centro de Ayuda.
                    </p>

                    <a
                        href="/Manual_de_usuario_Contalink.pdf"
                        download="Manual_de_usuario_Contalink.pdf"
                        className="block text-center mt-5 w-full bg-blue-800 hover:bg-blue-900 text-white px-5 py-3 rounded-xl font-semibold transition"
                    >
                        Descargar manual PDF
                    </a>

                    <p className="text-xs text-gray-400 mt-3">
                        Coloque el PDF dentro de la carpeta public para que este botón funcione.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {accesos.map((item) => (
                    <a
                        key={item.titulo}
                        href={item.ruta}
                        className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                            {item.icono}
                        </div>

                        <h3 className="text-lg font-bold text-blue-900 mt-4">
                            {item.titulo}
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            {item.descripcion}
                        </p>
                    </a>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-blue-900">
                        Preguntas frecuentes
                    </h2>

                    <div className="space-y-4 mt-5">
                        {preguntasFiltradas.length === 0 ? (
                            <div className="border border-blue-100 rounded-2xl p-8 text-center">
                                <div className="text-4xl mb-3">🔎</div>

                                <h3 className="text-lg font-bold text-blue-900">
                                    No se encontraron resultados
                                </h3>

                                <p className="text-gray-500 text-sm mt-2">
                                    Intente buscar con otra palabra o seleccione otra categoría.
                                </p>
                            </div>
                        ) : (
                            preguntasFiltradas.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-blue-100 rounded-2xl p-5 bg-blue-50/30"
                                >
                                    <span className="text-xs font-bold text-blue-700 bg-white px-3 py-1 rounded-full">
                                        {item.categoria}
                                    </span>

                                    <h3 className="text-lg font-bold text-blue-900 mt-3">
                                        {item.pregunta}
                                    </h3>

                                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                                        {item.respuesta}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-blue-900">
                            Problemas comunes
                        </h2>

                        <div className="space-y-4 mt-5">
                            <div>
                                <h3 className="font-bold text-blue-900">
                                    No aparece información
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Verifique si hay filtros activos o si está en una página sin registros.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-blue-900">
                                    No puedo editar
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Algunas acciones requieren permisos de administrador.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-blue-900">
                                    No puedo vender un producto
                                </h3>
                                <p className="text-sm text-gray-500">
                                    El producto puede estar agotado o con stock insuficiente.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-900 rounded-3xl p-6 text-white shadow-sm">
                        <h2 className="text-xl font-bold">
                            Contacto de soporte
                        </h2>

                        <p className="text-blue-100 text-sm mt-2">
                            Si necesita asistencia, envíe el módulo afectado,
                            acción realizada y captura del error.
                        </p>

                        <div className="mt-5 space-y-2 text-sm">
                            <p>📧 soporte@contalink.com</p>
                            <p>💬 WhatsApp Business</p>
                            <p>⏰ Lunes a viernes, 8:00 a 17:00</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-blue-900">
                    Recomendaciones de uso
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    <div className="bg-green-50 rounded-2xl p-5">
                        <h3 className="font-bold text-green-700">
                            Revise el Dashboard
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Consulte alertas y actividad reciente antes de iniciar operaciones.
                        </p>
                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-5">
                        <h3 className="font-bold text-yellow-700">
                            Mantenga inventario actualizado
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Esto evita errores al registrar ventas o facturas.
                        </p>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-5">
                        <h3 className="font-bold text-blue-700">
                            Documente cancelaciones
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Registre motivos claros para mantener trazabilidad.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CentroAyuda