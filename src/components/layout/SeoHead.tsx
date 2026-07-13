import Head from "next/head";

type SeoHeadProps = {
  title: string;
  description: string;
};

export default function SeoHead({ title, description }: SeoHeadProps) {
  return (
    <Head>
      <title>{title} | TLMOTO</title>
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
