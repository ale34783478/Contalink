import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function MainLayout() {
  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 h-screen flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout