<template>
  <div v-if="application">
    <div class="md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {{ application.name }}
        </h2>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Application Details</h3>
          <div class="mt-5">
            <dl class="grid grid-cols-1 gap-5">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Address</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ application.address }}</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Status</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ application.status }}</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Listing URL</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <a :href="application.url" target="_blank" class="text-indigo-600 hover:text-indigo-900">
                    View Listing
                  </a>
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Application PDF</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <a
                    v-if="application.pdfUrl"
                    :href="application.pdfUrl"
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
