import Image from "next/image";
import styles from '../../../page.module.css'

export const MedallionLogo = ({ name }: { name: string }) => {
    const width: number = 80;
    const height: number = 80;

    const fileName = name.replaceAll(" ", "");

    return (
        <>
            <Image
                className={styles.bgblack}
                src={"/images/medallions/"+fileName+".webp"}
                alt={fileName}
                width={width}
                height={height}
            />
        </>
    );
};
