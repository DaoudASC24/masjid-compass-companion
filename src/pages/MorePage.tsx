
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, MessageSquare, Mail, PiggyBank, Search, Calculator, MessageCircle, Building } from "lucide-react";

const MORE_ITEMS = [
  {
    title: "Notifications",
    description: "Customize notification preferences",
    link: "/notifications",
    icon: Bell,
  },
  {
    title: "Ask Imam",
    description: "Submit your questions to our Imam",
    link: "/ask-imam",
    icon: MessageSquare,
  },
  {
    title: "Announcements",
    description: "View latest masjid announcements",
    link: "/announcements",
    icon: Mail,
  },
  {
    title: "Donate",
    description: "Support our masjid",
    link: "/donate",
    icon: PiggyBank,
  },
  {
    title: "Lost & Found",
    description: "Check for items lost or found in the masjid",
    link: "/lost-found",
    icon: Search,
  },
  {
    title: "Zakat Calculator",
    description: "Calculate your Zakat obligation",
    link: "/zakat-calculator",
    icon: Calculator,
  },
  {
    title: "Feedback Form",
    description: "Share your suggestions with the masjid administration",
    link: "/feedback",
    icon: MessageCircle,
  },
  {
    title: "Masjid Directory",
    description: "Find Muslim businesses and services in the community",
    link: "/directory",
    icon: Building,
  },
];

const MorePage = () => {
  return (
    <div className="space-y-6 pb-8">
      <section className="text-center pt-4 pb-2">
        <h1 className="text-3xl font-bold mb-2">More</h1>
        <p className="text-muted-foreground">Additional Services and Information</p>
      </section>
      
      <section className="space-y-4">
        {MORE_ITEMS.map((item) => (
          <Link key={item.title} to={item.link}>
            <Card className="hover:bg-accent/10 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-primary" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
      
      <section className="pt-4">
        <Card>
          <CardContent className="p-4 text-center">
            <h2 className="text-lg font-semibold mb-2">About Smart Masjid</h2>
            <p className="text-sm text-muted-foreground">
              Version 1.0.0 | Built with ❤️ for the Ummah
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default MorePage;
