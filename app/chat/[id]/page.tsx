import { ChatInterface } from "@/components/chat-interface";

export default async function ThreadChat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <ChatInterface id={id} />;
}
