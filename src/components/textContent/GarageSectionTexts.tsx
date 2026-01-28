import { withBasePath } from "@/src/utils/basePath";

const cardData = [
  {
    id: "m01",
    imageSrc: "/images/garage/01.webp",
    title: "TLM01I",
    description: `The TLM01i is a combustion motorcycle equipped with a 250cc, 4-stroke engine from Sherco. 
    Structurally, the bike features a twin spar frame made of trellised aluminum. In 2014, the motorcycle weighed
    approximately 105kg and boasted a top speed of around 170km/h. Since its debut in
    the Motostudent 2014 competition, the TLM01i has undergone several modifications to enhance its performance.`,
    detailsLink: "/garage/m01",
    video: "/videos/garage/details/desktop/m01.mp4",
    stats: [
      { name: "Max Power", value: 39, max: 80, unit: "cv" },
      { name: "Speed", value: 192, max: 200, unit: "km/h" },
      { name: "Weight", value: 150, max: 250, unit: "kg" },
      { name: "Acceleration", value: 4, max: 4, unit: "s" },
      { name: "Torque", value: 24, max: 40, unit: "Nm" },
    ],
    historyText: `The TLM01i is a combustion motorcycle equipped with a 250cc, 4-stroke engine from Sherco. 
        Structurally, the bike features a twin spar frame made of trellised aluminum. In 2014, the motorcycle weighed
        approximately 105kg and boasted a top speed of around 170km/h. Since its debut in
        the Motostudent 2014 competition, the TLM01i has undergone several modifications to enhance its performance.`,
  },
  {
    id: "m02",
    imageSrc: "/images/garage/02.webp",
    title: "TLM02E",
    description: `The TLM02e, crafted between 2017-2018, marked a pioneering venture for the team. Born amidst the rise 
    of electric mobility in MotoStudent, this prototype showcased Portugal's entry into the electrifying arena. 
    With sleek design and groundbreaking technology, it proudly competed in the 2018 edition, capturing hearts and minds. 
    Today, it stands as a testament to the ingenuity and ambition of its creators, heralding a new era of innovation in 
    Portuguese engineering.`,
    detailsLink: "/garage/m02",
    video: "/videos/garage/details/desktop/sun/m02_sun.mp4",
    stats: [
      { name: "Max Power", value: 39, max: 80, unit: "kW" },
      { name: "Speed", value: 160, max: 200, unit: "km/h" },
      { name: "Weight", value: 150, max: 250, unit: "kg" },
      { name: "Acceleration", value: 5, max: 5, unit: "s" },
      { name: "Torque", value: 60, max: 80, unit: "Nm" },
    ],
    historyText: `The TLM02e, crafted between 2017-2018, marked a pioneering venture for the team. Born amidst the rise 
        of electric mobility in MotoStudent, this prototype showcased Portugal's entry into the electrifying arena. 
        With sleek design and groundbreaking technology, it proudly competed in the 2018 edition, capturing hearts and minds. 
        Today, it stands as a testament to the ingenuity and ambition of its creators, heralding a new era of innovation in 
        Portuguese engineering.`,
  },
  {
    id: "m03",
    imageSrc: "/images/garage/03.webp",
    title: "TLM03E",
    description: `The TLM03e, conceived between 2019 and 2021, represents the team's evolution in electric motorcycle 
    engineering. Competing in the 2021 MotoStudent edition, it showcased advancements in design and performance. 
    Notably, it marked the team's debut at Imola, Italy, in 2022, hosted by Moto Engineering Italy. 
    This milestone underscores the global recognition of their innovation.`,
    detailsLink: "/garage/m03",
    video: "/videos/garage/details/desktop/red/m03_red.mp4",
    stats: [
      { name: "Max Power", value: 36, max: 80, unit: "kW" },
      { name: "Speed", value: 178, max: 200, unit: "km/h" },
      { name: "Weight", value: 150, max: 250, unit: "kg" },
      { name: "Acceleration", value: 4.2, max: 4.2, unit: "s" },
      { name: "Torque", value: 90, max: 110, unit: "Nm" },
    ],
    historyText: `The TLM03e, conceived between 2019 and 2021, represents the team's evolution in electric motorcycle 
        engineering. Competing in the 2021 MotoStudent edition, it showcased advancements in design and performance. 
        Notably, it marked the team's debut at Imola, Italy, in 2022, hosted by Moto Engineering Italy. 
        This milestone underscores the global recognition of their innovation.`,
  },
  {
    id: "m04",
    imageSrc: "/images/garage/04.webp",
    title: "TLM04E",
    description: `The TLM04e, conceived between 2019 and 2021, represents the team's evolution in electric motorcycle 
    engineering. Competing in the 2021 MotoStudent edition, it showcased advancements in design and performance. 
    Notably, it marked the team's debut at Imola, Italy, in 2022, hosted by Moto Engineering Italy. 
    This milestone underscores the global recognition of their innovation.`,
    detailsLink: "/garage/m04",
    video: "/videos/garage/details/desktop/marlboro/m04_marlboro.mp4",
    stats: [
      { name: "Max Power", value: 57, max: 57, unit: "kW" },
      { name: "Speed", value: 204, max: 204, unit: "km/h" },
      { name: "Weight", value: 150, max: 250, unit: "kg" },
      { name: "Acceleration", value: 3.6, max: 3.6, unit: "s" },
      { name: "Torque", value: 120, max: 120, unit: "Nm" },
    ],
    historyText: `The TLM04e, conceived between 2019 and 2021, represents the team's evolution in electric motorcycle 
        engineering. Competing in the 2021 MotoStudent edition, it showcased advancements in design and performance. 
        Notably, it marked the team's debut at Imola, Italy, in 2022, hosted by Moto Engineering Italy. 
        This milestone underscores the global recognition of their innovation.`,
  },
  {
    id: "m05",
    imageSrc: "/images/garage/05.webp",
    title: "TLM05E",
    description: `The TLM05e is the latest evolution in our electric motorcycle series, developed between 2022 and 2024.`,
    detailsLink: "/garage/m05",
    video: "/videos/garage/details/desktop/m05_default.mp4",
    stats: [
      { name: "Power", value: 54, max: 80, unit: "hp" },
      { name: "Speed", value: 201, max: 220, unit: "km/h" },
      { name: "Weight", value: 150, max: 250, unit: "kg" },
      { name: "Acceleration", value: 3.2, max: 3.2, unit: "s" },
    ],
    historyText: `The TLM05e is the latest evolution in our electric motorcycle series, developed between 2022 and 2024. 
          Building on the successes of its predecessors, this model incorporates cutting-edge technology and design enhancements. 
          It competed in the 2024 MotoStudent edition, showcasing significant improvements in power, speed, and efficiency. 
          The TLM05e represents our commitment to innovation and excellence in electric motorcycle engineering.`,
  },
];

export const cards = cardData.map(card => ({
  ...card,
  imageSrc: withBasePath(card.imageSrc),
  video: withBasePath(card.video),
}));

export const backgroundData = {
  m01: ["/videos/garage/details/desktop/m01.mp4"],
  m02: ["/videos/garage/details/desktop/sun/m02_sun.mp4"],
  m03: [
    "/videos/garage/details/desktop/red/m03_red.mp4",
    "/videos/garage/details/desktop/marlboro/m03_marlboro.mp4",
  ],
  m04: [
    "/videos/garage/details/desktop/red/m04_red.mp4",
    "/videos/garage/details/desktop/marlboro/m04_marlboro.mp4",
    "/videos/garage/details/desktop/gulf/m04_gulf.mp4",
    "/videos/garage/details/desktop/bordeaux/m04_bordeaux.mp4",
  ],
  m05: ["/videos/garage/video05.mp4"],
};

export const themeColors = {
  m01: "0,82,212", // azul
  m02: "255,204,0", // amarelo
  m03: "255,0,0", // vermelho
  m04: "255,0,0", // vermelho
  m05: "0,82,212", // azul
};
