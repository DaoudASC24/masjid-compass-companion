
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const AskImamPage = () => {
  const form = useForm();

  return (
    <div className="space-y-6 pb-8">
      <section className="text-center pt-4 pb-2">
        <h1 className="text-3xl font-bold mb-2">Ask Imam</h1>
        <p className="text-muted-foreground">Submit your questions to our Imam</p>
      </section>
      
      <Card className="p-4">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your question here..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit Question</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AskImamPage;
