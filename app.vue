<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">Flat Manager</h1>
            </NuxtLink>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink to="/" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                Applications
              </NuxtLink>
              <NuxtLink
                to="/calendar"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Calendar
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <NuxtPage />
    </main>
  </div>
</template>
