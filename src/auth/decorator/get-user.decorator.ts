import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  // コンテキストから色々取れる
  // 今回は、http から取得
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
