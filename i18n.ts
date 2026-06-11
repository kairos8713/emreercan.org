import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'tr'];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? 'en';

  if (!locales.includes(locale)) {
    return {
      locale: 'en',
      messages: (await import('./messages/en.json')).default,
    };
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
