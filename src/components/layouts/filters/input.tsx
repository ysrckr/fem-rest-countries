import { cn } from "@/utils/classname";

type InputProps = {
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ icon, ...props }: InputProps) => {
  return (
    <div className="flex w-full max-w-md items-center rounded-md border border-gray-300 dark:border-dark-element dark:bg-dark-element dark:text-white">
      <span className="ml-2">{icon}</span>
      <input
        className={cn("ml-2 border-none p-2 outline-none dark:placeholder:text-white", props.className)}
        {...props}
      />
    </div>
  );
};
