<template>
  <div v-if="application">
    <div class="mt-8 gap-6">
      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {{ application.name }}
          </h2>

          <div class="mt-5">
            <Gallery :images="application.images" />

            <dl class="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-4">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Address</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ application.address }}</dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Net rent</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ application.netRent }} €</dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Total rent</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ application.totalRent }} €</dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Rooms</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ application.rooms }}</dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Size</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ application.size }} m2</dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Status</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ application.status }}</dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Expose URL</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <a :href="application.exposeUrl" target="_blank" class="text-indigo-600 hover:text-indigo-900">
                    View Listing
                  </a>
                </dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Application PDF</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <a
                    v-if="application.exposePdf"
                    :href="application.exposePdf"
                    target="_blank"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    View PDF
                  </a>
                  <span v-else class="text-gray-500">No PDF attached</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Application, db } from '~/utils/db';

const route = useRoute();
const application = ref<Application>();

onMounted(async () => {
  const id = parseInt(route.params.id as string);
  application.value = await db.applications.get(id);
});
</script>
