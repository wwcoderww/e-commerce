'use client';
import { postAuthEmail } from '@/lib/auth/actions/useAuth';
import { InputFieldType } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function useCreate() {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  async function onCreate(data: InputFieldType, setError: any) {
    if (data.password !== data.verifyPassword)
      return toast.error('Passwords must match');
    try {
      const response = await postAuthEmail(data.email, data.password);
      // On Success
      if (response.success === true) {
        toast.success('Logged in');
        router.push('/');
        return;
      }
      // If email is already in use
      if (response.error.message === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL') {
        toast.error('Email taken');
        setError('email', { type: 'manual', message: 'Email in use' });
        return;
      }
      // Errors Below
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error('Error! Check console');
    } finally {
      setLoading(false);
    }
  }

  return { loading, onCreate };
}
