import { Montserrat } from 'next/font/google';
import "../globals.css";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';


const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: "Cal State LA",
  description: "ACM at Cal State LA — a student chapter of the Association for Computing Machinery bringing together students who share a passion for computing through workshops, hackathons, and community.",
  icons: {
    icon: "/acmlogo1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
