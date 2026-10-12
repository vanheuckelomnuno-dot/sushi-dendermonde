import { Product } from '@/types/product'

const F = {
  fryCmbo:       '/gerechten/fry-combo.jpg',
  heatRoll:      '/gerechten/heat-roll.jpg',
  vegiCmbo:      '/gerechten/vegi-combo.jpg',
  sweetRoll:     '/gerechten/sweet-roll.jpg',
  sashTonijn:    '/gerechten/sashimi-tonijn.jpg',
  futoVegi:      '/gerechten/futo-vegi.jpg',
  inOutVegi:     '/gerechten/in-out-vegi.jpg',
  greenRainbow:  '/gerechten/green-rainbow.jpg',
  sashZalm:      '/gerechten/sashimi-zalm.jpg',
  kipDragon:     '/gerechten/kip-dragon-eye.jpg',
  nigFlamed:     '/gerechten/nigiri-flamed-zalm.jpg',
  hosoZalm:      '/gerechten/hosomaki-zalm.jpg',
  hosoZalm2:     '/gerechten/hosomaki-zalm-2.jpg',
  boot2p:        '/gerechten/boot-2p.jpg',
  belgieFuto:    '/gerechten/belgie-futo.jpg',
  mixCmbo:       '/gerechten/mix-combo.jpg',
  inOutTonijn:   '/gerechten/in-out-tonijn.jpg',
  dragonEye:     '/gerechten/dragon-eye.jpg',
  scampiDragon:  '/gerechten/scampi-dragon-eye.jpg',
  rainbow:       '/gerechten/rainbow.jpg',
  rockRoll:      '/gerechten/rock-roll.jpg',
  inOutZalm:     '/gerechten/in-out-zalm.jpg',
  nigTonijn:     '/gerechten/nigiri-tonijn.jpg',
  nigZalm:       '/gerechten/nigiri-zalm.jpg',
  marinRoll:     '/gerechten/marin-roll.jpg',
  glitterRoll:   '/gerechten/glitter-roll.jpg',
  dynamiteRoll:  '/gerechten/dynamite-roll.jpg',
  spicyTuna:     '/gerechten/spicy-tuna.jpg',
  pinkLady:      '/gerechten/pink-lady.jpg',
  tokyoRoll:     '/gerechten/tokyo-roll.jpg',
  samaRoll:      '/gerechten/sama-roll.jpg',
  kamikazeZalm:  '/gerechten/kamikaze-zalm.jpg',
}

export const products: Product[] = [
  // VOORGERECHTEN
  { id: 'vg-001', naam: 'Edamame', beschrijving: 'Gestoomde edamamebonen met zeezout', prijs: 5, categorie: 'voorgerechten', ingredienten: ['Edamame', 'Zeezout'], allergenen: ['soja'], beschikbaar: true, labels: ['populair'] },
  { id: 'vg-002', naam: 'Loempia Veg. (6st)', beschrijving: 'Knapperige vegetarische loempia', prijs: 6, categorie: 'voorgerechten', ingredienten: ['Groenten', 'Deeg'], allergenen: ['gluten'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'vg-003', naam: 'Loempia Kip (6st)', beschrijving: 'Knapperige loempia met kip', prijs: 7, categorie: 'voorgerechten', ingredienten: ['Kip', 'Groenten', 'Deeg'], allergenen: ['gluten'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'vg-004', naam: 'Kip Saté (2st)', beschrijving: 'Gegrilde kipspiesjes met pindasaus', prijs: 6, categorie: 'voorgerechten', ingredienten: ['Kip', 'Pindasaus'], allergenen: ['pinda', 'soja'], beschikbaar: true, labels: [], stuks: 2 },
  { id: 'vg-005', naam: 'Gyoza Kip (6st)', beschrijving: 'Japanse dumplings met kip', prijs: 7, categorie: 'voorgerechten', ingredienten: ['Kip', 'Kool', 'Gember'], allergenen: ['gluten', 'soja'], beschikbaar: true, labels: ['populair'], stuks: 6,
    opties: [{ id: 'gyoza-bereid', naam: 'Bereidingswijze', verplicht: true, keuzes: [{ id: 'gepaneerd', naam: 'Gepaneerd', meerprijs: 0 }, { id: 'gestoomd', naam: 'Gestoomd', meerprijs: 0 }] }] },
  { id: 'vg-006', naam: 'Dimsum Kip (6st)', beschrijving: 'Gestoomde dim sum met kip', prijs: 7, categorie: 'voorgerechten', ingredienten: ['Kip', 'Deeg'], allergenen: ['gluten', 'soja'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'vg-007', naam: 'Dimsum Scampi (6st)', beschrijving: 'Gestoomde dim sum met scampi', prijs: 7, categorie: 'voorgerechten', ingredienten: ['Scampi', 'Deeg'], allergenen: ['schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'vg-008', naam: 'Dimsum Krab (6st)', beschrijving: 'Gestoomde dim sum met krab', prijs: 7, categorie: 'voorgerechten', ingredienten: ['Krab', 'Deeg'], allergenen: ['schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'vg-009', naam: 'Dim-Sum Mix (6st)', beschrijving: 'Mix van kip, scampi en krab dim sum', prijs: 8, categorie: 'voorgerechten', ingredienten: ['Kip', 'Scampi', 'Krab', 'Deeg'], allergenen: ['schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'vg-010', naam: 'Ebi Fried (4st)', beschrijving: 'Gefrituurde garnalen', prijs: 8, categorie: 'voorgerechten', ingredienten: ['Garnaal', 'Tempura deeg'], allergenen: ['schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 4 },
  { id: 'vg-011', naam: 'Popcorn Scampi', beschrijving: 'Knapperige popcorn scampi', prijs: 10, categorie: 'voorgerechten', ingredienten: ['Scampi', 'Tempura deeg'], allergenen: ['schaaldieren', 'gluten'], beschikbaar: true, labels: ['populair'] },
  { id: 'vg-012', naam: 'Tempura Mix (10st)', beschrijving: 'Zalm, tonijn, kip en groenten in tempura', prijs: 12, categorie: 'voorgerechten', ingredienten: ['Zalm', 'Tonijn', 'Kip', 'Groenten', 'Tempura deeg'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: [], stuks: 10 },
  { id: 'vg-013', naam: 'Karage (5st)', beschrijving: 'Gefrituurde kip Japanse stijl', prijs: 9, categorie: 'voorgerechten', ingredienten: ['Kip', 'Sojasaus', 'Gember', 'Knoflook'], allergenen: ['gluten', 'soja'], beschikbaar: true, labels: [], stuks: 5 },
  { id: 'vg-014', naam: 'Nepalese Gestoomde Momo (6st)', beschrijving: 'Nepalese gestoomde dumplings', prijs: 10, categorie: 'voorgerechten', ingredienten: ['Vlees', 'Deeg', 'Kruiden'], allergenen: ['gluten'], beschikbaar: true, labels: ['nieuw'], stuks: 6 },

  // SOEPEN
  { id: 'sp-001', naam: 'Wantan Soep', beschrijving: 'Traditionele wantan soep met dumplings', prijs: 6, categorie: 'soepen', ingredienten: ['Wantan', 'Bouillon', 'Lente-ui'], allergenen: ['gluten', 'soja'], beschikbaar: true, labels: ['populair'] },
  { id: 'sp-002', naam: 'Tom Yam Kung (scampi)', beschrijving: 'Pittige Thaise soep met scampi', prijs: 7, categorie: 'soepen', ingredienten: ['Scampi', 'Citroengras', 'Kokosmelk', 'Chilipeper'], allergenen: ['schaaldieren'], beschikbaar: true, labels: [] },

  // SALADES
  { id: 'sl-001', naam: 'Zeewier Salade', beschrijving: 'Verse zeewier salade', prijs: 6, categorie: 'salades', ingredienten: ['Wakame', 'Sesam', 'Rijstazijn'], allergenen: ['soja', 'sesam'], beschikbaar: true, labels: [] },
  { id: 'sl-002', naam: 'Zeewier Salade met Avocado', beschrijving: 'Zeewier salade met romige avocado', prijs: 7, categorie: 'salades', ingredienten: ['Wakame', 'Avocado', 'Sesam'], allergenen: ['soja', 'sesam'], beschikbaar: true, labels: [] },
  { id: 'sl-003', naam: 'Krab Avocado Salade', beschrijving: 'Verse krab met avocado en dressing', prijs: 8, categorie: 'salades', ingredienten: ['Krab', 'Avocado', 'Mayo'], allergenen: ['schaaldieren', 'eieren'], beschikbaar: true, labels: ['populair'] },
  { id: 'sl-004', naam: 'Sake Butshu (zalm)', beschrijving: 'Verse zalm sashimi salade', prijs: 10, categorie: 'salades', ingredienten: ['Zalm', 'Sla', 'Dressing'], allergenen: ['vis'], beschikbaar: true, labels: [] },
  { id: 'sl-005', naam: 'Maguro Butshu (tonijn)', beschrijving: 'Verse tonijn sashimi salade', prijs: 12, categorie: 'salades', ingredienten: ['Tonijn', 'Sla', 'Dressing'], allergenen: ['vis'], beschikbaar: true, labels: [] },

  // WOK
  { id: 'wk-001', naam: 'Wok Veg.', beschrijving: 'Gebakken rijst of noedels met groenten', prijs: 12, categorie: 'wok', ingredienten: ['Groenten', 'Rijst/Noedels', 'Sojasaus'], allergenen: ['gluten', 'soja'], beschikbaar: true, labels: [],
    opties: [{ id: 'wok-basis', naam: 'Basis', verplicht: true, keuzes: [{ id: 'rijst', naam: 'Gebakken rijst', meerprijs: 0 }, { id: 'noedels', naam: 'Gebakken noedels', meerprijs: 0 }] }] },
  { id: 'wk-002', naam: 'Wok Kip', beschrijving: 'Gebakken rijst of noedels met kip', prijs: 13, categorie: 'wok', ingredienten: ['Kip', 'Rijst/Noedels', 'Sojasaus'], allergenen: ['gluten', 'soja'], beschikbaar: true, labels: ['populair'],
    opties: [{ id: 'wok-basis', naam: 'Basis', verplicht: true, keuzes: [{ id: 'rijst', naam: 'Gebakken rijst', meerprijs: 0 }, { id: 'noedels', naam: 'Gebakken noedels', meerprijs: 0 }] }] },
  { id: 'wk-003', naam: 'Wok Rund', beschrijving: 'Gebakken rijst of noedels met rund', prijs: 14, categorie: 'wok', ingredienten: ['Rundsvlees', 'Rijst/Noedels', 'Sojasaus'], allergenen: ['gluten', 'soja'], beschikbaar: true, labels: [],
    opties: [{ id: 'wok-basis', naam: 'Basis', verplicht: true, keuzes: [{ id: 'rijst', naam: 'Gebakken rijst', meerprijs: 0 }, { id: 'noedels', naam: 'Gebakken noedels', meerprijs: 0 }] }] },
  { id: 'wk-004', naam: 'Wok Scampi', beschrijving: 'Gebakken rijst of noedels met scampi', prijs: 14, categorie: 'wok', ingredienten: ['Scampi', 'Rijst/Noedels', 'Sojasaus'], allergenen: ['schaaldieren', 'gluten', 'soja'], beschikbaar: true, labels: [],
    opties: [{ id: 'wok-basis', naam: 'Basis', verplicht: true, keuzes: [{ id: 'rijst', naam: 'Gebakken rijst', meerprijs: 0 }, { id: 'noedels', naam: 'Gebakken noedels', meerprijs: 0 }] }] },

  // PAD THAI
  { id: 'pt-001', naam: 'Pad Thai Groentemix', beschrijving: 'Platte rijstnoedels met groenten', prijs: 12, categorie: 'pad-thai', ingredienten: ['Groenten', 'Rijstnoedels', 'Tamarinde', 'Pinda'], allergenen: ['pinda', 'gluten'], beschikbaar: true, labels: [] },
  { id: 'pt-002', naam: 'Pad Thai Kip', beschrijving: 'Platte rijstnoedels met kip', prijs: 13, categorie: 'pad-thai', ingredienten: ['Kip', 'Rijstnoedels', 'Tamarinde', 'Pinda'], allergenen: ['pinda', 'gluten'], beschikbaar: true, labels: ['populair'] },
  { id: 'pt-003', naam: 'Pad Thai Rundsvlees', beschrijving: 'Platte rijstnoedels met rund', prijs: 14, categorie: 'pad-thai', ingredienten: ['Rundsvlees', 'Rijstnoedels', 'Tamarinde', 'Pinda'], allergenen: ['pinda', 'gluten'], beschikbaar: true, labels: [] },
  { id: 'pt-004', naam: 'Pad Thai Scampi', beschrijving: 'Platte rijstnoedels met scampi', prijs: 14, categorie: 'pad-thai', ingredienten: ['Scampi', 'Rijstnoedels', 'Tamarinde', 'Pinda'], allergenen: ['schaaldieren', 'pinda', 'gluten'], beschikbaar: true, labels: [] },

  // CURRY
  { id: 'cy-001', naam: 'Rode Curry Veg.', beschrijving: 'Rode curry met groenten en witte rijst', prijs: 14, categorie: 'curry', ingredienten: ['Groenten', 'Rode curry', 'Kokosmelk', 'Witte rijst'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'cy-002', naam: 'Rode Curry Kip', beschrijving: 'Rode curry met kip en witte rijst', prijs: 15, categorie: 'curry', ingredienten: ['Kip', 'Rode curry', 'Kokosmelk', 'Witte rijst'], allergenen: [], beschikbaar: true, labels: ['populair'] },
  { id: 'cy-003', naam: 'Rode Curry Scampi', beschrijving: 'Rode curry met scampi en witte rijst', prijs: 16, categorie: 'curry', ingredienten: ['Scampi', 'Rode curry', 'Kokosmelk', 'Witte rijst'], allergenen: ['schaaldieren'], beschikbaar: true, labels: [] },
  { id: 'cy-004', naam: 'Groene Curry Veg.', beschrijving: 'Groene curry met groenten en witte rijst', prijs: 14, categorie: 'curry', ingredienten: ['Groenten', 'Groene curry', 'Kokosmelk', 'Witte rijst'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'cy-005', naam: 'Groene Curry Kip', beschrijving: 'Groene curry met kip en witte rijst', prijs: 15, categorie: 'curry', ingredienten: ['Kip', 'Groene curry', 'Kokosmelk', 'Witte rijst'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'cy-006', naam: 'Groene Curry Scampi', beschrijving: 'Groene curry met scampi en witte rijst', prijs: 16, categorie: 'curry', ingredienten: ['Scampi', 'Groene curry', 'Kokosmelk', 'Witte rijst'], allergenen: ['schaaldieren'], beschikbaar: true, labels: [] },
  { id: 'cy-007', naam: 'Massaman Curry Veg.', beschrijving: 'Massaman curry met groenten en witte rijst', prijs: 14, categorie: 'curry', ingredienten: ['Groenten', 'Massaman curry', 'Kokosmelk', 'Aardappel', 'Witte rijst'], allergenen: ['pinda'], beschikbaar: true, labels: [] },
  { id: 'cy-008', naam: 'Massaman Curry Kip', beschrijving: 'Massaman curry met kip en witte rijst', prijs: 15, categorie: 'curry', ingredienten: ['Kip', 'Massaman curry', 'Kokosmelk', 'Aardappel', 'Witte rijst'], allergenen: ['pinda'], beschikbaar: true, labels: [] },
  { id: 'cy-009', naam: 'Massaman Curry Scampi', beschrijving: 'Massaman curry met scampi en witte rijst', prijs: 16, categorie: 'curry', ingredienten: ['Scampi', 'Massaman curry', 'Kokosmelk', 'Aardappel', 'Witte rijst'], allergenen: ['schaaldieren', 'pinda'], beschikbaar: true, labels: [] },

  // POKÉ BOWL
  { id: 'pk-001', naam: 'Vegan Poké Bowl', beschrijving: 'Rijst, avocado, edamame, zeewier, komkommer, wortel', prijs: 10, categorie: 'poke', ingredienten: ['Rijst', 'Avocado', 'Edamame', 'Zeewier', 'Komkommer', 'Wortel'], allergenen: ['soja', 'sesam'], beschikbaar: true, labels: [] },
  { id: 'pk-002', naam: 'Kip Poké Bowl', beschrijving: 'Rijst, avocado, tempura kip, edamame, zeewier, komkommer, wortel', prijs: 12, categorie: 'poke', ingredienten: ['Rijst', 'Kip', 'Avocado', 'Edamame', 'Zeewier'], allergenen: ['gluten', 'soja', 'sesam'], beschikbaar: true, labels: [] },
  { id: 'pk-003', naam: 'Zalm Poké Bowl', beschrijving: 'Rijst, avocado, zalm, edamame, zeewier, komkommer, wortel', prijs: 14, categorie: 'poke', ingredienten: ['Rijst', 'Zalm', 'Avocado', 'Edamame', 'Zeewier'], allergenen: ['vis', 'soja', 'sesam'], beschikbaar: true, labels: ['populair'] },
  { id: 'pk-004', naam: 'Tonijn Poké Bowl', beschrijving: 'Rijst, avocado, tonijn, edamame, zeewier, komkommer, wortel', prijs: 15, categorie: 'poke', ingredienten: ['Rijst', 'Tonijn', 'Avocado', 'Edamame', 'Zeewier'], allergenen: ['vis', 'soja', 'sesam'], beschikbaar: true, labels: [] },
  { id: 'pk-005', naam: 'Scampi Poké Bowl', beschrijving: 'Rijst, avocado, tempura scampi, edamame, zeewier, komkommer, wortel', prijs: 16, categorie: 'poke', ingredienten: ['Rijst', 'Scampi', 'Avocado', 'Edamame', 'Zeewier'], allergenen: ['schaaldieren', 'gluten', 'soja'], beschikbaar: true, labels: [] },
  { id: 'pk-006', naam: 'Mix Poké Bowl', beschrijving: 'Rijst, avocado, zalm, tonijn, krab, edamame, zeewier, komkommer, wortel', prijs: 19, categorie: 'poke', ingredienten: ['Rijst', 'Zalm', 'Tonijn', 'Krab', 'Avocado', 'Edamame'], allergenen: ['vis', 'schaaldieren', 'soja'], beschikbaar: true, labels: ['populair', 'bestseller'] },

  // NIGIRI (2ST)
  { id: 'ni-001', naam: 'Nigiri Zalm (2st)', beschrijving: 'Verse zalm op handgevormd sushirijst', prijs: 4, afbeelding: F.nigZalm, categorie: 'nigiri', ingredienten: ['Zalm', 'Sushirijst'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: ['populair'], stuks: 2 },
  { id: 'ni-002', naam: 'Nigiri Tonijn (2st)', beschrijving: 'Premium tonijn op sushirijst', prijs: 5, afbeelding: F.nigTonijn, categorie: 'nigiri', ingredienten: ['Tonijn', 'Sushirijst'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: [], stuks: 2 },
  { id: 'ni-003', naam: 'Nigiri Flamed Zalm (2st)', beschrijving: 'Geflambeerde zalm op sushirijst', prijs: 5, afbeelding: F.nigFlamed, categorie: 'nigiri', ingredienten: ['Zalm', 'Sushirijst'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: ['populair'], stuks: 2 },
  { id: 'ni-004', naam: 'Nigiri Garnaal (2st)', beschrijving: 'Gekookte garnaal op sushirijst', prijs: 4, categorie: 'nigiri', ingredienten: ['Garnaal', 'Sushirijst'], allergenen: ['schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 2 },
  { id: 'ni-005', naam: 'Nigiri Paling (2st)', beschrijving: 'Gegrilde paling met unagi saus op sushirijst', prijs: 5, categorie: 'nigiri', ingredienten: ['Paling', 'Unagi saus', 'Sushirijst'], allergenen: ['vis', 'gluten', 'soja'], beschikbaar: true, labels: [], stuks: 2 },
  { id: 'ni-006', naam: 'Nigiri Krab (2st)', beschrijving: 'Krab op sushirijst', prijs: 5, categorie: 'nigiri', ingredienten: ['Krab', 'Sushirijst'], allergenen: ['schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 2 },
  { id: 'ni-007', naam: 'Nigiri Tamago (2st)', beschrijving: 'Zoet ei-omelet op sushirijst', prijs: 4, categorie: 'nigiri', ingredienten: ['Tamago', 'Sushirijst'], allergenen: ['eieren', 'gluten'], beschikbaar: true, labels: [], stuks: 2 },

  // SASHIMI (4ST)
  { id: 'sa-001', naam: 'Sashimi Zalm (4st)', beschrijving: 'Verse dun gesneden zalm', prijs: 6, afbeelding: F.sashZalm, categorie: 'sashimi', ingredienten: ['Zalm'], allergenen: ['vis'], beschikbaar: true, labels: ['populair'], stuks: 4 },
  { id: 'sa-002', naam: 'Sashimi Tonijn (4st)', beschrijving: 'Premium dun gesneden tonijn', prijs: 7, afbeelding: F.sashTonijn, categorie: 'sashimi', ingredienten: ['Tonijn'], allergenen: ['vis'], beschikbaar: true, labels: [], stuks: 4 },
  { id: 'sa-003', naam: 'Sashimi Zalm/Tonijn (4st)', beschrijving: 'Mix van zalm en tonijn sashimi', prijs: 6.5, categorie: 'sashimi', ingredienten: ['Zalm', 'Tonijn'], allergenen: ['vis'], beschikbaar: true, labels: [], stuks: 4 },
  { id: 'sa-004', naam: 'Sashimi Tamago (4st)', beschrijving: 'Dun gesneden tamago', prijs: 6, categorie: 'sashimi', ingredienten: ['Tamago'], allergenen: ['eieren'], beschikbaar: true, labels: [], stuks: 4 },
  { id: 'sa-005', naam: 'Sashimi Paling (4st)', beschrijving: 'Gegrilde paling sashimi', prijs: 8, categorie: 'sashimi', ingredienten: ['Paling'], allergenen: ['vis'], beschikbaar: true, labels: [], stuks: 4 },
  { id: 'sa-006', naam: 'Sashimi Garnaal (4st)', beschrijving: 'Verse garnaal sashimi', prijs: 7, categorie: 'sashimi', ingredienten: ['Garnaal'], allergenen: ['schaaldieren'], beschikbaar: true, labels: [], stuks: 4 },
  { id: 'sa-007', naam: 'Sashimi Mix (16st)', beschrijving: 'Grote mix selectie sashimi', prijs: 20, categorie: 'sashimi', ingredienten: ['Zalm', 'Tonijn', 'Paling', 'Garnaal'], allergenen: ['vis', 'schaaldieren'], beschikbaar: true, labels: ['bestseller'], stuks: 16 },

  // HANDROLL
  { id: 'hr-001', naam: 'Handroll Vegetarisch', beschrijving: 'Kegelvormige sushi met groenten', prijs: 6, categorie: 'handroll', ingredienten: ['Groenten', 'Sushirijst', 'Nori'], allergenen: ['gluten', 'sesam'], beschikbaar: true, labels: [] },
  { id: 'hr-002', naam: 'Handroll Zalm', beschrijving: 'Kegelvormige sushi met zalm', prijs: 7, categorie: 'handroll', ingredienten: ['Zalm', 'Sushirijst', 'Nori'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: ['populair'] },
  { id: 'hr-003', naam: 'Handroll Tonijn', beschrijving: 'Kegelvormige sushi met tonijn', prijs: 8, categorie: 'handroll', ingredienten: ['Tonijn', 'Sushirijst', 'Nori'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: [] },
  { id: 'hr-004', naam: 'Handroll Krab', beschrijving: 'Kegelvormige sushi met krab', prijs: 6, categorie: 'handroll', ingredienten: ['Krab', 'Sushirijst', 'Nori'], allergenen: ['schaaldieren', 'gluten'], beschikbaar: true, labels: [] },
  { id: 'hr-005', naam: 'Handroll Scampi', beschrijving: 'Kegelvormige sushi met scampi', prijs: 7, categorie: 'handroll', ingredienten: ['Scampi', 'Sushirijst', 'Nori'], allergenen: ['schaaldieren', 'gluten'], beschikbaar: true, labels: [] },
  { id: 'hr-006', naam: 'Handroll Kip', beschrijving: 'Kegelvormige sushi met kip', prijs: 7, categorie: 'handroll', ingredienten: ['Kip', 'Sushirijst', 'Nori'], allergenen: ['gluten'], beschikbaar: true, labels: [] },

  // HOSOMAKI (8ST)
  { id: 'hm-001', naam: 'Hosomaki Zalm (8st)', beschrijving: 'Klassieke dunne maki met zalm', prijs: 6.5, afbeelding: F.hosoZalm, categorie: 'hosomaki', ingredienten: ['Zalm', 'Sushirijst', 'Nori'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: ['populair'], stuks: 8 },
  { id: 'hm-002', naam: 'Hosomaki Tonijn (8st)', beschrijving: 'Klassieke dunne maki met tonijn', prijs: 7, afbeelding: F.hosoZalm2, categorie: 'hosomaki', ingredienten: ['Tonijn', 'Sushirijst', 'Nori'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'hm-003', naam: 'Hosomaki Scampi (8st)', beschrijving: 'Klassieke dunne maki met scampi', prijs: 7, categorie: 'hosomaki', ingredienten: ['Scampi', 'Sushirijst', 'Nori'], allergenen: ['schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'hm-004', naam: 'Hosomaki Krab (8st)', beschrijving: 'Klassieke dunne maki met krab', prijs: 6, categorie: 'hosomaki', ingredienten: ['Krab', 'Sushirijst', 'Nori'], allergenen: ['schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'hm-005', naam: 'Hosomaki Tamago (8st)', beschrijving: 'Klassieke dunne maki met tamago', prijs: 5, categorie: 'hosomaki', ingredienten: ['Tamago', 'Sushirijst', 'Nori'], allergenen: ['eieren', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'hm-006', naam: 'Hosomaki Mango (8st)', beschrijving: 'Zoete maki met mango', prijs: 5, categorie: 'hosomaki', ingredienten: ['Mango', 'Sushirijst', 'Nori'], allergenen: ['gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'hm-007', naam: 'Hosomaki Avocado (8st)', beschrijving: 'Romige maki met avocado', prijs: 5, categorie: 'hosomaki', ingredienten: ['Avocado', 'Sushirijst', 'Nori'], allergenen: ['gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'hm-008', naam: 'Hosomaki Komkommer (8st)', beschrijving: 'Frisse maki met komkommer', prijs: 5, categorie: 'hosomaki', ingredienten: ['Komkommer', 'Sushirijst', 'Nori'], allergenen: ['gluten'], beschikbaar: true, labels: [], stuks: 8 },

  // IN/OUT ROLL (8ST)
  { id: 'io-001', naam: 'Veggie Roll (8st)', beschrijving: 'Inside-out roll met avocado en groenten', prijs: 7, afbeelding: F.inOutVegi, categorie: 'in-out-roll', ingredienten: ['Groenten', 'Avocado', 'Sushirijst'], allergenen: ['gluten', 'sesam'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'io-002', naam: 'In/Out Zalm (8st)', beschrijving: 'Inside-out roll met zalm en avocado', prijs: 8, afbeelding: F.inOutZalm, categorie: 'in-out-roll', ingredienten: ['Zalm', 'Avocado', 'Sushirijst'], allergenen: ['vis', 'gluten', 'sesam'], beschikbaar: true, labels: ['populair'], stuks: 8 },
  { id: 'io-003', naam: 'In/Out Tonijn (8st)', beschrijving: 'Inside-out roll met tonijn en avocado', prijs: 9, afbeelding: F.inOutTonijn, categorie: 'in-out-roll', ingredienten: ['Tonijn', 'Avocado', 'Sushirijst'], allergenen: ['vis', 'gluten', 'sesam'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'io-004', naam: 'In/Out Krab (8st)', beschrijving: 'Inside-out roll met krab en avocado', prijs: 7, categorie: 'in-out-roll', ingredienten: ['Krab', 'Avocado', 'Sushirijst'], allergenen: ['schaaldieren', 'gluten', 'sesam'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'io-005', naam: 'In/Out Kip (8st)', beschrijving: 'Inside-out roll met kip en avocado', prijs: 8, categorie: 'in-out-roll', ingredienten: ['Kip', 'Avocado', 'Sushirijst'], allergenen: ['gluten', 'sesam'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'io-006', naam: 'In/Out Scampi (8st)', beschrijving: 'Inside-out roll met scampi en avocado', prijs: 8.5, categorie: 'in-out-roll', ingredienten: ['Scampi', 'Avocado', 'Sushirijst'], allergenen: ['schaaldieren', 'gluten', 'sesam'], beschikbaar: true, labels: [], stuks: 8 },

  // CRUNCHY ROLLS (8ST)
  { id: 'cr-001', naam: 'Crunchy Zalm (8st)', beschrijving: 'Binnenkant gefrituurd met zalm', prijs: 9, categorie: 'crunchy-rolls', ingredienten: ['Zalm', 'Sushirijst', 'Tempura'], allergenen: ['vis', 'gluten', 'sesam'], beschikbaar: true, labels: ['populair'], stuks: 8 },
  { id: 'cr-002', naam: 'Crunchy Tonijn (8st)', beschrijving: 'Binnenkant gefrituurd met tonijn', prijs: 10, categorie: 'crunchy-rolls', ingredienten: ['Tonijn', 'Sushirijst', 'Tempura'], allergenen: ['vis', 'gluten', 'sesam'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'cr-003', naam: 'Crunchy Kip (8st)', beschrijving: 'Binnenkant gefrituurd met kip', prijs: 9.5, categorie: 'crunchy-rolls', ingredienten: ['Kip', 'Sushirijst', 'Tempura'], allergenen: ['gluten', 'sesam'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'cr-004', naam: 'Crunchy Scampi (8st)', beschrijving: 'Binnenkant gefrituurd met scampi', prijs: 9.5, categorie: 'crunchy-rolls', ingredienten: ['Scampi', 'Sushirijst', 'Tempura'], allergenen: ['schaaldieren', 'gluten', 'sesam'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'cr-005', naam: 'Crunchy Hoso Maki (8st)', beschrijving: 'Gefrituurde zalm met mascarpone', prijs: 10, categorie: 'crunchy-rolls', ingredienten: ['Zalm', 'Mascarpone', 'Sushirijst', 'Tempura'], allergenen: ['vis', 'melk', 'gluten'], beschikbaar: true, labels: ['bestseller'], stuks: 8 },

  // FUTOMAKI (6ST)
  { id: 'ft-001', naam: 'Vegi Futo (6st)', beschrijving: 'Avocado, sla, wortel, komkommer, zeewier', prijs: 6, afbeelding: F.futoVegi, categorie: 'futomaki', ingredienten: ['Avocado', 'Sla', 'Wortel', 'Komkommer', 'Zeewier'], allergenen: ['gluten'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'ft-002', naam: 'Kamikaze Zalm (6st)', beschrijving: 'Zalm, avocado, sla, wortel, komkommer, mayo', prijs: 8, afbeelding: F.kamikazeZalm, categorie: 'futomaki', ingredienten: ['Zalm', 'Avocado', 'Sla', 'Wortel', 'Mayo'], allergenen: ['vis', 'gluten', 'eieren'], beschikbaar: true, labels: ['populair'], stuks: 6 },
  { id: 'ft-003', naam: 'Kamikaze Tonijn (6st)', beschrijving: 'Tonijn, avocado, sla, wortel, komkommer, mayo', prijs: 8.5, categorie: 'futomaki', ingredienten: ['Tonijn', 'Avocado', 'Sla', 'Mayo'], allergenen: ['vis', 'gluten', 'eieren'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'ft-004', naam: 'Kamikaze Kip (6st)', beschrijving: 'Gefrituurde kip, avocado, sla, wortel, komkommer, mayo', prijs: 8.5, categorie: 'futomaki', ingredienten: ['Kip', 'Avocado', 'Sla', 'Mayo'], allergenen: ['gluten', 'eieren'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'ft-005', naam: 'Boston Futo (6st)', beschrijving: 'Krab, tamago, avocado, sla, wortel, komkommer, mayo', prijs: 8, categorie: 'futomaki', ingredienten: ['Krab', 'Tamago', 'Avocado', 'Mayo'], allergenen: ['schaaldieren', 'eieren', 'gluten'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'ft-006', naam: 'België Futo (6st)', beschrijving: 'Scampi, avocado, sla, wortel, komkommer, mayo', prijs: 8.5, afbeelding: F.belgieFuto, categorie: 'futomaki', ingredienten: ['Scampi', 'Avocado', 'Sla', 'Mayo'], allergenen: ['schaaldieren', 'gluten', 'eieren'], beschikbaar: true, labels: ['populair'], stuks: 6 },
  { id: 'ft-007', naam: 'Spicy California (6st)', beschrijving: 'Gefrituurde zalm, pikante mayo, avocado, sla, wortel', prijs: 10, categorie: 'futomaki', ingredienten: ['Zalm', 'Pikante mayo', 'Avocado', 'Sla'], allergenen: ['vis', 'gluten', 'eieren'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'ft-008', naam: 'Duo Futo (6st)', beschrijving: 'Zalm, tonijn, mayo, avocado, sla, wortel, komkommer', prijs: 10, categorie: 'futomaki', ingredienten: ['Zalm', 'Tonijn', 'Mayo', 'Avocado'], allergenen: ['vis', 'gluten', 'eieren'], beschikbaar: true, labels: ['bestseller'], stuks: 6 },
  { id: 'ft-009', naam: 'Sweet Mango (6st)', beschrijving: 'Zalm, mango, pikante mayo', prijs: 8.5, categorie: 'futomaki', ingredienten: ['Zalm', 'Mango', 'Pikante mayo'], allergenen: ['vis', 'gluten', 'eieren'], beschikbaar: true, labels: [], stuks: 6 },
  { id: 'ft-010', naam: 'New York Futo (6st)', beschrijving: 'Tempura scampi, krab, avocado, sla, mayo', prijs: 9.5, categorie: 'futomaki', ingredienten: ['Scampi', 'Krab', 'Avocado', 'Mayo'], allergenen: ['schaaldieren', 'gluten', 'eieren'], beschikbaar: true, labels: [], stuks: 6 },

  // GEFRITUURDE ROLLS (8ST)
  { id: 'gr-001', naam: 'Sama Roll Vegi (8st)', beschrijving: 'Tamago, avocado, sla, wortel en cheddar cheese', prijs: 10, afbeelding: F.samaRoll, categorie: 'gefrituurde-rolls', ingredienten: ['Tamago', 'Avocado', 'Sla', 'Cheddar'], allergenen: ['eieren', 'melk', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'gr-002', naam: 'Dragon Eye (8st)', beschrijving: 'Zalm, krab, avocado, tamago', prijs: 12, afbeelding: F.dragonEye, categorie: 'gefrituurde-rolls', ingredienten: ['Zalm', 'Krab', 'Avocado', 'Tamago'], allergenen: ['vis', 'schaaldieren', 'eieren', 'gluten'], beschikbaar: true, labels: ['bestseller'], stuks: 8 },
  { id: 'gr-003', naam: 'Scampi Dragon Eye (8st)', beschrijving: 'Scampi, krab, avocado, tamago', prijs: 12, afbeelding: F.scampiDragon, categorie: 'gefrituurde-rolls', ingredienten: ['Scampi', 'Krab', 'Avocado', 'Tamago'], allergenen: ['schaaldieren', 'eieren', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'gr-004', naam: 'Heat Roll (8st)', beschrijving: 'Zalm, avocado en cheddar cheese', prijs: 12, afbeelding: F.heatRoll, categorie: 'gefrituurde-rolls', ingredienten: ['Zalm', 'Avocado', 'Cheddar'], allergenen: ['vis', 'melk', 'gluten'], beschikbaar: true, labels: ['populair'], stuks: 8 },
  { id: 'gr-005', naam: 'Manhattan Roll (8st)', beschrijving: 'Tonijn, avocado en cheddar cheese', prijs: 12, categorie: 'gefrituurde-rolls', ingredienten: ['Tonijn', 'Avocado', 'Cheddar'], allergenen: ['vis', 'melk', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'gr-006', naam: 'Kip Dragon Eye (8st)', beschrijving: 'Gefrituurde kip, avocado, komkommer', prijs: 12, afbeelding: F.kipDragon, categorie: 'gefrituurde-rolls', ingredienten: ['Kip', 'Avocado', 'Komkommer'], allergenen: ['gluten'], beschikbaar: true, labels: [], stuks: 8 },

  // SPECIAL ROLLS (8ST)
  { id: 'sr-001', naam: 'Green Rainbow Roll (8st)', beschrijving: 'Avocado, krab, tamago en komkommer', prijs: 10, afbeelding: F.greenRainbow, categorie: 'special-rolls', ingredienten: ['Avocado', 'Krab', 'Tamago', 'Komkommer'], allergenen: ['schaaldieren', 'eieren', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-002', naam: 'Pink Lady (8st)', beschrijving: 'Gemarineerd krab, mayo en masago', prijs: 12, afbeelding: F.pinkLady, categorie: 'special-rolls', ingredienten: ['Krab', 'Mayo', 'Masago'], allergenen: ['schaaldieren', 'vis', 'eieren', 'gluten'], beschikbaar: true, labels: ['populair'], stuks: 8 },
  { id: 'sr-003', naam: 'Tokyo Roll (8st)', beschrijving: 'Gemarineerd krab met zalm', prijs: 12, afbeelding: F.tokyoRoll, categorie: 'special-rolls', ingredienten: ['Krab', 'Zalm'], allergenen: ['schaaldieren', 'vis', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-004', naam: 'California (8st)', beschrijving: 'Gemarineerd tonijn met masago', prijs: 12, categorie: 'special-rolls', ingredienten: ['Tonijn', 'Masago'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-005', naam: 'Sweet Roll (8st)', beschrijving: 'Zalm, avocado, roomkaas en mango', prijs: 12, afbeelding: F.sweetRoll, categorie: 'special-rolls', ingredienten: ['Zalm', 'Avocado', 'Roomkaas', 'Mango'], allergenen: ['vis', 'melk', 'gluten'], beschikbaar: true, labels: ['bestseller'], stuks: 8 },
  { id: 'sr-006', naam: 'Dynamite Roll (8st)', beschrijving: 'Gemarineerd krab met masago', prijs: 12, afbeelding: F.dynamiteRoll, categorie: 'special-rolls', ingredienten: ['Krab', 'Masago'], allergenen: ['schaaldieren', 'vis', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-007', naam: 'Rainbow (8st)', beschrijving: 'Gemarineerd krab, avocado, tonijn en zalm', prijs: 12, afbeelding: F.rainbow, categorie: 'special-rolls', ingredienten: ['Krab', 'Avocado', 'Tonijn', 'Zalm'], allergenen: ['schaaldieren', 'vis', 'gluten'], beschikbaar: true, labels: ['populair'], stuks: 8 },
  { id: 'sr-008', naam: 'Spicy Tuna (8st)', beschrijving: 'Gemarineerd krab met tonijn', prijs: 13, afbeelding: F.spicyTuna, categorie: 'special-rolls', ingredienten: ['Krab', 'Tonijn'], allergenen: ['schaaldieren', 'vis', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-009', naam: "Rock'N Roll (8st)", beschrijving: 'Gefrituurde kip met teriyakisaus', prijs: 13, afbeelding: F.rockRoll, categorie: 'special-rolls', ingredienten: ['Kip', 'Teriyakisaus'], allergenen: ['gluten', 'soja'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-010', naam: 'Sesam Roll (8st)', beschrijving: 'Scampi, philadelphia en komkommer', prijs: 13, categorie: 'special-rolls', ingredienten: ['Scampi', 'Philadelphia', 'Komkommer'], allergenen: ['schaaldieren', 'melk', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-011', naam: 'Yellow Roll (8st)', beschrijving: 'Gemarineerd tonijn', prijs: 13, categorie: 'special-rolls', ingredienten: ['Tonijn'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-012', naam: 'Marin Roll (8st)', beschrijving: 'Gemarineerd zalm met avocado', prijs: 13, afbeelding: F.marinRoll, categorie: 'special-rolls', ingredienten: ['Zalm', 'Avocado'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-013', naam: 'Saigon Roll (8st)', beschrijving: 'Gemarineerd tonijn met avocado', prijs: 13, categorie: 'special-rolls', ingredienten: ['Tonijn', 'Avocado'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-014', naam: 'Glitter Roll (8st)', beschrijving: 'Pikante gemarineerde zalm met masago', prijs: 13, afbeelding: F.glitterRoll, categorie: 'special-rolls', ingredienten: ['Zalm', 'Masago'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-015', naam: 'Smokey Zalm Roll (8st)', beschrijving: 'Gemarineerde zalm met topping van flamed zalm', prijs: 14, categorie: 'special-rolls', ingredienten: ['Zalm'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: ['populair'], stuks: 8 },
  { id: 'sr-016', naam: 'Sexy Roll (8st)', beschrijving: 'Tempura scampi, paling en avocado', prijs: 14, categorie: 'special-rolls', ingredienten: ['Scampi', 'Paling', 'Avocado'], allergenen: ['schaaldieren', 'vis', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-017', naam: 'Dendermonde Special (8st)', beschrijving: 'Tempura scampi, tonijn, tobiko, asperge en avocado', prijs: 16, categorie: 'special-rolls', ingredienten: ['Scampi', 'Tonijn', 'Tobiko', 'Asperge', 'Avocado'], allergenen: ['schaaldieren', 'vis', 'gluten'], beschikbaar: true, labels: ['bestseller'], stuks: 8 },
  { id: 'sr-018', naam: 'Lava Roll (8st)', beschrijving: 'Pikante gemarineerde zalm, topping van avocado', prijs: 13, categorie: 'special-rolls', ingredienten: ['Zalm', 'Avocado', 'Pikante mayo'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-019', naam: 'Chicky Roll (8st)', beschrijving: 'Gemarineerd kip, sesam, palingsaus', prijs: 13, categorie: 'special-rolls', ingredienten: ['Kip', 'Sesam', 'Palingsaus'], allergenen: ['gluten', 'soja', 'sesam'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-020', naam: 'Hot Summer (8st)', beschrijving: 'Gefrituurde kip, komkommer, avocado, 5 pittige kruiden', prijs: 13, categorie: 'special-rolls', ingredienten: ['Kip', 'Komkommer', 'Avocado', 'Pikante kruiden'], allergenen: ['gluten'], beschikbaar: true, labels: [], stuks: 8 },
  { id: 'sr-021', naam: 'Lady in Red (8st)', beschrijving: 'Tempura scampi, avocado, mayo, getopt met tonijn en masago', prijs: 14, categorie: 'special-rolls', ingredienten: ['Scampi', 'Avocado', 'Tonijn', 'Masago'], allergenen: ['schaaldieren', 'vis', 'gluten', 'eieren'], beschikbaar: true, labels: ['populair'], stuks: 8 },
  { id: 'sr-022', naam: 'Lady in Green (8st)', beschrijving: 'Pikante gemarineerde tonijn, topping van avocado', prijs: 14, categorie: 'special-rolls', ingredienten: ['Tonijn', 'Avocado', 'Pikante mayo'], allergenen: ['vis', 'gluten', 'eieren'], beschikbaar: true, labels: [], stuks: 8 },

  // COMBO MENU
  { id: 'cb-001', naam: 'Nigiri Combo (10st)', beschrijving: 'Zalm, tonijn, paling, tamago en garnaal', prijs: 17, categorie: 'combo', ingredienten: ['Zalm', 'Tonijn', 'Paling', 'Tamago', 'Garnaal'], allergenen: ['vis', 'schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 10 },
  { id: 'cb-002', naam: 'Vegi Combo (22st)', beschrijving: 'Vegi Futo, In/Out Roll Vegi en Sama Roll', prijs: 18, afbeelding: F.vegiCmbo, categorie: 'combo', ingredienten: ['Groenten', 'Avocado', 'Tamago'], allergenen: ['eieren', 'gluten'], beschikbaar: true, labels: [], stuks: 22 },
  { id: 'cb-003', naam: 'Zalm Combo (12st)', beschrijving: 'Nigiri, Sashimi en In/Out Roll Zalm', prijs: 18, categorie: 'combo', ingredienten: ['Zalm'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: ['populair'], stuks: 12 },
  { id: 'cb-004', naam: 'Tonijn Combo (14st)', beschrijving: 'Nigiri, Sashimi en In/Out Roll Tonijn', prijs: 19, categorie: 'combo', ingredienten: ['Tonijn'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: [], stuks: 14 },
  { id: 'cb-005', naam: 'Tokyo Combo (18st)', beschrijving: 'Dragon Eye, In/Out Roll Zalm en België Futo', prijs: 20, categorie: 'combo', ingredienten: ['Zalm', 'Krab', 'Scampi', 'Avocado'], allergenen: ['vis', 'schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 18 },
  { id: 'cb-006', naam: 'Hoso Combo (24st)', beschrijving: 'Zalm, tonijn, tamago, avocado, komkommer en krab', prijs: 20, categorie: 'combo', ingredienten: ['Zalm', 'Tonijn', 'Tamago', 'Avocado', 'Krab'], allergenen: ['vis', 'schaaldieren', 'eieren', 'gluten'], beschikbaar: true, labels: [], stuks: 24 },
  { id: 'cb-007', naam: 'Fry Combo gefrituurd (18st)', beschrijving: 'Dragon Eye en Heat Roll', prijs: 20, afbeelding: F.fryCmbo, categorie: 'combo', ingredienten: ['Zalm', 'Krab', 'Avocado', 'Cheddar'], allergenen: ['vis', 'schaaldieren', 'melk', 'gluten'], beschikbaar: true, labels: [], stuks: 18 },
  { id: 'cb-008', naam: 'Mix Zalm/Tonijn Combo (16st)', beschrijving: 'Nigiri, Sashimi, In/Out Roll Zalm en In/Out Roll Tonijn', prijs: 20, afbeelding: F.mixCmbo, categorie: 'combo', ingredienten: ['Zalm', 'Tonijn'], allergenen: ['vis', 'gluten'], beschikbaar: true, labels: ['populair'], stuks: 16 },
  { id: 'cb-009', naam: 'Sushi Combo (20st)', beschrijving: 'Nigiri, Sashimi, Kamikaze Zalm en In/Out Roll Scampi', prijs: 25, categorie: 'combo', ingredienten: ['Zalm', 'Scampi', 'Sushirijst'], allergenen: ['vis', 'schaaldieren', 'gluten'], beschikbaar: true, labels: ['bestseller'], stuks: 20 },
  { id: 'cb-010', naam: 'Sexy Combo (22st)', beschrijving: 'België Futo, Pink Lady en California', prijs: 25, categorie: 'combo', ingredienten: ['Scampi', 'Krab', 'Tonijn', 'Masago'], allergenen: ['schaaldieren', 'vis', 'gluten'], beschikbaar: true, labels: [], stuks: 22 },
  { id: 'cb-011', naam: 'Signature Choice (22st)', beschrijving: 'Tokyo Roll, Saigon Roll en Spicy California', prijs: 30, categorie: 'combo', ingredienten: ['Zalm', 'Krab', 'Tonijn', 'Avocado'], allergenen: ['vis', 'schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 22 },
  { id: 'cb-012', naam: 'Futo Combo (24st)', beschrijving: 'België Futo, Kamikaze Zalm, Futo Veggie, Kamikaze Tonijn', prijs: 28, categorie: 'combo', ingredienten: ['Zalm', 'Tonijn', 'Scampi', 'Avocado'], allergenen: ['vis', 'schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 24 },
  { id: 'cb-013', naam: 'Menu 2 (24st)', beschrijving: '8st special roll, 8st hosomaki, 4st gefrituurde roll, 2st nigiri, 2st sashimi', prijs: 30, categorie: 'combo', ingredienten: ['Zalm', 'Tonijn', 'Krab', 'Avocado'], allergenen: ['vis', 'schaaldieren', 'gluten'], beschikbaar: true, labels: ['populair'], stuks: 24 },

  // BOOT MENU
  { id: 'bt-001', naam: 'Boot 40st — 2 personen', beschrijving: 'Sashimi, Nigiri, Dragon Eye, België Futo, Rainbow en Hosomaki', prijs: 50, afbeelding: F.boot2p, categorie: 'boot', ingredienten: ['Zalm', 'Tonijn', 'Krab', 'Scampi', 'Avocado'], allergenen: ['vis', 'schaaldieren', 'gluten'], beschikbaar: true, labels: ['populair'], stuks: 40 },
  { id: 'bt-002', naam: 'Special Boot 50st', beschrijving: 'Glitter Roll, Rainbow, Pink Lady, Dragon Eye, In/Out Roll, Lady in Green', prijs: 60, categorie: 'boot', ingredienten: ['Zalm', 'Tonijn', 'Krab', 'Avocado', 'Masago'], allergenen: ['vis', 'schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 50 },
  { id: 'bt-003', naam: 'Boot 65st — 3 personen', beschrijving: 'Sashimi, Nigiri, Dragon Eyes, Rainbow, Pink Lady, In/Out Roll, Hosomaki en België Futo', prijs: 70, categorie: 'boot', ingredienten: ['Zalm', 'Tonijn', 'Krab', 'Scampi', 'Avocado'], allergenen: ['vis', 'schaaldieren', 'gluten'], beschikbaar: true, labels: ['bestseller'], stuks: 65 },
  { id: 'bt-004', naam: 'Boot 85st — 4 personen', beschrijving: 'Sashimi, Nigiri, Dragon Eye, België Futo, Pink Lady, Yellow Roll, Rainbow, Hosomaki en In/Out Roll', prijs: 90, categorie: 'boot', ingredienten: ['Zalm', 'Tonijn', 'Krab', 'Scampi', 'Avocado'], allergenen: ['vis', 'schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 85 },
  { id: 'bt-005', naam: 'Boot 105st — 5 personen', beschrijving: 'Sashimi, Nigiri, Dragon Eye, België Futo, Pink Lady, Yellow Roll, Rainbow, Hosomaki, Green Rainbow en In/Out Roll', prijs: 105, categorie: 'boot', ingredienten: ['Zalm', 'Tonijn', 'Krab', 'Scampi', 'Avocado'], allergenen: ['vis', 'schaaldieren', 'gluten'], beschikbaar: true, labels: [], stuks: 105 },

  // DRANKEN
  { id: 'dr-001', naam: 'Plat Water', beschrijving: 'Still water', prijs: 3, categorie: 'dranken', ingredienten: ['Water'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-002', naam: 'Bruiswater', beschrijving: 'Sparkling water', prijs: 3, categorie: 'dranken', ingredienten: ['Water'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-003', naam: 'Plat Water 1L', beschrijving: 'Still water 1 liter', prijs: 5.5, categorie: 'dranken', ingredienten: ['Water'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-004', naam: 'Bruiswater 1L', beschrijving: 'Sparkling water 1 liter', prijs: 5.5, categorie: 'dranken', ingredienten: ['Water'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-005', naam: 'Coca-Cola', beschrijving: 'Coca-Cola', prijs: 3, categorie: 'dranken', ingredienten: ['Cola'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-006', naam: 'Coca-Cola Zero', beschrijving: 'Coca-Cola Zero Sugar', prijs: 3, categorie: 'dranken', ingredienten: ['Cola'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-007', naam: 'Fanta', beschrijving: 'Fanta Orange', prijs: 3, categorie: 'dranken', ingredienten: ['Fanta'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-008', naam: 'Sprite', beschrijving: 'Sprite', prijs: 3, categorie: 'dranken', ingredienten: ['Sprite'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-009', naam: 'Ice Tea', beschrijving: 'Ice Tea Classic', prijs: 3, categorie: 'dranken', ingredienten: ['Thee', 'Suiker'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-010', naam: 'Ice Tea Peach', beschrijving: 'Ice Tea Peach', prijs: 3, categorie: 'dranken', ingredienten: ['Thee', 'Perzik'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-011', naam: 'Red Bull', beschrijving: 'Red Bull Energy Drink', prijs: 4, categorie: 'dranken', ingredienten: ['Taurine', 'Cafeïne'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-012', naam: 'Appelsap', beschrijving: 'Vers appelsap', prijs: 3, categorie: 'dranken', ingredienten: ['Appel'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-013', naam: 'Sinaasappelsap', beschrijving: 'Vers sinaasappelsap', prijs: 3, categorie: 'dranken', ingredienten: ['Sinaasappel'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'dr-014', naam: 'Duvel', beschrijving: 'Belgisch speciaalbier', prijs: 4, categorie: 'dranken', ingredienten: ['Gerst', 'Hop'], allergenen: ['gluten'], beschikbaar: true, labels: [] },
  { id: 'dr-015', naam: 'Stella Artois', beschrijving: 'Belgisch pilsener', prijs: 3, categorie: 'dranken', ingredienten: ['Gerst', 'Hop'], allergenen: ['gluten'], beschikbaar: true, labels: [] },
  { id: 'dr-016', naam: 'Asahi', beschrijving: 'Japans bier', prijs: 4, categorie: 'dranken', ingredienten: ['Gerst', 'Hop'], allergenen: ['gluten'], beschikbaar: true, labels: ['populair'] },
  { id: 'dr-017', naam: 'Sake (fles)', beschrijving: 'Premium Japanse rijstwijn', prijs: 6, categorie: 'dranken', ingredienten: ['Rijst', 'Water'], allergenen: ['gluten'], beschikbaar: true, labels: [] },

  // WIJNEN & BUBBELS
  { id: 'wj-001', naam: 'Cava (20cl)', beschrijving: 'Spaanse cava bubbels', prijs: 8, categorie: 'wijnen', ingredienten: ['Druiven'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'wj-002', naam: 'Cava Cossetañia Brut (fles)', beschrijving: 'Premium Spaanse cava fles', prijs: 27, categorie: 'wijnen', ingredienten: ['Druiven'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'wj-003', naam: 'Witte Huiswijn Gorgorito (glas)', beschrijving: 'Huiswijn per glas', prijs: 5.5, categorie: 'wijnen', ingredienten: ['Druiven'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'wj-004', naam: 'Witte Huiswijn Gorgorito (fles)', beschrijving: 'Witte huiswijn per fles', prijs: 22, categorie: 'wijnen', ingredienten: ['Druiven'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'wj-005', naam: 'Touraine Sauvignon Roc de Châteauvieux', beschrijving: 'Loire vallei witte wijn', prijs: 28, categorie: 'wijnen', ingredienten: ['Druiven'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'wj-006', naam: 'Riesling Hunawihr Gold Medal Lyon', beschrijving: 'Bekroonde Elzas Riesling', prijs: 35, categorie: 'wijnen', ingredienten: ['Druiven'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'wj-007', naam: 'Rosé Le Petit Noir', beschrijving: 'Frisse rosé wijn', prijs: 20, categorie: 'wijnen', ingredienten: ['Druiven'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'wj-008', naam: 'Rode Huiswijn (glas)', beschrijving: 'Rode huiswijn per glas', prijs: 5.5, categorie: 'wijnen', ingredienten: ['Druiven'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'wj-009', naam: 'Rode Huiswijn (fles)', beschrijving: 'Rode huiswijn per fles', prijs: 22, categorie: 'wijnen', ingredienten: ['Druiven'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'wj-010', naam: 'Molto Forte Vino Rosso d\'Italia (fles)', beschrijving: 'Italiaanse rode wijn', prijs: 30, categorie: 'wijnen', ingredienten: ['Druiven'], allergenen: [], beschikbaar: true, labels: [] },
  { id: 'wj-011', naam: 'Les Fontenelles Vieilles Vignes (fles)', beschrijving: 'Franse rode wijn, oude wijnstokken', prijs: 36, categorie: 'wijnen', ingredienten: ['Druiven'], allergenen: [], beschikbaar: true, labels: [] },

  // DESSERTS
  { id: 'ds-001', naam: 'Japanse Mochies (3st)', beschrijving: '2st kokos, 1st sesam — Japans rijstmeel deeg', prijs: 8, categorie: 'desserts', ingredienten: ['Rijstmeel', 'Kokos', 'Sesam', 'IJs'], allergenen: ['sesam', 'melk'], beschikbaar: true, labels: ['populair'], stuks: 3 },
]

export const getProductsByCategory = (categorieId: string) =>
  products.filter((p) => p.categorie === categorieId && p.beschikbaar)

export const getPopulaire = () =>
  products.filter((p) => p.labels.includes('populair') && p.beschikbaar).slice(0, 6)

export const getPromoProducts = () =>
  products.filter((p) => p.labels.includes('promo') && p.beschikbaar)

export const getProductById = (id: string) =>
  products.find((p) => p.id === id)
