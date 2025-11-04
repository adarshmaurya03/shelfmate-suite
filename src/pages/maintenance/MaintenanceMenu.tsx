import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, UserCog, Home } from "lucide-react";

const MaintenanceMenu = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Membership Management",
      description: "Add or update library memberships",
      icon: Users,
      path: "/admin/maintenance/membership",
    },
    {
      title: "Book/Movie Management",
      description: "Add or update books and movies",
      icon: BookOpen,
      path: "/admin/maintenance/books",
    },
    {
      title: "User Management",
      description: "Manage system users and permissions",
      icon: UserCog,
      path: "/admin/maintenance/users",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Maintenance Module</h1>
            <p className="text-muted-foreground">Manage system data and configurations</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/admin")}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {options.map((option) => (
            <Card key={option.path} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(option.path)}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <option.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Manage</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceMenu;
