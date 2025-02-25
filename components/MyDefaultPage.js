import styles from '@/styles/MyDefaultPage.module.scss';

export default function MyDefaultPage({ blueTitle, whiteTitle, children }) {
    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <div className={styles.row}>
                    <h1 className={styles.title}>
                        <span className={styles.white}>{whiteTitle}</span>{' '}
                        <span className={styles.blue}>{blueTitle}</span>
                    </h1>
                </div>
                {children}
            </div>
        </div>
    );
}
