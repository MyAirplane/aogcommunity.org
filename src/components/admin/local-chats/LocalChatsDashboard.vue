<template>
  <div class="max-w-6xl mx-auto pb-6 sm:px-6 lg:px-8">
    <div class="bg-white sm:rounded-lg shadow px-4 py-6">
      <div>
        <CreateHero />
        <LocalChatsTable />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../../../store";
import CreateHero from "../CreateHero.vue";
import LocalChatsTable from "./LocalChatsTable.vue";

export default {
  components: {
    LocalChatsTable,
    CreateHero,
  },
  setup() {
    return {
      store,
    };
  },
};
</script>
