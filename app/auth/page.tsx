'use client';
import FormInput from '@/components/FormInput';
import { productType } from '@/types/productType';
import { useForm } from 'react-hook-form';

export default function page() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<productType>();

  async function onSucess(data: productType) {
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSucess)}>
        <FormInput
          name="name"
          error={errors?.name}
          register={register}
          placeholder="name"
        />
        <FormInput
          name="price"
          error={errors?.price}
          register={register}
          placeholder="price"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
