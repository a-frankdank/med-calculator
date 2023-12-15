'use client';

import React, { MutableRefObject, useContext, useEffect, useRef } from "react";
import styles from '../../../page.module.css';
import { StandingBonus, StandingPerSyndicate } from "../data/standing";
import { Syndicate } from "../data/syndicate";
import { numberFormatter } from "../data/numberFormatter";
import SyndicateDisplay from "./syndicate-display";
import SyndicateSumRows from "./syndicate-sumrows";
import { resetAllMedallionCookies, saveStateToCookies, seedStandingsFromCookies } from "../data/cookies";
import { Standings, StandingsContext } from "../data/standings-context";
import { resetStandings } from "../data/standings-operations";

/*
TODO nice-to-have:
     useReducer for App-wide State
TODO nice-to-have:
     make the table footer follow viewport
 */
const SyndicateTable = () => {
    const { standings, setStandings } = useContext(StandingsContext);

    // that is the same logic as createStandings() uses to create the context state
    // if that ever changes... replace this here with direct loop over standings (no default sort there)
    const syndicateDisplayInserts: React.JSX.Element[] = Object.keys(Syndicate)
        .filter((v) => isNaN(Number(v)))
        .map((key: string) => {
            const chosenSyndicate = Syndicate[key as keyof typeof Syndicate];
            return <SyndicateDisplay
                key={chosenSyndicate}
                chosenSyndicate={chosenSyndicate}
            />;
        });

    let didInit: MutableRefObject<boolean> = useRef<boolean>(false);

    useEffect(() => {
        if (didInit.current) {
            return;
        }

        // for the components below, once, here:
        seedStandingsFromCookies(standings);
        setStandings(new Standings(standings));

        /*

        console.log("syn-tab ran" + JSON.stringify(standings, (key, value) => {
            if (value instanceof Map) {
                return {
                    dataType: 'Map',
                    value: Array.from(value.entries()),
                };
            } else {
                return value;
            }
        }));
        */

        didInit.current = true;

        // this only needs to run on component load once !!
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function clearStandingAndMedallionsAction(): void {
        resetStandings(standings);
        setStandings(new Standings(standings));
        resetAllMedallionCookies();
    }

    function saveStateToCookiesAction(): void {
        saveStateToCookies(standings.keyToStandingPerMedallionTierMap);
    }

    return (
        <>
            <table className={styles.wftable}>
                <tbody>
                    {syndicateDisplayInserts}
                </tbody>

                {/* className={styles.trFixed} */}
                <tfoot>
                    <tr>
                        <td colSpan={9}>
                            <span className={styles.buttonSpan}><button onClick={() => clearStandingAndMedallionsAction()}>clear</button></span>
                            <span className={styles.buttonSpan}><button onClick={() => saveStateToCookiesAction()}>save</button></span>
                        </td>
                    </tr>

                    <SyndicateSumRows
                        titleElement={<><b>all</b> standing:</>}
                        result={standings.allSyndicatesResult}
                    />

                    <SyndicateSumRows
                        titleElement={<><b><i>possible</i></b> bonus:</>}
                        result={standings.allSyndicatesBonus}
                    />

                </tfoot>
            </table>
        </>
    );
}

export default SyndicateTable;

