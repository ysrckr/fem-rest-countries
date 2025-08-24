import { cn } from "@/utils/classname";

type SelectProps = {} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({ children, ...props }: SelectProps) => {
  return (
    <div className="flex items-center">
      <select className={cn("rounded-md border border-gray-300 p-2", props.className)} {...props}>
        {children}
      </select>
    </div>
  );
};
