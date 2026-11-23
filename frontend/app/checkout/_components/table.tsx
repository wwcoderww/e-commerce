import { cartTotal } from '@/state/slices/cartSlice';
import currency from '@/utils/currency';
import { useSelector } from 'react-redux';

type ItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type checkoutTableProps = {
  items: ItemType[];
};

export default function CheckoutTable({ items }: checkoutTableProps) {
  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  return (
    <div className="mx-auto max-w-280 border-t-2 border-b-2 border-dashed pt-12 pb-12">
      <table className="w-full table-fixed px-4 text-base sm:text-2xl">
        <thead className="">
          <tr>
            <th className="hidden w-25 sm:table-cell">Quantity</th>
            <th className="w-12 sm:hidden"></th>
            <th className="">Name</th>
            <th className="hidden text-center sm:table-cell">Price</th>
            <th className="w-25 text-center">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y-2">
          {items.map((item) => (
            <tr className="" key={item.id} aria-label="product-item-table">
              <td className="py-3">x{item.quantity}</td>
              <td className="py-3 text-center wrap-break-word">{item.name}</td>
              <td className="hidden py-3 text-center sm:table-cell">
                {currency(item.price)}
              </td>
              <td className="w-25 py-3 text-center">
                {currency(item.quantity * item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="flex justify-center pt-12 text-3xl sm:justify-end sm:text-4xl"
        aria-label="checkout-total"
      >
        Cart Total: {currency(total)}
      </div>
    </div>
  );
}
