import { useEffect, useId, useMemo, useRef, useState } from "react";

import { HiChevronDown } from "react-icons/hi";
import { cn } from "@/utils/classname";

type Option<T extends string | number> = { value: T; label: string; disabled?: boolean };

type SelectProps<T extends string | number> = {
  className?: string;
  elements: Array<Option<T>>;
  value?: T;
  placeholder?: string;
  onChange: (value: T) => void;
  disabled?: boolean;
};

export const Select = <T extends string | number>({
  elements,
  className,
  placeholder = "Select...",
  value,
  onChange,
  disabled,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const selectedIndex = useMemo(() => elements.findIndex((el) => el.value === value), [elements, value]);
  const selectedLabel = selectedIndex >= 0 ? elements[selectedIndex]?.label : undefined;

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ensure a highlighted option when opened
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      // Focus the listbox for better keyboard nav
      requestAnimationFrame(() => {
        listRef.current?.focus();
        // Scroll highlighted into view
        const item = listRef.current?.querySelector(`[data-index='${selectedIndex >= 0 ? selectedIndex : 0}']`);
        (item as HTMLElement | null)?.scrollIntoView({ block: "nearest" });
      });
    }
  }, [isOpen, selectedIndex]);

  const close = () => setIsOpen(false);
  const toggle = () => (!disabled ? setIsOpen((v) => !v) : undefined);

  const onSelect = (idx: number) => {
    const opt = elements[idx];
    if (!opt || opt.disabled) return;
    if (opt.value !== value) onChange(opt.value);
    close();
    // return focus to trigger
    buttonRef.current?.focus();
  };

  const onTriggerKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return;
    switch (e.key) {
      case "ArrowDown":
      case "Enter":
      case " ": {
        e.preventDefault();
        setIsOpen(true);
        break;
      }
      default:
        break;
    }
  };

  const onListKeyDown: React.KeyboardEventHandler<HTMLUListElement> = (e) => {
    if (!isOpen) return;
    const max = elements.length - 1;
    const nextEnabled = (from: number, step: 1 | -1) => {
      let i = from;
      while (i >= 0 && i <= max) {
        if (!elements[i]?.disabled) return i;
        i += step;
      }
      return -1;
    };

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const start = highlightedIndex < 0 ? (selectedIndex >= 0 ? selectedIndex : -1) : highlightedIndex;
        const idx = nextEnabled(Math.min(start + 1, max), 1);
        if (idx !== -1) setHighlightedIndex(idx);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const start = highlightedIndex < 0 ? (selectedIndex >= 0 ? selectedIndex : elements.length) : highlightedIndex;
        const idx = nextEnabled(Math.max(start - 1, 0), -1);
        if (idx !== -1) setHighlightedIndex(idx);
        break;
      }
      case "Home":
        e.preventDefault();
        setHighlightedIndex(nextEnabled(0, 1));
        break;
      case "End":
        e.preventDefault();
        setHighlightedIndex(nextEnabled(max, -1));
        break;
      case "Enter":
      case " ": {
        e.preventDefault();
        if (highlightedIndex >= 0) onSelect(highlightedIndex);
        break;
      }
      case "Escape":
        e.preventDefault();
        close();
        buttonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn("relative inline-block dark:text-white", className)}>
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          "flex h-12 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-left shadow-sm transition outline-none dark:border-dark-bg dark:bg-dark-element",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
        disabled={disabled}
      >
        <span className={cn("truncate", !selectedLabel && "text-gray-500")}>{selectedLabel ?? placeholder}</span>
        <HiChevronDown className="shrink-0 text-gray-500" aria-hidden />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-activedescendant={highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className={cn(
            "absolute z-30 mt-2 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 shadow-lg focus:outline-none dark:border-gray-700 dark:bg-dark-element"
          )}
        >
          {elements?.length ? (
            elements.map((element, idx) => {
              const selected = element.value === value;
              const highlighted = idx === highlightedIndex;
              return (
                <li
                  key={`${element.value}`}
                  id={`${listboxId}-option-${idx}`}
                  data-index={idx}
                  role="option"
                  aria-selected={selected}
                  className={cn(
                    "flex w-full items-center px-3 py-2 text-left",
                    element.disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer",
                    highlighted && "bg-gray-100 dark:bg-dark-bg",
                    selected && "font-medium"
                  )}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onMouseDown={(e) => e.preventDefault()} // keep focus on list
                  onClick={() => onSelect(idx)}
                >
                  {element.label}
                </li>
              );
            })
          ) : (
            <li className="px-3 py-2 text-gray-500">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
};
