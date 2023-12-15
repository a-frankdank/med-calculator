import { Context, Dispatch, SetStateAction, createContext } from "react";
import { StandingPerMedallionTier, StandingPerSyndicate } from "./standing";
import { Syndicate } from "./syndicate";

class Result {
    private _description: string;
    private _result: number;

    constructor(description: string, result: number) {
        this._description = description;
        this._result = result;
    }

    get result(): number {
        return this._result;
    }

    set result(result: number) {
        this._result = result;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }
}

class Standings {
    private _syndicateToStandingPerSyndicateMap: Map<Syndicate, StandingPerSyndicate>;
    private _keyToStandingPerMedallionTierMap: Map<string, StandingPerMedallionTier>;
    private _allSyndicatesResult: Result;
    private _allSyndicatesBonus: Result;

    constructor(standings?: Standings) {
        if (standings === undefined) {
            this._syndicateToStandingPerSyndicateMap = new Map<Syndicate, StandingPerSyndicate>();
            this._keyToStandingPerMedallionTierMap = new Map<string, StandingPerMedallionTier>();
            this._allSyndicatesResult = new Result("", 0);
            this._allSyndicatesBonus = new Result("", 0);
        } else {
            this._syndicateToStandingPerSyndicateMap = new Map<Syndicate, StandingPerSyndicate>(standings.syndicateToStandingPerSyndicateMap);
            this._keyToStandingPerMedallionTierMap = new Map<string, StandingPerMedallionTier>(standings.keyToStandingPerMedallionTierMap);
            this._allSyndicatesResult = new Result(standings.allSyndicatesResult.description, standings._allSyndicatesResult.result);
            this._allSyndicatesBonus = new Result(standings._allSyndicatesBonus.description, standings.allSyndicatesBonus.result);
        }
    }

    get syndicateToStandingPerSyndicateMap(): Map<Syndicate, StandingPerSyndicate> {
        return this._syndicateToStandingPerSyndicateMap;
    }

    get keyToStandingPerMedallionTierMap(): Map<string, StandingPerMedallionTier> {
        return this._keyToStandingPerMedallionTierMap;
    }

    get allSyndicatesResult(): Result {
        return this._allSyndicatesResult;
    }

    get allSyndicatesBonus(): Result {
        return this._allSyndicatesBonus;
    }
}

interface StandingsAndSetter {
    standings: Standings;
    setStandings: Dispatch<SetStateAction<Standings>>
}

//                                                                                       default is empty state!
const StandingsContext: Context<StandingsAndSetter> = createContext<StandingsAndSetter>({ standings: new Standings(), setStandings: () => { } });

export { Result, Standings, StandingsContext };
export type { StandingsAndSetter };



