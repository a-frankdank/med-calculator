import Image from "next/image";
import { Syndicate } from "../data/syndicate";
import styles from '../../../page.module.css';

export const SyndicateLogo = ({ chosenSyndicate, width, height }: { chosenSyndicate: Syndicate, width: number, height: number }) => {

    switch (chosenSyndicate) {
        case Syndicate.SteelMeridian:
            return (
                <>
                    <Image
                        className={styles.bgblack}
                        src="/images/SteelMeridianSigil.webp"
                        alt="SteelMeridianSigil"
                        width={width}
                        height={height}
                    />
                </>
            );
        case Syndicate.ArbitersOfHexis:
            return (
                <>
                    <Image
                        className={styles.bgblack}
                        src="/images/ArbitersofHexisSigil.webp"
                        alt="ArbitersofHexisSigil"
                        width={width}
                        height={height}
                    />
                </>
            );
        case Syndicate.CehpalonSuda:
            return (
                <>
                    <Image
                        className={styles.bgblack}
                        src="/images/CephalonSudaSigil.webp"
                        alt="CephalonSudaSigil"
                        width={width}
                        height={height}
                    />
                </>
            );
        case Syndicate.PerrinSequence:
            return (
                <>
                    <Image
                        className={styles.bgblack}
                        src="/images/PerrinSequenceSigil.webp"
                        alt="PerrinSequenceSigil"
                        width={width}
                        height={height}
                    />
                </>
            );
        case Syndicate.RedVeil:
            return (
                <>
                    <Image
                        className={styles.bgblack}
                        src="/images/RedVeilSigil.webp"
                        alt="RedVeilSigil"
                        width={width}
                        height={height}
                    />
                </>
            );
        case Syndicate.NewLoka:
            return (
                <>
                    <Image
                        className={styles.bgblack}
                        src="/images/NewLokaSigil.webp"
                        alt="NewLokaSigil"
                        width={width}
                        height={height}
                    />
                </>
            );
        default:
            return (
                <>
                    <span>No image found for syndicate {chosenSyndicate}</span>
                </>
            );
    }
};
