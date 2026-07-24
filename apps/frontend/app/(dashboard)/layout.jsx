import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-zinc-950">
        <DashboardSidebar />

        <div className="flex flex-1 flex-col">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}