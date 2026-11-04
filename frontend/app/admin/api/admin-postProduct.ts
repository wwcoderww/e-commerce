import { productType } from '@/types/productType';

export async function postProduct(data: productType) {
  try {
    console.log('Trying...');
    const response = await fetch(
      'https://e-commerce-backend-wnhs.onrender.com/api/products',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );
    const data2 = await response.json();
    console.log(data2);
  } catch (error) {
    console.log('Error');
    console.error(error);
  }
}
