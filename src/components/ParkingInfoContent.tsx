import { useState } from 'react'
import { ParkingSquare } from 'lucide-react'
import { InfoAccordion, InfoHero } from './TransportationInfoShared'

export function ParkingInfo() {
  const [openSections, setOpenSections] = useState({
    options: true,
    rates: true,
    accessible: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="space-y-4 text-left">
      <InfoHero title="Parking Garage at SEA" icon={<ParkingSquare className="h-5 w-5" aria-hidden />}>
        The SEA Airport garage connects directly to the terminal by skybridges and supports hourly, daily, weekly, accessible, EV, and pre-booked parking.
      </InfoHero>

      <InfoAccordion title="Parking Options" open={openSections.options} onClick={() => toggleSection('options')}>
        <ul className="space-y-2 text-sm leading-snug text-slate-700">
          <li><strong>General Parking:</strong> Levels 1-3 and 5-8. Best for hourly, daily, and longer stays.</li>
          <li><strong>Terminal Direct:</strong> Level 4. Closest access to ticketing and baggage claim via skybridges.</li>
          <li><strong>Pre-Booked Parking:</strong> Reserve online for guaranteed space and possible discounted rates.</li>
          <li><strong>EV Charging:</strong> Available on Level 4 and select garage areas, first come first served.</li>
        </ul>
      </InfoAccordion>

      <InfoAccordion title="Parking Rates" open={openSections.rates} onClick={() => toggleSection('rates')}>
        <ul className="space-y-2 text-sm leading-snug text-slate-700">
          <li><strong>Hourly:</strong> about $6 per hour, with daily maximums after several hours.</li>
          <li><strong>General Parking:</strong> about $34/day.</li>
          <li><strong>Terminal Direct:</strong> about $42/day.</li>
          <li><strong>Weekly General:</strong> about $219 for a 7-day maximum charge.</li>
          <li><strong>Payment:</strong> credit cards, debit cards, Apple Pay, and Google Pay. SEA parking is generally cashless.</li>
        </ul>
      </InfoAccordion>

      <InfoAccordion title="Accessible Parking" open={openSections.accessible} onClick={() => toggleSection('accessible')}>
        <p className="text-sm leading-snug text-slate-700">
          Accessible stalls are available on all garage levels near elevators and skybridges. A valid disabled parking placard or license plate is required, and spaces are first come first served.
        </p>
      </InfoAccordion>
    </div>
  )
}

export default ParkingInfo
