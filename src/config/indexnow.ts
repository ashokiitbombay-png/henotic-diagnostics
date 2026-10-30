/**
 * 🚀 IndexNow Configuration for Henotic Diagnostics
 * Instant indexing notification for Bing, Yandex, Seznam, and Naver.
 * 
 * Spec: https://www.indexnow.org/documentation
 */

export const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'b872b7a9504a43b2b528adbb279a0cf8';

export const INDEXNOW_HOST = process.env.NEXT_PUBLIC_SITE_URL 
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host 
  : 'www.henoticdiagnostics.com';

export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

export const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow'
];
