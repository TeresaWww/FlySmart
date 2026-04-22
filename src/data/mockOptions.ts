import { gateGroups } from './seaTacGates'

const gatePairs = [
  { value: '' as const, label: 'Gate Number' as const },
  ...gateGroups.map((g) => ({ value: g.range, label: `Gate ${g.range}` })),
] as const

export const gateOptions = gatePairs

export const carouselOptions = [
  { value: '', label: 'Carousel Number' },
  { value: '1', label: 'Carousel 1' },
  { value: '2', label: 'Carousel 2' },
  { value: '3', label: 'Carousel 3' },
  { value: '4', label: 'Carousel 4' },
  { value: '5', label: 'Carousel 5' },
  { value: 'oversized', label: 'Oversized baggage' },
] as const

export const transportOptions = [
  { value: '', label: 'Transportation Type' },
  { value: 'rideshare', label: 'Ride Share (Uber / Lyft)' },
  { value: 'link', label: 'Link Light Rail' },
  { value: 'taxi', label: 'Taxi' },
  { value: 'rental', label: 'Rental car / Personal vehicle' },
  { value: 'shuttle', label: 'Hotel / courtesy shuttle' },
] as const

export const destinationOptions = [
  { value: '', label: 'Destination' },
  { value: 'downtown', label: 'Downtown Seattle' },
  { value: 'bellevue', label: 'Bellevue / Eastside' },
  { value: 'udistrict', label: 'University District' },
  { value: 'cruise', label: 'Cruise / Pier 66 / Pier 91' },
  { value: 'south', label: 'South King County' },
  { value: 'north', label: 'North Seattle / Shoreline' },
] as const

export type GateValue = (typeof gateOptions)[number]['value']
export type CarouselValue = (typeof carouselOptions)[number]['value']
export type TransportValue = (typeof transportOptions)[number]['value']
export type DestinationValue = (typeof destinationOptions)[number]['value']

export function labelForGate(v: string) {
  return gateOptions.find((o) => o.value === v)?.label ?? v
}

export function labelForCarousel(v: string) {
  return carouselOptions.find((o) => o.value === v)?.label ?? v
}

export function labelForTransport(v: string) {
  return transportOptions.find((o) => o.value === v)?.label ?? v
}

export function labelForDestination(v: string) {
  return destinationOptions.find((o) => o.value === v)?.label ?? v
}
