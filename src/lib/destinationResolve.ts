import { benchmarkForDestinationValue } from '../data/destinationsCatalog'
import { matchDestinationBenchmark, type DestinationBenchmarkValue } from './destinationBenchmarks'

/** Catalog id → benchmark, else legacy free-text / old area codes. */
export function resolveDestinationBenchmark(input: string): DestinationBenchmarkValue {
  const fromCatalog = benchmarkForDestinationValue(input)
  if (fromCatalog != null) return fromCatalog
  return matchDestinationBenchmark(input)
}
