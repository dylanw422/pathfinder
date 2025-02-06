import { User } from "@supabase/supabase-js";

export interface DBUser {
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
  hotelImage?: string;
  review: TripDetails | undefined;
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

export interface AIChatProps {
  thread: Thread;
  messages: Message[];
  user: User | null | undefined;
  isLoading: boolean;
  submit: (messages: string[]) => void;
  object: TripDetails | undefined;
}

export interface ProgressBarProps {
  progress: number;
}
