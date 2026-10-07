'use client';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '@/state/slices/productSlice';
import { productType } from '@/types/productType';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Button from '../Button';
import AdminFormData from './AdminFormData';

type editItemProps = {
  item?: productType | null;
};

export default function EditItem({ item }: editItemProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm<productType>({ values: item || undefined });

  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  async function onSucess(data: productType) {
    console.log(data);
    try {
      if (!item) {
        await createProduct(data).unwrap();
        reset();
      } else {
        await updateProduct(data).unwrap();
      }
      toast.success('Sucess');
    } catch (err: any) {
      console.log(err);
      if (err?.data?.errors) {
        err?.data?.errors.forEach((error: any) => {
          (setError(error.field, {
            type: 'server',
            message: error.message,
          }),
            toast.error(error.message));
        });
      } else {
        toast.error('Database connection error');
        console.log(err);
      }
    }
  }

  async function handleDelete() {
    try {
      if (!item) return;
      await deleteProduct(item.id).unwrap();
      toast.success('Sucess');
    } catch (error) {
      console.log(error);
      toast.error('Error');
    }
  }

  return (
    <div className="flex-1 px-4">
      <form className="mx-auto flex max-w-250 flex-col gap-3">
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
          <Button
            name="Submit"
            customClass="w-40"
            onClick={handleSubmit(onSucess)}
          />
          {item && (
            <Button
              name="Delete"
              customClass="w-40 bg-red-500/60"
              type="button"
              onClick={handleDelete}
            />
          )}
        </div>
      </form>
    </div>
  );
}
