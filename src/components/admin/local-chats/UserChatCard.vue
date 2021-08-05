<template>
  <div>
    <div class="flex space-x-3">
      <div class="flex-shrink-0">
        <Avatar :avatar_url="message.user.avatar_url || ''" />
      </div>
      <div class="w-full">
        <div class="flex justify-between">
          <span class="font-medium text-gray-900 text-sm lowercase"
            >@{{ message.user.username }}</span
          >
          <div class="text-gray-500 font-light text-xs">
            {{ dayjs(message.inserted_at).format("h:mm a") }}
          </div>
        </div>
        <p class="text-gray-700 break-all">
          {{ message.message }}
        </p>
      </div>
    </div>
    <a :id="message.id" />
  </div>
</template>
<script>
import Avatar from "../profile/Avatar.vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { onMounted } from "@vue/runtime-core";

export default {
  props: {
    message: Object,
  },
  components: {
    Avatar,
  },
  created: function () {
    this.dayjs = dayjs.extend(utc);
  },
  setup(props) {
    const scrollPageTo = (id) => {
      document.getElementById(`${id}`).scrollIntoView({ behavior: "smooth" });
    };

    onMounted(() => {
      scrollPageTo(props.message.id);
    });

    return {
      scrollPageTo,
    };
  },
};
</script>