import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { JwtPayload } from '../interfaces/jwt-payload.interface'

export const CurrentUser = createParamDecorator((data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ user?: JwtPayload }>()
  const user = request.user
  if (!user) {
    return undefined
  }
  return data ? user[data] : user
})
