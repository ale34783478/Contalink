function Dashboard() {
  const rol = localStorage.getItem("rol")
  const usuarioActivo = rol === "admin" ? "Administrador" : "Empleado 1"

  const resumen = [
    { titulo: "Ventas del día", valor: "Q 1,245.00", detalle: "12 ventas registradas", color: "text-green-600", fondo: "bg-green-50" },
    { titulo: "Facturas emitidas", valor: "18", detalle: "5 pendientes de pago", color: "text-blue-700", fondo: "bg-blue-50" },
    { titulo: "Stock bajo", valor: "4", detalle: "Productos requieren revisión", color: "text-yellow-600", fondo: "bg-yellow-50" },
    { titulo: "Clientes activos", valor: "12", detalle: "Clientes registrados", color: "text-indigo-600", fondo: "bg-indigo-50" },
  ]

  const ventasSemana = [
    { dia: "Lun", total: 45 },
    { dia: "Mar", total: 65 },
    { dia: "Mié", total: 50 },
    { dia: "Jue", total: 80 },
    { dia: "Vie", total: 70 },
    { dia: "Sáb", total: 95 },
    { dia: "Dom", total: 40 },
  ]

  const actividad = [
    { titulo: "Venta registrada", detalle: "Carlos Méndez compró Cuaderno universitario", tiempo: "Hace 10 min" },
    { titulo: "Factura emitida", detalle: "FAC-00018 generada correctamente", tiempo: "Hace 25 min" },
    { titulo: "Inventario actualizado", detalle: "Stock de Resma de papel modificado", tiempo: "Hace 1 h" },
    { titulo: "Cliente agregado", detalle: "Papelería San José fue registrado", tiempo: "Hace 2 h" },
  ]

  const ventasRecientes = [
    { fecha: "25/05/2026", cliente: "Carlos Méndez", producto: "Cuaderno universitario", total: 45, pago: "Efectivo" },
    { fecha: "25/05/2026", cliente: "Librería El Saber", producto: "Lapicero azul", total: 35, pago: "Transferencia" },
    { fecha: "24/05/2026", cliente: "Ana López", producto: "Lápiz HB", total: 30, pago: "Efectivo" },
    { fecha: "24/05/2026", cliente: "Papelería San José", producto: "Borrador blanco", total: 40, pago: "Tarjeta" },
    { fecha: "23/05/2026", cliente: "María Castillo", producto: "Marcador permanente", total: 40, pago: "Efectivo" },
  ]

  const inventarioCritico = [
    { producto: "Pegamento líquido", stock: 0, minimo: 10, estado: "Agotado" },
    { producto: "Resma de papel", stock: 12, minimo: 20, estado: "Stock bajo" },
    { producto: "Lapicero azul", stock: 15, minimo: 25, estado: "Stock bajo" },
    { producto: "Silicón líquido", stock: 9, minimo: 15, estado: "Stock bajo" },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-2xl p-4 md:p-5 text-white shadow-md shadow-blue-100">
        <p className="text-blue-100 text-sm font-semibold">
          Bienvenido, {usuarioActivo}
        </p>

        <h1 className="text-2xl md:text-3xl font-bold mt-1">
          Panel principal
        </h1>

        <p className="text-blue-100 text-sm mt-2 max-w-2xl">
          Resumen general de ventas, facturación, inventario y actividad reciente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {resumen.map((item) => (
          <div
            key={item.titulo}
            className={`${item.fondo} border border-blue-100 rounded-2xl p-5 shadow-sm`}
          >
            <p className="text-gray-600 text-sm font-medium">{item.titulo}</p>

            <h2 className={`text-3xl font-bold mt-2 ${item.color}`}>
              {item.valor}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {item.detalle}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl font-bold text-blue-900">
                Ventas de la semana
              </h2>

              <p className="text-sm text-gray-500">
                Comparativo visual de movimiento diario.
              </p>
            </div>

            <span className="text-sm font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-xl">
              +12% esta semana
            </span>
          </div>

          <div className="h-72 flex items-end gap-4">
            {ventasSemana.map((item) => (
              <div key={item.dia} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full h-56 bg-blue-50 rounded-2xl flex items-end overflow-hidden">
                  <div
                    className="w-full bg-blue-800 rounded-2xl transition-all"
                    style={{ height: `${item.total}%` }}
                  />
                </div>

                <span className="text-sm font-semibold text-gray-500">
                  {item.dia}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-900">
            Facturas por estado
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Estado general de facturación.
          </p>

          <div className="flex items-center justify-center">
            <div className="w-44 h-44 rounded-full bg-[conic-gradient(#16a34a_0_50%,#2563eb_50%_78%,#facc15_78%_100%)] flex items-center justify-center">
              <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center">
                <p className="text-3xl font-bold text-blue-900">22</p>
                <p className="text-xs text-gray-500">Facturas</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Pagadas</span>
              <strong className="text-green-600">50%</strong>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Emitidas</span>
              <strong className="text-blue-600">28%</strong>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Pendientes</span>
              <strong className="text-yellow-600">22%</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-900 mb-5">
            Ventas recientes
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
              <thead className="bg-blue-50 text-blue-900">
                <tr>
                  <th className="p-4 text-left">Fecha</th>
                  <th className="p-4 text-left">Cliente</th>
                  <th className="p-4 text-left">Producto</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Pago</th>
                </tr>
              </thead>

              <tbody>
                {ventasRecientes.map((venta, index) => (
                  <tr key={index} className="border-t border-blue-50">
                    <td className="p-4">{venta.fecha}</td>
                    <td className="p-4 font-semibold text-blue-900">{venta.cliente}</td>
                    <td className="p-4">{venta.producto}</td>
                    <td className="p-4 font-semibold text-green-600">
                      Q {venta.total.toFixed(2)}
                    </td>
                    <td className="p-4">{venta.pago}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-900 mb-5">
            Inventario crítico
          </h2>

          <div className="space-y-4">
            {inventarioCritico.map((item) => (
              <div
                key={item.producto}
                className="border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <h3 className="font-bold text-blue-900">
                    {item.producto}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Stock actual: {item.stock} / mínimo: {item.minimo}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${item.estado === "Agotado"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {item.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-blue-900 mb-5">
          Actividad reciente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {actividad.map((item) => (
            <div
              key={item.titulo}
              className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5"
            >
              <h3 className="font-bold text-blue-900">
                {item.titulo}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {item.detalle}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                {item.tiempo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard