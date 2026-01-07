interface HtmlContentProps {
  html: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function HtmlContent({ html, className = '', as: Component = 'span' }: HtmlContentProps) {
  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
