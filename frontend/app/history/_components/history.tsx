'use client';
import { authClient } from '@/lib/auth/auth-client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import fetchHistory, {
  HistoryItem,
  HistoryResponse,
  PurchaseItem,
} from '../_actions/fetchHistory';
import formatDate from '../_lib/formatDate';

type HistoryProps = {
  setProducts: Dispatch<SetStateAction<PurchaseItem[] | null>>;
  setDeliveryDate: (deliveryDate: string) => void;
};

export default function History({
  setProducts,
  setDeliveryDate,
}: HistoryProps) {
  const [pastHistory, setPastHistory] = useState<HistoryItem[] | null>(null);
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/history/user/${userId}`,
        );
        if (!response.ok) return;
        setPastHistory((await response.json()).data.toReversed());
      } catch (error) {
        console.error(error);
        return;
      }
    };
    fetchHistory();
  }, [userId]);

  async function handleClick(id: string) {
    const data = await fetchHistory(id);
    if (!data) return;
    const { historyData, purchaseData } = data;
    setProducts(purchaseData);
    setDeliveryDate(historyData.deliveryDate || 'Unknown');
  }

  return (
    <div className="flex flex-col">
      <h1 className="mx-auto py-12 text-4xl font-semibold">Past History</h1>
      {pastHistory && (
        <>
          {pastHistory.map((historyItem) => (
            <div key={historyItem.id} className="flex flex-col">
              <button
                className="mx-auto text-xl hover:cursor-pointer hover:opacity-80"
                onClick={() => handleClick(historyItem.id)}
              >
                {formatDate(historyItem.createdAt, 0)}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
