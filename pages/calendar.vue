<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900 mb-6">
      Apartment Tours Calendar
    </h1>
    <vue-cal
      class="vuecal--blue-theme"
      :time-from="9 * 60"
      :time-to="20 * 60"
      :time-step="30"
      :disable-views="['years', 'year']"
      :events="events"
      @cell-click="onCellClick"
      @event-click="onEventClick"
    />
  </div>
</template>

<script setup>
const events = ref([]);

const onCellClick = (cell) => {
  // TODO: Open dialog to create new tour
  console.log("Cell clicked:", cell);
};

const onEventClick = (event) => {
  // TODO: Open dialog to view/edit tour
  console.log("Event clicked:", event);
};

// TODO: Fetch events from Supabase
</script>

<style>
.vuecal--blue-theme {
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
