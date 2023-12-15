
enum Syndicate {
    SteelMeridian = "Steel Meridian",
    ArbitersOfHexis = "Arbiters of Hexis",
    CehpalonSuda = "Cephalon Suda",
    PerrinSequence = "Perrin Sequence",
    RedVeil = "Red Veil",
    NewLoka = "New Loka"
}

interface SyndicateRelationship {
    readonly syndicate: Syndicate;
    // +50%
    readonly alliedSyndicate: Syndicate;
    // -50%
    readonly opposedSyndicate: Syndicate;
    // -100%
    readonly enemySyndicate: Syndicate;
}

enum SyndicateRelation {
    allied = 0.5,
    opposed = -0.5,
    enemy = -1
}

const syndicateRelationships: SyndicateRelationship[] = [
    {
        syndicate: Syndicate.ArbitersOfHexis,
        alliedSyndicate: Syndicate.CehpalonSuda,
        opposedSyndicate: Syndicate.PerrinSequence,
        enemySyndicate: Syndicate.RedVeil
    },
    {
        syndicate: Syndicate.CehpalonSuda,
        alliedSyndicate: Syndicate.ArbitersOfHexis,
        opposedSyndicate: Syndicate.RedVeil,
        enemySyndicate: Syndicate.NewLoka
    },
    {
        syndicate: Syndicate.SteelMeridian,
        alliedSyndicate: Syndicate.RedVeil,
        opposedSyndicate: Syndicate.NewLoka,
        enemySyndicate: Syndicate.PerrinSequence
    },
    {
        syndicate: Syndicate.NewLoka,
        alliedSyndicate: Syndicate.PerrinSequence,
        opposedSyndicate: Syndicate.SteelMeridian,
        enemySyndicate: Syndicate.CehpalonSuda
    },
    {
        syndicate: Syndicate.RedVeil,
        alliedSyndicate: Syndicate.SteelMeridian,
        opposedSyndicate: Syndicate.CehpalonSuda,
        enemySyndicate: Syndicate.ArbitersOfHexis
    },
    {
        syndicate: Syndicate.PerrinSequence,
        alliedSyndicate: Syndicate.NewLoka,
        opposedSyndicate: Syndicate.ArbitersOfHexis,
        enemySyndicate: Syndicate.SteelMeridian
    }
];

export { syndicateRelationships, SyndicateRelation, Syndicate };
export type { SyndicateRelationship };
