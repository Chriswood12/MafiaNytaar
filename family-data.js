/**
 * ============================================================================
 *  FAMIGLIA DI LEGNO — SLÆGTSTRÆ DATA (NEM AT REDIGERE)
 * ============================================================================
 *  Når de endelige familierelationer er klar, skal du blot opdatere
 *  `people` og `relations` nedenfor og sætte `isPlaceholder: false`.
 *
 *  VIGTIGT: Ingen afsløringer af hemmelige spilroller (Forræder, Livvagt osv.)
 *  her — slægtstræet viser kun offentlige familietitler og slægtskab.
 *
 *  Felter for hver person i `people`:
 *   - id:               Unikt ID uden mellemrum (bruges i `relations`)
 *   - mafiaName:        Offentligt mafianavn
 *   - realName:         Rigtigt fornavn
 *   - title:            Offentlig titel i familien (f.eks. "Familiens Overhoved")
 *   - generation:       1 (ældste øverst), 2 (næste led), 3 (yngste led) osv.
 *   - status:           "alive" eller "deceased" (viser † ved afdøde)
 *   - monogram:         2 bogstaver til personens lille vokssegl
 *   - relationSummary:  Kort sætning om personens plads i familien
 *   - bio:              Kort baggrundstekst i dossieret
 *   - traits:           2–3 korte stikord om personen
 *
 *  Felter for hver forbindelse i `relations`:
 *   - from:  Enkelt id ("brother") eller par-array (["christopher", "anne"])
 *   - to:    Modtagerens id ("freddy")
 *   - type:  "marriage" | "parent" | "sibling" | "alliance" | "rival"
 *   - label: Kort dansk betegnelse vist når man klikker på en person
 * ============================================================================
 */
window.FAMILY_TREE_DATA = {
  isPlaceholder: true,
  subtitle: 'Blod er tykkere end vand — men selv i familien lurer forræderi',

  people: [
    // ── 1. Generation ────────────────────────────────────────────────────────
    {
      id: 'christopher',
      mafiaName: 'Don Christofo Di Legno',
      realName: 'Christopher',
      title: 'Familiens Overhoved (Don)',
      generation: 1,
      status: 'alive',
      monogram: 'CD',
      relationSummary: 'Gift med Donna Anna Sophia · Bror til afdøde Lorenzo Di Legno',
      bio: 'Overhoved for Di Legno-imperiet. Efter mordet på sin bror har han samlet hele slægten bag lukkede døre nytårsaften.',
      traits: ['Patriark', 'Jernhånd', 'Æreskodeks']
    },
    {
      id: 'anne',
      mafiaName: 'Donna Anna Sophia Di Legno',
      realName: 'Anne',
      title: 'Familiens Matriark (Donna)',
      generation: 1,
      status: 'alive',
      monogram: 'AS',
      relationSummary: 'Gift med Don Christofo · Værtinde i familiens safehouse',
      bio: 'Den der sendte brevet med et kys og en advarsel. Intet sker ved familiens middagsbord uden hendes velsignelse.',
      traits: ['Matriark', 'Diplomat', 'Nådeløs elegance']
    },
    {
      id: 'brother',
      mafiaName: 'Lorenzo Di Legno',
      realName: 'Afventer navn',
      title: 'Den Myrdede Bror (†)',
      generation: 1,
      status: 'deceased',
      monogram: 'LD',
      relationSummary: 'Bror til Don Christofo · Far til Guglielmo og Matilda (udkast)',
      bio: 'Blev fundet myrdet under mystiske omstændigheder. Hans død er årsagen til, at familien nu skal opklare hvem der står bag.',
      traits: ['Afdød', 'Gammel skole', 'Uopklaret drab']
    },

    // ── 2. Generation ────────────────────────────────────────────────────────
    {
      id: 'freddy',
      mafiaName: 'Fredericca Di Legno',
      realName: 'Freddy',
      title: 'Ældste Datter & Rådgiver',
      generation: 2,
      status: 'alive',
      monogram: 'FD',
      relationSummary: 'Datter af Don Christofo & Donna Anna Sophia (udkast)',
      bio: 'Kender hver en krog i Aarhus-territoriet og holder skarpt øje med familiens regnskaber og rygter.',
      traits: ['Skarpsindig', 'Loyal', 'Diskret']
    },
    {
      id: 'aske',
      mafiaName: 'Ascanio Di Legno',
      realName: 'Aske',
      title: 'Søn & Underchef',
      generation: 2,
      status: 'alive',
      monogram: 'AD',
      relationSummary: 'Søn af Don Christofo & Donna Anna Sophia (udkast)',
      bio: 'Født ind i magten, men altid omgivet af hvisken på gaden. Arbejder tæt på gadeplan ved Ingerslev.',
      traits: ['Karismatisk', 'Koldblodig', 'Stilfuld']
    },
    {
      id: 'willy',
      mafiaName: 'Guglielmo Di Legno',
      realName: 'Willy',
      title: 'Nevø & Kvarterets Arkitekt',
      generation: 2,
      status: 'alive',
      monogram: 'GD',
      relationSummary: 'Søn af afdøde Lorenzo · Bror til Matilda (udkast)',
      bio: 'Har siden sin fars død holdt sin egen gren af familien samlet. Har sine egne meninger om arvefølgen.',
      traits: ['Beregner', 'Tavs', 'Traditionsbunden']
    },
    {
      id: 'tilde',
      mafiaName: 'Matilda Di Legno',
      realName: 'Tilde',
      title: 'Niece & Gæstfrihedens Vogter',
      generation: 2,
      status: 'alive',
      monogram: 'MD',
      relationSummary: 'Datter af afdøde Lorenzo · Søster til Guglielmo (udkast)',
      bio: 'Altid velklædt og altid til stede når vigtige beslutninger træffes. Glemmer aldrig et løfte — eller en fornærmelse.',
      traits: ['Observant', 'Familiekær', 'Viljestærk']
    },

    // ── 3. Generation ────────────────────────────────────────────────────────
    {
      id: 'jacob',
      mafiaName: 'Giacomo Di Legno',
      realName: 'Jacob',
      title: 'Yngre Arving & Skytte',
      generation: 3,
      status: 'alive',
      monogram: 'JD',
      relationSummary: 'Søn af Fredericca Di Legno (udkast)',
      bio: 'Opvokset med historierne om Sicilien. Holder sig rolig i baggrunden, indtil familien har brug for hans hånd.',
      traits: ['Præcis', 'Tålmodig', 'Trofast']
    },
    {
      id: 'vanni',
      mafiaName: 'Vannissa Di Legno',
      realName: 'Vanni',
      title: 'Yngre Arving & Budbringer',
      generation: 3,
      status: 'alive',
      monogram: 'VD',
      relationSummary: 'Datter af Ascanio Di Legno (udkast)',
      bio: 'Bevæger sig ubesværet mellem byens fineste selskaber og de mørkeste baglokaler.',
      traits: ['Veltalende', 'Nysgerrig', 'Snarrådig']
    },
    {
      id: 'sebastian',
      mafiaName: 'Sebastiano Di Legno',
      realName: 'Sebastian',
      title: 'Kvarterets Håndhæver',
      generation: 3,
      status: 'alive',
      monogram: 'SD',
      relationSummary: 'Søn af Guglielmo Di Legno (udkast)',
      bio: 'Vogter Skanderborgvej 86 og sørger for, at ubudne gæster aldrig finder vej op ad trappen.',
      traits: ['Pålidelig', 'Stærk', 'Urokkelig']
    },
    {
      id: 'christian',
      mafiaName: 'Cristiano Di Legno',
      realName: 'Christian',
      title: 'Slægtens Kronikør',
      generation: 3,
      status: 'alive',
      monogram: 'CR',
      relationSummary: 'Søn af Matilda Di Legno (udkast)',
      bio: 'Samler på hemmeligheder, gamle skåler og blikket fra dem, der sidder omkring bordet.',
      traits: ['Eftertænksom', 'Skarp', 'Stilbevidst']
    }
  ],

  relations: [
    // Ægteskab i 1. generation
    {
      from: 'christopher',
      to: 'anne',
      type: 'marriage',
      label: 'Ægtefæller'
    },

    // Søskende i 1. generation
    {
      from: 'christopher',
      to: 'brother',
      type: 'sibling',
      label: 'Brødre'
    },

    // Forældre → 2. generation (Don & Donna's gren)
    {
      from: ['christopher', 'anne'],
      to: 'freddy',
      type: 'parent',
      label: 'Forældre / Barn'
    },
    {
      from: ['christopher', 'anne'],
      to: 'aske',
      type: 'parent',
      label: 'Forældre / Barn'
    },

    // Forældre → 2. generation (Afdøde brors gren)
    {
      from: 'brother',
      to: 'willy',
      type: 'parent',
      label: 'Far / Søn'
    },
    {
      from: 'brother',
      to: 'tilde',
      type: 'parent',
      label: 'Far / Datter'
    },

    // Søskende i 2. generation
    {
      from: 'willy',
      to: 'tilde',
      type: 'sibling',
      label: 'Søskende'
    },

    // Forældre → 3. generation
    {
      from: 'freddy',
      to: 'jacob',
      type: 'parent',
      label: 'Mor / Søn'
    },
    {
      from: 'aske',
      to: 'vanni',
      type: 'parent',
      label: 'Far / Datter'
    },
    {
      from: 'willy',
      to: 'sebastian',
      type: 'parent',
      label: 'Far / Søn'
    },
    {
      from: 'tilde',
      to: 'christian',
      type: 'parent',
      label: 'Mor / Søn'
    },

    // Skjulte / politiske tråde (vises via "Vis alliancer & rivaler" eller når man trykker på en person)
    {
      from: 'freddy',
      to: 'sebastian',
      type: 'alliance',
      label: 'Forretningsalliance'
    },
    {
      from: 'jacob',
      to: 'christian',
      type: 'alliance',
      label: 'Nattens pagt'
    },
    {
      from: 'aske',
      to: 'willy',
      type: 'rival',
      label: 'Intern magtkamp'
    },
    {
      from: 'vanni',
      to: 'tilde',
      type: 'rival',
      label: 'Gammel strid'
    }
  ]
};
