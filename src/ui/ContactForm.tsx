'use client'

import { useActionState } from 'react'

import { submitLead } from '@/app/(frontend)/actions'
import type { Locale } from '@/src/i18n'

export function ContactForm({ propertyId, locale = 'es' }: { propertyId?: string; locale?: Locale }) {
  const [state, action, pending] = useActionState(submitLead, { ok: false, message: '' })
  const en = locale === 'en'
  return (
    <form action={action} className="contact-card">
      <input type="hidden" name="property" value={propertyId || ''} />
      <input type="hidden" name="locale" value={locale} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />
      <h3>{en ? 'Let’s talk about your property' : 'Hablemos de tu vivienda'}</h3>
      <div className="field">
        <label htmlFor="name">{en ? 'Name' : 'Nombre'}</label>
        <input id="name" name="name" placeholder={en ? 'Your name' : 'Tu nombre'} required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="tu@email.com" required />
      </div>
      <div className="field">
        <label htmlFor="phone">{en ? 'Phone' : 'Teléfono'}</label>
        <input id="phone" name="phone" placeholder="600 000 000" />
      </div>
      <div className="field">
        <label htmlFor="interest">{en ? 'I am interested in' : 'Interés'}</label>
        <select id="interest" name="interest" defaultValue={propertyId ? (en ? 'Arrange a viewing' : 'Agendar visita') : (en ? 'Valuation' : 'Valoración')}>
          {(en ? ['Valuation', 'Buying a property', 'Selling a property', 'Arrange a viewing', 'Legal or financial advice'] : ['Valoración', 'Comprar vivienda', 'Vender vivienda', 'Agendar visita', 'Asesoría legal o financiera']).map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">{en ? 'Message' : 'Mensaje'}</label>
        <textarea id="message" name="message" placeholder={en ? 'Tell us what you need' : 'Cuéntanos qué necesitas'} />
      </div>
      <button className="button button-accent" type="submit" disabled={pending}>
        {pending ? (en ? 'Sending request' : 'Enviando solicitud') : (en ? 'Request a call' : 'Solicitar contacto')}
      </button>
      {state.message ? <p className="form-message">{state.message}</p> : null}
    </form>
  )
}
