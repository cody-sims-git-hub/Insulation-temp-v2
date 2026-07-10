// Renders one or more JSON-LD structured-data blocks into the document. Server
// component — the script tags land in the initial HTML for crawlers.
//
// Data is always our own authored schema (site config + FAQ copy), never user
// input. We still escape `<` to `<` so a stray `</script>` in any string can
// never break out of the script element (defense in depth against JSON-LD XSS).
function serialize(block: object): string {
  return JSON.stringify(block).replace(/</g, "\\u003c")
}

export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data]
  return (
    <>
      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(block) }} />
      ))}
    </>
  )
}
