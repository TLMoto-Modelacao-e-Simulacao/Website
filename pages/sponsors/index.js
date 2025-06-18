import MySponsorsBox from '@/components/sponsors/SponsorsBox';
import MyMajorSponsorSection from '@/components/sponsors/MajorSponsorSection';
import defaultPage from '@/styles/DefaultPage.module.scss';

export default function Sponsors() {
  return (
    <div className={defaultPage.container}>
      <div className={defaultPage.background}></div>
      <MyMajorSponsorSection />
      {['diamond', 'gold', 'silver', 'bronze', 'copper', 'partners'].map(type => (
        <MySponsorsBox key={type} type={type} />
      ))}
    </div>
  );
}
