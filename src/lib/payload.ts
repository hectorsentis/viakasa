// El import de `@payload-config` es dinámico a propósito.
//
// Con un import estático, un fallo al construir la config (falta PAYLOAD_SECRET,
// cadena de conexión mal formada, etc.) revienta al cargar el módulo: muere
// cualquier archivo que importe esto antes de ejecutar una sola línea, así que
// los try/catch de content.ts y actions.ts —pensados justo para que el sitio
// siga en pie sin base de datos— nunca llegan a entrar. Cargándolo aquí dentro,
// el error se propaga como una excepción normal y sí lo capturan.
export async function getPayloadClient() {
  const { default: configPromise } = await import('@payload-config')
  const { getPayload } = await import('payload')
  return getPayload({ config: configPromise })
}
