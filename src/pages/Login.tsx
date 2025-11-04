import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { login } = useAuth();

  useEffect(() => {
    // Auto-setup demo users on first load
    const setupDemoUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/setup-demo-users`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
          }
        );
        const data = await response.json();
        console.log('Demo users setup:', data.message);
      } catch (error) {
        console.error('Setup error:', error);
      } finally {
        setIsInitializing(false);
      }
    };
    
    setupDemoUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || !password) {
      return;
    }

    setIsLoading(true);
    try {
      await login(userId, password);
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Initializing system...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Library Management System</CardTitle>
          <CardDescription>Enter your credentials to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                type="text"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-6 text-sm text-muted-foreground space-y-1">
            <p className="font-medium">Demo Credentials:</p>
            <p>Admin: adm / adm</p>
            <p>User: user / user</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
