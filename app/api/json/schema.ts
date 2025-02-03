import { z } from "zod";

// Regular expression to match MM/DD/YYYY format
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

export const Trip = z.object({
  location: z.string(),
  hotel_name: z.string(),
  from_airport: z.string(),
  to_airport: z.string(),
  dates: z.object({
    from: z.string().regex(dateRegex, {
      message: "Date must be in MM/DD/YYYY format",
    }),
    to: z.string().regex(dateRegex, {
      message: "Date must be in MM/DD/YYYY format",
    }),
  }),
  guests: z.number(),
});
