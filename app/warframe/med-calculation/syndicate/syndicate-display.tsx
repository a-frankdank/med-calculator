'use client';

import React, { useContext } from "react";
import styles from '../../../page.module.css';
import { Medallion, medallions } from "../data/medallion";
import { Syndicate } from "../data/syndicate";
import MedallionDisplay from "../medallion/medallion-display";
import { SyndicateLogo } from "./SyndicateLogo";
import { numberFormatter } from "../data/numberFormatter";
import SyndicateEffects from "./syndicate-effects";
import { StandingsContext } from "../data/standings-context";

const SyndicateDisplay = ({
  chosenSyndicate
}: {
  chosenSyndicate: Syndicate
}) => {
  const { standings } = useContext(StandingsContext);

  // that is the same logic as createStandings() uses to create the context state
  // if that ever changes... replace this here (but no default sort there)
  const medallionDisplayInserts: React.JSX.Element[] = medallions.filter((medallion: Medallion) => medallion.syndicate == chosenSyndicate)
    .map((medallion: Medallion) => {
      return <tr key={medallion.getKey()}>
        <MedallionDisplay
          chosenMedallion={medallion}
        />
      </tr>;
    });

  function getResult(): number {
    return standings.syndicateToStandingPerSyndicateMap.get(chosenSyndicate) === undefined
      ? -1
      : standings.syndicateToStandingPerSyndicateMap.get(chosenSyndicate)?.totalStanding.result!;
  }

  function getDescription(): string {
    return standings.syndicateToStandingPerSyndicateMap.get(chosenSyndicate) === undefined
      ? "standing per this syndicate is undefined"
      : standings.syndicateToStandingPerSyndicateMap.get(chosenSyndicate)?.totalStanding.description!;
  }

  return (
    <>
      <tr>
        <td>
          {/* either 17 for 21 total, or as big as medallionLogos */}
          <SyndicateLogo chosenSyndicate={chosenSyndicate} width={18} height={18} />
        </td>
        <td>
          <b>{chosenSyndicate}</b>
        </td>
        <td colSpan={8} />
      </tr>

      {medallionDisplayInserts}

      <SyndicateEffects
        chosenSyndicate={chosenSyndicate}
      />

      <tr>
        <td>&nbsp;</td>
        <td colSpan={8} className={styles.tableRight}>{chosenSyndicate} sum: {getDescription()} = <b>{numberFormatter.format(getResult())}</b></td>
      </tr>
    </>
  );
}

export default SyndicateDisplay;


