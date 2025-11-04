import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, FileText, ArrowRightLeft, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminHome = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const modules = [
    {
      title: "Maintenance",
      description: "Manage memberships, books, movies, and users",
      icon: Settings,
      path: "/admin/maintenance",
      color: "text-primary",
    },
    {
      title: "Reports",
      description: "View master lists, active issues, and overdue returns",
      icon: FileText,
      path: "/admin/reports",
      color: "text-accent",
    },
    {
      title: "Transactions",
      description: "Check availability, issue books, returns, and fines",
      icon: ArrowRightLeft,
      path: "/admin/transactions",
      color: "text-success",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome to the Library Management System</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card key={module.path} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(module.path)}>
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 ${module.color}`}>
                  <module.icon className="w-6 h-6" />
                </div>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Access Module</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
