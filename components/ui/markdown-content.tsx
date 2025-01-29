import ReactMarkdown from "react-markdown";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-md max-w-full px-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
