import HomeView from '@/views/HomeView';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between px-[10px] pt-[30px]'>
      <HomeView />
    </main>
  );
}
