import { Syndicate } from "./syndicate";
import { Result } from "./standings-context";
import { SyndicateRelationship } from "./syndicate";

// representing the full syndicate result
//  eg all 500er, all 1000er and all 5000er meds x amount each
//  summed up
interface StandingPerSyndicate {
    readonly syndicate: Syndicate;
    totalStanding: Result;
    standingBonus?: StandingBonus;
}

// representing one result per med tier,
//  eg all 500er meds x amount
interface StandingPerMedallionTier {
    readonly syndicate: Syndicate;
    readonly medallionTierStanding: number;
    amount: number;
    resultingStanding: number;
}

// what the allied syndicate would get
//  so the +50% from StandingBonusMalus.alliedSyndicate
interface StandingBonus {
    readonly fromSyndicate: Syndicate;
    readonly forSyndicate: Syndicate;
    readonly bonusMalus: SyndicateRelationship;
    bonusStanding: number;
}

export type { StandingPerSyndicate, StandingPerMedallionTier, StandingBonus };