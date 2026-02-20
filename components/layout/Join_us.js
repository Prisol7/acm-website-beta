import Image from 'next/image';
import styles from './Join_us.module.css';
import Button from '../ui/Button';

export default function JoinUs() {
  return (
    <div className={styles.card}>
      <Image
        src="/logo-circle.png"
        alt="ACM Logo"
        width={100}
        height={100}
        className={styles.logo}
      />

      <h2 className={styles.title}>Become a Binary</h2>

      <p className={styles.desc}>
        Join ACM at Cal State LA and plug into a community that builds, learns,
        and grows together. Get access to exclusive workshops,
        networking events, and hands-on projects — plus mentorship from students
        and professionals who&apos;ve been in your shoes.
        Learn the latest tech. Learn to build a game on Godot or make a discord bot.
      </p>

      <Button>Join</Button>
    </div>
  );
}
