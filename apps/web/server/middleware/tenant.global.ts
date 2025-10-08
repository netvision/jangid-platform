import { defineEventHandler, getRequestHeader } from 'h3'
import type { H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  const host = getRequestHeader(event, 'host') || ''
  const [maybeTenant] = host.split('.')

  if (maybeTenant && !['www', 'app', 'api', 'localhost', 'jangid'].includes(maybeTenant)) {
    event.context.tenantSlug = maybeTenant.toLowerCase()
  }
})
