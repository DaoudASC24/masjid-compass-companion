
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getDirectoryItems, DirectoryItem } from "@/lib/data-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const directoryItems = useMemo(() => getDirectoryItems(), []);
  
  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    directoryItems.forEach(item => uniqueCategories.add(item.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, [directoryItems]);
  
  // Filter directory items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return directoryItems;
    
    const term = searchTerm.toLowerCase();
    return directoryItems.filter(item => 
      item.name.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.address.toLowerCase().includes(term)
    );
  }, [directoryItems, searchTerm]);
  
  // Filter items by category
  const getItemsByCategory = (category: string) => {
    if (category === "All") return filteredItems;
    return filteredItems.filter(item => item.category === category);
  };
  
  return (
    <div className="space-y-6 pb-8">
      <section className="flex items-center pt-4 pb-2">
        <Link to="/more" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-1">Masjid Directory</h1>
          <p className="text-muted-foreground">Local Muslim businesses and services</p>
        </div>
      </section>
      
      <div className="space-y-4">
        <Input
          placeholder="Search directory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Tabs defaultValue="All">
          <TabsList className="w-full h-auto flex overflow-x-auto pb-2">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="flex-shrink-0"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="space-y-4 mt-4">
                {getItemsByCategory(category).length > 0 ? (
                  getItemsByCategory(category).map((item) => (
                    <DirectoryItemCard key={item.id} item={item} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No listings found
                  </p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

const DirectoryItemCard = ({ item }: { item: DirectoryItem }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <div className="text-sm text-primary font-medium mt-1">{item.category}</div>
        <div className="mt-2">
          <p className="text-sm">{item.address}</p>
          <p className="text-sm font-medium mt-1">{item.phone}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DirectoryPage;
