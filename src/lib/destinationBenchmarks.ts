export type DestinationBenchmarkValue =
  | 'downtown'
  | 'bellevue'
  | 'udistrict'
  | 'cruise'
  | 'south'
  | 'north'

type DestinationBenchmark = {
  value: DestinationBenchmarkValue
  aliases: readonly string[]
}

const destinationBenchmarks: readonly DestinationBenchmark[] = [
  {
    value: 'bellevue',
    aliases: ['bellevue', 'eastside', 'redmond', 'kirkland', 'mercer island', 'issaquah', 'sammamish'],
  },
  {
    value: 'udistrict',
    aliases: ['university district', 'u district', 'uw', 'university of washington', 'wallingford', 'ravenna'],
  },
  {
    value: 'cruise',
    aliases: ['cruise', 'pier 66', 'pier 91', 'smith cove', 'bell street pier', 'waterfront'],
  },
  {
    value: 'south',
    aliases: [
      'south king',
      'king county',
      'pierce county',
      'tacoma',
      'kent',
      'renton',
      'tukwila',
      'federal way',
      'auburn',
      'burien',
      'des moines',
      'seatac',
    ],
  },
  {
    value: 'north',
    aliases: [
      'north seattle',
      'shoreline',
      'snohomish county',
      'lynnwood',
      'edmonds',
      'everett',
      'northgate',
      'lake city',
      'ballard',
      'greenwood',
      'crown hill',
    ],
  },
  {
    value: 'downtown',
    aliases: ['downtown', 'seattle', 'pike place', 'belltown', 'capitol hill', 'queen anne', 'south lake union'],
  },
]

export function matchDestinationBenchmark(input: string): DestinationBenchmarkValue {
  const text = input.trim().toLowerCase()
  if (!text) return 'downtown'

  for (const benchmark of destinationBenchmarks) {
    if (benchmark.aliases.some((alias) => text.includes(alias))) return benchmark.value
  }

  return 'downtown'
}
