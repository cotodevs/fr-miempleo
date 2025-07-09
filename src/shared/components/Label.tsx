import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

type LabelProps = React.ComponentPropsWithRef<"label">;

const Label: FC<LabelProps> = ({ children, className, ...props }) => {
  return (
    <label {...props} className={twMerge("text-xs uppercase", className)}>
      {children}
    </label>
  );
};

export default Label;
