import { Categorie } from '@/types/product'

const IMG = {
  rolls:   'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800&q=85',
  nigiri:  'https://images.unsplash.com/photo-1562802378-063ec186a863?w=800&q=85',
  closeup: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=85',
  box:     'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=800&q=85',
  poke:    'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=85',
  soup:    'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=85',
  mochi:   'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=85',
  drinks:  'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=85',
}

export const categories: Categorie[] = [
  { id: 'voorgerechten',    naam: 'Voorgerechten',      beschrijving: 'Edamame, loempia, gyoza, dim sum en meer', afbeelding: IMG.soup,    volgorde: 1,  beschikbaar: true },
  { id: 'soepen',           naam: 'Soepen',              beschrijving: 'Wantan soep en Tom Yam Kung',              afbeelding: IMG.soup,    volgorde: 2,  beschikbaar: true },
  { id: 'salades',          naam: 'Salades',             beschrijving: 'Zeewier, krab avocado en vis salades',     afbeelding: IMG.nigiri,  volgorde: 3,  beschikbaar: true },
  { id: 'wok',              naam: 'Wok',                 beschrijving: 'Gebakken rijst of noedels met keuze vlees', afbeelding: IMG.poke,   volgorde: 4,  beschikbaar: true },
  { id: 'pad-thai',         naam: 'Pad Thai',            beschrijving: 'Platte rijstnoedels met keuze vlees',      afbeelding: IMG.poke,    volgorde: 5,  beschikbaar: true },
  { id: 'curry',            naam: 'Curry',               beschrijving: 'Rode, groene of massaman curry met rijst', afbeelding: IMG.poke,    volgorde: 6,  beschikbaar: true },
  { id: 'poke',             naam: 'Poké Bowl',           beschrijving: 'Hawaiiaanse bowl met rijst en verse toppings', afbeelding: IMG.poke, volgorde: 7, beschikbaar: true },
  { id: 'nigiri',           naam: 'Nigiri (2st)',         beschrijving: 'Handgevormd rijstballetje met verse vis',  afbeelding: IMG.nigiri,  volgorde: 8,  beschikbaar: true },
  { id: 'sashimi',          naam: 'Sashimi (4st)',        beschrijving: 'Verse dun gesneden vis zonder rijst',      afbeelding: IMG.nigiri,  volgorde: 9,  beschikbaar: true },
  { id: 'handroll',         naam: 'Handroll',            beschrijving: 'Kegelvormige sushi rol',                   afbeelding: IMG.rolls,   volgorde: 10, beschikbaar: true },
  { id: 'hosomaki',         naam: 'Hosomaki (8st)',       beschrijving: 'Dunne klassieke maki rolletjes',           afbeelding: IMG.rolls,   volgorde: 11, beschikbaar: true },
  { id: 'in-out-roll',      naam: 'In/Out Roll (8st)',    beschrijving: 'Inside-out rolls met avocado',             afbeelding: IMG.rolls,   volgorde: 12, beschikbaar: true },
  { id: 'crunchy-rolls',    naam: 'Crunchy Rolls (8st)', beschrijving: 'Binnenkant gefrituurd',                    afbeelding: IMG.closeup, volgorde: 13, beschikbaar: true },
  { id: 'futomaki',         naam: 'Futomaki (6st)',       beschrijving: 'Dikke gevulde maki rollen',                afbeelding: IMG.closeup, volgorde: 14, beschikbaar: true },
  { id: 'gefrituurde-rolls',naam: 'Gefrituurde Rolls (8st)', beschrijving: 'Volledig gefrituurde sushi rollen',    afbeelding: IMG.closeup, volgorde: 15, beschikbaar: true },
  { id: 'special-rolls',    naam: 'Special Rolls (8st)', beschrijving: 'Huisspecialiteiten en signature rolls',    afbeelding: IMG.box,     volgorde: 16, beschikbaar: true },
  { id: 'combo',            naam: 'Combo Menu',          beschrijving: 'Curated combinaties voor elke smaak',      afbeelding: IMG.box,     volgorde: 17, beschikbaar: true },
  { id: 'boot',             naam: 'Boot Menu',           beschrijving: 'Grote selecties voor meerdere personen',   afbeelding: IMG.box,     volgorde: 18, beschikbaar: true },
  { id: 'dranken',          naam: 'Dranken',             beschrijving: 'Water, frisdranken, bier en sake',         afbeelding: IMG.drinks,  volgorde: 19, beschikbaar: true },
  { id: 'wijnen',           naam: 'Wijnen & Bubbels',    beschrijving: 'Witte wijn, rode wijn, rosé en cava',      afbeelding: IMG.drinks,  volgorde: 20, beschikbaar: true },
  { id: 'desserts',         naam: 'Desserts',            beschrijving: 'Japanse mochies',                          afbeelding: IMG.mochi,   volgorde: 21, beschikbaar: true },
]
