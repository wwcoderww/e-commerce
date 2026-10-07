'use client';
import { loginWithEmail } from '@/lib/actions/useAuth';
import { InputFieldType } from '@/types/auth';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function useLogin() {
  const [loading, setLoading] = useState<boolean>(true);

  async function onLogin(data: InputFieldType) {
    const response = await loginWithEmail(data.email, data.password);
    try {
      if (response.success === true) {
        toast.success('Logged in');
        redirect('/');
      } else {
        toast.error(`${response?.error?.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error! Check console');
    } finally {
      setLoading(false);
    }
  }

  return { loading, onLogin };
}
