export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "React Summit US 2025",
    slug: "react-summit-us-2025",
    location: "San Francisco, CA, USA",
    date: "2025-11-07",
    time: "09:00 AM",
  },
  {
    image: "/images/event2.png",
    title: "KubeCon + CloudNativeCon Europe 2026",
    slug: "kubecon-cloudnativecon-eu-2026",
    location: "Vienna, Austria",
    date: "2026-03-18",
    time: "10:00 AM",
  },
  {
    image: "/images/event3.png",
    title: "Next.js Global Summit 2026",
    slug: "nextjs-global-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "2026-04-12",
    time: "09:30 AM",
  },
  {
    image: "/images/event4.png",
    title: "JSConf Asia 2026",
    slug: "jsconf-asia-2026",
    location: "Singapore",
    date: "2026-05-08",
    time: "10:00 AM",
  },
  {
    image: "/images/event5.png",
    title: "Google I/O 2026",
    slug: "google-io-2026",
    location: "Mountain View, CA, USA",
    date: "2026-05-20",
    time: "09:00 AM",
  },
  {
    image: "/images/event6.png",
    title: "Frontend Masters Conference 2026",
    slug: "frontend-masters-conf-2026",
    location: "New York, NY, USA",
    date: "2026-06-15",
    time: "11:00 AM",
  },
  {
    image: "/images/event-full.png",
    title: "React Europe 2026",
    slug: "react-europe-2026",
    location: "Paris, France",
    date: "2026-07-02",
    time: "09:45 AM",
  },
];
