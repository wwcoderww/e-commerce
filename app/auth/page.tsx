import FormInput from '@/components/FormInput';
import { productType } from '@/types/productType';
import { useForm } from 'react-hook-form';

export default function page() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<productType>();

  function onSucess(data: productType) {
    console.log(data);
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
      </form>
    </div>
  );
}
