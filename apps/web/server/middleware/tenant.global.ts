import { defineEventHandler, getRequestHeader } from 'h3'
import type { H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  const host = getRequestHeader(event, 'x-forwarded-host') || getRequestHeader(event, 'host') || ''
  const primaryHost = host.split(',')[0].trim()
  const [maybeTenant] = primaryHost.split('.')

  console.log(`[Tenant Middleware] Host: ${primaryHost}, Tenant: ${maybeTenant}`)

  if (maybeTenant && !['www', 'app', 'api', 'localhost', 'jangid'].includes(maybeTenant)) {
    event.context.tenantSlug = maybeTenant.toLowerCase()
  }
})
