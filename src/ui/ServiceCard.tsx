import { Home, Key, Landmark, Scale } from 'lucide-react'

const icons = { Home, Key, Landmark, Scale }

export function ServiceCard({ service }: { service: any }) {
  const Icon = icons[service.icon as keyof typeof icons] || Home
  return (
    <article className="service-card">
      <span className="service-icon"><Icon size={24} /></span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </article>
  )
}
