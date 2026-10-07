'use client';
import { createAccount } from '@/lib/actions/useAuth';
import { InputFieldType } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function useCreate() {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  async function onCreate(data: InputFieldType) {
    if (data.password !== data.verifyPassword)
      return toast.error('Passwords must match');
    const response = await createAccount(data.email, data.password);
    try {
      if (response.success === true) {
        toast.success('Logged in');
        router.push('/');
      } else {
        toast.error(`${response?.error?.message}`);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error! Check console');
    } finally {
      setLoading(false);
    }
  }

  return { loading, onCreate };
}
