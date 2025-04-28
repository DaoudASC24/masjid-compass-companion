
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getNextPrayer, getMasjidCapacity } from "@/lib/data-service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import PrayerBanner from "@/components/PrayerBanner";

const HomePage = () => {
  const [nextPrayer, setNextPrayer] = useState(getNextPrayer());
  const [capacity, setCapacity] = useState(getMasjidCapacity());
  const [countDown, setCountDown] = useState("");
  const [isLiveStream, setIsLiveStream] = useState(false);
  const { toast } = useToast();

  // Update countdown timer every minute
  useEffect(() => {
    const updateCountDown = () => {
      const now = new Date();
      if (nextPrayer.time <= now) {
        // Next prayer time has passed, get the next one
        const newNextPrayer = getNextPrayer();
        setNextPrayer(newNextPrayer);
      }
      
      setCountDown(formatDistanceToNow(nextPrayer.time, { addSuffix: true }));
    };
    
    updateCountDown();
    const interval = setInterval(updateCountDown, 60000);
    
    return () => clearInterval(interval);
  }, [nextPrayer]);

  // Simulate capacity updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCapacity(getMasjidCapacity());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Simulate live stream availability (for Jumuah or special events)
  useEffect(() => {
    // Check if today is Friday (5) and it's around Jumuah time (1-2 PM)
    const now = new Date();
    const isFriday = now.getDay() === 5;
    const hour = now.getHours();
    
    setIsLiveStream(isFriday && (hour >= 12 && hour <= 14));
  }, []);

  // Simulate traffic alert
  useEffect(() => {
    const randomDelay = Math.random() * 5000 + 5000; // Random delay between 5-10 seconds
    
    const timeoutId = setTimeout(() => {
      toast({
        title: "Traffic Alert",
        description: "Heavy traffic detected. Leave now to reach masjid before Maghrib prayer.",
        duration: 5000,
      });
    }, randomDelay);
    
    return () => clearTimeout(timeoutId);
  }, [toast]);

  return (
    <div className="space-y-6 pb-8">
      <section className="text-center pt-4 pb-2">
        <h1 className="text-3xl font-bold mb-2">Assalamu Alaikum!</h1>
        <p className="text-muted-foreground">Welcome to Smart Masjid</p>
      </section>
      
      {/* Prayer Times Banner */}
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Prayer Times</h2>
        <PrayerBanner />
      </section>
      
      <section className="space-y-4">
        {/* Featured Image */}
        <div className="rounded-lg overflow-hidden h-48 relative">
          <img 
            src="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800" 
            alt="Masjid" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <h3 className="text-white text-xl font-bold">Our Beautiful Masjid</h3>
          </div>
        </div>
        
        {/* Capacity Widget */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Masjid Capacity</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Capacity</p>
                <p className="text-xl font-bold">{capacity.current}/{capacity.capacity}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${capacity.statusClass}`}>
                Status: {capacity.status}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Next Prayer Countdown */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Next Prayer</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  {nextPrayer.name} at {nextPrayer.adhan}
                </p>
                <p className="text-xl font-bold">{countDown}</p>
              </div>
              <div className="text-lg font-semibold text-primary animate-pulse-slow">
                {nextPrayer.name}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Live Stream Button - Only visible during events */}
        {isLiveStream && (
          <Button className="w-full text-lg py-6" variant="default">
            Join Live Stream (Jumuah Khutbah)
          </Button>
        )}
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-3 gap-4">
          <QuickLink to="/lost-found" label="Lost & Found" />
          <QuickLink to="/zakat-calculator" label="Zakat Calculator" />
          <QuickLink to="/feedback" label="Feedback" />
        </div>
      </section>
    </div>
  );
};

const QuickLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Link to={to}>
      <div className="bg-secondary/20 hover:bg-secondary/30 transition-colors rounded-lg p-4 h-24 flex items-center justify-center text-center">
        <span className="font-medium text-sm">{label}</span>
      </div>
    </Link>
  );
};

export default HomePage;
