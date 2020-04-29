import { getHTMLValueFromWhatsappFormatting } from './utils';

it('should return the HTML to preview some Whatsapp formatted text', () => {
  let whatsAppFormatted = '*Hello* ~beautiful~ _world_!';
  let html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe('<b>Hello</b> <s>beautiful</s> <i>world</i>!');

  whatsAppFormatted = '*Hello*~beautiful~_world_!';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe('<b>Hello</b><s>beautiful</s><i>world</i>!');

  whatsAppFormatted = '*Hello beautiful world!';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe('*Hello beautiful world!');

  whatsAppFormatted = '*Hello _beautiful ~world!';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe('*Hello _beautiful ~world!');

  // TODO Expectation is what Whatsapp does but our current regex detects this as URL and embeds in <a>
  //   whatsAppFormatted = 'Hello http://beautiful world!';
  //   html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  //   expect(html).toBe('Hello http://beautiful world!');

  whatsAppFormatted = 'Hello https://beautiful.co world!';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe(
    'Hello <a href="https://beautiful.co" target="_blank" rel="noopener noreferrer">https://beautiful.co</a> world!'
  );

  whatsAppFormatted = 'Hello http://beautiful.co world!';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe(
    'Hello <a href="http://beautiful.co" target="_blank" rel="noopener noreferrer">http://beautiful.co</a> world!'
  );

  whatsAppFormatted = 'Hello ftp://beautiful.co world!';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe('Hello ftp://beautiful.co world!');

  whatsAppFormatted = 'Hello http://www.beaut-iful.co world!';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe(
    'Hello <a href="http://www.beaut-iful.co" target="_blank" rel="noopener noreferrer">http://www.beaut-iful.co</a> world!'
  );

  whatsAppFormatted = 'Hello www.beaut-iful.co world!';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe(
    'Hello <a href="http://www.beaut-iful.co" target="_blank" rel="noopener noreferrer">www.beaut-iful.co</a> world!'
  );

  // TODO Expectation is what Whatsapp does but our current regex detects this as URL and embeds in <a>
  //   whatsAppFormatted = 'Hello www.beaut world!';
  //   html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  //   expect(html).toBe('Hello www.beaut world!');

  // TODO Expectation is what Whatsapp does but our current regex detects this as URL and embeds in <a>
  //   whatsAppFormatted = 'Hello http://www.go world!';
  //   html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  //   expect(html).toBe('Hello http://www.go world!');

  // TODO Expectation is what Whatsapp does but our current regex detects this as URL and embeds in <a>
  //   whatsAppFormatted = 'Hello http://www world!';
  //   html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  //   expect(html).toBe('Hello http://www world!');

  whatsAppFormatted = 'Hello ciao@coronainfochat.org';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe('Hello <a href="mailto:ciao@coronainfochat.org">ciao@coronainfochat.org</a>');

  // TODO(MB) this is recognized as email by Whatsapp but not fro our logic which returns plain text
  //   whatsAppFormatted = 'Hello ciao@cor-onainfochat.org';
  //   html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  //   expect(html).toBe('Hello <a href="mailto:ciao@cor-onainfochat.org">ciao@cor-onainfochat.org</a>');

  whatsAppFormatted = 'Hello ciao@coronainfochat.org';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe('Hello <a href="mailto:ciao@coronainfochat.org">ciao@coronainfochat.org</a>');

  whatsAppFormatted = 'Hello ciao@coronainfochat';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe('Hello ciao@coronainfochat');

  whatsAppFormatted = '@coronainfochat';
  html = getHTMLValueFromWhatsappFormatting(whatsAppFormatted);
  expect(html).toBe('@coronainfochat');
});
