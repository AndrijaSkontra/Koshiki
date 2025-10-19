import { SetMetadata } from '@nestjs/common';

export const INJECT_HTML_KEY = 'injectHtml';

export const InjectHtml = () => SetMetadata(INJECT_HTML_KEY, {});
