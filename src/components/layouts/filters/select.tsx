import { HiChevronDown } from "react-icons/hi";
import { cn } from "@/utils/classname";
import { useState } from "react";

type SelectProps<T> = {
  className?: string;
  elements: Array<{ value: T; label: string }>;
  value?: T;
  placeholder?: string;
  onChange: (value: T) => void;
};

export const Select = <T,>({ elements, ...props }: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative dark:text-white">
      <button className="z-50 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className={cn("relative w-60 p-0", props.className)}>
          <HiChevronDown
            className={cn(
              "absolute top-0 right-0 z-30 h-6 w-6 -translate-x-1/4 translate-y-1/3 transition-transform duration-300",
              {
                "rotate-180": isOpen,
              }
            )}
          />

          <div className="absolute right-0 left-0 m-0 mx-auto h-10 w-60 rounded-md shadow-md dark:bg-dark-element">
            <p className="mt-2 flex items-center px-2">
              {props?.value ? (
                <span>{elements.find((el) => el.value === props.value)?.label}</span>
              ) : (
                <span className="text-gray-500">{props.placeholder}</span>
              )}
            </p>
            <ul
              className={cn("z-30 mt-4 overflow-y-auto shadow-md dark:bg-dark-element dark:text-white", {
                hidden: !isOpen,
              })}
            >
              {elements?.length > 0 ? (
                elements.map((element) => (
                  <li
                    key={element.label}
                    className={cn("w-full cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-dark-bg", {
                      ["bg-gray-100 dark:bg-dark-bg"]: element.value === props.value,
                      ["dark:text-bg-transparent cursor-default text-gray-400 hover:bg-transparent"]:
                        element.value === "",
                    })}
                  >
                    <button
                      className="w-full cursor-pointer text-left"
                      type="button"
                      onClick={() => {
                        if (element.value === props.value) {
                          return;
                        }
                        props.onChange(element.value);
                        setIsOpen(false);
                      }}
                    >
                      {element.label}
                    </button>
                  </li>
                ))
              ) : (
                <li>No options available</li>
              )}
            </ul>
          </div>
        </div>
      </button>
    </div>
  );
};
