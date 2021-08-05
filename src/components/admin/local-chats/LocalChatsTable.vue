<template>
  <div class="bg-white border-t border-gray-200 overflow-hidden -mx-4">
    <ul class="divide-y divide-gray-200">
      <li class="px-4 py-2 bg-gray-800">
        <p class="text-gray-100 font-bold">Select a Local Chat</p>
      </li>
      <li v-if="loading" class="text-center p-6">
        <Spinner msg="Searching for Local Chats" />
      </li>
      <li v-if="!loading && !localchats.length">
        <p class="text-center pt-6 text-gray-600 font-light">
          You are not participating in any Local Chats.
        </p>
      </li>
      <li v-for="localchat in localchats" :key="localchat.id">
        <router-link
          :to="{ name: 'localchat', params: { id: localchat.id } }"
          class="block hover:bg-gray-50"
        >
          <div class="flex items-center p-4">
            <div class="min-w-0 flex-1 flex items-center">
              <div class="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p
                    class="text-lg font-mediu truncate"
                    :class="
                      localchat.status == 'Open'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    "
                  >
                    <strong class="text-gray-600 pr-1"
                      >#{{ localchat.id }}</strong
                    >
                    {{ localchat.title }}
                  </p>
                  <p class="mt-2 text-sm text-gray-600">
                    Updated on
                    {{ " " }}
                    <time :datetime="localchat.updated_at">
                      {{
                        dayjs(localchat.updated_at).format(
                          "MMM D, YYYY [at] LT"
                        )
                      }}
                    </time>
                  </p>
                </div>
                <div class="hidden md:flex items-center">
                  <div>
                    <p class="flex inline items-center text-sm text-gray-500">
                      <LocationMarkerIcon
                        class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-600"
                        aria-hidden="true"
                      />
                      <span class="truncate">
                        {{ localchat.aog_airport.identifier }}
                        - {{ localchat.aog_airport.airport_name }}</span
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex font-semibold text-sm items-center space-x-1"
              :class="
                localchat.status == 'Open' ? 'text-red-600' : 'text-gray-600'
              "
            >
              <span>{{
                localchat.status == "Open" ? "Chat Now" : localchat.status
              }}</span>
              <CheckCircleIcon
                v-if="localchat.status == 'Resolved'"
                class="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
              <ChevronRightIcon
                v-else
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </router-link>
      </li>
      <li v-if="localchats.length">
        <p class="text-center pt-6 text-gray-600 text-light text-xs">
          Local Chats automatically resolve after 7 days.
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { supabase } from "../../../supabase";
import { store } from "../../../store";
import { onMounted, ref } from "vue";
import CreateLink from "../CreateHero.vue";
import Spinner from "../Spinner.vue";

import {
  CheckCircleIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  ChatIcon,
} from "@heroicons/vue/solid";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

export default {
  components: {
    CheckCircleIcon,
    ChevronRightIcon,
    LocationMarkerIcon,
    ChatIcon,
    CreateLink,
    Spinner,
  },
  setup() {
    const loading = ref(true);
    const localchats = ref({});

    async function getLocalchats() {
      try {
        loading.value = true;
        let { error, data } = await supabase
          .from("localchats")
          .select(
            "*, created_by(username, avatar_url, phone_number), aog_airport(identifier, airport_name, icao_id)"
          )
          .order("updated_at");
        if (error) throw error;
        if (data) {
          localchats.value = data;
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      getLocalchats();
    });

    return {
      store,
      localchats,
      getLocalchats,
      loading,
    };
  },
  created: function () {
    this.dayjs = dayjs.extend(localizedFormat);
  },
};
</script>
