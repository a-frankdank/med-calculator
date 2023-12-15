
import Image from "next/image";
import styles from '../../../page.module.css'

const width: number = 50;
const height: number = 50;

export const WfLogo = () => {
    return (
        <>
            <Image
                className={styles.bgblack}
                src="/images/Site-logo.webp"
                alt="Logo"
                width={width}
                height={height}
            />
        </>
    );
};
