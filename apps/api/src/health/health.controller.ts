import { Controller, Get } from '@nestjs/common'

@Controller({ path: 'health' })
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    }
  }
}
