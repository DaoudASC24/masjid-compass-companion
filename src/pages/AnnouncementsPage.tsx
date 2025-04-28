
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Special Ramadan Program",
    date: "2025-04-28",
    content: "Join us for our special Ramadan program starting this weekend. Activities include community iftars and special taraweeh prayers.",
  },
  {
    id: 2,
    title: "Facilities Update",
    date: "2025-04-28",
    content: "The women's prayer area renovation has been completed. The new space is now open for use.",
  }
];

const AnnouncementsPage = () => {
  return (
    <div className="space-y-6 pb-8">
      <section className="text-center pt-4 pb-2">
        <h1 className="text-3xl font-bold mb-2">Announcements</h1>
        <p className="text-muted-foreground">Latest updates from the masjid</p>
      </section>
      
      <div className="space-y-4">
        {ANNOUNCEMENTS.map((announcement) => (
          <Card key={announcement.id} className="p-4">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">{announcement.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{announcement.date}</p>
                <p className="text-sm">{announcement.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
