import { SearchIcon } from 'lucide-react';

export default function Search() {
  return (
    <div className="flex items-center gap-2">
      <SearchIcon size={29} />
      <input
        type="text"
        className="rounded-xl border-2 border-primary bg-transparent px-2 py-1 text-white focus:outline-none"
        placeholder="Search"
      />
    </div>
  );
}
