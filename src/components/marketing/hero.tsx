import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MarathonHero() {
  return (
    <section className="text-center sm:text-left space-y-6 pb-4">
      <p className="text-sm font-medium text-runner-green">Marathon & long distance</p>
      <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        Know your VDOT.
        <br />
        <span className="text-muted">Run with a plan.</span>
      </h1>
      <p className="text-lg text-muted max-w-md mx-auto sm:mx-0 leading-relaxed">
        One past race tells you how fast you can go at every distance — then pace bands and training tools
        fall into place.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start pt-2">
        <Button asChild size="lg">
          <Link href="/vdot">Calculate VDOT</Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link href="/race-day">Race day tools</Link>
        </Button>
      </div>
    </section>
  );
}
