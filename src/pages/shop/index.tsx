import MyDefaultPage from "@/src/components/DefaultPage";
import SeoHead from "@/src/components/layout/SeoHead";

export default function Shop() {
  return (
    <>
      <SeoHead title={`Shop`} description={`Discover the TLMOTO shop!`} />
      <MyDefaultPage>
        <div className="relative w-[100vw] h-[100vh] flex justify-center items-center">
          <h1 className="text-white text-[10vw] md:text-[7vw] xl:text-[5vw] leading-tight font-bold text-center">
            COMING SOON...
          </h1>
        </div>
      </MyDefaultPage>
    </>
  );
}
