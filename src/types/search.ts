import type { Product } from "@/types/product";
import type { RefObject } from "react";

export interface CategoryOption {
  id: string;
  name: string;
  icon: string;
}

export interface SearchContext {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedIndex: number;
  history: string[];
  addToHistory: (term: string) => void;
  removeFromHistory: (e: React.MouseEvent, term: string) => void;
  clearHistory: () => void;
  isListening: boolean;
  results: Product[] | undefined;
  isLoading: boolean;
  categorySuggestions: CategoryOption[];
  popularSearches: string[];
  inputRef: RefObject<HTMLInputElement | null>;
  handleSubmit: (e: React.FormEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  startVoiceSearch: () => void;
}
