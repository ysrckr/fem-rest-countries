import { cn } from "@/utils/classname";

type InputProps = {
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ icon, ...props }: InputProps) => {
  return (
    <div className="flex w-full max-w-md items-center rounded-md border border-gray-300 p-2">
      {icon}
      <input className={cn("ml-2 border-none p-2 outline-none", props.className)} {...props} />
    </div>
  );
};
