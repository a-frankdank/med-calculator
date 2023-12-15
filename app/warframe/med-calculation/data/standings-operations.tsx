import { numberFormatter } from "./numberFormatter";
import { medallions, Medallion } from "./medallion";
import { StandingPerSyndicate, StandingBonus, StandingPerMedallionTier } from "./standing";
import { Result, Standings } from "./standings-context";
import { Syndicate, SyndicateRelation, SyndicateRelationship, syndicateRelationships } from "./syndicate";

function pruneLastPlusSign(description: string): string {
    if (description.length > 3) {
        return description.substring(0, description.length - 3);
    } else {
        return description;
    }
}

function updateTotalSumRows(syndicateToStandingPerSyndicate: Map<Syndicate, StandingPerSyndicate>): [number, string, number, string] {
    // result:
    let resultDescriptionTmp: string = "";
    let resultTmp: number = 0;

    // bonus:
    let bonusDescriptionTmp: string = "";
    let bonusTmp: number = 0;

    Array
        .from(syndicateToStandingPerSyndicate.values())
        .sort((a: StandingPerSyndicate, b: StandingPerSyndicate) =>
            Object.values(Syndicate).indexOf(a.syndicate) - Object.values(Syndicate).indexOf(b.syndicate))
        .forEach((value: StandingPerSyndicate) => {
            // result:
            if (value.totalStanding.result > 0) {
                resultDescriptionTmp += value.syndicate + ": "
                    + numberFormatter.format(value.totalStanding.result) + " + ";
                resultTmp = resultTmp + value.totalStanding.result;
            }

            // bonus:
            let standingBonus: StandingBonus | undefined = value.standingBonus;
            if (standingBonus !== undefined && standingBonus.bonusStanding > 0) {
                bonusDescriptionTmp += standingBonus.forSyndicate + ": "
                    + numberFormatter.format(standingBonus.bonusStanding) + " + ";
                bonusTmp = bonusTmp + standingBonus.bonusStanding;
            }
        });

    resultDescriptionTmp = pruneLastPlusSign(resultDescriptionTmp);

    bonusDescriptionTmp = pruneLastPlusSign(bonusDescriptionTmp);

    return [resultTmp, resultDescriptionTmp, bonusTmp, bonusDescriptionTmp];
}

function updateOrSetTotalStanding(map: Map<Syndicate, StandingPerSyndicate>, chosenSyndicate: Syndicate, newTotalStanding: number, newTotalStandingDescription: string) {
    let standingPerSyndicate = map.get(chosenSyndicate);
    if (standingPerSyndicate !== undefined) {
        standingPerSyndicate.totalStanding = new Result(newTotalStandingDescription, newTotalStanding);
    } else {
        map.set(chosenSyndicate, {
            syndicate: chosenSyndicate,
            totalStanding: new Result(newTotalStandingDescription, newTotalStanding)
        });
    }
}

function calculateSyndicateSumAndDescription(chosenSyndicate: Syndicate, mapKeyToStandingPerSyndicateUnit: Map<string, StandingPerMedallionTier>): [number, string] {
    let resultDescriptionTmp: string = "";
    let resultTmp: number = 0;

    Array
        .from(mapKeyToStandingPerSyndicateUnit.values())
        .filter((value: StandingPerMedallionTier) => value.syndicate === chosenSyndicate)
        .sort((a: StandingPerMedallionTier, b: StandingPerMedallionTier) => a.medallionTierStanding - b.medallionTierStanding)
        .forEach((value: StandingPerMedallionTier) => {
            if (value.resultingStanding > 0) {
                resultDescriptionTmp +=
                    numberFormatter.format(value.resultingStanding) + " + ";
                resultTmp = resultTmp + value.resultingStanding;
            }
        });
    resultDescriptionTmp = pruneLastPlusSign(resultDescriptionTmp);

    return [resultTmp, resultDescriptionTmp];
}

function updateBonusesInStandings(standings: Standings) {
    Array.from(standings.syndicateToStandingPerSyndicateMap.keys())
        .forEach((syndicate: Syndicate) => {
            const standingPerSyndicate: StandingPerSyndicate = standings.syndicateToStandingPerSyndicateMap.get(syndicate)!;
            const effects: SyndicateRelationship = syndicateRelationships.filter(it => it.syndicate === syndicate)[0];
            const standingBonus: StandingBonus = {
                fromSyndicate: syndicate,
                forSyndicate: effects.alliedSyndicate,
                bonusMalus: effects,
                bonusStanding: standingPerSyndicate.totalStanding.result == 0 ? 0 : SyndicateRelation.allied * standingPerSyndicate.totalStanding.result
            };

            standingPerSyndicate.standingBonus = standingBonus;
        });
}

function setToInitializedState(standings: Standings) {
    Object.keys(Syndicate)
        .filter((v) => isNaN(Number(v)))
        .forEach((key: string) => {
            const chosenSyndicate = Syndicate[key as keyof typeof Syndicate];

            standings.syndicateToStandingPerSyndicateMap.set(
                chosenSyndicate,
                {
                    syndicate: chosenSyndicate,
                    totalStanding: new Result("", 0),
                    standingBonus: undefined
                });

            medallions.filter((medallion: Medallion) => medallion.syndicate == chosenSyndicate)
                .forEach((medallion: Medallion) => {
                    standings.keyToStandingPerMedallionTierMap.set(
                        medallion.getKey(),
                        {
                            syndicate: chosenSyndicate,
                            medallionTierStanding: medallion.standingPerUnit,
                            amount: 0,
                            resultingStanding: 0
                        });
                });
        });
}

function createStandings(): Standings {
    const standings: Standings = new Standings();

    setToInitializedState(standings);

    return standings;
}

function updateFullStandings(standings: Standings) {
    // updating syndicate sums based on per medallion tier
    Array.from(standings.syndicateToStandingPerSyndicateMap.keys())
        .forEach((syndicate: Syndicate) => {
            const [resultTmp, resultDescriptionTmp]: [number, string] = calculateSyndicateSumAndDescription(syndicate, standings.keyToStandingPerMedallionTierMap);

            updateOrSetTotalStanding(standings.syndicateToStandingPerSyndicateMap, syndicate, resultTmp, resultDescriptionTmp);
        });

    // update standing per syndicate bonuses
    updateBonusesInStandings(standings);

    // updating overall sums
    const [resultTmp, resultDescriptionTmp, bonusTmp, bonusDescriptionTmp]: [number, string, number, string] = updateTotalSumRows(standings.syndicateToStandingPerSyndicateMap);

    standings.allSyndicatesResult.result = resultTmp;
    standings.allSyndicatesResult.description = resultDescriptionTmp;

    standings.allSyndicatesBonus.result = bonusTmp;
    standings.allSyndicatesBonus.description = bonusDescriptionTmp;
}

function resetStandings(standings: Standings) {
    setToInitializedState(standings);
    standings.allSyndicatesBonus.result = 0;
    standings.allSyndicatesBonus.description = "";
    standings.allSyndicatesResult.result = 0;
    standings.allSyndicatesResult.description = "";
}

export { createStandings, updateFullStandings, resetStandings };