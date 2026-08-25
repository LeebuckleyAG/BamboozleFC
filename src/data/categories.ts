import type { Category } from "../types";

export const CATEGORIES: Category[] = [
  { id: "premier-league", page: "251", label: "PREMIER LEAGUE", blurb: "The English top flight, 1992 to now.", colour: "var(--tx-cyan)" },
  { id: "champions-league", page: "252", label: "CHAMPIONS LEAGUE", blurb: "That famous anthem. Big ears.", colour: "var(--tx-magenta)" },
  { id: "world-cup", page: "253", label: "WORLD CUP", blurb: "Every four years, the whole planet stops.", colour: "var(--tx-yellow)" },
  { id: "euros", page: "254", label: "EUROPEAN CHAMPIONSHIP", blurb: "The continent's best, every summer.", colour: "var(--tx-green)" },
  { id: "international", page: "255", label: "INTERNATIONAL FOOTBALL", blurb: "Country over club.", colour: "var(--tx-blue)" },
  { id: "history", page: "256", label: "FOOTBALL HISTORY", blurb: "The old stuff. The good stuff.", colour: "var(--tx-red)" },
  { id: "transfers", page: "257", label: "TRANSFERS", blurb: "Deadline day drama.", colour: "var(--tx-cyan)" },
  { id: "managers", page: "258", label: "MANAGERS", blurb: "Tracksuits and touchline tantrums.", colour: "var(--tx-magenta)" },
  { id: "stadiums", page: "259", label: "STADIUMS", blurb: "The grounds. The cathedrals.", colour: "var(--tx-yellow)" },
  { id: "records", page: "260", label: "FOOTBALL RECORDS", blurb: "Numbers that shouldn't be possible.", colour: "var(--tx-green)" },
  { id: "cult-heroes", page: "261", label: "CULT HEROES", blurb: "Not the best. Definitely the best loved.", colour: "var(--tx-blue)" },
  { id: "shirt-numbers", page: "262", label: "SHIRT NUMBERS", blurb: "Squad numbers and their legends.", colour: "var(--tx-red)" },
  { id: "world-football", page: "263", label: "WORLD FOOTBALL", blurb: "Beyond the Premier League bubble.", colour: "var(--tx-cyan)" },
  { id: "obscure", page: "264", label: "OBSCURE FOOTBALL", blurb: "The deep cuts.", colour: "var(--tx-magenta)" },
  { id: "proper-niche", page: "265", label: "PROPER NICHE", blurb: "For the truly unwell football brain.", colour: "var(--tx-yellow)" },
];

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
