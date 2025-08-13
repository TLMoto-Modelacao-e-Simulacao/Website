//import styles from '../../styles/sponsor/MajorSponsorSection.module.scss';
import { headlineText, secHeadlineText } from '../textContent/SponsorsSectionTexts';

export default function MajorSponsorSection() {
  return (
    <div className="text-center mb-[2.5%] w-[80vw] mt-[10%] mx-[10vw]">
      <p className="text-[2.2rem] w-full mx-auto mb-[30px] text-white tracking-[0.1vh]">{headlineText}</p>
      <p className="text-[1.8rem] w-full mx-auto mb-[30px] text-white tracking-[0.1vh]">{secHeadlineText}</p>
    </div>
  );
}

// <div className={styles.container}>
//     {headlineText}
//     <section className={styles.majorSponsor}>
//         <div className={styles.logoContainer}>
//             <img src="/images/sponsors/smart_energy.png" alt="Major Sponsor Logo" />
//         </div>
//         <div className={styles.logoText}>
//             <p>
//                 Thank you, <strong>SmartEnergy</strong>, for your unwavering support and generosity.
//                 Your partnership plays a pivotal role in driving our vision forward, empowering us to
//                 reach new heights and positively impact our community. We are deeply grateful for your
//                 commitment and shared passion for innovation and growth. Together, we will continue to
//                 create meaningful change. Your contribution is truly invaluable, and we look forward
//                 to achieving even greater success together!
//             </p>
//         </div>
//     </section>
// </div>
