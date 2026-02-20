import Image from 'next/image';
import styles from './page.module.css';

export default function BoardPage() {
  return (
    <main>
      <div className='Content flex flex-col'>
      <div className={styles.card}>
        <Image
          src="/images/Fall-2025-Board.jpg"
          alt="Fall 2025 Board"
          width={860}
          height={480}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '100% 30%', display: 'block' }}
        />
      </div>
      <h1 className={styles.heading}>Meet the Board</h1>
      </div>
    </main>
  );
}
