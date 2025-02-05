import { Message } from "@/types/types";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { MarkdownContent } from "./ui/markdown-content";

export function Messages({
  index,
  msg,
  user,
}: {
  index: number;
  msg: Message;
  user: User | null | undefined;
}) {
  return (
    <div
      key={index}
      className={`flex items-start space-x-0 mb-4 ${
        msg.role === "user" ? "flex-row-reverse w-full gap-2" : ""
      }`}
    >
      <Avatar className="md:w-10 md:h-10 w-8 h-8">
        <AvatarFallback
          className={`${msg.role === "user" ? "bg-secondary" : "bg-blue-500"}`}
        >
          {msg.role === "user" ? (
            <h1>{user?.user_metadata?.first_name.slice(0, 1)}</h1>
          ) : (
            <em className="font-bold text-white text-xl">P</em>
          )}
        </AvatarFallback>
      </Avatar>
      <div
        className={`p-0 ${
          msg.role === "user"
            ? "py-2 bg-secondary text-primary-foreground rounded-xl"
            : "text-secondary-foreground"
        }`}
      >
        <MarkdownContent content={msg.content} />
      </div>
    </div>
  );
}
