'use client';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const inputStyle =
  'rounded-xl bg-gray-300 px-2 py-1 text-lg text-black focus:outline-none';

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
    console.log(data);
    toast.success('Sent!');
    setValue('title', '');
    setValue('message', '');
  }

  function onError(errors: FieldErrors<formData>) {
    console.log(errors);
    const allErrors = Object.values(errors).map((item) => item.message);
    allErrors.forEach((errorMsg) => toast.error(errorMsg));
  }

  return (
    <form
      className="flex w-1/2 flex-col gap-4 px-4"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <title className="pb-5 text-center text-5xl font-extrabold">
        Contact Form
      </title>
      <input
        type="text"
        placeholder="Name"
        className={`${inputStyle}`}
        {...register('name')}
      />
      <input
        type="text"
        placeholder="Email"
        className={`${inputStyle} ${errors.email && 'border-3 border-solid border-red-700 bg-red-200'}`}
        {...register('email', { required: 'Email is required' })}
      />
      <input
        type="text"
        placeholder="Title"
        className={`${inputStyle}`}
        {...register('title')}
      />
      <textarea
        placeholder="Message..."
        className={`h-[8lh] rounded-xl bg-gray-300 px-2 py-1.5 text-lg text-black focus:outline-none ${errors.message && 'border-3 border-solid border-red-700 bg-red-200'}`}
        {...register('message', { required: 'Message is required' })}
      />
      <button className="mx-auto rounded-2xl border-4 border-solid border-primary bg-primary/10 px-4 py-1 text-2xl font-bold transition duration-200 ease-in-out hover:-translate-y-0.5 hover:cursor-pointer">
        submit
      </button>
    </form>
  );
}
