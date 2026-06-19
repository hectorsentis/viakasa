'use client'

import { useActionState } from 'react'

import { submitLead } from '@/app/(frontend)/actions'

export function ContactForm({ propertyId }: { propertyId?: string }) {
  const [state, action, pending] = useActionState(submitLead, { ok: false, message: '' })
  return (
    <form action={action} className="contact-card">
      <input type="hidden" name="property" value={propertyId || ''} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />
      <h3>Hablemos de tu vivienda</h3>
      <div className="field">
        <label htmlFor="name">Nombre</label>
        <input id="name" name="name" placeholder="Tu nombre" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="tu@email.com" required />
      </div>
      <div className="field">
        <label htmlFor="phone">Teléfono</label>
        <input id="phone" name="phone" placeholder="600 000 000" />
      </div>
      <div className="field">
        <label htmlFor="interest">Interés</label>
        <select id="interest" name="interest" defaultValue={propertyId ? 'Agendar visita' : 'Valoración'}>
          <option>Valoración</option>
          <option>Comprar vivienda</option>
          <option>Vender vivienda</option>
          <option>Agendar visita</option>
          <option>Asesoría legal o financiera</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Mensaje</label>
        <textarea id="message" name="message" placeholder="Cuéntanos qué necesitas" />
      </div>
      <button className="button button-accent" type="submit" disabled={pending}>
        {pending ? 'Enviando solicitud' : 'Solicitar contacto'}
      </button>
      {state.message ? <p className="form-message">{state.message}</p> : null}
    </form>
  )
}
