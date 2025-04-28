
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DonatePage = () => {
  return (
    <div className="space-y-6 pb-8">
      <section className="text-center pt-4 pb-2">
        <h1 className="text-3xl font-bold mb-2">Support Our Masjid</h1>
        <p className="text-muted-foreground">Help us maintain and improve our services</p>
      </section>
      
      <Card className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Make a Donation</h2>
        <p className="text-muted-foreground mb-6">Your donations help us serve the community better</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {["$10", "$25", "$50", "$100"].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              className="h-12"
            >
              {amount}
            </Button>
          ))}
        </div>
        <Button className="w-full">Donate Now</Button>
      </Card>
    </div>
  );
};

export default DonatePage;
