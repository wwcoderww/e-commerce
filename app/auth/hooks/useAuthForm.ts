import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';
import { useCreate } from './useCreate';
import { toast } from 'sonner';
import { useState } from 'react';

type inputFieldType = {
  email: string;
  password: string;
  verifyPassword: string;
};

export function useAuthForm() {
  const [newAccount, setNewAccount] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<inputFieldType>();

  const { onLogin } = useLogin();
  const { onCreate } = useCreate();
  // Success functions
  function onSuccess(data: inputFieldType) {
    if (newAccount) {
      onCreate(data, setError);
    } else {
      onLogin(data, setError);
    }
  }
  // Form: Error function
  function onError(freshErrors: typeof errors) {
    console.log(errors);
    Object.values(freshErrors).forEach((item) => {
      if (item?.message) {
        toast.error(item.message);
      }
    });
  }

  return {
    newAccount,
    setNewAccount,
    register,
    errors,
    handleSubmit,
    onSuccess,
    onError,
    clearErrors,
  };
}
