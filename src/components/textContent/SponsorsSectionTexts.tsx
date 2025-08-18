import { link } from "fs";

export const headlineText = "We want to thank all our sponsors for their invaluable support.";

export const secHeadlineText =
  "Your generosity and commitment to our vision are truly appreciated.";

export const sponsorInformation = {
  diamond: [
    { name: "Galp", link: "https://galp.com/pt/", logo: "/images/sponsors/diamond/galp.webp" },
  ],
  gold: [
    {
      name: "Berner",
      link: "https://shop.berner.eu/pt-pt/",
      logo: "/images/sponsors/gold/berner.webp",
    },
    { name: "MCG", link: "https://www.mcg.pt/", logo: "/images/sponsors/gold/mcg.webp" },
    { name: "RE/MAX", link: "https://www.remax.pt/", logo: "/images/sponsors/gold/remax.webp" },
    {
      name: "Técnico",
      link: "https://tecnico.ulisboa.pt/",
      logo: "/images/sponsors/gold/tecnico.webp",
    },
    { name: "TAP", link: "https://www.flytap.com/pt-pt/", logo: "/images/sponsors/gold/tap.webp" },
    { name: "Batemo", link: "https://www.batemo.com/", logo: "/images/sponsors/gold/batemo.webp" },
    { name: "Altair", link: "https://www.altair.com/", logo: "/images/sponsors/gold/altair.webp" },
    {
      name: "Althima",
      link: "https://althima.com/#home",
      logo: "/images/sponsors/gold/althima.webp",
    },
    {
      name: "Santander",
      link: "https://www.santander.pt/",
      logo: "/images/sponsors/gold/santander.webp",
    },
    {
      name: "Einhell",
      link: "https://www.einhell.pt/",
      logo: "/images/sponsors/gold/einhell.webp",
    },
    {
      name: "Optimal",
      link: "https://www.optimal.pt/",
      logo: "/images/sponsors/gold/optimal.webp",
    },
  ],
  silver: [
    { name: "Rat Rig", link: "https://ratrig.com/", logo: "/images/sponsors/silver/ratrig.webp" },
    {
      name: "Lacovale",
      link: "https://www.lacovale.com",
      logo: "/images/sponsors/silver/lacovale.webp",
    },
    {
      name: "Thyssenkrupp",
      link: "https://www.thyssenkrupp.com/en/home",
      logo: "/images/sponsors/silver/thyssenkrupp.webp",
    },
    { name: "Mouser", link: "https://pt.mouser.com/", logo: "/images/sponsors/silver/mouser.webp" },
    {
      name: "Coficab",
      link: "https://www.coficab.com",
      logo: "/images/sponsors/silver/coficab.webp",
    },
    {
      name: "Multimoto",
      link: "https://multimoto.pt/",
      logo: "/images/sponsors/silver/multimoto.webp",
    },
    {
      name: "DEM IST",
      link: "https://dem.tecnico.ulisboa.pt/",
      logo: "/images/sponsors/silver/dem.webp",
    },
    { name: "Caixa", link: "https://www.cgd.pt/", logo: "/images/sponsors/silver/caixa.webp" },
    { name: "FMP", link: "https://www.fmp.pt", logo: "/images/sponsors/silver/fmp.webp" },
  ],
  bronze: [
    {
      name: "FIGplásticos",
      link: "https://figplasticos.pt/",
      logo: "/images/sponsors/bronze/fig_plasticos.webp",
    },
    { name: "RMC", link: "https://www.rmc.com", logo: "/images/sponsors/bronze/rmc.webp" },
    { name: "Fhorex", link: "https://fhorex.pt/pt/", logo: "/images/sponsors/bronze/fhorex.webp" },
    { name: "JDEUS", link: "https://www.jdeus.com/", logo: "/images/sponsors/bronze/jdeus.webp" },
    {
      name: "AGRacing",
      link: "https://agracing.pt/",
      logo: "/images/sponsors/bronze/agracing.webp",
    },
    {
      name: "HELUKABEL",
      link: "https://www.helukabel.pt/pt-pt/Home/",
      logo: "/images/sponsors/bronze/helukabel.webp",
    },
    {
      name: "Cubotonic",
      link: "https://www.cubotonic.pt/",
      logo: "/images/sponsors/bronze/cubotonic.webp",
    },
    {
      name: "WavEC",
      link: "https://www.wavec.org/",
      logo: "/images/sponsors/bronze/wavec.webp",
    },
  ],
  copper: [
    {
      name: "JLCPCB",
      link: "https://jlcpcb.com/",
      logo: "/images/sponsors/copper/jlcpcb.webp",
    },
    {
      name: "VI-grade",
      link: "https://www.vi-grade.com/",
      logo: "/images/sponsors/copper/vigrade.webp",
    },
    {
      name: "Imagine Virtual",
      link: "https://www.imaginevirtual.com",
      logo: "/images/sponsors/copper/imagine_virtual.webp",
    },
    {
      name: "Rodorent",
      link: "https://www.rodorent.pt/",
      logo: "/images/sponsors/copper/rodorent.webp",
    },
    {
      name: "Silicon Gate",
      link: "https://www.silicongate.com/",
      logo: "/images/sponsors/copper/silicon_gate.webp",
    },
    {
      name: "Hexagon",
      link: "https://hexagon.com/pt",
      logo: "/images/sponsors/copper/hexagon.webp",
    },
    {
      name: "Filkemp",
      link: "https://filkemp.com/pt/",
      logo: "/images/sponsors/copper/filkemp.webp",
    },
    {
      name: "Norelem",
      link: "https://norelem.es/pt/",
      logo: "/images/sponsors/copper/norelem.webp",
    },
    {
      name: "Energest",
      link: "https://www.energest.pt/",
      logo: "/images/sponsors/copper/energest.webp",
    },
  ],
  partners: [
    {
      name: "PT Robotics",
      link: "https://www.ptrobotics.com/",
      logo: "/images/sponsors/partners/pt_robotics.webp",
    },
    {
      name: "NG Brakes",
      link: "https://ngbrakes.com/en/",
      logo: "/images/sponsors/partners/ng_brakes.webp",
    },
    { name: "AEIST", link: "https://aeist.pt/", logo: "/images/sponsors/partners/aeist.webp" },
    {
      name: "Docupilot",
      link: "https://www.docupilot.com/",
      logo: "/images/sponsors/partners/docupilot.webp",
    },
    {
      name: "EasyComposites",
      link: "https://www.easycomposites.eu/",
      logo: "/images/sponsors/partners/easy_composites.webp",
    },
    {
      name: "CAD Booster",
      link: "https://cadbooster.com/",
      logo: "/images/sponsors/partners/cad_booster.webp",
    },
    {
      name: "Tucab",
      link: "https://tucab.pt/",
      logo: "/images/sponsors/partners/tucab.webp",
    },
  ],
};
