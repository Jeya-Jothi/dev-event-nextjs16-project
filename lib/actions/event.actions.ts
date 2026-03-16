"use server";

import Event from "@/database/event.model";
import connectDB from "../mongodb";

export const getSimilarEventBySlug = async (slug: string) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug }).lean();
    if (!event) return [];
    const events = await Event.find({
      _id: { $ne: event._id },
      tags: { $ne: event.tags },
    }).lean();
    return JSON.parse(JSON.stringify(events));
  } catch (e) {
    return [];
  }
};
