'use client';
import BtnAdd from '@/components/BtnAdd';
import BtnDel from '@/components/BtnDel';
import { listCart } from '@/state/slices/cartSlice';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

export default function page() {
  const cart = useSelector(listCart());
  return (
    <div className="m-auto flex max-w-7/12 flex-col divide-y-3 rounded-md border-4 bg-gray-600">
      {cart?.map((item) => (
        <div key={item.id} className="flex capitalize">
          <div className="p-2">
            <div className="relative h-40 w-40">
              <Image src={item.image} alt="Item Image" fill />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-l-2 px-6">
            <BtnAdd item={item} />
            <div>{item.quantity}</div>
            <BtnDel item={item} />
            <Trash size={25} />
          </div>
          <div className="">
            <div className="mx-auto line-clamp-1 max-w-160 border-b-2 py-2 text-center text-3xl font-bold">
              {item.title}
            </div>
            <div className="flex py-1 text-2xl">
              <div className="pr-2 text-xl font-light">{item.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
