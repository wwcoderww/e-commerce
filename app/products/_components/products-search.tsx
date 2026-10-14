import { SearchIcon } from 'lucide-react';
type ProductSearchProps = {
  setSearch: (value: string) => void;
};

export default function ProductSearch({ setSearch }: ProductSearchProps) {
  return (
    <div className="flex w-full items-center justify-center gap-2 pt-25 pb-28 md:px-6">
      <SearchIcon size={50} className="shrink-0" />
      <input
        type="text"
        className="w-11/12 rounded-xl border-3 border-primary bg-primary/10 px-1 py-3 text-2xl text-white placeholder-white/80 focus:outline-none sm:w-7/12 md:px-3"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
