import { SearchIcon } from 'lucide-react';
type ProductSearchProps = {
  setSearch: (value: string) => void;
};

export default function ProductSearch({ setSearch }: ProductSearchProps) {
  return (
    <div className="flex w-full items-center justify-center gap-2 px-6 pt-25 pb-28">
      <SearchIcon size={50} />
      <input
        type="text"
        className="w-7/12 rounded-xl border-3 border-primary bg-primary/10 px-3 py-3 text-2xl text-white placeholder-white/80 focus:outline-none"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
