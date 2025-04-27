
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLostFoundItems } from "@/lib/data-service";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LostFoundPage = () => {
  const items = useMemo(() => getLostFoundItems(), []);
  
  return (
    <div className="space-y-6 pb-8">
      <section className="flex items-center pt-4 pb-2">
        <Link to="/home" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-1">Lost & Found</h1>
          <p className="text-muted-foreground">Items found at the masjid</p>
        </div>
      </section>
      
      <section className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Found on {item.date}</p>
                  <p className="text-sm mt-1">
                    Found by: {item.foundBy} • Location: {item.location}
                  </p>
                </div>
                <Badge variant={item.status === "found" ? "default" : "secondary"}>
                  {item.status === "found" ? "Available" : "Claimed"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
      
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Lost Something?</h2>
          <p className="text-sm text-muted-foreground">
            If you've lost an item that isn't listed here, please visit the masjid office during operating hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LostFoundPage;
