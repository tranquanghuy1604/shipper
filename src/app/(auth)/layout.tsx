'use client';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const pathName = usePathname();
  //   const router = useRouter();

  //   useEffect(() => {
  //     const token = localStorage.getItem('authToken-shipper');

  //     if (!token && pathName !== '/login') {
  //       router.push('/login');
  //     } else if (token && pathName === '/login') {
  //       router.push('/');
  //     }
  //   }, [pathName]);
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Toaster position='top-right' />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
