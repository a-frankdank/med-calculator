'use client';

import React, { useContext } from "react";
import styles from '../../../page.module.css';
import { Medallion } from "../data/medallion";
import { StandingPerMedallionTier } from "../data/standing";
import { numberFormatter } from "../data/numberFormatter";
import { Standings, StandingsContext } from "../data/standings-context";
import { updateFullStandings } from "../data/standings-operations";

const MedallionDisplay = (
  {
    chosenMedallion
  }:
    {
      chosenMedallion: Medallion
    }) => {
  const { standings, setStandings } = useContext(StandingsContext);

  function getStandingPerMedallionTier(): StandingPerMedallionTier {
    return standings.keyToStandingPerMedallionTierMap.get(chosenMedallion.getKey())!;
  }

  const handleAmountInput = (event: React.FormEvent<HTMLInputElement>) => {
    const newAmount: number = event.currentTarget.valueAsNumber;
    const standingPerMedallionTier: StandingPerMedallionTier = getStandingPerMedallionTier();
    if (isNaN(newAmount)) {
      standingPerMedallionTier.amount = 0;
      standingPerMedallionTier.resultingStanding = 0;
      updateFullStandings(standings);
      setStandings(new Standings(standings));
      return;
    }
    if (newAmount > 0) {
      // 10 digits limit, so we don't explode the layout
      if (newAmount > 10000000000) {
        standingPerMedallionTier.amount = 0;
        standingPerMedallionTier.resultingStanding = 0;
        updateFullStandings(standings);
        setStandings(new Standings(standings));
        return;
      }
      standingPerMedallionTier.resultingStanding = newAmount * chosenMedallion.standingPerUnit;
    } else {
      standingPerMedallionTier.resultingStanding = 0;
    }
    standingPerMedallionTier.amount = newAmount;

    updateFullStandings(standings);
    setStandings(new Standings(standings));
  };

  return (
    <>
      <td>
        {/* 
        TODO rather ugly, make it toggleable, if you even use that
        <MedallionLogo name={chosenMedallion.name} />
        */}
      </td>
      <td>
        {chosenMedallion.name}
      </td>
      <td>
        amount:
      </td>
      <td>
        <input className={styles.tableRight} name="amount" type="number" value={getStandingPerMedallionTier().amount} onChange={handleAmountInput}></input>
      </td>
      <td className={styles.tableRight}>{numberFormatter.format(getStandingPerMedallionTier().amount)}</td>
      <td>for each</td>
      <td className={styles.tableRight}>
        <b>{numberFormatter.format(chosenMedallion.standingPerUnit)}</b>
      </td>
      <td>
        result:
      </td>
      <td className={styles.tableRight}>
        <b className={getStandingPerMedallionTier().amount < 0 ? styles.redText : styles.default}>{getStandingPerMedallionTier().amount < 0
          ? 'negative amount'
          : numberFormatter.format(getStandingPerMedallionTier().resultingStanding)}</b>
      </td>
    </>
  );
}

export default MedallionDisplay;