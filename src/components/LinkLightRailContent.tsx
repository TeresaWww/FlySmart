import { useState } from 'react'
import { Clock, TrainFront } from 'lucide-react'
import { InfoAccordion, InfoHero } from './TransportationInfoShared'

export function LinkLightRail() {
  const [openSections, setOpenSections] = useState({
    destinations: true,
    pricing: true,
    hours: true,
    tips: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="space-y-4 text-left">
      <InfoHero title="Link Light Rail" icon={<TrainFront className="h-5 w-5" aria-hidden />}>
        Link is a low-cost rail option from SeaTac/Airport Station to downtown Seattle, the University District, Northgate, Lynnwood, and Angle Lake.
      </InfoHero>

      <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/80">
        <div className="flex gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden />
          <div className="text-sm leading-snug text-slate-700">
            <p className="font-semibold text-[rgb(2,20,50)]">Typical headways</p>
            <p className="mt-1">Every 8-15 minutes depending on time of day. Check station screens or Sound Transit before boarding.</p>
          </div>
        </div>
      </div>

      <InfoAccordion title="Main Destinations" open={openSections.destinations} onClick={() => toggleSection('destinations')}>
        <ul className="space-y-2 text-sm leading-snug text-slate-700">
          <li><strong>Downtown Seattle:</strong> Pioneer Square, University Street, Westlake, and Pike Place access.</li>
          <li><strong>Capitol Hill and U District:</strong> dining, nightlife, UW campus, and Husky Stadium.</li>
          <li><strong>Northgate, Roosevelt, and Lynnwood:</strong> North Seattle and Snohomish County connections.</li>
          <li><strong>Angle Lake:</strong> one stop south from SeaTac/Airport Station.</li>
        </ul>
      </InfoAccordion>

      <InfoAccordion title="Tickets & Pricing" open={openSections.pricing} onClick={() => toggleSection('pricing')}>
        <ul className="space-y-2 text-sm leading-snug text-slate-700">
          <li><strong>Fare range:</strong> generally about $2.25-$3.50 depending on distance.</li>
          <li>Buy a ticket before boarding from station machines, ORCA, or the Transit GO app.</li>
          <li>Tap ORCA cards at the yellow reader before and after riding.</li>
          <li>Youth riders 18 and under can ride free with eligible youth fare media.</li>
        </ul>
      </InfoAccordion>

      <InfoAccordion title="Operating Hours" open={openSections.hours} onClick={() => toggleSection('hours')}>
        <ul className="space-y-2 text-sm leading-snug text-slate-700">
          <li><strong>Monday-Saturday:</strong> roughly 5:00 AM-1:00 AM.</li>
          <li><strong>Sunday and holidays:</strong> roughly 6:00 AM-12:00 AM.</li>
          <li>Final train times vary. Check Sound Transit schedules for current service.</li>
        </ul>
      </InfoAccordion>

      <InfoAccordion title="Tips" open={openSections.tips} onClick={() => toggleSection('tips')}>
        <ul className="space-y-2 text-sm leading-snug text-slate-700">
          <li>Follow signs to SeaTac/Airport Station from the terminal and parking garage skybridges.</li>
          <li>Keep luggage close during busy travel periods.</li>
          <li>Check service alerts if traveling late at night or during construction windows.</li>
        </ul>
      </InfoAccordion>
    </div>
  )
}

export default LinkLightRail
