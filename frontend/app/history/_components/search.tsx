'use client';
import Button from '@/components/button';
import fetchHistory, { PurchaseItem } from '../_actions/fetchHistory';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type SearchProps = {
  setDeliveryDate: (deliveryDate: string) => void;
  setProducts: (products: PurchaseItem[] | null) => void;
};

export default function Search({ setDeliveryDate, setProducts }: SearchProps) {
  const {
    handleSubmit,
    setError,
    register,
    clearErrors,
    formState: { errors },
  } = useForm();
  // On Form Submit
  async function onSuccess() {
    clearErrors('historyId');
    // Fetch user input ID
    console.log(await fetchHistory('bbd0d7f3-da96-4b82-acf7-f9540cc65727'));
    const results = await fetchHistory('bbd0d7f3-da96-4b82-acf7-f9540cc65727');
    // On fail fetchHistory
    if (!results) {
      setDeliveryDate('');
      setProducts(null);
      setError('historyId', { type: 'value', message: 'Invalid Id' });
      return toast.error('Invalid Id');
    }
    // On success
    const { historyData, purchaseData } = results;
    setDeliveryDate(historyData.deliveryDate || 'Unknown');
    setProducts(purchaseData);
  }

  return (
    <form
      className="flex w-full items-center justify-center gap-2 pt-25 md:px-6"
      onSubmit={handleSubmit(onSuccess)}
    >
      <input
        type="text"
        className={`w-11/12 rounded-xl border-3 border-primary bg-primary/10 px-1 py-3 text-2xl text-white placeholder-white/80 focus:outline-none sm:w-7/12 md:px-3 ${errors?.historyId && 'border-red-500'}`}
        placeholder="Order ID"
        {...register('historyId')}
      />
      <Button name="Find" customClass="hover:-translate-y-0.5!" />
    </form>
  );
}
