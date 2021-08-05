<template>
  <div class="rounded-md bg-yellow-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationIcon
          class="animate-pulse h-5 w-5 text-yellow-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-bold text-yellow-800">
          {{ title }}
        </h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>
            {{ msg }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ExclamationIcon } from "@heroicons/vue/solid";

export default {
  props: { title: String, msg: String },
  components: {
    ExclamationIcon,
  },
};
</script>