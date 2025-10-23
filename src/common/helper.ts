import { randomUUID } from 'crypto';
import Handlebars from 'handlebars';
import { DeviceType, LayoutType } from './types';

export function koshiki(html: string, type: LayoutType, templateValues?: any) {
  const tempValuedMod = templateValues || {};
  const email = Handlebars.compile(html)(tempValuedMod);
  const partialName = randomUUID().toString();
  Handlebars.registerPartial(partialName, email);
  return { data: partialName, type: type };
}

export function getLayoutType(userAgentHeader: string): DeviceType {
  const mobilePatterns = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /Opera Mini/i,
    /IEMobile/i,
    /Mobile/i,
    /mobile/i,
    /CriOS/i,
    /FxiOS/i,
    /EdgiOS/i,
  ];

  return mobilePatterns.some((pattern) => pattern.test(userAgentHeader))
    ? 'mobile'
    : 'desktop';
}
