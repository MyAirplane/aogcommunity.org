<template>
  <div>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        id="airport"
        type="text"
        class="aog-input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        autocomplete="off"
        @focus="activateSearch"
        @blur="deactivateSearch"
        :disabled="selected"
        ref="airport"
        required
      />
      <button
        v-if="selected"
        class="
          absolute
          inset-y-0
          right-0
          pr-3
          flex
          items-center
          text-gray-500
          hover:text-gray-800
          z
        "
        @click="clearAirport"
      >
        <XIcon class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
    <div
      class="
        mt-1
        text-gray-600
        bg-white
        absolute
        z-10
        max-w-xs
        rounded-md
        border border-gray-200
        shadow-lg
      "
      v-if="!selected && modelValue && activated"
    >
      <p
        v-if="modelValue.length <= 2 && !airports.length"
        class="
          p-4
          text-gray-500
          animate-pulse
          tracking-tight
          font-light
          text-sm
        "
      >
        Continue typing to search...
      </p>
      <button
        @click="clearAirport"
        v-if="modelValue.length > 2 && !airports.length && !selected"
        class="p-4 text-gray-500 tracking-tight font-light text-sm"
      >
        Sorry, we couldn't find a matching airport.
      </button>

      <button
        @click="setAirport(result.identifier)"
        v-for="result of airports"
        :key="result.identifier"
        class="
          group
          hover:bg-gray-100
          truncate
          font-bold
          p-2
          w-full
          text-left
          inline-flex
          items-center
          rounded-md
        "
      >
        {{ result.icao_id ? result.icao_id : result.identifier }}
        <span
          class="
            text-gray-500
            group-hover:text-gray-900
            tracking-tight
            font-light
            text-sm
            pl-1
          "
          >{{ result.airport_name }}</span
        >
      </button>
      <Spinner v-if="loading" msg="Searching for airports" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { supabase } from "../../supabase";
import { XIcon } from "@heroicons/vue/solid";
import Spinner from "./Spinner.vue";

export default {
  props: { modelValue: String },
  emits: ["update:modelValue"],
  components: { XIcon, Spinner },

  setup(props, { emit }) {
    const airports = ref({});
    const loading = ref(false);
    const selected = ref(false);
    const displayId = ref("");
    const displayName = ref("");
    const activated = ref(false);

    async function getAirports() {
      try {
        if (props.modelValue.length <= 2) {
          return;
        }
        loading.value = true;
        let { error, data } = await supabase
          .from("airports")
          .select("identifier, airport_name, icao_id")
          .or(
            `identifier.ilike.*${props.modelValue}*,airport_name.ilike.*${props.modelValue}*,icao_id.ilike.*${props.modelValue}*`
          );

        if (error) throw error;
        if (data) {
          airports.value = data;
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        loading.value = false;
      }
    }

    async function setAirport(id) {
      emit("update:modelValue", id);
      airports.value = "";
      selected.value = true;
    }

    async function clearAirport() {
      emit("update:modelValue", "");
      airports.value = {};
      selected.value = false;
    }

    async function activateSearch() {
      activated.value = true;
    }

    async function deactivateSearch() {
      activated.value = false;
    }

    watch(
      () => props.modelValue,
      () => {
        if (!props.modelValue) {
          selected.value = false;
        } else {
          getAirports();
        }
      }
    );

    onMounted(() => {
      if (props.preSelected) {
        selected.value = true;
      }
    });

    return {
      airports,
      selected,
      displayId,
      displayName,
      activated,

      loading,
      getAirports,
      setAirport,
      clearAirport,
      activateSearch,
      deactivateSearch,
    };
  },
};
</script>