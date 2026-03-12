import { Lock, BookOpen } from 'lucide-react'

export const levelColors = {
  Beginner: 'bg-cyber-accent/20 text-cyber-accent border-cyber-accent/50',
  Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/50',
}

export const courses = [
  {
    id: 1,
    title: 'Ethical Hacking Fundamentals',
    slug: 'ethical-hacking-fundamentals',
    desc: 'Learn the core concepts of ethical hacking, legal boundaries, and reconnaissance.',
    fullDescription: 'This course covers the foundational concepts of ethical hacking, legal and ethical boundaries, reconnaissance techniques, and an introduction to security tools. Perfect for beginners who want to start their journey in cybersecurity.',
    level: 'Beginner',
    duration: '8 weeks',
    rating: 4.9,
    price: 5,
    originalPrice: 48,
    thumb: 'linear-gradient(135deg, rgba(0,255,156,0.2) 0%, rgba(17,24,39,1) 100%)',
    icon: Lock,
    modules: ['Introduction to Ethical Hacking', 'Legal & Ethical Framework', 'Reconnaissance & Footprinting', 'Scanning & Enumeration', 'Vulnerability Assessment', 'Basics of Exploitation', 'Report Writing', 'Capstone Project'],
  },
  {
    id: 2,
    title: 'Kali Linux Mastery',
    slug: 'kali-linux-mastery',
    desc: 'Master Kali Linux tools for penetration testing and security assessment.',
    fullDescription: 'Deep dive into Kali Linux and its arsenal of security tools. Learn to use Nmap, Metasploit, Wireshark, and other industry-standard tools for penetration testing and security assessments.',
    level: 'Intermediate',
    duration: '6 weeks',
    rating: 4.8,
    price: 6,
    originalPrice: 58,
    thumb: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(17,24,39,1) 100%)',
    icon: BookOpen,
    modules: ['Kali Setup & Environment', 'Network Scanning with Nmap', 'Metasploit Framework', 'Wireless Security', 'Web Application Testing', 'Post-Exploitation'],
  },
  {
    id: 3,
    title: 'Advanced OSINT Investigation',
    slug: 'advanced-osint-investigation',
    desc: 'Open-source intelligence gathering and analysis techniques.',
    fullDescription: 'Master open-source intelligence (OSINT) methodologies. Learn to gather, analyze, and report on publicly available information for investigations and threat intelligence.',
    level: 'Advanced',
    duration: '10 weeks',
    rating: 4.9,
    price: 8,
    originalPrice: 78,
    thumb: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(17,24,39,1) 100%)',
    icon: BookOpen,
    modules: ['OSINT Fundamentals', 'Social Media & People Search', 'Domain & DNS Intelligence', 'Image & Metadata Analysis', 'Dark Web OSINT', 'Reporting & Legal Considerations'],
  },
  {
    id: 4,
    title: 'Digital Forensics & Incident Response',
    slug: 'digital-forensics-incident-response',
    desc: 'Investigate breaches and perform forensic analysis.',
    fullDescription: 'Learn to investigate security incidents, collect and preserve digital evidence, and perform forensic analysis. Covers disk forensics, memory analysis, and incident response workflows.',
    level: 'Intermediate',
    duration: '12 weeks',
    rating: 4.7,
    price: 7,
    originalPrice: 68,
    thumb: 'linear-gradient(135deg, rgba(0,255,156,0.15) 0%, rgba(17,24,39,1) 100%)',
    icon: BookOpen,
    modules: ['Incident Response Lifecycle', 'Disk Imaging & Analysis', 'Memory Forensics', 'Network Forensics', 'Malware Analysis Basics', 'Evidence & Chain of Custody'],
  },
  {
    id: 5,
    title: 'Network Penetration Testing',
    slug: 'network-penetration-testing',
    desc: 'Hands-on network exploitation and defense strategies.',
    fullDescription: 'Hands-on course on network penetration testing. From initial access to lateral movement and persistence. Learn both offensive techniques and defensive hardening.',
    level: 'Advanced',
    duration: '8 weeks',
    rating: 4.8,
    price: 7,
    originalPrice: 74,
    thumb: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(17,24,39,1) 100%)',
    icon: BookOpen,
    modules: ['Network Fundamentals', 'Active Directory Basics', 'Exploitation Techniques', 'Lateral Movement', 'Privilege Escalation', 'Persistence & Reporting'],
  },
  {
    id: 6,
    title: 'Bug Bounty Hunting',
    slug: 'bug-bounty-hunting',
    desc: 'Find and report vulnerabilities for rewards from top companies.',
    fullDescription: 'Learn to find and responsibly disclose vulnerabilities in web and mobile applications. Covers OWASP Top 10, recon, exploitation, and writing effective reports for bug bounty programs.',
    level: 'Advanced',
    duration: '6 weeks',
    rating: 4.9,
    price: 6,
    originalPrice: 64,
    thumb: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(17,24,39,1) 100%)',
    icon: BookOpen,
    modules: ['Bug Bounty Basics', 'Recon & Subdomain Enumeration', 'OWASP Top 10 Deep Dive', 'API Security', 'Report Writing & Bounty Tips', 'Live Practice Labs'],
  },
]

export function getCourseById(id) {
  return courses.find((c) => c.id === Number(id))
}

export function getCourseBySlug(slug) {
  return courses.find((c) => c.slug === slug)
}
