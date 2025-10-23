import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getLayoutType } from './helper';
import { DeviceType } from './types';

export const Device = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): DeviceType => {
    const request = ctx.switchToHttp().getRequest();
    const userAgentHeader = request.headers['user-agent'];

    if (!userAgentHeader) {
      return 'desktop';
    }

    return getLayoutType(userAgentHeader);
  },
);
