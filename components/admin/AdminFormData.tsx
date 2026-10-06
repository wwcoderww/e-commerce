import FormInput, { formInputProps } from '../FormInput';

export default function AdminFormData({
  name,
  register,
  error,
  placeholder,
  variant,
}: formInputProps) {
  return (
    <div className="flex gap-2">
      <label className="w-50 text-xl font-bold">{name.toUpperCase()}</label>
      <FormInput
        name={name}
        placeholder={placeholder}
        register={register}
        error={error}
        customClass="w-full"
        variant={variant}
      />
    </div>
  );
}
