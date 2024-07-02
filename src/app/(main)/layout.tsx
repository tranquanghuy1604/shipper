'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { usePathname, useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          onError: (error: unknown) => {
            const axiosError = error as AxiosError;
          },
        },
        mutations: {
          onError: (error: unknown) => {
            const axiosError = error as AxiosError;
          },
        },
      },
    });

    return client;
  });

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken-shipper');

    if (!token && pathName !== '/login') {
      router.push('/login');
    } else if (token && pathName === '/login') {
      router.push('/');
    }
  }, [pathName]);
  return (
    <html lang='en'>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <Toaster position='top-right' />
          <div className='text-[#000]'>{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
