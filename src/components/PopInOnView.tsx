
import React, { type ReactNode, forwardRef } from "react";
import usePopInOnVisible from "@/hooks/usePopInOnVisible";

/**
 * Wrap any element with this component to have pop-in effect as it scrolls into view.
 */
const PopInOnView = forwardRef<HTMLElement, {
  as?: keyof JSX.IntrinsicElements,
  className?: string,
  children: ReactNode,
  thresholdClass?: string
} & React.HTMLAttributes<HTMLElement>>(function PopInOnView(
  {
    as: Tag = "div",
    className = "",
    children,
    thresholdClass = "animate-fast-pop-in",
    ...props
  },
  ref
) {
  // Use inner ref for the intersection observer
  const innerRef = usePopInOnVisible("show-fast-pop-in");
  // If caller provides an outer ref, merge them (optional advanced improvement omitted here)
  return (
    <Tag
      ref={innerRef as any}
      className={`${thresholdClass} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
});

export default PopInOnView;
