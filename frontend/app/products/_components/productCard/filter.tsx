import useOutsideClick from '@/hooks/useOutsideClick';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import { filterBy } from '../../_hooks/useFilterLinks';
type FilterProps = {
  setFilterBy: (value: filterBy) => void;
};

const itemStyle = 'px-2 hover:cursor-pointer hover:text-zinc-300';

export default function Filter({ setFilterBy }: FilterProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modelRef = useOutsideClick(() => setIsOpen(!open));

  function handleFilter(value: filterBy) {
    setFilterBy(value);
    setIsOpen(false);
  }

  return (
    <div className="relative z-2 w-20" ref={modelRef}>
      <ListFilter
        size={50}
        className="mx-auto shrink-0 transition duration-300 ease-in-out hover:-translate-y-0.5 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute mt-2 divide-y divide-zinc-400 rounded-xl border border-primary/50 bg-zinc-800 p-1 text-center text-white">
          <div className={itemStyle} onClick={() => handleFilter('nameaz')}>
            NameAZ
          </div>
          <div className={itemStyle} onClick={() => handleFilter('nameza')}>
            NameZA
          </div>
          <div className={itemStyle} onClick={() => handleFilter('price+')}>
            Price+
          </div>
          <div className={itemStyle} onClick={() => handleFilter('price-')}>
            Price-
          </div>
          <div className={itemStyle} onClick={() => handleFilter('catagory')}>
            Catagory
          </div>
        </div>
      )}
    </div>
  );
}
