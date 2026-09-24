import { SearchIcon } from 'lucide-react';

export default function Search() {
  return (
    <div className="flex items-center gap-2 px-6">
      <SearchIcon size={29} />
      <input
        type="text"
        className="rounded-xl border-2 border-primary bg-primary/10 px-2 py-0.5 text-white placeholder-white/80 focus:outline-none"
        placeholder="Search"
      />
    </div>
  );
}
