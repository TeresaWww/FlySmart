import { useState } from 'react'
import { Car, Phone } from 'lucide-react'
import { InfoAccordion, InfoHero } from './TransportationInfoShared'

export function TaxiInfo() {
  const [openSections, setOpenSections] = useState({
    pickup: true,
    fares: true,
    companies: false,
    tips: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="space-y-4 text-left">
      <InfoHero title="Taxi Service at SEA" icon={<Car className="h-5 w-5" aria-hidden />}>
        Taxis are available without an app and serve both flat-rate and metered trips from the airport.
      </InfoHero>

      <InfoAccordion title="Pickup Locations" open={openSections.pickup} onClick={() => toggleSection('pickup')}>
        <ul className="space-y-2 text-sm leading-snug text-slate-700">
          <li>Taxi pickups are at the <strong>Ground Transportation Plaza</strong> on the <strong>3rd floor of the parking garage</strong>.</li>
          <li>Follow airport signs for <strong>Taxi / Rideshare Pickup</strong> from baggage claim.</li>
          <li>Curbside staff can help with the taxi queue and ADA-accessible taxi requests.</li>
        </ul>
      </InfoAccordion>

      <InfoAccordion title="Fares & Payment" open={openSections.fares} onClick={() => toggleSection('fares')}>
        <ul className="space-y-2 text-sm leading-snug text-slate-700">
          <li><strong>Downtown Seattle:</strong> commonly $40-$55.</li>
          <li><strong>Bellevue:</strong> commonly $55-$70.</li>
          <li><strong>Redmond:</strong> commonly $70-$85.</li>
          <li><strong>University District:</strong> commonly $50-$65.</li>
          <li><strong>Payment:</strong> credit/debit cards, Apple Pay, Google Pay, and sometimes cash. Confirm with the driver before departure.</li>
        </ul>
      </InfoAccordion>

      <InfoAccordion title="Taxi Carriers" open={openSections.companies} onClick={() => toggleSection('companies')}>
        <div className="flex gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200/80">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden />
          <ul className="space-y-2 text-sm leading-snug text-slate-700">
            <li><strong>Seattle Yellow Cab:</strong> 206-622-6500</li>
            <li><strong>Farwest Taxi:</strong> 206-622-1717</li>
            <li><strong>A1 Seattle Taxi:</strong> 206-466-9500</li>
            <li><strong>STITA Taxi:</strong> 206-246-9999</li>
          </ul>
        </div>
      </InfoAccordion>

      <InfoAccordion title="Tips" open={openSections.tips} onClick={() => toggleSection('tips')}>
        <ul className="space-y-2 text-sm leading-snug text-slate-700">
          <li>Verify the taxi logo, vehicle number, and driver before leaving.</li>
          <li>Downtown trips are often 20-30 minutes, but rush hour can add delay.</li>
          <li>Ask whether the trip is metered or flat-rate before starting the ride.</li>
        </ul>
      </InfoAccordion>
    </div>
  )
}

export default TaxiInfo
