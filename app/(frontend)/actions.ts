'use server'

import { getPayloadClient } from '@/src/lib/payload'

type ContactState = {
  ok: boolean
  message: string
}

export async function submitLead(_state: ContactState, formData: FormData): Promise<ContactState> {
  const en = formData.get('locale') === 'en'
  const honeypot = String(formData.get('website') || '').trim()
  if (honeypot) {
    return { ok: true, message: en ? 'Request sent. We will contact you within 24 hours.' : 'Solicitud enviada. Te contactaremos en menos de 24 horas.' }
  }

  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const interest = String(formData.get('interest') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const property = String(formData.get('property') || '').trim()

  if (!name || !email) {
    return { ok: false, message: en ? 'Please provide your name and email so we can contact you.' : 'Indica tu nombre y email para que podamos contactar contigo.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'leads',
      data: {
        name,
        email,
        phone,
        interest,
        message,
        property: property ? Number(property) : undefined,
        source: property ? 'property' : 'contact'
      }
    })
    return { ok: true, message: en ? 'Request sent. We will contact you within 24 hours.' : 'Solicitud enviada. Te contactaremos en menos de 24 horas.' }
  } catch {
    return {
      ok: false,
      message: en ? 'We could not send your request just now. Please call or email us and we will help right away.' : 'No hemos podido enviar la solicitud ahora mismo. Llámanos o escríbenos por email y te atenderemos enseguida.'
    }
  }
}
