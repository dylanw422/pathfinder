export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface NewThread {
  userId: string;
  location: string;
  content: ThreadContent[];
}

export interface Thread {
  id: string;
  userId: string;
  location: string;
  process: string;
  survey_answers?: JSON | undefined;
  created_at: string;
  content?: JSON[];
}

export interface ThreadContent {
  role: string;
  content: string | null;
}

export interface Message {
  role: string;
  content: string;
}

export interface TripDetails {
  location?: string;
  hotel_name?: string;
  from_airport?: string;
  to_airport?: string;
  dates?: {
    from?: string;
    to?: string;
  };
  guests?: number;
}
