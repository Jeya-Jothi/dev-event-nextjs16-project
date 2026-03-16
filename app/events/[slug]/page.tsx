import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { getSimilarEventBySlug } from "@/lib/actions/event.actions";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex gap-2 items-center">
    <img src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex gap-2 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

/** Handles both storage formats: JSON-encoded string in first element, or plain string array */
function parseArrayField(value: string[]): string[] {
  if (!value || value.length === 0) return [];
  try {
    const parsed = JSON.parse(value[0]);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return value;
}

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  "use cache";
  cacheLife("hours");
  const { slug } = await params;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event } = await response.json();

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    venue,
    tags,
    audience,
    organizer,
  } = event;

  if (!description) return notFound(); // Auto redirects to 404 page if event not found

  const bookings = 10;

  const similarEvents: IEvent[] = await getSimilarEventBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>
      <div className="details">
        {/* Left side - Event details */}
        <div className="content">
          <img
            src={image}
            alt="Event banner"
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={parseArrayField(agenda)} />

          <section className="flex-col gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={parseArrayField(tags)} />
        </div>
        {/* Right side - Booking form */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookEvent eventId={event._id} slug={slug} />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => (
              <EventCard key={similarEvent.title} {...similarEvent} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
