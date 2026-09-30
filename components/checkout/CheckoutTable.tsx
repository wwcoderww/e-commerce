import { cartTotal } from '@/state/slices/cartSlice';
import { cartItemType } from '@/types/cartItemType';
import currency from '@/utils/currency';
import { useSelector } from 'react-redux';

type checkoutTableProps = {
  cart: cartItemType[];
};

export default function CheckoutTable({ cart }: checkoutTableProps) {
  const total = useSelector(cartTotal());

  return (
    <div className="my-24 border-t-2 border-b-2 border-dashed pt-12 pb-12">
      <table className="mx-auto px-4 text-2xl">
        <thead className="block pb-4">
          <tr>
            <th className="w-20">quantity</th>
            <th className="w-140">name</th>
            <th className="w-40 text-end">price</th>
            <th className="w-80 text-end">price * quantity</th>
          </tr>
        </thead>
        <tbody className="block divide-y-2">
          {cart.map((item) => (
            <tr className="flex py-3" key={item.id}>
              <td className="w-20">x{item.quantity}</td>
              <td className="w-140">{item.title}</td>
              <td className="w-40 text-end">{currency(item.price)}</td>
              <td className="w-80 text-end">
                {currency(item.quantity * item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end pt-12 text-4xl">
        Total: {currency(total)}
      </div>
    </div>
  );
}
