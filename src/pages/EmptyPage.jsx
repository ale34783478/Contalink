function EmptyPage({ title }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8 min-h-[70vh]">
            <h1 className="text-3xl font-bold text-blue-900">
                {title}
            </h1>

            <p className="text-gray-500 mt-2">
                Este módulo se desarrollará próximamente.
            </p>
        </div>
    )
}

export default EmptyPage