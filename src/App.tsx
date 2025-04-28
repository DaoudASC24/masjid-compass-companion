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
import NotificationsPage from "./pages/NotificationsPage";
import AskImamPage from "./pages/AskImamPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import DonatePage from "./pages/DonatePage";
import LostFoundPage from "./pages/LostFoundPage";
import ZakatCalculatorPage from "./pages/ZakatCalculatorPage";
import FeedbackPage from "./pages/FeedbackPage";
import DirectoryPage from "./pages/DirectoryPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import "@/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
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
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="ask-imam" element={<AskImamPage />} />
              <Route path="announcements" element={<AnnouncementsPage />} />
              <Route path="donate" element={<DonatePage />} />
              <Route path="lost-found" element={<LostFoundPage />} />
              <Route path="zakat-calculator" element={<ZakatCalculatorPage />} />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="directory" element={<DirectoryPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
