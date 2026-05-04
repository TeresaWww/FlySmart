/** Same routing buckets as `DestinationBenchmarkValue` in journey estimates (no import cycle). */
export type DestinationRoutingBucket = 'downtown' | 'bellevue' | 'udistrict' | 'cruise' | 'south' | 'north'

/** UI section (Option B style); each city appears in exactly one group. */
export type DestinationGroupId = 'popular' | 'eastside' | 'north' | 'south' | 'broader'

export type DestinationCatalogEntry = {
  id: string
  /** Display name (proper noun; same in all locales). */
  label: string
  tier: 1 | 2 | 3 | 4 | 5
  group: DestinationGroupId
  benchmark: DestinationRoutingBucket
  /** Extra substrings for search (lowercase). */
  aliases?: readonly string[]
}

/** Recommended order: tier within group, then label. Group order follows UX spec. */
export const DESTINATION_GROUP_ORDER: readonly DestinationGroupId[] = [
  'popular',
  'eastside',
  'north',
  'south',
  'broader',
] as const

export const DESTINATION_CATALOG: readonly DestinationCatalogEntry[] = [
  // Popular (major / most common)
  { id: 'seattle', label: 'Seattle', tier: 1, group: 'popular', benchmark: 'downtown', aliases: ['sea', 'dt'] },
  { id: 'bellevue', label: 'Bellevue', tier: 1, group: 'popular', benchmark: 'bellevue' },
  { id: 'tacoma', label: 'Tacoma', tier: 1, group: 'popular', benchmark: 'south' },

  // Eastside & East King
  { id: 'redmond', label: 'Redmond', tier: 2, group: 'eastside', benchmark: 'bellevue', aliases: ['microsoft'] },
  { id: 'kirkland', label: 'Kirkland', tier: 2, group: 'eastside', benchmark: 'bellevue' },
  { id: 'sammamish', label: 'Sammamish', tier: 2, group: 'eastside', benchmark: 'bellevue' },
  { id: 'issaquah', label: 'Issaquah', tier: 3, group: 'eastside', benchmark: 'bellevue' },
  { id: 'mercer_island', label: 'Mercer Island', tier: 3, group: 'eastside', benchmark: 'bellevue', aliases: ['mercer'] },
  { id: 'woodinville', label: 'Woodinville', tier: 4, group: 'eastside', benchmark: 'bellevue' },
  { id: 'newcastle', label: 'Newcastle', tier: 5, group: 'eastside', benchmark: 'bellevue' },
  { id: 'bothell', label: 'Bothell', tier: 3, group: 'eastside', benchmark: 'bellevue' },

  // North / Snohomish & north shore
  { id: 'everett', label: 'Everett', tier: 1, group: 'north', benchmark: 'north' },
  { id: 'shoreline', label: 'Shoreline', tier: 2, group: 'north', benchmark: 'north' },
  { id: 'lynnwood', label: 'Lynnwood', tier: 3, group: 'north', benchmark: 'north' },
  { id: 'edmonds', label: 'Edmonds', tier: 4, group: 'north', benchmark: 'north' },
  {
    id: 'mountlake_terrace',
    label: 'Mountlake Terrace',
    tier: 4,
    group: 'north',
    benchmark: 'north',
    aliases: ['mlt', 'mountlake'],
  },
  { id: 'mukilteo', label: 'Mukilteo', tier: 5, group: 'north', benchmark: 'north' },

  // South King & Pierce / airport area
  { id: 'kent', label: 'Kent', tier: 1, group: 'south', benchmark: 'south' },
  { id: 'renton', label: 'Renton', tier: 1, group: 'south', benchmark: 'south' },
  { id: 'federal_way', label: 'Federal Way', tier: 2, group: 'south', benchmark: 'south', aliases: ['fed way'] },
  { id: 'auburn', label: 'Auburn', tier: 2, group: 'south', benchmark: 'south' },
  { id: 'tukwila', label: 'Tukwila', tier: 3, group: 'south', benchmark: 'south' },
  { id: 'burien', label: 'Burien', tier: 3, group: 'south', benchmark: 'south' },
  { id: 'maple_valley', label: 'Maple Valley', tier: 4, group: 'south', benchmark: 'south' },
  { id: 'puyallup', label: 'Puyallup', tier: 4, group: 'south', benchmark: 'south' },

  // Broader areas (legacy form values + coarse routing)
  {
    id: 'udistrict',
    label: 'University District',
    tier: 3,
    group: 'broader',
    benchmark: 'udistrict',
    aliases: ['u district', 'uw', 'university of washington'],
  },
  {
    id: 'cruise',
    label: 'Cruise / Pier 66 / Pier 91',
    tier: 3,
    group: 'broader',
    benchmark: 'cruise',
    aliases: ['pier', 'smith cove', 'waterfront'],
  },
  {
    id: 'south',
    label: 'South King County',
    tier: 3,
    group: 'broader',
    benchmark: 'south',
    aliases: ['south king'],
  },
  {
    id: 'north',
    label: 'North Seattle / Shoreline',
    tier: 3,
    group: 'broader',
    benchmark: 'north',
    aliases: ['north seattle'],
  },
  {
    id: 'downtown',
    label: 'Downtown Seattle (area)',
    tier: 2,
    group: 'broader',
    benchmark: 'downtown',
    aliases: ['central seattle', 'pike place', 'belltown', 'capitol hill'],
  },
] as const

const byId = new Map(DESTINATION_CATALOG.map((d) => [d.id, d]))

export function getDestinationCatalogEntry(id: string): DestinationCatalogEntry | undefined {
  return byId.get(id)
}

export function destinationLabelForId(id: string): string | undefined {
  return byId.get(id)?.label
}

function normalizeSearch(s: string): string {
  return s.trim().toLowerCase()
}

function entryMatchesQuery(entry: DestinationCatalogEntry, q: string): boolean {
  if (!q) return true
  const n = normalizeSearch(q)
  if (entry.label.toLowerCase().includes(n)) return true
  if (entry.id.replace(/_/g, ' ').includes(n)) return true
  if (entry.aliases?.some((a) => a.includes(n) || n.includes(a))) return true
  return false
}

export type GroupedDestinationRows = {
  group: DestinationGroupId
  entries: DestinationCatalogEntry[]
}[]

/** Filter by search query; preserve group order and tier sort inside each group. */
export function getGroupedDestinationsForQuery(query: string): GroupedDestinationRows {
  const q = normalizeSearch(query)
  const rows: GroupedDestinationRows = []
  for (const group of DESTINATION_GROUP_ORDER) {
    const entries = DESTINATION_CATALOG.filter((d) => d.group === group && entryMatchesQuery(d, q))
      .slice()
      .sort((a, b) => a.tier - b.tier || a.label.localeCompare(b.label))
    if (entries.length > 0) rows.push({ group, entries })
  }
  return rows
}

export function benchmarkForDestinationValue(value: string): DestinationRoutingBucket | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const fromCatalog = byId.get(trimmed)
  if (fromCatalog) return fromCatalog.benchmark
  return null
}
