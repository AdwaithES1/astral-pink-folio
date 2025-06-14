import { ReactNode, forwardRef } from "react";
import PopInOnView from "./PopInOnView";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, title, children }, ref) => (
    <section id={id} ref={ref} className="section-card">
      {/* Section titles: still dramatic */}
      <PopInOnView as="h2" className="bebas-gradient-heading text-4xl sm:text-5xl font-bold mb-4" thresholdClass="animate-fast-pop-in">
        {title}
      </PopInOnView>
      <div className="text-zinc-100">
        {/* Children decide their pop in: usually soft unless overridden */}
        {children}
      </div>
    </section>
  )
);

export default Section;
