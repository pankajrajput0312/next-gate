import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function InstagramRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    const handleInstagramRedirect = async () => {
      console.log("code", code);
      if (!code) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Social not connected. Please try again."
        });
        navigate('/connect-social');
        return;
      }

      try {
        const response = await fetch(`https://automation.getmentore.com/api/exchangeToken?code=${code}`);
        const data = await response.json();
        console.log(data);
        if (data.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Social not connected. Please try again."
          });
          navigate('/connect-social');
        } else {
          toast({
            title: "Success",
            description: "Successfully connected to Instagram!"
          });
          navigate('/connect-social');
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Social not connected. Please try again."
        });
        navigate('/connect-social');
      } finally {
        setIsLoading(false);
      }
    };

    handleInstagramRedirect();
  }, [navigate, location.search, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Connecting to Instagram...</h2>
          <p className="text-muted-foreground">Please wait while we complete the connection.</p>
        </div>
      </div>
    );
  }

  return null;
}

export default InstagramRedirect; 