import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./adminHeader";
export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* =================================
          ADMIN SIDEBAR
      ================================= */}

      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* =================================
          RIGHT SIDE
      ================================= */}

      <div className="min-h-screen lg:ml-64">
        {/* =================================
            ADMIN HEADER
        ================================= */}

        <AdminHeader
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* =================================
            ADMIN PAGE CONTENT
        ================================= */}

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
