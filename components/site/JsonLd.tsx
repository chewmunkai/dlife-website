/**
 * Renders a JSON-LD graph. Null-safe, so a caller can pass a builder's result
 * straight through without checking whether it produced anything.
 */
export default function JsonLd({ data }: { data: unknown }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
