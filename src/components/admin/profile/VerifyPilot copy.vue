<template>
  <div class="flex">
    <litepie-datepicker
      as-single
      :formatter="formatter"
      v-model="dateValue"
    ></litepie-datepicker>
  </div>
</template>

<script>
import { ref } from "vue";
import LitepieDatepicker from "litepie-datepicker";

export default {
  components: {
    LitepieDatepicker,
  },
  setup() {
    const dateValue = ref([]);
    const formatter = ref({
      date: "M/DD/YYYY",
      month: "MMMM",
    });

    return {
      dateValue,
      formatter,
    };
  },
};
</script>