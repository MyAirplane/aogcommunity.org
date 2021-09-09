<template>
  <div class="max-w-2xl mx-auto pb-6 sm:px-6 lg:px-8">
    <div v-if="!store.profile.verified" class="bg-white sm:rounded-lg shadow">
      <InfoCard
        class="mb-6"
        title="Pilot Verification Required"
        msg="Per our Community Guidelines, you must affirm you hold a valid pilot certificate from the FAA before creating a Local Chat."
        linktitle="Verify Now"
        linkto="/app/profile/verify"
      />
    </div>
    <div v-else class="bg-white sm:rounded-lg shadow">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h2 class="text-lg leading-6 font-bold text-red-700">
          Connect with local pilots now
        </h2>
        <p class="text-sm mt-1 text-gray-500">
          Are you AOG and need help? Complete the form below to seek assistance
          from a local pilot.
        </p>
      </div>
      <div class="space-y-6 px-5 pb-6">
        <!-- Message -->
        <div v-show="msg" class="max-w-md mx-auto">
          <h2 class="text-lg mt-6 text-center text-gray-700 font-semibold">
            {{ msg }}
          </h2>
        </div>
        <!-- Step 1 -->
        <form
          v-show="step == 1"
          class="space-y-6 grid grid-cols-1 gap-x-4"
          @submit.prevent="findPilots"
        >
          <div>
            <label
              for="aog_airport"
              class="block text-sm font-medium text-gray-700"
              >Airport you are currently AOG</label
            >
            <airport-search v-model="aog_airport" />
            <p class="text-xs mt-1 text-gray-500 tracking-tight">
              We'll search for pilots within a 50nm radius of here.
            </p>
          </div>
          <div>
            <label for="reason" class="block text-sm font-medium text-gray-700"
              >Nature of AOG Event</label
            >
            <select
              id="reason"
              v-model="reason"
              name="reason"
              class="aog-input"
              required
            >
              <option></option>
              <option>Engine Issue</option>
              <option>Airframe Issue</option>
              <option>Avionics Issue</option>
              <option>Flat Tire</option>
              <option>Need Local Transportation</option>
              <option>Not listed...</option>
            </select>
            <div class="mt-2 flex items-center justify-between">
              <a
                href="/community-guidelines"
                target="_blank"
                class="
                  group
                  inline-flex
                  items-start
                  text-xs
                  tracking-tight
                  space-x-1
                  text-gray-500
                  hover:text-gray-900
                "
              >
                <!-- Heroicon name: solid/question-mark-circle -->
                <svg
                  class="
                    flex-shrink-0
                    h-4
                    w-4
                    text-gray-400
                    group-hover:text-gray-500
                  "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span
                  >Must be in accordance with our Community Guidelines.</span
                >
              </a>
            </div>
          </div>
          <div>
            <input
              type="submit"
              class="
                w-full
                px-4
                py-2
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-white
                bg-gray-700
                hover:bg-gray-800
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
              "
              :value="loading ? 'Searching for pilots ...' : 'Continue &rarr;'"
              :disabled="loading"
            />
          </div>
        </form>
        <!-- Step 2 -->
        <div v-show="nearby_airports.length && step == 2">
          <ul class="space-y-2 max-w-md mx-auto">
            <template v-for="airport in nearby_airports" :key="airport.id">
              <li v-if="airport.users_count">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-900 truncate">
                      {{ airport.id }}
                      <span class="font-light text-gray-700">{{
                        airport.name
                      }}</span>
                    </p>
                    <p
                      class="text-sm truncate"
                      :class="{
                        'text-red-500': airport.distance_nm >= 150,
                        'text-yellow-500':
                          airport.distance_nm < 150 && airport.distance_nm > 25,
                        'text-green-500': airport.distance_nm <= 25,
                      }"
                    >
                      {{
                        airport.distance_nm == 0
                          ? "Current Location"
                          : airport.distance_nm.toLocaleString("en-US") +
                            " nm away"
                      }}
                    </p>
                  </div>
                  <div>
                    <span
                      class="
                        inline-flex
                        items-center
                        shadow-sm
                        px-2.5
                        py-0.5
                        border border-gray-300
                        text-sm
                        leading-5
                        font-medium
                        rounded-full
                        text-gray-700
                        bg-white
                        hover:bg-gray-50
                      "
                    >
                      {{
                        airport.users_count > 1
                          ? airport.users_count + " local pilots"
                          : airport.users_count + " local pilot"
                      }}
                    </span>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div
          v-show="nearby_airports.length && step == 2"
          class="max-w-md mx-auto"
        >
          <div class="rounded-md bg-yellow-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <ExclamationIcon
                  class="h-5 w-5 text-yellow-400"
                  aria-hidden="true"
                />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-yellow-800">
                  Important Notice
                </h3>
                <div class="mt-2 text-xs text-gray-700">
                  <p>
                    If you choose to continue, an SMS alert will be sent to the
                    pilots above. We take privacy very seriously. Our Community
                    Guidelines have specific requirements for for creating a new
                    Local Chat. You agree that your current situation is
                    appropriate and in accordance with our
                    <a
                      href="/community-guidelines"
                      target="_blank"
                      class="font-bold hover:text-gray-900"
                      >Community Guidelines</a
                    >.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            @click="nextStep(3)"
            class="
              w-full
              px-4
              py-2
              mt-4
              border border-transparent
              rounded-md
              shadow-sm
              text-sm
              font-medium
              text-white
              bg-gray-700
              hover:bg-gray-800
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
            "
          >
            I understand. Continue &rarr;
          </button>
          <p class="mt-4 text-center text-sm tracking-tight text-gray-500">
            <router-link to="/app/local-chats" class="hover:text-gray-900"
              >Nevermind, go back.</router-link
            >
          </p>
        </div>
        <!-- Step 3 -->
        <form
          v-show="step == 3"
          class="space-y-6 grid grid-cols-1 gap-x-4"
          @submit.prevent="newChat"
        >
          <div>
            <label for="aog_airport" class="block font-medium text-gray-700"
              >What are the details of your AOG event?</label
            >
            <p class="text-sm mt-1 text-gray-500 tracking-tight">
              Be descriptive with your issue, this message will be added to the
              SMS notification sent to nearby pilots.
            </p>

            <label for="first_message" class="sr-only">About</label>
            <textarea
              v-model="first_message"
              id="first_message"
              rows="3"
              class="
                mt-2
                shadow-sm
                block
                w-full
                focus:ring-gray-500
                focus:border-gray-500
                sm:text-sm
                border border-gray-300
                rounded-md
                placeholder-gray-400
              "
              maxlength="250"
              placeholder="Blew tire upon landing. Anyone know a good mechanic?"
              required
            ></textarea>
          </div>
          <div>
            <label
              for="aircraft_reg"
              class="block text-sm font-medium text-gray-700"
              >What is your aircraft's Tail Number?</label
            >
            <input
              id="aircraft_reg"
              type="text"
              class="aog-input uppercase"
              maxlength="6"
              placeholder="N123CD"
              v-model="aircraft_reg"
              required
            />
          </div>
          <div>
            <label
              for="aircraft_type"
              class="block text-sm font-medium text-gray-700"
              >What is your aircraft type?</label
            >
            <input
              id="aircraft_type"
              type="text"
              class="aog-input"
              maxlength="25"
              placeholder="Cirrus SR22"
              v-model="aircraft_type"
              required
            />
          </div>

          <div>
            <input
              type="submit"
              class="
                w-full
                px-4
                py-2
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-white
                bg-red-700
                hover:bg-red-800
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
              "
              :value="
                loading
                  ? 'Just a moment ...'
                  : 'Send Alert &amp; Create Local Chat &rarr;'
              "
              :disabled="loading"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../../../supabase";
import { store } from "../../../store";
import { ref } from "vue";
import { useRouter } from "vue-router";
import AvatarUploader from "../profile/AvatarUploader.vue";
import AirportSearch from "../AirportSearch.vue";
import InfoCard from "../InfoCard.vue";
import { notify } from "notiwind";
import { ExclamationIcon } from "@heroicons/vue/solid";

export default {
  components: {
    AvatarUploader,
    AirportSearch,
    ExclamationIcon,
    InfoCard,
  },
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const aog_airport = ref("");
    const msg = ref("");
    const nearby_airports = ref([]);
    const step = ref(1);
    const reason = ref("");
    const first_message = ref("");
    const aircraft_reg = ref("");
    const aircraft_type = ref("");

    async function findPilots() {
      try {
        loading.value = true;

        const { data: nearby_rpc, error } = await supabase.rpc(
          "get_nearby_airports",
          {
            radius: 50,
            airport: aog_airport.value,
          }
        );

        if (nearby_rpc.length) {
          msg.value = "Good news! We found some pilots located nearby.";
          nearby_airports.value = nearby_rpc;
        } else {
          const { data: nearest_rpc, error } = await supabase.rpc(
            "get_nearest_airports",
            {
              no_of_airports: 3,
              airport: aog_airport.value,
            }
          );
          if (error) throw error;
          if (nearest_rpc.length) {
            msg.value =
              "We couldn't find any pilots within 50nm. Here are the the closest pilots we could find:";
            nearby_airports.value = nearest_rpc;
          } else {
            msg.value = "Sorry, there was a problem.";
            nearby_airports.value = nearest_rpc;
          }
        }
        if (error) throw error;
      } catch (error) {
        msg.value = error;
      } finally {
        loading.value = false;
        step.value = 2;
      }
    }

    async function nextStep(stepNo) {
      step.value = stepNo;
      if (stepNo == 3) {
        msg.value = "";
      }
    }

    async function newChat() {
      loading.value = true;
      try {
        const session = supabase.auth.session();
        const chatData = {
          title: `AOG at ${aog_airport.value} - ${reason.value}`,
          airport: aog_airport.value,
          details: first_message.value,
          reason: reason.value,
          nearby_airports: nearby_airports.value,
          aircraft_reg: aircraft_reg.value.toUpperCase(),
          aircraft_type: aircraft_type.value,
        };
        let res = await fetch(`/.netlify/functions/new_localchat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: session.access_token,
          },
          body: JSON.stringify(chatData),
        });
        let data = await res.json();
        if (res.status == 200) {
          notify({
            group: "toast",
            type: "success",
            title: "Success!",
            text: "Created local chat #" + data.id,
          });
          router.push("/app/local-chats/" + data.id);
        } else {
          notify(
            {
              group: "toast",
              type: "error",
              title: "Error",
              text: data.error,
            },
            6000
          );
        }
      } finally {
        loading.value = false;
      }
    }

    return {
      store,
      loading,
      aog_airport,
      msg,
      nearby_airports,
      step,
      first_message,
      reason,
      aircraft_reg,
      aircraft_type,

      findPilots,
      nextStep,
      newChat,
    };
  },
};
</script>
