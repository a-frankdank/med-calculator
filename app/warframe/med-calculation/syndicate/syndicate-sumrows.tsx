"use client";

import React from "react";
import styles from '../../../page.module.css';
import { numberFormatter, floatingPointFormatter } from "../data/numberFormatter";
import { Result } from "../data/standings-context";

const SyndicateSumRows = ({
    titleElement,
    result
}: {
    titleElement: React.JSX.Element,
    result: Result
}) => {
    return (
        <>
            {/*   
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td className={styles.tableRight}>&nbsp;</td>
                <td>&nbsp;</td>
                <td className={styles.tableRight}>&nbsp;</td>
                <td>&nbsp;</td>
                <td className={styles.tableRight}>&nbsp;</td>
            </tr>
             */}

            <tr>
                <td colSpan={9} className={styles.tableRight}>&nbsp;{result.description}</td>
            </tr>
            <tr>
                <td colSpan={2} className={styles.tableRight}>{titleElement}</td>
                <td colSpan={3}>&nbsp;</td>
                <td>in relic packs:</td>
                <td colSpan={1} className={styles.tableRight}>{floatingPointFormatter.format(result.result / 20000)}</td>
                <td colSpan={2} className={styles.tableRight}> = <b>{numberFormatter.format(result.result)}</b></td>
            </tr>
        </>
    );
}

export default SyndicateSumRows;