import { useState } from 'react'
import { ShieldCheck, Smartphone } from 'lucide-react'
import { InfoAccordion, InfoHero } from './TransportationInfoShared'

export function RideShareInfo() {
  const [openSections, setOpenSections] = useState({
    pickup: true,
    fares: true,
    tips: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="space-y-4 text-left">
      <InfoHero title="Ride Share at Sea-Tac" icon={<Smartphone className="h-5 w-5" aria-hidden />}>
        Use Uber or Lyft for on-demand pickup after baggage claim. Confirm the assigned stall and vehicle details in your app before you board.
      </InfoHero>

      <InfoAccordion title="Pickup Locations" open={openSections.pickup} onClick={() => toggleSection('pickup')}>
        <ul className="space-y-2 text-sm leading-snug text-slate-700">
          <li>
            <strong>Standard rides:</strong> UberX, UberXL, Lyft Standard, and Lyft XL pick up on the <strong>3rd floor of the parking garage</strong>.
          </li>
          <li>
            <strong>Uber:</strong> Stalls 1-16.
          </li>
          <li>
            <strong>Lyft:</strong> Stalls 19-34.
          </li>
          <li>
            <strong>Premium rides:</strong> Uber Black and Lyft Lux may pick up curbside on the arrivals level. Follow the exact location shown in the app.
          </li>
        </ul>
      </InfoAccordion>

      <InfoAccordion title="Ride Costs & Payment" open={openSections.fares} onClick={() => toggleSection('fares')}>
        <ul className="space-y-2 text-sm leading-snug text-slate-700">
          <li>
            <strong>Downtown Seattle:</strong> commonly about $35-$55 for UberX or Lyft Standard, depending on traffic and demand.
          </li>
          <li>
            <strong>Larger groups:</strong> UberXL or Lyft XL commonly costs about $55-$75.
          </li>
          <li>
            <strong>Airport fee:</strong> ride app pickups from Sea-Tac include an airport access fee.
          </li>
          <li>
            <strong>Payment:</strong> pay in the Uber or Lyft app with card, Apple Pay, Google Pay, PayPal, or other supported methods.
          </li>
        </ul>
      </InfoAccordion>

      <InfoAccordion title="Safety Tips" open={openSections.tips} onClick={() => toggleSection('tips')}>
        <div className="flex gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200/80">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden />
          <ul className="space-y-2 text-sm leading-snug text-slate-700">
            <li>Match the license plate, car model, and driver name before entering the vehicle.</li>
            <li>Use the app's assigned pickup stall instead of accepting rides from drivers who approach you.</li>
            <li>Allow extra time during rush hour, holidays, events, or severe weather.</li>
          </ul>
        </div>
      </InfoAccordion>
    </div>
  )
}

export default RideShareInfo
