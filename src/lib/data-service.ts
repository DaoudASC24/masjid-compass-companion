
import { format, addDays, subDays } from "date-fns";

export type Prayer = {
  name: string;
  adhan: string;
  iqama: string;
  time: Date;
};

export type PrayerDay = {
  date: Date;
  hijriDate: string;
  prayers: {
    fajr: Prayer;
    sunrise: Prayer;
    dhuhr: Prayer;
    asr: Prayer;
    maghrib: Prayer;
    isha: Prayer;
  };
};

export type EventItem = {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
};

export type LostFoundItem = {
  id: string;
  name: string;
  date: string;
  image: string;
  foundBy: string;
  status: "found" | "claimed";
  location: string;
};

export type DirectoryItem = {
  id: string;
  name: string;
  category: string;
  phone: string;
  address: string;
};

// Helper to create prayer data with fixed offsets between adhan and iqama
const createPrayer = (name: string, hour: number, minute: number, iqamaOffsetMinutes: number): Prayer => {
  const now = new Date();
  const time = new Date(now);
  time.setHours(hour, minute, 0);
  
  const adhan = format(time, "h:mm a");
  
  time.setMinutes(time.getMinutes() + iqamaOffsetMinutes);
  const iqama = format(time, "h:mm a");
  
  return {
    name,
    adhan,
    iqama,
    time: new Date(time),
  };
};

// Generate prayer times for a specific day
export const getPrayerTimesForDate = (date: Date = new Date()): PrayerDay => {
  // In a real app, this would calculate based on location and date
  // For MVP, we use fixed times
  return {
    date: new Date(date),
    hijriDate: getHijriDate(date),
    prayers: {
      fajr: createPrayer("Fajr", 5, 15, 15),
      sunrise: createPrayer("Sunrise", 6, 45, 0),
      dhuhr: createPrayer("Dhuhr", 12, 30, 15),
      asr: createPrayer("Asr", 15, 45, 15),
      maghrib: createPrayer("Maghrib", 19, 15, 10),
      isha: createPrayer("Isha", 20, 45, 15),
    }
  };
};

// Get next prayer based on current time
export const getNextPrayer = (): Prayer => {
  const now = new Date();
  const todayPrayers = Object.values(getPrayerTimesForDate().prayers);
  
  // Find the next prayer
  for (const prayer of todayPrayers) {
    if (prayer.time > now) {
      return prayer;
    }
  }
  
  // If no prayer is found for today, return tomorrow's Fajr
  return getPrayerTimesForDate(addDays(now, 1)).prayers.fajr;
};

// Get a simple Hijri date string
export const getHijriDate = (date: Date = new Date()): string => {
  // In a real app, we would use a proper Hijri date library
  // For MVP, we'll just provide a dummy Hijri date
  const hijriMonths = [
    "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah"
  ];
  
  // Simple algorithm to get a dummy Hijri date (not accurate)
  const day = date.getDate();
  const month = hijriMonths[date.getMonth()];
  const year = 1445; // Current Hijri year as of 2024
  
  return `${day} ${month} ${year}`;
};

// Get dummy masjid capacity data
export const getMasjidCapacity = () => {
  // In a real app, this would come from a backend API
  // For MVP, we randomly generate capacity
  const capacity = 250;
  const current = Math.floor(Math.random() * 250);
  
  let status: "Available" | "Near Full" | "Full" = "Available";
  let statusClass = "capacity-available";
  
  if (current / capacity > 0.9) {
    status = "Full";
    statusClass = "capacity-full";
  } else if (current / capacity > 0.7) {
    status = "Near Full";
    statusClass = "capacity-near-full";
  }
  
  return {
    current,
    capacity,
    status,
    statusClass,
  };
};

// Get events for the current month
export const getEvents = (): EventItem[] => {
  const today = new Date();
  const nextWeek = addDays(today, 7);
  const lastWeek = subDays(today, 7);
  
  return [
    {
      id: "1",
      title: "Community Iftar",
      date: addDays(today, 2),
      time: "6:45 PM",
      description: "Join us for a community iftar. Food will be provided by the masjid."
    },
    {
      id: "2",
      title: "Taraweeh: 8 Juz Tonight",
      date: today,
      time: "8:30 PM",
      description: "Tonight's Taraweeh will cover 8 juz. Special guest Qari from Egypt."
    },
    {
      id: "3",
      title: "Youth Lecture",
      date: addDays(today, 5),
      time: "7:00 PM",
      description: "Special lecture for youth about challenges in modern times."
    },
    {
      id: "4",
      title: "Sisters Circle",
      date: addDays(today, 3),
      time: "11:00 AM",
      description: "Weekly gathering for sisters to discuss Islamic topics."
    },
    {
      id: "5",
      title: "Quran Competition",
      date: addDays(today, 10),
      time: "2:00 PM",
      description: "Annual Quran competition for children and adults."
    },
    {
      id: "6",
      title: "Board Meeting",
      date: lastWeek,
      time: "7:30 PM",
      description: "Monthly board meeting to discuss masjid operations."
    }
  ];
};

// Get lost and found items
export const getLostFoundItems = (): LostFoundItem[] => {
  return [
    {
      id: "1",
      name: "Black Prayer Mat",
      date: "April 15, 2025",
      image: "",
      foundBy: "Imam Ahmed",
      status: "found",
      location: "Men's Prayer Hall"
    },
    {
      id: "2",
      name: "Car Keys (Honda)",
      date: "April 14, 2025",
      image: "",
      foundBy: "Brother Khalid",
      status: "found",
      location: "Parking Lot"
    },
    {
      id: "3",
      name: "Blue Children's Shoes",
      date: "April 10, 2025",
      image: "",
      foundBy: "Sister Aisha",
      status: "claimed",
      location: "Women's Area"
    },
    {
      id: "4",
      name: "iPhone Charger",
      date: "April 8, 2025",
      image: "",
      foundBy: "Brother Umar",
      status: "found",
      location: "Conference Room"
    }
  ];
};

// Get directory items
export const getDirectoryItems = (): DirectoryItem[] => {
  return [
    {
      id: "1",
      name: "Halal Butcher Shop",
      category: "Food",
      phone: "(123) 456-7890",
      address: "123 Main St, Anytown, USA"
    },
    {
      id: "2",
      name: "Islamic Bookstore",
      category: "Education",
      phone: "(123) 456-7891",
      address: "456 Elm St, Anytown, USA"
    },
    {
      id: "3",
      name: "Muslim Family Counseling",
      category: "Services",
      phone: "(123) 456-7892",
      address: "789 Oak St, Anytown, USA"
    },
    {
      id: "4",
      name: "Barakah Cafe",
      category: "Food",
      phone: "(123) 456-7893",
      address: "101 Pine St, Anytown, USA"
    },
    {
      id: "5",
      name: "Islamic School",
      category: "Education",
      phone: "(123) 456-7894",
      address: "202 Maple St, Anytown, USA"
    }
  ];
};
