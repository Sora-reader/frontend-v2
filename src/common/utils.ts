import {IncomingMessage} from "http";

export const isClientNavigation = (req: IncomingMessage) => req.url?.startsWith('/_next');
