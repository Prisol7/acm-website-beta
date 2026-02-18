import Image from 'next/image';
import Typewriter from '../components/ui/typewriter';
export default function Home() {
  return (
    <main>
      <div className='Hero flex flex-row items-center justify-center gap-8' style={{ height: 'calc(100vh - 84px)' }}>
        <div className='hero-left'>
          <Image src='/acmlogo1.png' alt='ACM Logo' width={320} height={320} />
        </div>

        <div className='hero-right text-5xl font-bold'>
          .creates('<Typewriter words={["workers", "designers", "builders", "teams"]} />')
        </div>
      </div>
    </main>
  );
}
