import { Shield, Eye, FileText, Search, Fingerprint, ShieldAlert } from 'lucide-react'

export const services = [
  {
    slug: 'data-breach-intelligence',
    title: 'Data Breach Intelligence',
    desc: 'Monitor and analyze breach databases; get alerts and attribution.',
    icon: Shield,
    fullDescription: `Our Data Breach Intelligence service gives your security team continuous visibility into breach and leak databases worldwide. We monitor underground forums, paste sites, and breach repositories so you get early alerts when your organization’s data appears.`,
    features: [
      'Continuous monitoring of breach and leak databases',
      'Alerts when your domains, emails, or assets appear in new breaches',
      'Attribution and context for each finding',
      'API and dashboard access for your SOC',
      'Compliance-ready reporting (e.g. breach notification timelines)',
    ],
  },
  {
    slug: 'dark-web-monitoring',
    title: 'Dark Web Monitoring',
    desc: 'Track mentions of your brand and credentials on dark web markets.',
    icon: Eye,
    fullDescription: `We track mentions of your brand, credentials, and sensitive data across dark web markets, forums, and channels. Get actionable intelligence when your assets show up in criminal ecosystems so you can respond before damage spreads.`,
    features: [
      'Monitoring of dark web markets and invite-only forums',
      'Brand and credential mention alerts',
      'Stolen document and database listing detection',
      'Threat actor and campaign context',
      'Custom keyword and asset watchlists',
    ],
  },
  {
    slug: 'threat-intelligence-reports',
    title: 'Threat Intelligence Reports',
    desc: 'Regular reports on emerging threats and actor TTPs.',
    icon: FileText,
    fullDescription: `Receive regular, analyst-written reports on emerging threats, threat actors, and TTPs relevant to your industry and technology stack. Stay ahead of campaigns targeting organizations like yours.`,
    features: [
      'Weekly or monthly threat intelligence briefs',
      'Actor profiles and TTP breakdowns',
      'Industry and vertical-specific analysis',
      'IOCs and detection guidance',
      'Executive summaries for leadership',
    ],
  },
  {
    slug: 'corporate-security-investigations',
    title: 'Corporate Security Investigations',
    desc: 'Internal and external investigations with legal-grade documentation.',
    icon: Search,
    fullDescription: `We support internal and external security investigations with technical analysis and legal-grade documentation. From insider threats to fraud and IP theft, we help you establish facts and support legal or HR actions.`,
    features: [
      'Internal and external investigation support',
      'Forensic imaging and evidence preservation',
      'Legal-grade documentation and chain of custody',
      'Insider threat and fraud analysis',
      'Expert testimony and reporting when required',
    ],
  },
  {
    slug: 'digital-footprint-analysis',
    title: 'Digital Footprint Analysis',
    desc: "Map your organization's exposed attack surface and exposure.",
    icon: Fingerprint,
    fullDescription: `We map your organization’s exposed attack surface and digital footprint—domains, subdomains, cloud assets, leaked credentials, and shadow IT—so you can reduce risk and prioritize remediation.`,
    features: [
      'Attack surface mapping (domains, IPs, cloud assets)',
      'Exposure and misconfiguration identification',
      'Leaked credential and secret scanning',
      'Shadow IT and unmanaged asset discovery',
      'Prioritized remediation recommendations',
    ],
  },
  {
    slug: 'incident-response-recovery',
    title: 'Incident Response & Recovery',
    desc: 'Rapid containment, forensics, and recovery support for security incidents.',
    icon: ShieldAlert,
    fullDescription: `When a security incident occurs, we provide rapid containment, forensics, and recovery support. Our team helps you contain the threat, preserve evidence, and restore operations with minimal business impact.`,
    features: [
      '24/7 incident response readiness',
      'Containment and eradication support',
      'Forensic analysis and evidence preservation',
      'Recovery and hardening guidance',
      'Post-incident review and runbooks',
    ],
  },
]

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug)
}
