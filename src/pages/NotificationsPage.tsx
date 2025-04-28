
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

const NotificationsPage = () => {
  return (
    <div className="space-y-6 pb-8">
      <section className="text-center pt-4 pb-2">
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">Customize your notification preferences</p>
      </section>
      
      <div className="space-y-4">
        {[
          { title: "Adhan Notifications", description: "Get notified at prayer times" },
          { title: "Proximity Alerts", description: "Notifications when near masjid" },
          { title: "Event Reminders", description: "Get reminded about upcoming events" },
          { title: "Announcements", description: "Receive important announcements" },
        ].map((item) => (
          <Card key={item.title} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Switch />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
