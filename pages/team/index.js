import Image from 'next/image';
import styles from '@/components/MyTeam.module.scss';

export default function Team() {
    return (
        <></>
    );
}

// const imageSections = [
//     [
//         '/images/pic1.jpg',
//         '/images/pic2.jpg',
//         '/images/pic3.jpg',
//         '/images/pic4.jpg',
//         '/images/pic5.jpg',
//     ],
//     [
//         '/images/pic6.jpg',
//         '/images/pic7.jpg',
//         '/images/pic8.jpg',
//         '/images/pic9.jpg',
//         '/images/pic10.jpg',
//     ],
// ];

// return (
//     <div className={styles.container}>
//         {/* Background Image */}
//         <div className={styles.background}></div>

//         {/* Content Section */}
//         <div className={styles.content}>
//             <h1>Welcome to the Gallery</h1>

//             {/* Modular Sections */}
//             {imageSections.map((section, index) => (
//                 <div key={index} className={styles.imageSection}>
//                     {section.map((image, idx) => (
//                         <div key={idx} className={styles.imageWrapper}>
//                             <Image
//                                 src={image}
//                                 alt={`Image ${idx + 1}`}
//                                 width={200}
//                                 height={200}
//                                 className={styles.image}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     </div>
// );
