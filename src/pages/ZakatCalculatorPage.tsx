
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ZakatCalculatorPage = () => {
  const [assets, setAssets] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    investments: 0,
    property: 0,
  });
  const [liabilities, setLiabilities] = useState({
    debts: 0,
    expenses: 0,
  });
  const [zakatAmount, setZakatAmount] = useState<number | null>(null);
  
  // Nisab value (simplified for the MVP - in a real app this would be fetched from an API)
  const nisabValue = 5000; // Approximate value in USD
  
  const calculateZakat = () => {
    // Calculate total assets
    const totalAssets = Object.values(assets).reduce((sum, value) => sum + (value || 0), 0);
    
    // Calculate total liabilities
    const totalLiabilities = Object.values(liabilities).reduce((sum, value) => sum + (value || 0), 0);
    
    // Net assets
    const netAssets = totalAssets - totalLiabilities;
    
    // Calculate zakat if above nisab
    if (netAssets >= nisabValue) {
      setZakatAmount(netAssets * 0.025); // 2.5% of net assets
    } else {
      setZakatAmount(0); // No zakat due
    }
  };
  
  const handleInputChange = (category: string, field: string, value: string) => {
    const numValue = value ? parseFloat(value) : 0;
    
    if (category === "assets") {
      setAssets({
        ...assets,
        [field]: numValue,
      });
    } else {
      setLiabilities({
        ...liabilities,
        [field]: numValue,
      });
    }
  };
  
  return (
    <div className="space-y-6 pb-8">
      <section className="flex items-center pt-4 pb-2">
        <Link to="/home" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-1">Zakat Calculator</h1>
          <p className="text-muted-foreground">Calculate your annual Zakat</p>
        </div>
      </section>
      
      <Card>
        <CardHeader>
          <CardTitle>Assets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cash">Cash & Bank Balances</Label>
            <Input
              id="cash"
              type="number"
              placeholder="0.00"
              value={assets.cash || ""}
              onChange={(e) => handleInputChange("assets", "cash", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gold">Gold Value</Label>
            <Input
              id="gold"
              type="number"
              placeholder="0.00"
              value={assets.gold || ""}
              onChange={(e) => handleInputChange("assets", "gold", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="silver">Silver Value</Label>
            <Input
              id="silver"
              type="number"
              placeholder="0.00"
              value={assets.silver || ""}
              onChange={(e) => handleInputChange("assets", "silver", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="investments">Investments</Label>
            <Input
              id="investments"
              type="number"
              placeholder="0.00"
              value={assets.investments || ""}
              onChange={(e) => handleInputChange("assets", "investments", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="property">Property for Trade</Label>
            <Input
              id="property"
              type="number"
              placeholder="0.00"
              value={assets.property || ""}
              onChange={(e) => handleInputChange("assets", "property", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Liabilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="debts">Debts</Label>
            <Input
              id="debts"
              type="number"
              placeholder="0.00"
              value={liabilities.debts || ""}
              onChange={(e) => handleInputChange("liabilities", "debts", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expenses">Due Expenses</Label>
            <Input
              id="expenses"
              type="number"
              placeholder="0.00"
              value={liabilities.expenses || ""}
              onChange={(e) => handleInputChange("liabilities", "expenses", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Button className="w-full" onClick={calculateZakat}>
        Calculate Zakat
      </Button>
      
      {zakatAmount !== null && (
        <Card className="bg-primary/10">
          <CardContent className="p-4 text-center">
            <h2 className="text-lg font-semibold mb-2">Your Zakat Amount</h2>
            <p className="text-3xl font-bold text-primary">${zakatAmount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {zakatAmount > 0 
                ? "Your wealth is above the nisab threshold." 
                : "Your wealth is below the nisab threshold."}
            </p>
            
            {zakatAmount > 0 && (
              <Button className="mt-4">Donate Zakat Now</Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZakatCalculatorPage;
