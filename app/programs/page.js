import UnderConstructionPage from '../under-construction/page';

export default function ProgramsPage() {
  return <UnderConstructionPage />;
}

// ── Real Programs page — commented out while this page is being reworked ──
// Uncomment this block and delete the stub above to restore it.
//
// import styles from './page.module.css';
//
// const PROGRAMS = [
//     {
//     id: 'projects',
//     title: 'Projects',
//     blurb:
//       'Join our semester long workshop to enhance your coding skills through a hands on project and expert guidance from our ACM leaders. Perfect for students eager to advance their practical programming abilities while adding to their resume.',
//   },
//   {
//     id: 'prodev workshops',
//     title: 'Pro Dev Workshops',
//     blurb:
//       'Our Professional Development Workshops are designed to equip you with essential skills for career growth, networking, and personal advancement in the tech industry.',
//   },
// ];
//
// export default function ProgramsPage() {
//   return (
//     <main>
//       <div className="Content flex flex-col">
//         <div>
//           <h1 className={styles.heading}>Programs</h1>
//           <p className={styles.subheading}>
//             Ways to grow your skills and career through ACM.
//           </p>
//         </div>
//
//         {PROGRAMS.map(({ id, title, blurb }) => (
//           <section key={id} id={id} className={styles.section}>
//             <h2 className={styles.sectionTitle}>{title}</h2>
//             <p className={styles.sectionBlurb}>{blurb}</p>
//           </section>
//         ))}
//       </div>
//     </main>
//   );
// }
