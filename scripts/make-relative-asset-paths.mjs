#!/usr/bin/env node
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';

const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const normalizedBasePath = rawBasePath.replace(/^\/+|\/+$/g, '');
const basePathPrefix = normalizedBasePath ? `/${normalizedBasePath}` : '';

const OUT_DIR = resolve(process.cwd(), process.argv[2] ?? 'out');

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function collectCssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectCssFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function ensureNoJekyll(directory) {
  const target = join(directory, '.nojekyll');

  try {
    const existing = await stat(target);

    if (!existing.isFile()) {
      throw new Error(`Expected ${target} to be a file.`);
    }

    return false;
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    } else {
      throw error;
    }
  }

  await writeFile(target, '');
  console.log(`Created ${relative(process.cwd(), target)} to disable GitHub Pages Jekyll processing.`);
  return true;
}

function withTrailingSlash(path) {
  if (path === '.') {
    return './';
  }

  return path.endsWith('/') ? path : `${path}/`;
}

function normalizeRelativePath(path) {
  if (!path) {
    return '.';
  }

  return path.split(sep).join('/');
}

function rewriteToRelative(content, basePrefix) {
  let result = content;
  if (basePathPrefix) {
    const baseWithSlash = `${basePathPrefix}/`;
    const escapedBaseWithSlash = escapeRegex(baseWithSlash);
    result = result.replace(
      new RegExp(`(["'=,(])${escapedBaseWithSlash}`, 'g'),
      (_, start) => `${start}/`,
    );
  }
  const directoryPrefixes = ['_next/', 'images/', 'local-fonts/', 'videos/', 'icons/', 'fonts/'];
  const fileTargets = ['favicon.ico', 'manifest.webmanifest'];

  for (const prefix of directoryPrefixes) {
    const escaped = escapeRegex(prefix);
    const attrPattern = new RegExp(`(["'=])\/${escaped}`, 'g');
    const commaPattern = new RegExp(`(,\s*)\/${escaped}`, 'g');
    const jsonPattern = new RegExp(`(["'])\/${escaped}`, 'g');

    result = result.replace(attrPattern, (_, start) => `${start}${basePrefix}${prefix}`);
    result = result.replace(commaPattern, (_, start) => `${start}${basePrefix}${prefix}`);
    result = result.replace(jsonPattern, (_, quote) => `${quote}${basePrefix}${prefix}`);
  }

  for (const file of fileTargets) {
    const escaped = escapeRegex(file);
    const attrPattern = new RegExp(`(["'=])\/${escaped}`, 'g');
    result = result.replace(attrPattern, (_, start) => `${start}${basePrefix}${file}`);
  }

  result = result.replace(
    /(href=|src=|content=|data-src=|data-href=|poster=|data-poster=)(['"])\/(?!\/)/g,
    (_, attr, quote) => `${attr}${quote}${basePrefix}`,
  );

  result = result.replace(/url\((['"]?)\/(?!\/)/g, (_, quote) => `url(${quote}${basePrefix}`);
  result = result.replace(/url\(&#x27;\/(?!\/)/g, () => `url(&#x27;${basePrefix}`);
  result = result.replace(/url\(&quot;\/(?!\/)/g, () => `url(&quot;${basePrefix}`);
  const escapedBasePrefix = escapeRegex(basePrefix);
  result = result.replace(new RegExp(`(href=['"])${escapedBasePrefix}#`, 'g'), '$1#');

  result = result.replace(/(href=(['"]))(\.{1,2}\/[^'"#?]*[^'"#]*)(['"])/g, (match, start, quote, value, end) => {
    if (!value) {
      return match;
    }

    const withoutLeading = value.replace(/^(\.\/|\.\.\/)+/, '');

    if (!withoutLeading) {
      return `${start}${appendIndexHtml(value)}${end}`;
    }

    const blockedPrefixes = ['_next/', 'images/', 'local-fonts/', 'videos/', 'icons/', 'fonts/'];
    const blockedFiles = ['favicon.ico', 'manifest.webmanifest'];

    if (blockedPrefixes.some(prefix => withoutLeading.startsWith(prefix))) {
      return match;
    }

    if (blockedFiles.some(file => withoutLeading.startsWith(file))) {
      return match;
    }

    return `${start}${appendIndexHtml(value)}${end}`;
  });

  return injectRuntimePrefixScript(result, basePrefix);
}

function rewriteCssToRelative(content, basePrefix) {
  if (!content) {
    return content;
  }

  let result = content;

  if (basePathPrefix) {
    const baseWithSlash = `${basePathPrefix}/`;
    const escapedBaseWithSlash = escapeRegex(baseWithSlash);
    const pattern = new RegExp(`url\((['"])${escapedBaseWithSlash}`, 'g');
    result = result.replace(pattern, (_, quote) => `url(${quote}/`);
  }

  result = result.replace(/url\((['"]?)\/(?!\/)/g, (_, quote = '') => `url(${quote}${basePrefix}`);

  return result;
}

async function rewriteCssFiles(outDir) {
  const cssDir = join(outDir, '_next');
  let cssFiles;

  try {
    cssFiles = (await collectCssFiles(cssDir)).filter(file => file.endsWith('.css'));
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return 0;
    }

    throw error;
  }

  let changed = 0;

  for (const file of cssFiles) {
    const original = await readFile(file, 'utf8');
    const fileDir = dirname(file);
    const relativeToOut = normalizeRelativePath(relative(fileDir, OUT_DIR));
    const basePrefix = withTrailingSlash(relativeToOut);
    const rewritten = rewriteCssToRelative(original, basePrefix);

    if (original !== rewritten) {
      await writeFile(file, rewritten);
      changed += 1;
      console.log(`Rewrote asset URLs in ${relative(process.cwd(), file)}`);
    }
  }

  return changed;
}

function runtimePublicPathPatch() {
  return [
    '(function(){',
    'var __TL_PREFIX__=typeof self==="undefined"?undefined:self.__TL_RUNTIME_ASSET_PREFIX__;',
    'if(typeof __TL_PREFIX__==="string"&&__TL_PREFIX__){',
    'var __TL_NORMALIZED__=__TL_PREFIX__.endsWith("/")?__TL_PREFIX__:__TL_PREFIX__+"/";',
    'r.p=__TL_NORMALIZED__+"_next/";',
    'return r.p;',
    '}',
    'r.p="/_next/";',
    'return r.p;',
    '})()'
  ].join('');
}

async function updateRuntimePublicPath(outDir) {
  const chunksDir = join(outDir, '_next/static/chunks');
  let entries;

  try {
    entries = await readdir(chunksDir, { withFileTypes: true });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }

  const runtimePattern = /r\.p="\/_next\/"([,;])/g;
  const replacement = runtimePublicPathPatch();
  let updated = false;

  for (const entry of entries) {
    if (!entry.isFile() || !/^webpack-.*\.js$/.test(entry.name)) {
      continue;
    }

    const target = join(chunksDir, entry.name);
    const original = await readFile(target, 'utf8');

    if (!runtimePattern.test(original)) {
      continue;
    }

    runtimePattern.lastIndex = 0;
    const rewritten = original.replace(runtimePattern, (_, suffix) => `${replacement}${suffix}`);

    if (rewritten !== original) {
      await writeFile(target, rewritten);
      console.log(`Updated runtime public path in ${relative(process.cwd(), target)}`);
      updated = true;
    }
  }

  return updated;
}

function appendIndexHtml(value) {
  const [pathWithQuery, hash = ''] = value.split('#', 2);
  const [path, query = ''] = pathWithQuery.split('?', 2);

  if (!path || /\.[^/]+$/.test(path)) {
    return `${path}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
  }

  const normalizedPath = path.endsWith('/') ? path : `${path}/`;
  const querySuffix = query ? `?${query}` : '';
  const hashSuffix = hash ? `#${hash}` : '';

  return `${normalizedPath}index.html${querySuffix}${hashSuffix}`;
}

const RUNTIME_PREFIX_SCRIPT_ID = '__TL_ASSET_PREFIX__';
const RUNTIME_PREFIX_SCRIPT_PATTERN = new RegExp(
  `<script[^>]*id=["']${RUNTIME_PREFIX_SCRIPT_ID}["'][^>]*>[\\s\\S]*?<\\/script>`,
  'i',
);

function injectRuntimePrefixScript(content, basePrefix) {
  const scriptTag = `<script id="${RUNTIME_PREFIX_SCRIPT_ID}">self.__TL_RUNTIME_ASSET_PREFIX__=${JSON.stringify(
    basePrefix,
  )};<\/script>`;

  if (!content.includes('</head>')) {
    return content;
  }

  if (RUNTIME_PREFIX_SCRIPT_PATTERN.test(content)) {
    return content.replace(RUNTIME_PREFIX_SCRIPT_PATTERN, scriptTag);
  }

  const headCloseIndex = content.indexOf('</head>');

  if (headCloseIndex === -1) {
    return content;
  }

  return `${content.slice(0, headCloseIndex)}${scriptTag}${content.slice(headCloseIndex)}`;
}

async function main() {
  let directoryStats;

  try {
    directoryStats = await stat(OUT_DIR);
  } catch (error) {
    console.error(`Cannot find the export directory at ${OUT_DIR}. Run \`npm run build\` before this script.`);
    process.exitCode = 1;
    return;
  }

  if (!directoryStats.isDirectory()) {
    console.error(`Expected ${OUT_DIR} to be a directory with exported HTML.`);
    process.exitCode = 1;
    return;
  }

  const htmlFiles = await collectHtmlFiles(OUT_DIR);

  if (htmlFiles.length === 0) {
    console.warn('No HTML files were found in the export directory.');
    return;
  }

  let htmlChanged = 0;

  for (const file of htmlFiles) {
    const original = await readFile(file, 'utf8');
    const fileDir = dirname(file);
    const relativeToOut = normalizeRelativePath(relative(fileDir, OUT_DIR));
    const basePrefix = withTrailingSlash(relativeToOut);
    const rewritten = rewriteToRelative(original, basePrefix);

    if (original !== rewritten) {
      await writeFile(file, rewritten);
      htmlChanged += 1;
      console.log(`Rewrote asset URLs in ${relative(process.cwd(), file)}`);
    }
  }

if (htmlChanged === 0) {
    console.log('No HTML changes were required — asset URLs already looked relative.');
  } else {
    console.log(`Updated ${htmlChanged} HTML file${htmlChanged === 1 ? '' : 's'} with relative asset URLs.`);
  }

  const cssChanged = await rewriteCssFiles(OUT_DIR);

  if (cssChanged === 0) {
    console.log('No CSS changes were required — asset URLs already looked relative.');
  } else {
    console.log(`Updated ${cssChanged} CSS file${cssChanged === 1 ? '' : 's'} with relative asset URLs.`);
  }

  const runtimeUpdated = await updateRuntimePublicPath(OUT_DIR);

  if (runtimeUpdated) {
    console.log('Adjusted Next.js runtime public path for relative asset loading.');
  }

  try {
    await ensureNoJekyll(OUT_DIR);
  } catch (error) {
    console.warn(`Unable to ensure .nojekyll file: ${error instanceof Error ? error.message : error}`);
  }
}

await main();
