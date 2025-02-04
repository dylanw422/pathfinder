import ReactMarkdown from "react-markdown";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose md:prose-base prose-sm max-w-full px-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
