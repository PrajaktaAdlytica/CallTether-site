import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found">
      <Eyebrow>404 / Outside this route</Eyebrow>
      <h1>Let’s find a clearer path.</h1>
      <p>The page you’re looking for isn’t here.</p>
      <Button href="/">Return home</Button>
    </section>
  );
}
