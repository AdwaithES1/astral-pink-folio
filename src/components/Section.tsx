
import { ReactNode, forwardRef } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, title, children }, ref) => (
    <section id={id} ref={ref} className="section-card">
      {/* Use improved heading gradient and shine overlay */}
      <h2 className="super-gradient-heading text-3xl font-extrabold mb-4">{title}</h2>
      <div className="text-zinc-100">{children}</div>
    </section>
  )
);

export default Section;
