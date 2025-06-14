
import React, { type ReactNode } from "react";
import usePopInOnVisible from "@/hooks/usePopInOnVisible";

/**
 * Wrap any element with this component to have pop-in effect as it scrolls into view.
 */
const PopInOnView = ({
  as: Tag = "div",
  className = "",
  children,
  thresholdClass = "animate-fast-pop-in",
  ...props
}: {
  as?: keyof JSX.IntrinsicElements,
  className?: string,
  children: ReactNode,
  thresholdClass?: string
} & React.HTMLAttributes<HTMLElement>) => {
  const ref = usePopInOnVisible("show-fast-pop-in");
  return (
    <Tag
      ref={ref as any}
      className={`${thresholdClass} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default PopInOnView;
