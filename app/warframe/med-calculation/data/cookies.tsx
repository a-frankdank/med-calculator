
import { Medallion, medallions } from "./medallion";
import { StandingPerMedallionTier } from "./standing";
import { Standings } from "./standings-context";
import { updateFullStandings } from "./standings-operations";


function saveStateToCookies(mapKeyToStandingPerSyndicateUnit: Map<string, StandingPerMedallionTier>): void {
    const inFiveYearsDate = new Date();
    inFiveYearsDate.setTime(inFiveYearsDate.getTime() + (5 * 365 * 24 * 60 * 60 * 1000));

    Array
        .from(mapKeyToStandingPerSyndicateUnit.keys())
        .forEach((key: string) => {
            const standingPerSyndicateUnit: StandingPerMedallionTier = mapKeyToStandingPerSyndicateUnit.get(key)!;
            if (standingPerSyndicateUnit.resultingStanding < 1) {
                return;
            }
            const tmpCookieString = key
                + "="
                + JSON.stringify(standingPerSyndicateUnit)
                + ";expires="
                + inFiveYearsDate.toUTCString()
                + ";samesite=strict";
            document.cookie = tmpCookieString;
            //console.log("SET  : " + tmpCookieString);
        });
}

function seedStandingsFromCookies(standings: Standings) {
    // at the bottom is the per medallion tier
    medallions
        .forEach((medallion: Medallion) => {
            // read cookie
            const prefix = medallion.getKey() + "=";
            const cookieString: string = document.cookie;
            const found: string | undefined = cookieString
                .split("; ")
                .find((value: string) => value.startsWith(prefix));

            if (found !== undefined) {
                const theCookieStanding: StandingPerMedallionTier | undefined = JSON.parse(found.replace(prefix, ""));

                if (theCookieStanding !== undefined) {
                    //it is about that:
                    //  theCookieStanding.amount;
                    //  theCookieStanding.resultingStanding;
                    standings.keyToStandingPerMedallionTierMap.set(medallion.getKey(), theCookieStanding);
                }
            }
        });

    updateFullStandings(standings);
}

function resetAllMedallionCookies(): void {
    // reset cookies
    const oldDate: Date = new Date();
    Array
        .from(medallions)
        .forEach((value: Medallion) => {
            const key = value.getKey();
            const tmpCookieString = key
                + "="
                + ";expires="
                + oldDate.toUTCString()
                + ";samesite=strict";
            document.cookie = tmpCookieString;
            //console.log("UNSET  : " + tmpCookieString);
        });
}

export { resetAllMedallionCookies, saveStateToCookies, seedStandingsFromCookies };