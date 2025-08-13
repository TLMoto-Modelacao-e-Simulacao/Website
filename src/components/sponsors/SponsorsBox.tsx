//import styles from '../../styles/sponsor/SponsorsBox.module.scss';
import { sponsorInformation } from '../textContent/SponsorsSectionTexts';
import Image from 'next/image';

// Define the allowed sponsor types
type SponsorType = 'diamond' | 'gold' | 'silver' | 'bronze' | 'copper' | 'partners';

// Define the props interface
interface MySponsorsBoxProps {
  type: SponsorType;
}
// Map each sponsor type to Tailwind class strings
const sponsorTypeStyles: Record<SponsorType, string> = {
  diamond: 'bg-[#43a5be]/70',
  gold: 'bg-[#ffb13c]/70',
  silver: 'bg-[#a3a3a3]/70',
  bronze: 'bg-[#8a1b1b]/70',
  copper: 'bg-[#b87333]/70',
  partners: 'bg-[#2150a0]/70',
}

export default function MySponsorsBox({ type }: MySponsorsBoxProps) {
  const sponsors = sponsorInformation[type] || [];
  const sectionTitle = type.charAt(0).toUpperCase() + type.slice(1) + ' Sponsors';

  return (
    <section className={` p-5 rounded-[10px] shadow-[10px_-10px_20px_rgba(0,0,0,0.2)] text-center lg:my-[10vh] my-[5vh] mx-[10vw] ${sponsorTypeStyles[type]}`}>
      <h2 className=" font-bold uppercase text-white tracking-[0.5vw] inline-block pb-[10px] lg:text-3xl text-2xl">{sectionTitle}</h2>
      <div className="flex flex-wrap justify-center gap-5 mb-5">
        {sponsors.map((sponsor, index) => (
          <a className="w-[27vh] h-[12vh] flex items-center justify-center bg-white rounded-md shadow-md transition-colors duration-300 hover:bg-[#b4b4b4]" key={index} href={sponsor.link} target="_blank" rel="noopener noreferrer">
            <Image
              className="w-full h-full object-contain rounded-md p-2"
              src={sponsor.logo}
              alt={`Sponsor ${sponsor.name}`}
              width={160}
              height={90}
              style={{ objectFit: 'contain' }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}
