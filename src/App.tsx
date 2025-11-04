import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Setup from "./pages/Setup";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import MaintenanceMenu from "./pages/maintenance/MaintenanceMenu";
import ReportsMenu from "./pages/reports/ReportsMenu";
import TransactionsMenu from "./pages/transactions/TransactionsMenu";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/logout" element={<Logout />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminHome />
              </ProtectedRoute>
            } />
            <Route path="/admin/maintenance" element={
              <ProtectedRoute requireAdmin>
                <MaintenanceMenu />
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute requireAdmin>
                <ReportsMenu />
              </ProtectedRoute>
            } />
            <Route path="/admin/transactions" element={
              <ProtectedRoute requireAdmin>
                <TransactionsMenu />
              </ProtectedRoute>
            } />
            
            {/* User Routes */}
            <Route path="/user" element={
              <ProtectedRoute>
                <UserHome />
              </ProtectedRoute>
            } />
            <Route path="/user/reports" element={
              <ProtectedRoute>
                <ReportsMenu />
              </ProtectedRoute>
            } />
            <Route path="/user/transactions" element={
              <ProtectedRoute>
                <TransactionsMenu />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
