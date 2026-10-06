// Every workshop/webinar is always shown as starting tomorrow at 8:00 PM IST,
// recomputed on each page load, so the countdowns never run out.
const IST_OFFSET_MS = 330 * 60 * 1000;
export const EVENT_TIMEZONE = "Asia/Kolkata";

export function nextEventDate(hourIST = 20) {
  const istNow = new Date(Date.now() + IST_OFFSET_MS); // UTC fields now read as IST
  const start = Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth(), istNow.getUTCDate() + 1, hourIST);
  return new Date(start - IST_OFFSET_MS);
}

// Shared display formats, always in IST.
export const formatEventDate = (d) =>
  d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: EVENT_TIMEZONE });
export const formatEventDateTime = (d) =>
  d.toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: EVENT_TIMEZONE }) + " IST";
export const EVENT_TIME_LABEL = "8 PM – 10 PM IST";

export const AGENT_AI_WORKSHOP_DATETIME = nextEventDate();
export const ROBOTICS_WORKSHOP_DATETIME = nextEventDate();
export const USA_WEBINAR_DATETIME = nextEventDate();
export const COMPETITIVE_EXAM_WEBINAR_DATETIME = nextEventDate();
export const ENGLISH_SPEAKING_WORKSHOP_DATETIME = nextEventDate();
export const WEBINAR_DATETIME = nextEventDate();
