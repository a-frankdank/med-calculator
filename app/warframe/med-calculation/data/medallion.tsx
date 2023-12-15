import { Syndicate } from "./syndicate";

interface Medallion {
    readonly name: string;
    readonly syndicate: Syndicate;
    readonly standingPerUnit: number;
    getKey(): string;
}

class CMedallion implements Medallion {
    private _name: string = '';
    private _syndicate: Syndicate = Syndicate.ArbitersOfHexis;
    private _standingPerUnit: number = -1;

    constructor(json: any) {
        const castedJson = json as Medallion;
        this._name = castedJson.name;
        this._syndicate = castedJson.syndicate;
        this._standingPerUnit = castedJson.standingPerUnit;
    }

    getKey(): string {
        return this._syndicate.replaceAll(" ", "_") + this._standingPerUnit;
    }

    get name(): string {
        return this._name;
    }

    get syndicate(): Syndicate {
        return this._syndicate;
    }

    get standingPerUnit(): number {
        return this._standingPerUnit;
    }
}

const medallions: Medallion[] = [
    // next SteelMeridian
    new CMedallion({
        name: "Insignia",
        syndicate: Syndicate.SteelMeridian,
        standingPerUnit: 500
    }),
    new CMedallion({
        name: "Defender Insignia",
        syndicate: Syndicate.SteelMeridian,
        standingPerUnit: 1000
    }),
    new CMedallion({
        name: "General Insignia",
        syndicate: Syndicate.SteelMeridian,
        standingPerUnit: 5000
    }),
    // next ArbitersOfHexis
    new CMedallion({
        name: "Medallion",
        syndicate: Syndicate.ArbitersOfHexis,
        standingPerUnit: 500
    }),
    new CMedallion({
        name: "Lawful Medallion",
        syndicate: Syndicate.ArbitersOfHexis,
        standingPerUnit: 1000
    }),
    new CMedallion({
        name: "Maxim Medallion",
        syndicate: Syndicate.ArbitersOfHexis,
        standingPerUnit: 5000
    }),
    // next CehpalonSuda
    new CMedallion({
        name: "Datum",
        syndicate: Syndicate.CehpalonSuda,
        standingPerUnit: 500
    }),
    new CMedallion({
        name: "Intriguing Datum",
        syndicate: Syndicate.CehpalonSuda,
        standingPerUnit: 1000
    }),
    new CMedallion({
        name: "Genius Datum",
        syndicate: Syndicate.CehpalonSuda,
        standingPerUnit: 5000
    }),
    // next PerrinSequence
    new CMedallion({
        name: "Quittance",
        syndicate: Syndicate.PerrinSequence,
        standingPerUnit: 500
    }),
    new CMedallion({
        name: "Executive Quittance",
        syndicate: Syndicate.PerrinSequence,
        standingPerUnit: 1000
    }),
    new CMedallion({
        name: "Partner Quittance",
        syndicate: Syndicate.PerrinSequence,
        standingPerUnit: 5000
    }),
    // next RedVeil
    new CMedallion({
        name: "Mark",
        syndicate: Syndicate.RedVeil,
        standingPerUnit: 500
    }),
    new CMedallion({
        name: "Honored Mark",
        syndicate: Syndicate.RedVeil,
        standingPerUnit: 1000
    }),
    new CMedallion({
        name: "Exalted Mark",
        syndicate: Syndicate.RedVeil,
        standingPerUnit: 5000
    }),
    // next NewLoka
    new CMedallion({
        name: "Seed",
        syndicate: Syndicate.NewLoka,
        standingPerUnit: 500
    }),
    new CMedallion({
        name: "Bountiful Seed",
        syndicate: Syndicate.NewLoka,
        standingPerUnit: 1000
    }),
    new CMedallion({
        name: "Flawless Seed",
        syndicate: Syndicate.NewLoka,
        standingPerUnit: 5000
    }),
];

export { medallions };
export type { Medallion };
