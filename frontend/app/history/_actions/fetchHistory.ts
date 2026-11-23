import formatDate from '../_lib/formatDate';

export type HistoryItem = {
  id: string;
  userId: string;
  createdAt: string;
  total: number;
  deliveryDate: string;
};

export type PurchaseItem = {
  id: string;
  historyId: string;
  name: string;
  price: number;
  category: string | null;
  quantity: number;
  image: string | null;
  userId: string | null;
  createdAt: string;
};

export type HistoryResponse = {
  historyData: HistoryItem;
  purchaseData: PurchaseItem[];
};

export default async function fetchHistory(
  id: string,
): Promise<HistoryResponse | null> {
  try {
    if (!id) return null;
    // Fetch
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/history/${id}`,
    );
    // Guard check
    if (!res.ok) return null;
    // Deconstruct fetch data
    const {
      data: { historyData, purchaseData },
    } = await res.json();
    // Return on success
    return {
      historyData: {
        ...historyData,
        deliveryDate: formatDate(historyData.createdAt, 7),
      },
      purchaseData,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
