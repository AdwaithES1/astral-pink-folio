
import { ReactNode, forwardRef } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, title, children }, ref) => (
    <section id={id} ref={ref} className="section-card">
      {/* Always readable, Bebas Neue bold, white-pink with shine gradient INSIDE text */}
      <h2 className="bebas-gradient-heading text-4xl sm:text-5xl font-bold mb-4">
        {title}
      </h2>
      <div className="text-zinc-100">{children}</div>
    </section>
  )
);

export default Section;
