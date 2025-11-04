import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, BookPlus, BookMinus, DollarSign } from "lucide-react";

const TransactionsMenu = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const transactions = [
    {
      title: "Check Book Availability",
      description: "Search for available books",
      icon: Search,
      path: `/${isAdmin ? 'admin' : 'user'}/transactions/check-availability`,
    },
    {
      title: "Issue Book",
      description: "Issue books to members",
      icon: BookPlus,
      path: `/${isAdmin ? 'admin' : 'user'}/transactions/issue-book`,
    },
    {
      title: "Return Book",
      description: "Process book returns",
      icon: BookMinus,
      path: `/${isAdmin ? 'admin' : 'user'}/transactions/return-book`,
    },
    {
      title: "Pay Fine",
      description: "Process fine payments",
      icon: DollarSign,
      path: `/${isAdmin ? 'admin' : 'user'}/transactions/pay-fine`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Transactions Module</h1>
            <p className="text-muted-foreground">Manage book issues, returns, and payments</p>
          </div>
          <Button variant="outline" onClick={() => navigate(isAdmin ? "/admin" : "/user")}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transactions.map((transaction) => (
            <Card key={transaction.path} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(transaction.path)}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <transaction.icon className="w-6 h-6 text-success" />
                </div>
                <CardTitle className="text-lg">{transaction.title}</CardTitle>
                <CardDescription>{transaction.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full">Open</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsMenu;
