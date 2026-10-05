import { postProduct } from '@/app/admin/api/postProduct';
import { productType } from '@/types/productType';
import { useForm } from 'react-hook-form';
import FormInput from '../FormInput';

export default function CreateItem() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<productType>();

  async function onSucess(data: productType) {
    await postProduct(data);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSucess)}
        className="flex flex-col items-start gap-2"
      >
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
