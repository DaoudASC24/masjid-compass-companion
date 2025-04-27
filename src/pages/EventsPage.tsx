
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";
import { getEvents, EventItem } from "@/lib/data-service";

const EventsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const events = useMemo(() => getEvents(), []);
  
  // Filter events for the selected date
  const filteredEvents = useMemo(() => {
    if (!date) return events;
    return events.filter(event => isSameDay(event.date, date));
  }, [events, date]);
  
  // Get days with events for the calendar
  const daysWithEvents = useMemo(() => {
    return events.map(event => event.date);
  }, [events]);
  
  return (
    <div className="space-y-6 pb-8">
      <section className="text-center pt-4 pb-2">
        <h1 className="text-3xl font-bold mb-2">Events</h1>
        <p className="text-muted-foreground">Masjid Calendar and Events</p>
      </section>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{ event: daysWithEvents }}
            modifiersStyles={{
              event: { fontWeight: 'bold', textDecoration: 'underline' }
            }}
            components={{
              DayContent: (props) => (
                <div 
                  className={
                    daysWithEvents.some(eventDate => 
                      isSameDay(eventDate, props.date)
                    ) ? 'font-bold text-primary' : ''
                  }
                >
                  {props.date.getDate()}
                </div>
              ),
            }}
          />
        </CardContent>
      </Card>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">
          {date ? `Events for ${format(date, "MMMM d, yyyy")}` : "Upcoming Events"}
        </h2>
        
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No events scheduled for this date
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

const EventCard = ({ event }: { event: EventItem }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-muted-foreground">
              {format(event.date, "MMMM d, yyyy")} at {event.time}
            </p>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            <CalendarIcon className="inline-block h-3 w-3 mr-1" />
            {format(event.date, "EEE")}
          </div>
        </div>
        <p className="mt-2 text-sm">{event.description}</p>
      </CardContent>
    </Card>
  );
};

export default EventsPage;
