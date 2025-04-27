
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { getPrayerTimesForDate, Prayer, PrayerDay } from "@/lib/data-service";
import { useToast } from "@/components/ui/use-toast";

const PrayerTimesPage = () => {
  const [prayerDay, setPrayerDay] = useState<PrayerDay>(getPrayerTimesForDate());
  const [adhánSound, setAdhánSound] = useState<string>("makkah");
  const [autoSilent, setAutoSilent] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const { toast } = useToast();

  // Get the prayer times for today
  useEffect(() => {
    const today = new Date();
    setPrayerDay(getPrayerTimesForDate(today));
  }, []);

  // Simulate nearby masjid notification
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      toast({
        title: "Nearby Masjid Alert",
        description: "You are within 1 mile of the masjid. Asr prayer in 10 minutes.",
        duration: 5000,
      });
    }, 15000); // Show after 15 seconds for demo purposes
    
    return () => clearTimeout(timeoutId);
  }, [toast]);

  // Toggle settings panel
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="space-y-6 pb-8">
      <section className="text-center pt-4 pb-2">
        <h1 className="text-3xl font-bold mb-2">Prayer Times</h1>
        <p className="text-muted-foreground">
          {format(prayerDay.date, "MMMM d, yyyy")}
        </p>
        <p className="text-sm font-medium text-primary">{prayerDay.hijriDate}</p>
      </section>
      
      <section className="space-y-4">
        {/* Prayer Times Table */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-2 text-sm font-medium mb-2 px-2">
              <div>Prayer</div>
              <div>Adhan</div>
              <div>Iqama</div>
            </div>
            
            <div className="space-y-3">
              {Object.values(prayerDay.prayers).map((prayer) => (
                <PrayerTimeRow key={prayer.name} prayer={prayer} />
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Settings Section */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-sm"
            onClick={toggleSettings}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
        
        {showSettings && (
          <Card>
            <CardContent className="p-4 space-y-4">
              {/* Adhan Sound Selection */}
              <div className="space-y-2">
                <Label htmlFor="adhan-sound">Adhan Sound</Label>
                <Select value={adhánSound} onValueChange={setAdhánSound}>
                  <SelectTrigger id="adhan-sound">
                    <SelectValue placeholder="Select Adhan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="makkah">Makkah</SelectItem>
                    <SelectItem value="madinah">Madinah</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Auto Silent Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-silent" className="text-base">Auto Silent in Masjid</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically silence your phone when in the masjid
                  </p>
                </div>
                <Switch
                  id="auto-silent"
                  checked={autoSilent}
                  onCheckedChange={setAutoSilent}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
};

const PrayerTimeRow = ({ prayer }: { prayer: Prayer }) => {
  // Check if this prayer is the next one
  const isNext = () => {
    const now = new Date();
    return prayer.time > now && 
      !Object.values(getPrayerTimesForDate().prayers)
        .filter(p => p.name !== prayer.name)
        .some(p => p.time > now && p.time < prayer.time);
  };
  
  return (
    <div className={`grid grid-cols-3 gap-2 p-2 rounded ${isNext() ? 'prayer-active' : ''}`}>
      <div className="font-semibold">{prayer.name}</div>
      <div>{prayer.adhan}</div>
      <div>{prayer.iqama}</div>
    </div>
  );
};

export default PrayerTimesPage;
