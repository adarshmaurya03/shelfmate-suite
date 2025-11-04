import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Setup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const setupDemoUsers = async () => {
    setIsLoading(true);
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
      
      if (response.ok) {
        toast.success("Demo users created successfully!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(data.error || "Failed to create demo users");
      }
    } catch (error) {
      console.error("Setup error:", error);
      toast.error("An error occurred during setup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Library Management System Setup</CardTitle>
          <CardDescription>Initialize the system with demo users and data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">Demo Credentials</h3>
            <div className="text-sm space-y-1">
              <p><strong>Admin:</strong> Username: adm, Password: adm</p>
              <p><strong>User:</strong> Username: user, Password: user</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">What will be created:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Admin user account (adm/adm)</li>
              <li>Regular user account (user/user)</li>
              <li>Sample memberships (5 members)</li>
              <li>Sample books (8 books)</li>
              <li>Sample movies (5 movies)</li>
            </ul>
          </div>

          <Button 
            onClick={setupDemoUsers} 
            className="w-full" 
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up...
              </>
            ) : (
              "Initialize System"
            )}
          </Button>

          <div className="text-center">
            <Button variant="link" onClick={() => navigate("/")}>
              Skip to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setup;
