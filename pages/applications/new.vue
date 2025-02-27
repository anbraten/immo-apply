<template>
  <div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">New Application</h3>
          <p class="mt-1 text-sm text-gray-600">Create a new flat application with all necessary details.</p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
        <div class="mb-6">
          <label for="import-url" class="block text-sm font-medium text-gray-700">Import from URL</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              type="url"
              name="import-url"
              id="import-url"
              v-model="importUrl"
              class="block py-1 px-2 w-full rounded-l-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://example.com/listing"
            />
            <button
              type="button"
              @click="importListing"
              class="inline-flex items-center rounded-r-md border border-l-0 border-indigo-600 bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              :disabled="isImporting"
            >
              {{ isImporting ? 'Importing...' : 'Import' }}
            </button>
          </div>
        </div>

        <form @submit.prevent="submitApplication">
          <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
              <Text id="name" label="Name" v-model="form.name" />

              <Text id="address" label="Address" v-model="form.address" />

              <Text id="net-rent" label="Net Rent" v-model="form.netRent" type="number" />

              <Text id="total-rent" label="Total Rent" v-model="form.totalRent" type="number" />

              <Text id="size" label="Size" v-model="form.size" type="number" />

              <Text id="rooms" label="Rooms" v-model="form.rooms" type="number" />

              <Text id="expose-url" label="Expose URL" v-model="form.exposeUrl" />

              <Gallery :images="form.images" />

              <div>
                <label class="block text-sm font-medium text-gray-700">Expose PDF</label>
                <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                          @change="handleFileUpload"
                          accept=".pdf"
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">PDF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as cheerio from 'cheerio';

import { db, type Application } from '~/utils/db';

const importUrl = ref('');
const isImporting = ref(false);

const form = ref({
  name: '',
  address: '',
  images: [],
  netRent: 0,
  size: 0,
  rooms: 0,
  totalRent: 0,
  exposeUrl: '',
  exposePdf: undefined,
});

async function importListing() {
  if (!importUrl.value) return;

  isImporting.value = true;

  const d = await importImmoScout(importUrl.value);
  console.log(d);

  // try {
  //   const data = await $fetch('/api/import-listing', {
  //     method: 'POST',
  //     body: { url: importUrl.value },
  //   });

  //   console.log(data);

  //   form.value = {
  //     ...form.value,
  //     ...data,
  //   };
  // } catch (error) {
  //   console.error('Error importing listing:', error);
  // } finally {
  //   isImporting.value = false;
  // }

  form.value = {
    ...form.value,
    ...d,
  };

  isImporting.value = false;
}

function handleFileUpload(event: Event) {
  if (!event.target) return;

  form.value.exposePdf = event.target.files[0];
}

async function submitApplication() {
  try {
    const pdfUrl = form.value.exposePdf ? URL.createObjectURL(form.value.exposePdf) : undefined;

    await db.applications.add({
      name: form.value.name,
      address: form.value.address,
      images: [...toRaw(form.value.images)],
      netRent: form.value.netRent,
      totalRent: form.value.totalRent,
      size: form.value.size,
      rooms: form.value.rooms,
      exposeUrl: form.value.exposeUrl,
      exposePdf: pdfUrl ?? '',
      status: 'pending',
      createdAt: new Date(),
    });

    await navigateTo('/');
  } catch (error) {
    console.error('Error saving application:', error);
  }
}

function sanitizeString(raw: string) {
  return raw.replace(/\s+/g, ' ').trim();
}

async function importImmoScout(raw: string) {
  const d = cheerio.load(raw);
  const name = sanitizeString(d('h1[data-qa="expose-title"]').text());
  const address = sanitizeString(d('[data-qa="is24-expose-address"]').text());
  const netRent = parseFloat(sanitizeString(d('.is24qa-kaltmiete-main').text()));
  const totalRent = parseFloat(sanitizeString(d('.is24qa-warmmiete-main').text()));
  const size = parseFloat(sanitizeString(d('.is24qa-flaeche-main').text()));
  const rooms = parseFloat(sanitizeString(d('.is24qa-zi-main').text()));

  const start = raw.indexOf('galleryData: ') + 13;
  const end = raw.indexOf('isModernizationCalculationPossible', start) - 2;
  let galleryData = raw.substring(start, end).trim();
  if (galleryData.endsWith(',')) {
    galleryData = galleryData.slice(0, -1);
  }

  const gallery = JSON.parse(galleryData);

  const images = gallery.images.map((image: any) => ({
    // https://pictures.immobilienscout24.de/listings/8c2da94b-7b59-42f6-9287-1976b5f997e4-1879653218.jpg/ORIG/legacy_thumbnail/0x0/format/webp/quality/73
    // https://pictures.immobilienscout24.de/listings/1d412a1a-6a42-42ce-b2fa-93b95ff30995-1879651033.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73" alt="Küche">

    url: image.galleryPictureUrl.replace('/legacy_thumbnail/', '/resize/1106x830%3E/'),
    caption: image.caption,
  }));

  return {
    name,
    address,
    images,
    netRent,
    totalRent,
    size,
    rooms,
  };
}
</script>
