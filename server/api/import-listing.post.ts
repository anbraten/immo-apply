import { defineEventHandler, readBody } from 'h3';
import * as cheerio from 'cheerio';

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event);

  const response = await fetch(url);

  const html = await response.text();

  const $ = cheerio.load(html);

  const name = $('h1[data-qa="expose-title"]').text();
  const address = $('div[data-qa="is24qa-location"]').text();
  const imageUrl = $('img.gallery-element.is24-fullscreen-gallery-trigger').attr('src');

  console.log(html, {
    name,
    address,
  });

  if (!imageUrl) {
    throw createError({
      status: 400,
      statusMessage: 'No image found',
    });
  }

  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.arrayBuffer();
  const imageBlobUrl = URL.createObjectURL(new Blob([imageBuffer]));

  return {
    name,
    address,
    url,
    image: imageBlobUrl,
  };
});
