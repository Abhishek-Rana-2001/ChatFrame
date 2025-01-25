import { cn } from "../lib/utils";

const Button = ({ children, className,variant ="default", ...props }) => {

    const variants = {
        default : "bg-interact rounded-md w-max text-black shadow-md py-2 px-4",
        secondary:"bg-neutral-100 rounded-md w-max text-emerald-500 shadow-md py-2 px-4"
    }
  return <button className={cn(variants[variant],className)} {...props}>{children}</button>;
};

export default Button;
