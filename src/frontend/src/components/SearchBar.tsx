import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  initialValue?: string;
  onSearch?: (term: string) => void;
}

export function SearchBar({
  className,
  placeholder = "Search products...",
  initialValue = "",
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value;
    setValue(term);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (onSearch) {
      debounceRef.current = setTimeout(() => {
        onSearch(term);
      }, 400);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const trimmed = value.trim();
    if (trimmed) {
      navigate({
        to: "/products",
        search: {
          search: trimmed,
          category: undefined,
          orderby: undefined,
          page: undefined,
        },
      });
    }
    if (onSearch) onSearch(trimmed);
  }

  function handleClear() {
    setValue("");
    if (onSearch) onSearch("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex items-center", className)}
    >
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <input
        data-ocid="searchbar.search_input"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-full border border-input bg-muted/50 pl-9 pr-8 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </form>
  );
}
