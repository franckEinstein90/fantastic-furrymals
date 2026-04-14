/**
 * session.js
 * Browser-side session state shared across all pages.
 * Scripts that run after this file can read window.AppSession.
 */
window.AppSession = {

  // ------------------------------------------------------------------
  // World events – replace or extend with a live API response
  // ------------------------------------------------------------------
  events: [
    { label: 'Earthquake – Japan',              category: 'natural',   magnitude: 7 },
    { label: 'Flood – Bangladesh',              category: 'natural',   magnitude: 5 },
    { label: 'Wildfire – California',           category: 'natural',   magnitude: 6 },
    { label: 'Cyclone – Philippines',           category: 'natural',   magnitude: 8 },
    { label: 'Volcano – Indonesia',             category: 'natural',   magnitude: 7 },
    { label: 'Drought – Horn of Africa',        category: 'natural',   magnitude: 6 },
    { label: 'Blizzard – Canada',               category: 'natural',   magnitude: 4 },
    { label: 'Tsunami – Chile',                 category: 'natural',   magnitude: 8 },
    { label: 'Election – Brazil',               category: 'political', magnitude: 7 },
    { label: 'Summit – EU Council',             category: 'political', magnitude: 5 },
    { label: 'Protest – France',                category: 'political', magnitude: 4 },
    { label: 'Coup attempt – Myanmar',          category: 'political', magnitude: 9 },
    { label: 'Treaty signed – Mideast',         category: 'political', magnitude: 6 },
    { label: 'Sanctions – Russia',              category: 'political', magnitude: 7 },
    { label: 'Stock crash – NYSE',              category: 'economic',  magnitude: 8 },
    { label: 'Oil price spike',                 category: 'economic',  magnitude: 6 },
    { label: 'Inflation surge – UK',            category: 'economic',  magnitude: 5 },
    { label: 'Bank collapse – SVB',             category: 'economic',  magnitude: 9 },
    { label: 'Trade deal – ASEAN',              category: 'economic',  magnitude: 5 },
    { label: 'Crypto crash',                    category: 'economic',  magnitude: 7 },
    { label: 'Outbreak – DRC',                  category: 'health',    magnitude: 7 },
    { label: 'Vaccine rollout – India',         category: 'health',    magnitude: 6 },
    { label: 'Drug shortage – USA',             category: 'health',    magnitude: 4 },
    { label: 'New pathogen detected – SE Asia', category: 'health',    magnitude: 8 },
    { label: 'Satellite launch – SpaceX',       category: 'science',   magnitude: 5 },
    { label: 'AI breakthrough – DeepMind',      category: 'science',   magnitude: 7 },
    { label: 'Mars sample return – NASA',       category: 'science',   magnitude: 6 },
    { label: 'Nuclear fusion record',           category: 'science',   magnitude: 8 },
    { label: 'Conflict – Sudan',                category: 'conflict',  magnitude: 9 },
    { label: 'Ceasefire – Ukraine',             category: 'conflict',  magnitude: 8 },
    { label: 'Airstrike – Gaza',                category: 'conflict',  magnitude: 9 },
    { label: 'Rebellion – Sahel',               category: 'conflict',  magnitude: 7 },
    { label: 'Refugee crisis – Syria',          category: 'conflict',  magnitude: 8 },
  ],

  // ------------------------------------------------------------------
  // Category → hex colour (used by the 3-D visualisation)
  // ------------------------------------------------------------------
  categoryColors: {
    natural:   0x44aaff,
    political: 0xffcc00,
    economic:  0x66ff88,
    health:    0xff6688,
    science:   0xcc88ff,
    conflict:  0xff4422,
  },

};
