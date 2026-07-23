import Image from 'next/image';
import Typewriter from '../components/ui/typewriter';
import Carousel from '../components/layout/Carousel';
import JoinUs from '../components/layout/Join_us';
import Contact from '../components/layout/Contact';
import { getCarouselImages } from '../lib/gallery';

const FALLBACK_IMAGES = ["/images/group.jpg"];

// Carousel pulls live from Firebase Storage + Firestore, so this must render
// per-request rather than be cached at build time.
export const dynamic = 'force-dynamic';


const CARDS = [
  {
    title: 'Projects',
    desc: 'semester long workshop to enhance your coding skills through a hands on project and expert guidance from our ACM leaders.',
    image: 'projects.png',
  },
  {
    title: 'Project Development',
    desc: 'Our Professional Development Workshops are designed to equip you with essential skills for career growth, networking, and personal advancement in the tech industry.',
    image: 'prodev.png',
  },
  {
    title: 'Hackathons',
    desc: 'Build real projects in fast paced team environments, tackle ambitious challenges, and ship something in 24–48 hours.',
    image: 'hackathon.png',
  },
  {
    title: 'Movie & Game Nights',
    desc: 'Unwind with the community through casual socials, gaming sessions, and movie nights designed to bring everyone together.',
    image: 'game.png',
  },
  {
    title: 'Collaboration',
    desc: 'WWork and volunteer with other clubs on campus to build a more connected and collaborative community.',
    image: 'collaboration.png',
  },
  {
    title: 'Leadership',
    desc: 'Join the board and help shape the direction of our club while developing real world leadership experience.',
    image: 'leadership.png',
  },
];

const VIDEOS = [
  {
    title: 'ACM Fall 2026',
    src: 'https://www.youtube.com/embed/LVGuZwSivsU?si=qB_NAzSuZ2ElW1j7',
  },
  {
    title: 'ACM Fall 2026 Projects',
    src: 'https://www.youtube.com/embed/3T5pvRSK7dA?si=aNSw3OUa3S-jLvgb',
  },
];

export default async function Home() {
  const carouselImages = await getCarouselImages();
  const images = carouselImages.length > 0 ? carouselImages : FALLBACK_IMAGES;

  return (
    <main>
      {/* ── Hero ── */}
      <div className='Hero flex flex-row items-center justify-center gap-8' style={{ height: 'calc(100vh - 84px)' }}>
        <div className='hero-left'>
          <Image className='hero-logo-light' src='/acm_blacklogo.png' alt='ACM Logo' width={320} height={320} />
          <Image className='hero-logo-dark' src='/acmlogo1.png' alt='ACM Logo' width={320} height={320} />
        </div>
        <div className='hero-right text-5xl font-bold'>
          .creates('<Typewriter words={["workers", "designers", "builders", "teams"]} />')
        </div>
      </div>

      {/* ── Content ── */}
      <div className='Content flex flex-col'>

        {/* About section */}
        <section className='about-section'>
          <div className='about-text'>
            <h2>Who we are</h2>
            <p>
              We are a chapter of Association for Computing Machinery at 
              California State University, Los Angeles. 
              We bring students with a common passion and devotion into the 
              field of computing.
            </p>
            <p>
              Our community is built on collaboration, curiosity, and the belief that the
              best engineers are lifelong learners. We host events to help you
              grow technically and professionally.
            </p>
          </div>
          <div className='about-image'>
            <Image src='/images/computer-icon.png' alt='Computer icon' width={340} height={340} />
          </div>
        </section>

        {/* What we do cards */}
        <section className='what-we-do'>
          <h2>What we do</h2>
          <div className='cards-grid'>
            {CARDS.map((card) => (
              <div key={card.title} className='card'>
                <Image src={`/images/${card.image}`} alt={card.title} width={48} height={48} />
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>

          <div className='videos-grid'>
            {VIDEOS.map((video) => (
              <div key={video.title} className='video-item'>
                <h3>{video.title}</h3>
                <div className='video-wrapper'>
                  <iframe
                    src={video.src}
                    title={video.title}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <section className='gallery'>
        <Carousel images={images} />
      </section>

      <section className='join' style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Falling lines fill the background */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-around', pointerEvents: 'none', zIndex: 0 }}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        {/* Card sits on top */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <JoinUs />
        </div>
      </section>
      <Contact />



        {/* <!--
        <a href="https://www.flaticon.com/free-icons/web-development" title="web development icons">Web development icons created by surang - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/code" title="code icons">Code icons created by Freepik - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/gaming" title="gaming icons">Gaming icons created by Freepik - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/leadership" title="leadership icons">Leadership icons created by Flat Icons - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/hackathon" title="hackathon icons">Hackathon icons created by Flat Icons - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/linkedin" title="linkedin icons">Linkedin icons created by riajulislam - Flaticon</a>



    --> */}

    </main>
  );
}
