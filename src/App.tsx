import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import Index from "./pages/Index";
import Planner from "./pages/Planner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen">
        <TooltipProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/planner" element={<Planner />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </TooltipProvider>
      </div>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
