import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, FileText } from "lucide-react";

const ReportsMenu = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const reports = [
    {
      title: "Master List of Books",
      description: "View complete book inventory",
      path: `/${isAdmin ? 'admin' : 'user'}/reports/books`,
    },
    {
      title: "Master List of Movies",
      description: "View complete movie inventory",
      path: `/${isAdmin ? 'admin' : 'user'}/reports/movies`,
    },
    {
      title: "Master List of Memberships",
      description: "View all memberships (active/inactive)",
      path: `/${isAdmin ? 'admin' : 'user'}/reports/memberships`,
    },
    {
      title: "Active Issues",
      description: "View currently issued items",
      path: `/${isAdmin ? 'admin' : 'user'}/reports/active-issues`,
    },
    {
      title: "Overdue Returns",
      description: "View overdue items and fines",
      path: `/${isAdmin ? 'admin' : 'user'}/reports/overdue`,
    },
    {
      title: "Issue Requests",
      description: "View requested and fulfilled items",
      path: `/${isAdmin ? 'admin' : 'user'}/reports/requests`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports Module</h1>
            <p className="text-muted-foreground">View system reports and analytics</p>
          </div>
          <Button variant="outline" onClick={() => navigate(isAdmin ? "/admin" : "/user")}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card key={report.path} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(report.path)}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full">View Report</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsMenu;
