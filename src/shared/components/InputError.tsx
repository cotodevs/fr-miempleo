import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

/**
 *
 * @param children
 * @param className
 * @constructor
 */
const InputError: FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  return (
    <span className={twMerge("text-xs text-red-500", className)}>
      {children}
    </span>
  );
};
export default InputError;
