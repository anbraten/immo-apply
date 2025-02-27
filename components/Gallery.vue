<template>
  <div class="relative w-full max-w-2xl mx-auto overflow-hidden">
    <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="w-full relative h-64 lg:h-96 object-cover flex-shrink-0 flex flex-col items-center"
      >
        <img :src="img.url" :alt="img.caption" class="w-auto min-w-48 bg-gray-200 rounded-md h-full object-cover" />
        <p class="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-md px-2 py-1">
          {{ img.caption }}
        </p>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
    >
      &#10094;
    </button>

    <button
      @click="nextSlide"
      class="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
    >
      &#10095;
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  images: { url: string; caption: string }[];
}>();

const currentSlide = ref(0);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.images.length;
};

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + props.images.length) % props.images.length;
}
</script>
