import FormInput, { formInputProps } from '@/components/formInput';

export default function AdminFormData({
  name,
  register,
  error,
  placeholder,
  variant,
}: formInputProps) {
  return (
    <div className="grid grid-cols-[minmax(160px,auto)_minmax(460px,1fr)] gap-2">
      <label className="text-xl font-bold" htmlFor={name}>
        {name.toUpperCase()}
      </label>
      <FormInput
        name={name}
        placeholder={placeholder}
        register={register}
        error={error}
        variant={variant}
      />
    </div>
  );
}
