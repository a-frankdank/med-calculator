'use client';

import Image from "next/image";
import styles from '../../page.module.css'
import Link from "next/link";
import SyndicateTable from './syndicate/syndicate-table';
import { Standings, StandingsContext } from './data/standings-context';
import { createStandings } from "./data/standings-operations";
import { useState } from 'react';

/*
  the main page of this component
*/
const MedCalculation = () => {
  const [standings, setStandings] = useState<Standings>(createStandings());

  return (
    <>
      <main className={styles.wfmain}>
        <div>
          <h1>
            <Image
              src="/images/medallions/Medallion.webp"
              alt="Medallion"
              width={50}
              height={50}
            />
            Medallion Calculation</h1>
        </div>
        <div>
          <Link href="https://warframe.fandom.com/wiki/Syndicate_Medallions"
            target="_blank"
            rel="noopener noreferrer">
            Wiki page for Syndicate Medallions
          </Link>
        </div>
        <div>
          <StandingsContext.Provider value={{ standings: standings, setStandings: setStandings }}>
            <SyndicateTable />
          </StandingsContext.Provider>
        </div>
      </main>
    </>
  );
}

export default MedCalculation;