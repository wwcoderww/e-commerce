'use client';
import { productType } from '@/types/productType';
import { useForm } from 'react-hook-form';
import AdminFormData from './AdminFormData';
import Button from '../Button';

type editItemProps = {
  item?: productType | null;
};

export default function EditItem({ item }: editItemProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<productType>({ values: item || undefined });

  function onSucess(data: productType) {
    console.log(data);
  }

  return (
    <div className="flex-1 px-4">
      <form
        className="mx-auto flex max-w-250 flex-col gap-3"
        onSubmit={handleSubmit(onSucess)}
      >
        <AdminFormData
          name="name"
          register={register}
          error={errors?.name}
          placeholder={item?.name}
        />
        <AdminFormData
          name="price"
          register={register}
          error={errors?.price}
          placeholder={item?.price.toString()}
        />
        <AdminFormData
          name="image"
          register={register}
          error={errors?.image}
          placeholder={item?.image}
        />
        <AdminFormData
          name="category"
          register={register}
          error={errors?.category}
          placeholder={item?.category}
        />
        <AdminFormData
          name="rating"
          register={register}
          error={errors?.rating}
          placeholder={item?.rating?.toString()}
        />
        <AdminFormData
          name="ratingCount"
          register={register}
          error={errors?.ratingCount}
          placeholder={item?.ratingCount?.toString()}
        />
        <AdminFormData
          name="description"
          register={register}
          error={errors?.description}
          placeholder={item?.description}
          variant="textarea"
        />
        <div className="mx-auto my-10 flex gap-40">
          <Button name="Submit" customClass="w-40" />
          <Button name="Delete" customClass="w-40 bg-red-500/60" />
        </div>
      </form>
    </div>
  );
}
