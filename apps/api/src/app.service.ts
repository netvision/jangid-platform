import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getStatus() {
    return {
      service: 'jangid-api',
      status: 'ok',
      timestamp: new Date().toISOString()
    }
  }
}
