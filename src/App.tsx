
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PrayerTimesPage from "./pages/PrayerTimesPage";
import EventsPage from "./pages/EventsPage";
import MorePage from "./pages/MorePage";
import LostFoundPage from "./pages/LostFoundPage";
import ZakatCalculatorPage from "./pages/ZakatCalculatorPage";
import FeedbackPage from "./pages/FeedbackPage";
import DirectoryPage from "./pages/DirectoryPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<HomePage />} />
              <Route path="prayer-times" element={<PrayerTimesPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="more" element={<MorePage />} />
              <Route path="lost-found" element={<LostFoundPage />} />
              <Route path="zakat-calculator" element={<ZakatCalculatorPage />} />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="directory" element={<DirectoryPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
