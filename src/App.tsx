
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DishDetail from "./pages/DishDetail";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import RestaurantAdmin from "./pages/RestaurantAdmin";
import RestaurantPage from "./pages/RestaurantPage";
import { RestaurantProvider } from "./context/RestaurantContext";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RestaurantProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dish/:id" element={<DishDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/restaurant/:id" element={<RestaurantAdmin />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RestaurantProvider>
  </QueryClientProvider>
);

export default App;
