<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      type="text"
      :name="id"
      :id="id"
      :moduleValue="modelValue"
      class="mt-1 p-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  id?: string;
  label?: string;
  modelValue: string;
}>();

defineEmits<{
  'update:modelValue': (value: string) => void;
}>();
</script>
