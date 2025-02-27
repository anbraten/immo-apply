<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      v-if="rows === undefined"
      :type="type || 'text'"
      :name="id"
      :id="id"
      :value="modelValue"
      class="mt-1 py-1 px-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
    <textarea
      v-else
      :name="id"
      :id="id"
      :rows="rows"
      :value="modelValue"
      class="mt-1 py-1 px-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-ind igo-500 sm:text-sm"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<
  {
    id?: string;
    label?: string;
    rows?: number;
  } & (
    | {
        type?: 'text' | 'email' | 'password';
        modelValue: string;
      }
    | {
        type: 'number';
        modelValue: number;
      }
  )
>();

defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
</script>
