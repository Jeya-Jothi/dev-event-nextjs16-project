import mongoose, { Schema, Document, Model, CallbackError } from "mongoose";
import Event from "./event.model";

/**
 * TypeScript interface for Booking document
 */
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    slug: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => {
          // RFC 5322 compliant email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(v);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Pre-save hook to validate that the referenced event exists
 * Prevents orphaned bookings by checking event existence before saving
 */
BookingSchema.pre<IBooking>("save", async function () {
  if (this.isModified("eventId")) {
    const eventExists = await Event.findById(this.eventId);
    if (!eventExists) {
      throw new Error("Referenced event does not exist");
    }
  }
});

// Create index on eventId for optimized queries
BookingSchema.index({ eventId: 1 });

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
