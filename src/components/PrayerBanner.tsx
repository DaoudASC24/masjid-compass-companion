
import { Clock } from "lucide-react";
import { Card } from "./ui/card";
import { getPrayerTimesForDate } from "@/lib/data-service";

const PrayerBanner = () => {
  const { prayers } = getPrayerTimesForDate();
  
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 p-2 min-w-max">
        {Object.entries(prayers).map(([name, prayer]) => (
          <Card key={name} className="flex flex-col items-center p-3 w-24">
            <Clock className="h-5 w-5 mb-1 text-primary" />
            <span className="text-sm font-semibold">{name}</span>
            <span className="text-xs text-muted-foreground">{prayer.adhan}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrayerBanner;
