import Head from "next/head";

type SeoHeadProps = {
  title: string;
  description: string;
};

export default function SeoHead({ title, description }: SeoHeadProps) {
  const fullTitle = `${title} | TLMOTO`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
