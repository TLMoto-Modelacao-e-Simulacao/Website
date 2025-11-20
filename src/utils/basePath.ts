const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const normalized = rawBasePath.replace(/^\/+|\/+$/g, '');

export const basePath = normalized ? `/${normalized}` : '';

const ABSOLUTE_PATTERN = /^(?:[a-zA-Z][a-zA-Z\d+\-.]*:|\/\/)/;
const NEXT_STATIC_SEGMENT = '_next/static/';

type GlobalWithPrefixCache = typeof globalThis & {
  __TL_RUNTIME_ASSET_PREFIX__?: string;
};

let cachedRuntimePrefix: string | undefined;

function normalizePrefix(prefix: string | undefined) {
  if (!prefix) {
    return '/';
  }

  if (prefix === '.') {
    return './';
  }

  return prefix;
}

function getRuntimePrefix() {
  if (typeof window === 'undefined') {
    return basePath || '/';
  }

  if (cachedRuntimePrefix !== undefined) {
    return cachedRuntimePrefix;
  }

  const globalScope = globalThis as GlobalWithPrefixCache;

  if (typeof globalScope.__TL_RUNTIME_ASSET_PREFIX__ === 'string') {
    cachedRuntimePrefix = globalScope.__TL_RUNTIME_ASSET_PREFIX__;
    return cachedRuntimePrefix;
  }

  let prefix = basePath;

  if (!prefix) {
    const script = document.querySelector<HTMLScriptElement>('script[src*="_next/static/"]');

    if (script) {
      const src = script.getAttribute('src') ?? '';
      const markerIndex = src.indexOf(NEXT_STATIC_SEGMENT);

      if (markerIndex !== -1) {
        prefix = src.slice(0, markerIndex);
      }
    }
  }

  cachedRuntimePrefix = normalizePrefix(prefix);
  globalScope.__TL_RUNTIME_ASSET_PREFIX__ = cachedRuntimePrefix;

  return cachedRuntimePrefix;
}

function joinPrefix(prefix: string, targetPath: string) {
  const trimmedPath = targetPath.startsWith('/') ? targetPath.slice(1) : targetPath;

  if (!trimmedPath) {
    return prefix || '/';
  }

  if (!prefix || prefix === '/') {
    return `/${trimmedPath}`;
  }

  return prefix.endsWith('/') ? `${prefix}${trimmedPath}` : `${prefix}/${trimmedPath}`;
}

export function withBasePath(path: string) {
  if (!path) {
    return getRuntimePrefix();
  }

  if (ABSOLUTE_PATTERN.test(path) || path.startsWith('#')) {
    return path;
  }

  const prefix = getRuntimePrefix();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (basePath && normalizedPath.startsWith(`${basePath}/`)) {
    return normalizedPath;
  }

  return joinPrefix(prefix, normalizedPath);
}
