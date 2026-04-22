import type { ArrivalFormState } from '../types/arrival'

type Cat = { walk: number; wait: number; transit: number }

export type JourneyStepModel =
  | { kind: 'deplane'; lineMin: number; cat: Cat }
  | { kind: 'gate'; lineMin: number; miles: number; cat: Cat }
  | { kind: 'customs'; lineMin: number; badgeMin: number; cat: Cat }
  | { kind: 'bags'; lineMin: number; cat: Cat }
  | { kind: 'walk_transit'; lineMin: number; miles: number; cat: Cat }
  | { kind: 'transit'; lineMin: number; rideMin: number; pickupWaitMin: number; cat: Cat }
  | { kind: 'walk_dest'; lineMin: number; miles: number; cat: Cat }
  | { kind: 'arrived'; lineMin: 0; cat: Cat }

export type JourneyEstimateModel = {
  steps: JourneyStepModel[]
  totalMin: number
  sumWalk: number
  sumWait: number
  sumTransit: number
  priceLow: number
  priceHigh: number
}

function formSeed(form: ArrivalFormState): number {
  const s = `${form.gate}|${form.transport}|${form.destination}|${form.travelers}|${form.flightScope}|${form.intlTravelerSegment}|${form.trustedTravelerProgram ? 1 : 0}`
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function spread(seed: number, salt: number, lo: number, hi: number): number {
  const x = Math.imul(seed ^ salt, 1597334677) >>> 0
  return lo + (x % (hi - lo + 1))
}

function destExtra(destination: string): { ride: number; price: number } {
  switch (destination) {
    case 'bellevue':
      return { ride: 14, price: 18 }
    case 'udistrict':
      return { ride: 6, price: 8 }
    case 'cruise':
      return { ride: 12, price: 10 }
    case 'south':
      return { ride: 9, price: 6 }
    case 'north':
      return { ride: 7, price: 5 }
    case 'downtown':
    default:
      return { ride: 0, price: 0 }
  }
}

function transportProfile(
  transport: string,
  seed: number,
  destRide: number,
  destPrice: number,
): {
  ride: number
  pickupWait: number
  priceLow: number
  priceHigh: number
} {
  const d = destRide
  const p = destPrice
  switch (transport) {
    case 'link':
      return {
        ride: 42 + spread(seed, 1, 0, 10) + Math.round(d * 0.35),
        pickupWait: spread(seed, 2, 4, 11),
        priceLow: 3,
        priceHigh: 6,
      }
    case 'taxi':
      return {
        ride: 22 + spread(seed, 3, 0, 12) + d,
        pickupWait: spread(seed, 4, 2, 7),
        priceLow: 48 + p,
        priceHigh: 78 + p + spread(seed, 5, 0, 12),
      }
    case 'rental':
      return {
        ride: 16 + spread(seed, 6, 0, 10) + Math.round(d * 0.4),
        pickupWait: spread(seed, 7, 2, 6),
        priceLow: 0,
        priceHigh: 8,
      }
    case 'shuttle':
      return {
        ride: 19 + spread(seed, 8, 0, 12) + Math.round(d * 0.45),
        pickupWait: spread(seed, 9, 4, 12),
        priceLow: 0,
        priceHigh: 18,
      }
    case 'rideshare':
    default:
      return {
        ride: 24 + spread(seed, 10, 0, 12) + d,
        pickupWait: spread(seed, 11, 3, 10),
        priceLow: 30 + p,
        priceHigh: 56 + p + spread(seed, 12, 0, 14),
      }
  }
}

function sumCats(steps: JourneyStepModel[]): { walk: number; wait: number; transit: number } {
  return steps.reduce(
    (a, s) => ({
      walk: a.walk + s.cat.walk,
      wait: a.wait + s.cat.wait,
      transit: a.transit + s.cat.transit,
    }),
    { walk: 0, wait: 0, transit: 0 },
  )
}

export function buildJourneyEstimate(form: ArrivalFormState): JourneyEstimateModel {
  const seed = formSeed(form)
  const party = Math.min(8, Math.max(1, form.travelers))
  const { ride: destRide, price: destPrice } = destExtra(form.destination)
  const tp = transportProfile(form.transport, seed, destRide, destPrice)

  const deplaneMin = 4
  const gateMin = 5 + spread(seed, 20, 0, 3) + Math.min(4, Math.floor(party / 2))
  const gateMiles = (0.18 + (seed % 17) / 100) as number

  const steps: JourneyStepModel[] = [
    {
      kind: 'deplane',
      lineMin: deplaneMin,
      cat: { walk: deplaneMin, wait: 0, transit: 0 },
    },
    {
      kind: 'gate',
      lineMin: gateMin,
      miles: Math.round(gateMiles * 10) / 10,
      cat: { walk: gateMin, wait: 0, transit: 0 },
    },
  ]

  if (form.flightScope === 'international') {
    let customs = 32
    if (form.trustedTravelerProgram) customs = 11 + spread(seed, 30, 0, 6)
    else if (form.intlTravelerSegment === 'citizen') customs = 24 + spread(seed, 31, 0, 10)
    else customs = 38 + spread(seed, 32, 0, 14)
    const badge = Math.max(5, customs - spread(seed, 33, 0, 4))
    steps.push({
      kind: 'customs',
      lineMin: customs,
      badgeMin: badge,
      cat: { walk: 0, wait: customs, transit: 0 },
    })
  }

  const bagsBase =
    form.flightScope === 'international'
      ? 19 + spread(seed, 40, 0, 11)
      : 11 + spread(seed, 41, 0, 9)
  const bagsWait = Math.round(bagsBase * 0.72)
  const bagsWalk = Math.max(2, bagsBase - bagsWait)
  steps.push({
    kind: 'bags',
    lineMin: bagsBase,
    cat: { walk: bagsWalk, wait: bagsWait, transit: 0 },
  })

  const walkT = 6 + spread(seed, 50, 0, 5) + (party >= 5 ? 2 : 0)
  const walkMi = Math.round((0.21 + (seed % 19) / 100) * 10) / 10
  steps.push({
    kind: 'walk_transit',
    lineMin: walkT,
    miles: walkMi,
    cat: { walk: walkT, wait: 0, transit: 0 },
  })

  const ride = tp.ride
  const pickup = tp.pickupWait
  steps.push({
    kind: 'transit',
    lineMin: ride + pickup,
    rideMin: ride,
    pickupWaitMin: pickup,
    cat: { walk: 0, wait: pickup, transit: ride },
  })

  const walkD = 4 + spread(seed, 60, 0, 4) + (party >= 6 ? 1 : 0)
  const walkDMi = Math.round((0.11 + (seed % 13) / 100) * 10) / 10
  steps.push({
    kind: 'walk_dest',
    lineMin: walkD,
    miles: walkDMi,
    cat: { walk: walkD, wait: 0, transit: 0 },
  })

  steps.push({ kind: 'arrived', lineMin: 0, cat: { walk: 0, wait: 0, transit: 0 } })

  const { walk, wait, transit } = sumCats(steps)
  const totalMin = steps.reduce((n, s) => n + s.lineMin, 0)

  return {
    steps,
    totalMin,
    sumWalk: walk,
    sumWait: wait,
    sumTransit: transit,
    priceLow: tp.priceLow,
    priceHigh: tp.priceHigh,
  }
}
