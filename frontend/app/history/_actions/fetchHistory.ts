export type HistoryItem = {
  id: string;
  userId: string;
  createdAt: string;
  deliveryDate: string;
  total: number;
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
      data: {
        historyData: [historyData],
        purchaseData,
      },
    } = await res.json();
    // Transform historyData.createdAt to real string for History
    const date = new Date(historyData.createdAt);
    date.setUTCDate(date.getUTCDate() + 7);
    const formatted = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
    // Return on success
    return {
      historyData: { ...historyData, deliveryDate: formatted },
      purchaseData,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
