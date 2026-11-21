/**
 * ============================================================================
 *  FAMIGLIA DI LEGNO — SLÆGTSTRÆ DATA
 * ============================================================================
 *  Offentlige karakterprofiler og familierelationer for Familien Di Legno.
 *  Ingen hemmelige Varulv-roller eller private karakterhemmeligheder vises her
 *  — de afsløres kun ved indtastning af ens personlige kode fra Don Christofo.
 * ============================================================================
 */
window.FAMILY_TREE_DATA = {
  isPlaceholder: false,
  subtitle: 'Blod er tykkere end vand — men selv i familien lurer forræderi',

  people: [
    // ── 1. Generation (De tre Di Legno-brødre og deres hustruer) ─────────────
    {
      id: 'christopher',
      mafiaName: 'Don Christofo Di Legno',
      realName: 'Christopher',
      title: 'Familiens øverste leder (Don)',
      generation: 1,
      status: 'alive',
      monogram: 'CD',
      relationSummary: 'Gift med Donna Anna Sophia · Storebror til Guglielmo og afdøde Lorenzo · Far til Matilda og Fredericca',
      position:
        'Familiens øverste leder. Det er Don Christofo, der træffer de endelige beslutninger og bestemmer, hvem der har magten i familien. Hans ord er lov, og ingen udfordrer ham uden konsekvenser.',
      personality:
        'Autoritær, strategisk og kompromisløs. Han er en mand, der ikke behøver forklare sig selv to gange. Han forventer respekt, lydighed og ubetinget loyalitet fra alle omkring sig. Familien er hans største stolthed, men også hans største svaghed.',
      reputation:
        'En respekteret og frygtet mand med forbindelser langt uden for familiens territorium. Han har opbygget Di Legno-imperiet gennem årtier og har ingen intentioner om at give slip på magten.',
      quote: 'Jeg har bygget dette imperium med mine egne hænder. Ingen skal tro, at de kan tage det fra mig.',
      traits: ['Autoritær', 'Strategisk', 'Kompromisløs']
    },
    {
      id: 'anne',
      mafiaName: 'Donna Anna Sophia Di Legno',
      realName: 'Anne',
      title: 'Familiens matriark (Donna)',
      generation: 1,
      status: 'alive',
      monogram: 'AS',
      relationSummary: 'Gift med Don Christofo · Mor til Matilda og Fredericca · Tante til Ascanio, Sebastiano, Cristiano og Giacomo',
      position:
        'Familiens ubestridte overhoved og den kvinde, der i virkeligheden trækker i alle trådene.',
      personality:
        'Anna Sophia er elegant, forførende, intelligent og ekstremt magtfuld. Hun behøver aldrig hæve stemmen for at blive hørt. Hun er familiens samlingspunkt, men også den, alle frygter at skuffe. Hun sætter familien over alt andet og tolererer hverken illoyalitet eller svaghed.',
      reputation:
        'Hun bliver behandlet med respekt og en smule frygt. Bag hendes smil gemmer der sig et skarpt blik, som sjældent overser noget.',
      quote: 'Jeg har ikke brug for at vide, hvem der er loyal. Jeg ved allerede, hvem der ikke er.',
      traits: ['Elegant', 'Intelligent', 'Magtfuld']
    },
    {
      id: 'lorenzo',
      mafiaName: 'Lorenzo Di Legno',
      realName: 'Afdød bror',
      title: 'Don Christofos myrdede bror (†)',
      generation: 1,
      status: 'deceased',
      monogram: 'LD',
      relationSummary: 'Bror til Don Christofo og Guglielmo · Gift med Vannissa · Far til Ascanio, Sebastiano og Cristiano',
      position:
        'Don Christofos bror og en central støtte i Di Legno-imperiet indtil hans bratte og uopklarede død.',
      personality:
        'Respekteret blandt familiens grene og kendt for sin loyalitet over for blodet. Hans død efterlader et tomrum — og en mistanke, der nu samler hele familien.',
      reputation:
        'Mordet på Lorenzo er den gnist, der har sat hele familien i alarmberedskab nytårsaften.',
      quote: 'Familien glemmer aldrig dem, der svigter blodet.',
      traits: ['Afdød', 'Uopklaret drab', 'Gammel skole']
    },
    {
      id: 'vanni',
      mafiaName: 'Vannissa Di Legno',
      realName: 'Vanni',
      title: 'Kvindelig magtspiller & inderkreds',
      generation: 1,
      status: 'alive',
      monogram: 'VD',
      relationSummary: 'Gift med afdøde Lorenzo · Mor til Ascanio, Sebastiano og Cristiano · Tante til Matilda, Fredericca og Giacomo',
      position:
        'Familiens kvindelige magtspiller og en vigtig del af inderkredsen. Hun har sin egen plads ved familiens bord og er ikke bange for at blande sig i familiens beslutninger.',
      personality:
        'Vannissa er stærk, glamourøs, snu og socialt intelligent. Hun har altid styr på, hvad der foregår omkring hende, og er sjældent den sidste, der hører om familiens hemmeligheder. Hun er omsorgsfuld over for sine nærmeste, altid den man går til, men kan være både skarp og manipulerende, når situationen kræver det.',
      reputation:
        'Familiens sladderdronning med fingeren på pulsen. Hun ved lidt om alle og meget om dem, der tror, de kan holde noget skjult. Man skal aldrig undervurdere hendes indflydelse.',
      quote: 'Jeg blander mig ikke i andres sager. Jeg sørger bare for at vide lidt om dem alle.',
      traits: ['Snu', 'Glamourøs', 'Sladderdronning']
    },
    {
      id: 'willy',
      mafiaName: 'Guglielmo Di Legno',
      realName: 'Willy',
      title: 'Forretningsmand & økonomichef',
      generation: 1,
      status: 'alive',
      monogram: 'GD',
      relationSummary: 'Don Christofos lillebror · Bror til afdøde Lorenzo · Far til Giacomo · Onkel til Matilda, Fredericca, Ascanio, Sebastiano og Cristiano',
      position:
        'Familiens forretningsmand og en af Don Christofos nærmeste allierede. Han har fingrene i familiens økonomi og sørger for, at imperiet fortsat vokser.',
      personality:
        'Guglielmo er beregnende, bemærkelsesværdig, selvsikker og forretningsorienteret. Han er en mand, der altid tænker strategisk og sjældent handler uden en bagtanke. Han foretrækker at løse problemer med penge og forbindelser frem for vold, men han er bestemt ikke bange for at få hænderne beskidte, hvis situationen kræver det.',
      reputation:
        'Familiens pengemand og en mand med forbindelser i de rette kredse. Han er vellidt, når det gavner ham, men ingen er i tvivl om, at han først og fremmest tænker på sig selv og sin egen familie.',
      quote: 'Alt har en pris. Spørgsmålet er bare, hvor meget du er villig til at betale.',
      traits: ['Beregnende', 'Strategisk', 'Pengemand']
    },

    // ── 2. Generation (De seks fætre og kusiner) ────────────────────────────
    {
      id: 'tilde',
      mafiaName: 'Matilda Di Legno',
      realName: 'Tilde',
      title: 'Førstefødte datter & udpeget arving',
      generation: 2,
      status: 'alive',
      monogram: 'MD',
      relationSummary: 'Datter af Don Christofo og Donna Anna Sophia · Storesøster til Fredericca · Kusine til Ascanio, Sebastiano, Cristiano og Giacomo',
      position:
        'Familiens førstefødte datter og den udpegede arving til Di Legno-imperiet. Hun er opdraget til en dag at overtage familiens magt og føre navnet videre.',
      personality:
        'Selvsikker, smuk, strålende, ambitiøs og perfektionistisk. Matilda er vant til at få sin vilje og forventer samme respekt som sine forældre. Hun har et naturligt talent for at charmere de rigtige mennesker, men bag facaden gemmer der sig en stærk vilje og et stort temperament. Lad dig ikke narre af hendes uskyldige ydre — bag det søde smil gemmer der sig mere, end øjet umiddelbart ser.',
      reputation:
        'Familiens gyldne pige. Alle ved, at hun er udset til noget stort, men ikke alle mener, at hun er den rette til at arve imperiet.',
      quote: 'Jeg er ikke født til at stå i skyggen af nogen. Jeg er født til at overtage tronen.',
      traits: ['Ambitiøs', 'Perfektionistisk', 'Arving']
    },
    {
      id: 'freddy',
      mafiaName: 'Fredericca Di Legno',
      realName: 'Freddy',
      title: 'Yngste datter & frygtløs ildsjæl',
      generation: 2,
      status: 'alive',
      monogram: 'FD',
      relationSummary: 'Datter af Don Christofo og Donna Anna Sophia · Lillesøster til Matilda · Kusine til Ascanio, Sebastiano, Cristiano og Giacomo',
      position:
        'Familiens yngste datter og Matildas lillesøster. Hun er vokset op med privilegier, magt og familiens beskyttelse.',
      personality:
        'Fredericca er rå, selvsikker, dragende og frygtløs. Hun er bestemt ikke en kvinde, man skal løbe om hjørner med, og hun er aldrig bange for at sige sin mening eller sætte folk på plads. Hun står urokkeligt fast ved sine holdninger og lader sig ikke intimidere af nogen — heller ikke sin egen familie. Hun tager ingen pis fra nogen og er ikke bange for at tage kampen op, hvis nogen træder hende over tæerne.',
      reputation:
        'Familiens frygtløse ildsjæl, der aldrig bakker ned fra en konfrontation. Hun er kendt for sin skarpe tunge, stærke vilje og kompromisløse attitude. Ingen skal være i tvivl om, hvor de har hende — og slet ikke forsøge på at lyve over for hende.',
      quote: 'Det er ikke min skyld, at alle gør, hvad jeg beder dem om.',
      traits: ['Frygtløs', 'Skarp tunge', 'Kompromisløs']
    },
    {
      id: 'aske',
      mafiaName: 'Ascanio Di Legno',
      realName: 'Aske',
      title: 'Familiens hårde hånd & forhandler',
      generation: 2,
      status: 'alive',
      monogram: 'AD',
      relationSummary: 'Søn af Lorenzo og Vannissa · Bror til Sebastiano og Cristiano · Fætter til Matilda, Fredericca og Giacomo',
      position:
        'Familiens hårde hånd og forhandler. Han er familiens forbindelsesmand udadtil og tager sig af møder og forhandlinger med rivaliserende familier og fjender. Han indgår aftaler på familiens vegne, holder konflikter under kontrol og sørger for, at familiens interesser altid kommer først.',
      personality:
        'Ascanio er imponerende karismatisk, men temperamentsfuld, selvsikker og loyal over for dem, han holder af. Han har kort lunte og finder sig sjældent i provokationer. Han er beskyttende over for sin familie og tager ikke let på trusler mod sine nærmeste. Han handler ofte først og tænker bagefter, hvilket både kan være hans største styrke og svaghed.',
      reputation:
        'Familiens frygtløse beskytter. Han er kendt for sit temperament og sin kompromisløse loyalitet. Hvis man lægger sig ud med Ascanio, lægger man sig ud med hele familien.',
      quote: 'Jeg advarer kun én gang. Næste gang er det ikke ord, du får.',
      traits: ['Karismatisk', 'Temperamentsfuld', 'Beskytter']
    },
    {
      id: 'sebastian',
      mafiaName: 'Sebastiano Di Legno',
      realName: 'Sebastian',
      title: 'Lejemorder, fixer & oprydder',
      generation: 2,
      status: 'alive',
      monogram: 'SD',
      relationSummary: 'Søn af Lorenzo og Vannissa · Bror til Ascanio og Cristiano · Fætter til Matilda, Fredericca og Giacomo',
      position:
        'Familiens lejemorder, fixer og professionelle oprydder. Sebastiano er manden, der tager sig af de mest beskidte opgaver. Når familien har et problem, der ikke må efterlade spor, er det ham, der bliver tilkaldt.',
      personality:
        'Sebastiano er koldblodig, rolig, maskulin og frygtløs, men også mystisk og intimiderende. Han lader sig ikke styre af følelser og bevarer altid overblikket, selv når situationen spidser til. Han er fåmælt, loyal og ekstremt diskret. Han stiller sjældent spørgsmål og gør, hvad der bliver forventet af ham.',
      reputation:
        'Familiens farligste mand. Han er kendt for at være effektiv, diskret og kompromisløs. Ingen uden for familien ønsker at få hans opmærksomhed, for det betyder sjældent noget godt.',
      quote: 'Du skal ikke bekymre dig om detaljerne. Bare sørg for, at ingen stiller spørgsmål. Jeg klarer den.',
      traits: ['Koldblodig', 'Diskret', 'Fixer']
    },
    {
      id: 'christian',
      mafiaName: 'Cristiano Di Legno',
      realName: 'Christian',
      title: 'Familiens fortrolige & fredsmægler',
      generation: 2,
      status: 'alive',
      monogram: 'CR',
      relationSummary: 'Søn af Lorenzo og Vannissa · Bror til Ascanio og Sebastiano · Fætter til Matilda, Fredericca og Giacomo',
      position:
        'Familiens fortrolige og fredsmægler. Han er familiens rolige samlingspunkt og den, alle går til, når de har brug for en at tale med. Han lytter, giver gode råd og forsøger at skabe ro, men bliver alligevel altid trukket ind i familiens konflikter.',
      personality:
        'Cristiano er rolig, venlig, sød, charmerende og omsorgsfuld. Han er imødekommende, god til at lytte, give råd og en person, man trygt kan betro sig til. Han hader konflikter og forsøger altid at se det bedste i andre.',
      reputation:
        'Familiens gode hjerte. Han er vellidt af alle og kendt som den fornuftige mand, der helst holder sig uden for familiens beskidte forretninger. Ingen ved dog altid, hvor han er, eller hvad han foretager sig.',
      quote: 'Jeg ønsker ikke problemer. Jeg ønsker bare, at vi alle kan leve i fred. Men det er åbenbart for meget at bede om i denne familie.',
      traits: ['Fredsmægler', 'Fortrolig', 'Omsorgsfuld']
    },
    {
      id: 'jacob',
      mafiaName: 'Giacomo Di Legno',
      realName: 'Jacob',
      title: 'Playboy, charmør & narkohandler',
      generation: 2,
      status: 'alive',
      monogram: 'JD',
      relationSummary: 'Søn af Guglielmo · Nevø til Don Christofo og afdøde Lorenzo · Fætter til Matilda, Fredericca, Ascanio, Sebastiano og Cristiano',
      position:
        'Familiens charmetrold og velkendte playboy og narkohandler. Han er ofte at finde blandt de fine selskaber og kvinderne, hvor han plejer sine forbindelser og sørger for, at hans eget navn bliver husket.',
      personality:
        'Giacomo er udadvendt, selvsikker, risikovillig og uimodståeligt charmerende. Han elsker opmærksomhed og har en særlig evne til at tale sig ud af selv de mest besværlige situationer. Han er spontan, eventyrlysten og har svært ved at tage livet alt for alvorligt. Men lad dig ikke narre af hans afslappede attitude — han ved udmærket godt hvad der foregår, og hvordan man får sin vilje.',
      reputation:
        'Familiens store flirt og festens naturlige midtpunkt. Han har ry for at have en kvinde i hver havn og en undskyldning til enhver situation. Ikke alle tager ham alvorligt, men det er muligvis den største fejl man kan lave.',
      quote: 'Jeg lover aldrig noget, jeg ikke kan slippe godt fra.',
      traits: ['Charmerende', 'Risikovillig', 'Playboy']
    }
  ],

  relations: [
    // Ægteskaber i 1. generation
    { from: 'christopher', to: 'anne', type: 'marriage', label: 'Ægtefæller' },
    { from: 'lorenzo', to: 'vanni', type: 'marriage', label: 'Ægtefæller' },

    // De tre Di Legno-brødre i 1. generation
    { from: 'christopher', to: 'lorenzo', type: 'sibling', label: 'Brødre' },
    { from: 'lorenzo', to: 'willy', type: 'sibling', label: 'Brødre' },

    // Don Christofo & Donna Anna Sophias døtre
    { from: ['christopher', 'anne'], to: 'tilde', type: 'parent', label: 'Forældre / Datter' },
    { from: ['christopher', 'anne'], to: 'freddy', type: 'parent', label: 'Forældre / Datter' },
    { from: 'tilde', to: 'freddy', type: 'sibling', label: 'Søstre' },

    // Lorenzo & Vannissas tre sønner
    { from: ['lorenzo', 'vanni'], to: 'aske', type: 'parent', label: 'Forældre / Søn' },
    { from: ['lorenzo', 'vanni'], to: 'sebastian', type: 'parent', label: 'Forældre / Søn' },
    { from: ['lorenzo', 'vanni'], to: 'christian', type: 'parent', label: 'Forældre / Søn' },
    { from: 'aske', to: 'sebastian', type: 'sibling', label: 'Brødre' },
    { from: 'sebastian', to: 'christian', type: 'sibling', label: 'Brødre' },

    // Guglielmos søn
    { from: 'willy', to: 'jacob', type: 'parent', label: 'Far / Søn' }
  ]
};
