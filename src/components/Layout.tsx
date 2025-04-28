
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Calendar, Home, Clock, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 pb-16 pt-2 px-4 md:px-8 max-w-4xl mx-auto w-full">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border h-16 flex items-center justify-around z-10">
        <NavTab 
          to="/home" 
          icon={<Home className="h-6 w-6" />} 
          label={t('nav.home')} 
          isActive={location.pathname === "/home"} 
        />
        <NavTab 
          to="/prayer-times" 
          icon={<Clock className="h-6 w-6" />} 
          label={t('nav.prayerTimes')} 
          isActive={location.pathname === "/prayer-times"} 
        />
        <NavTab 
          to="/events" 
          icon={<Calendar className="h-6 w-6" />} 
          label={t('nav.events')} 
          isActive={location.pathname === "/events"} 
        />
        <NavTab 
          to="/more" 
          icon={<Menu className="h-6 w-6" />} 
          label={t('nav.more')} 
          isActive={location.pathname === "/more"} 
        />
      </nav>
    </div>
  );
};

type NavTabProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const NavTab = ({ to, icon, label, isActive }: NavTabProps) => {
  return (
    <NavLink 
      to={to} 
      className="flex flex-1 flex-col items-center justify-center h-full"
    >
      <div 
        className={cn(
          "flex flex-col items-center justify-center", 
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </div>
    </NavLink>
  );
};

export default Layout;
