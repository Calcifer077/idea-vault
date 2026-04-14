import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchIdeas() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search ideas or tags…"
        className="w-full pl-9 pr-3 py-2 text-sm bg-secondary/50 rounded-lg outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground"
      />
    </>
  );
}
