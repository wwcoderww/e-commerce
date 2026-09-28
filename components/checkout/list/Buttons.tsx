import BtnAdd from '@/components/BtnAdd';
import BtnDel from '@/components/BtnDel';
import BtnTrash from '@/components/BtnTrash';
import { cartItemType } from '@/types/cartItemType';

type listProps = {
  item: cartItemType;
};

export default function Buttons({ item }: listProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-2">
      <BtnAdd item={item} />
      <div className="px-1 font-mono text-2xl font-bold">{item.quantity}</div>
      <BtnDel item={item} />
      <BtnTrash item={item} size={24} />
    </div>
  );
}
