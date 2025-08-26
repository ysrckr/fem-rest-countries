import { cn } from "@/utils/classname";

type InputProps = {
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ icon, ...props }: InputProps) => {
  return (
    <div className="flex h-12 w-full max-w-md items-center rounded-md border border-gray-300 shadow-md dark:border-dark-element dark:bg-dark-element dark:text-white">
      <span className="ml-2 dark:text-gray-500">{icon}</span>
      <input
        className={cn("ml-2 border-none p-2 outline-none dark:placeholder:text-gray-500", props.className)}
        {...props}
      />
    </div>
  );
};
