import { BookOpen, FileText, Video, Download } from 'lucide-react'

export const resources = [
  {
    slug: 'cybersecurity-blog',
    title: 'Cybersecurity Blog',
    desc: 'Latest articles and threat analyses',
    icon: BookOpen,
    fullDescription: `Stay updated with the latest in cybersecurity. Our blog covers threat analyses, industry trends, defensive strategies, and expert commentary to help you stay ahead of attackers.`,
    items: [
      'Weekly threat roundups and analysis',
      'Deep dives into major breaches and campaigns',
      'Defensive tips and hardening guides',
      'Industry news and policy updates',
    ],
  },
  {
    slug: 'osint-guides',
    title: 'OSINT Guides',
    desc: 'Step-by-step OSINT methodologies',
    icon: FileText,
    fullDescription: `Learn open-source intelligence (OSINT) with step-by-step methodologies. From basic recon to advanced techniques, these guides help you gather and analyze public information ethically and effectively.`,
    items: [
      'Recon and footprinting methodologies',
      'Social media and public record research',
      'Domain and infrastructure OSINT',
      'Verification and source validation',
    ],
  },
  {
    slug: 'tool-tutorials',
    title: 'Tool Tutorials',
    desc: 'Video and written tool walkthroughs',
    icon: Video,
    fullDescription: `Master security and OSINT tools with our video and written walkthroughs. We cover setup, usage, and best practices for popular tools used in penetration testing and investigations.`,
    items: [
      'Nmap, Wireshark, and network analysis tools',
      'Burp Suite and web testing basics',
      'OSINT toolchains and automation',
      'Scripting and custom workflow tips',
    ],
  },
  {
    slug: 'case-studies',
    title: 'Case Studies',
    desc: 'Real-world breach and investigation cases',
    icon: FileText,
    fullDescription: `Study real-world breach and investigation cases. We break down timelines, attack vectors, and lessons learned so you can apply them to your own security posture.`,
    items: [
      'Notable breach timelines and root causes',
      'Incident response case studies',
      'Threat actor and campaign analyses',
      'Lessons learned and recommendations',
    ],
  },
  {
    slug: 'downloadable-resources',
    title: 'Downloadable Resources',
    desc: 'Cheat sheets, templates, checklists',
    icon: Download,
    fullDescription: `Download cheat sheets, templates, and checklists to speed up your workflow. All resources are free and designed for practitioners and teams.`,
    items: [
      'Recon and OSINT cheat sheets',
      'Incident response checklists',
      'Security assessment templates',
      'Reporting and documentation templates',
    ],
  },
]

export function getResourceBySlug(slug) {
  return resources.find((r) => r.slug === slug)
}
