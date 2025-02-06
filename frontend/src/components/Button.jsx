import { cn } from "../lib/utils";

const Button = ({ children, className, ...props }) => {

  return <button className={cn("px-7 py-3",className)} {...props}>{children}</button>;
};

export default Button;
