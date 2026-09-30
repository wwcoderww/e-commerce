'use client';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import FormInput from '../FormInput';
import FormButton from './form/FormButton';

type formData = {
  name: string;
  email: string;
  title: string;
  message: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formData>();

  function onSubmit(data: formData) {
    toast.success('Sent!');
    setValue('title', '');
    setValue('message', '');
  }

  function onError(errors: FieldErrors<formData>) {
    const allErrors = Object.values(errors).map((item) => item.message);
    allErrors.forEach((errorMsg) => toast.error(errorMsg));
  }

  return (
    <form
      className="flex w-1/2 flex-col gap-4 px-4"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="pb-5 text-center text-5xl font-extrabold">
        Contact Form
      </div>
      <FormInput
        placeholder="Name"
        error={errors?.name}
        name="name"
        register={register}
      />
      <FormInput
        placeholder="Email"
        name="email"
        error={errors?.email}
        register={register}
        validation={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid E-mail Format',
          },
        }}
      />
      <FormInput
        placeholder="Title"
        error={errors?.title}
        name="title"
        register={register}
      />
      <FormInput
        placeholder="Message..."
        error={errors?.message}
        name="message"
        variant="textarea"
        register={register}
        validation={{ required: 'Message is required' }}
      />
      <FormButton />
    </form>
  );
}
