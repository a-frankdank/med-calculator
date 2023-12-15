'use client';

import React, { useContext, useEffect, useState } from "react";
import styles from '../../../page.module.css';
import { Syndicate } from "../data/syndicate";
import { StandingBonus } from "../data/standing";
import { SyndicateRelation } from "../data/syndicate";
import { numberFormatter } from "../data/numberFormatter";
import { StandingsContext } from "../data/standings-context";

const defaultElement: React.JSX.Element =
    <td colSpan={8}>
        <span>&nbsp;</span>
        <div>&nbsp;</div>
    </td>;

const SyndicateEffects = ({
    chosenSyndicate
}: {
    chosenSyndicate: Syndicate,
}) => {
    const { standings } = useContext(StandingsContext);

    const [effectsDescription, setEffectsDescription] = useState<React.JSX.Element>(defaultElement);

    useEffect(() => {
        const standingPerSyndicate = standings.syndicateToStandingPerSyndicateMap.get(chosenSyndicate);
        if (standingPerSyndicate === undefined) {
            setEffectsDescription(defaultElement);
            return;
        }

        const totalStandingForThisSyndicate: number = standingPerSyndicate.totalStanding.result;
        if (totalStandingForThisSyndicate <= 0) {
            setEffectsDescription(defaultElement);
            return;
        }

        let standingBonus: StandingBonus | undefined = standingPerSyndicate.standingBonus;
        if (standingBonus === undefined) {
            setEffectsDescription(defaultElement);
            return;
        }
        standingBonus = standingBonus!;

        setEffectsDescription(
            <>
                <td colSpan={2} className={styles.tableRight}><i><b>possible</b></i> effects:</td>
                <td colSpan={2} className={styles.tableRight}>
                    <b>ally</b> {standingBonus.forSyndicate} gets
                    <div><b>{numberFormatter.format(standingBonus.bonusStanding)}</b></div>
                </td>
                <td colSpan={4} className={styles.tableRight}>
                    <span className={styles.redText}>opposed</span> {standingBonus.bonusMalus.opposedSyndicate} + <span className={styles.redText}>enemy</span> {standingBonus.bonusMalus.enemySyndicate} get
                    <div>
                        <span className={styles.redText}>{numberFormatter.format(SyndicateRelation.opposed * totalStandingForThisSyndicate)}</span> +&nbsp;
                        <span className={styles.redText}>{numberFormatter.format(SyndicateRelation.enemy * totalStandingForThisSyndicate)}</span>
                    </div>
                </td>
                <td colSpan={1}>&nbsp;</td>
            </>
        );

        // because when any content changes, the whole object gets re-created
    }, [chosenSyndicate, standings]);

    return (
        <>
            <tr>
                {effectsDescription}
            </tr>
        </>
    );
}

export default SyndicateEffects;