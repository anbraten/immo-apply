<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Applications</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all flat applications including their status and details.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <NuxtLink
          to="/applications/new"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Add application
        </NuxtLink>
      </div>
    </div>

    <div class="mt-8 space-y-4">
      <div
        v-for="application in applications"
        :key="application.id"
        class="bg-white shadow sm:rounded-lg overflow-hidden"
      >
        <div class="flex">
          <div class="w-64 h-48 flex-shrink-0">
            <img
              :src="application.images?.[0]?.url ?? 'https://picsum.photos/seed/default/800/400'"
              :alt="application.name"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="flex-1 px-6 py-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-gray-900">{{ application.name }}</h3>
              <select
                v-model="application.status"
                @change="updateStatus(application)"
                class="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="viewing">Viewing</option>
                <option value="applied">Applied</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>

            <p class="text-sm text-gray-500 mb-4">{{ application.address }}</p>

            <div class="flex items-center justify-between">
              <div class="space-x-4">
                <NuxtLink
                  :to="`/applications/${application.id}`"
                  class="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                >
                  View Details
                </NuxtLink>
                <a
                  :href="application.exposeUrl"
                  target="_blank"
                  class="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                >
                  View Listing →
                </a>
              </div>

              <span class="text-xs text-gray-500">
                {{ new Date(application.createdAt).toLocaleDateString() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { db, type Application } from '~/utils/db';

const applications = ref<Application[]>([]);

async function updateStatus(application: Application) {
  try {
    await db.applications.update(application.id, {
      status: application.status,
    });
  } catch (error) {
    console.error('Error updating status:', error);
  }
}

onMounted(async () => {
  applications.value = await db.applications.toArray();
});
</script>
