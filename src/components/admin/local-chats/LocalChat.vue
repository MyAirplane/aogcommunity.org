<template>
  <div>
    <div v-if="loading" class="max-w-6xl mx-auto pb-6 sm:px-6 lg:px-8">
      <div class="bg-white sm:rounded-lg shadow min-h-64 flex justify-center">
        <Spinner class="m-6" msg="Loading" />
      </div>
    </div>
    <div
      v-else
      class="
        grid grid-cols-1
        gap-6
        items-start
        lg:grid-cols-5
        max-w-6xl
        mx-auto
        pb-6
        sm:px-6
        lg:px-8
      "
    >
      <!-- Chat Column -->
      <div class="col-span-5 lg:col-span-3 bg-gray-50 sm:rounded-lg shadow">
        <div
          class="flex items-center justify-between p-4 border-b border-gray-200"
        >
          <h2
            class="
              text-red-700 text-lg
              inline-flex
              items-center
              font-bold
              break-words
            "
          >
            <ChatIcon class="text-gray-500 h-6 w-6 mr-2" aria-hidden="true" />
            {{ localchat.title }}
          </h2>
        </div>
        <!-- Show chat on larger screens -->
        <div v-if="!open" class="hidden md:block">
          <div class="h-100 divide-y divide-gray-200 bg-white overflow-auto">
            <ul>
              <li
                class="hover:bg-gray-50 p-4"
                v-for="message in messages"
                :key="message.id"
              >
                <UserChatCard :message="message" />
              </li>
            </ul>
          </div>
          <!-- Message form -->
          <div
            v-if="localchat.status == 'Open'"
            class="flex space-x-3 p-4 border-t border-gray-200"
          >
            <div class="flex-shrink-0">
              <Avatar :avatar_url="store.profile.avatar_url" />
            </div>
            <div class="min-w-0 flex-1">
              <form @submit.prevent="newMessage">
                <div>
                  <label for="new_message" class="sr-only">About</label>
                  <textarea
                    v-model="new_message"
                    @keyup.enter.exact="newMessage"
                    id="new_message"
                    rows="3"
                    class="
                      shadow-sm
                      block
                      w-full
                      focus:ring-gray-500
                      focus:border-gray-500
                      sm:text-sm
                      border border-gray-300
                      rounded-md
                    "
                    :placeholder="
                      creator.id == store.profile.id
                        ? 'Chat with pilots willing to help you.'
                        : 'How are you able to help?'
                    "
                  ></textarea>
                </div>
                <div class="mt-4 flex items-center justify-between">
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
                    <span>Please adhere to our community guidelines.</span>
                  </a>
                  <button
                    type="submit"
                    class="
                      px-4
                      py-2
                      border border-transparent
                      text-sm
                      font-medium
                      rounded-md
                      shadow-sm
                      text-white
                      bg-gray-700
                      hover:bg-gray-800
                      focus:outline-none
                      focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                    "
                  >
                    {{ posting_msg ? "Sending..." : "Post" }}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div v-else class="p-4 border-t border-gray-200">
            <p class="text-center text-gray-600 font-light">
              This Local Chat has been marked as <strong>Resolved</strong>,
              therefore the chatroom is closed.
            </p>
          </div>
        </div>
        <!-- Show modal button on mobile -->
        <div class="md:hidden p-6">
          <button
            @click="showMobilechat()"
            class="
              w-full
              px-4
              py-2
              border border-transparent
              text-sm
              font-medium
              rounded-md
              shadow-sm
              text-white
              bg-gray-700
              hover:bg-gray-800
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
            "
          >
            Open Chat
          </button>
        </div>
      </div>

      <!-- Detail Column -->
      <chat-details
        @my-event="getLocalchat"
        :localchat="localchat"
        :creator="creator"
        :participants="participants"
        :aog_airport="aog_airport"
        class="md:order-first"
      ></chat-details>
    </div>
    <!-- Mobile chat modal -->
    <TransitionRoot as="template" :show="open">
      <Dialog
        as="div"
        static
        class="fixed inset-0 h-screen overflow-hidden z-50"
        @close="open = false"
        :open="open"
      >
        <div class="absolute inset-0 overflow-hidden">
          <TransitionChild
            as="template"
            enter="ease-in-out duration-500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="
                absolute
                inset-0
                bg-gray-500 bg-opacity-75
                transition-opacity
              "
            />
          </TransitionChild>

          <div class="fixed inset-y-0 right-0 max-w-full flex">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <div class="w-screen max-w-lg bg-gray-800">
                <div class="h-screen flex flex-col shadow-xl">
                  <div class="flex-none py-4 px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="font-medium text-gray-200 truncate">
                        {{ localchat.title }}
                      </DialogTitle>
                      <div class="ml-3 h-7 flex items-center">
                        <button
                          class="
                            rounded-md
                            text-gray-200
                            hover:text-gray-400
                            focus:outline-none
                            focus:ring-2 focus:ring-gray-400
                          "
                          @click="open = false"
                        >
                          <span class="sr-only">Close panel</span>
                          <XIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- Messages -->
                  <div
                    v-if="messages && open"
                    class="
                      flex-grow
                      divide-y divide-gray-200
                      bg-white
                      overflow-auto
                    "
                  >
                    <ul>
                      <li
                        class="hover:bg-gray-50 p-4"
                        v-for="message in messages"
                        :key="message.id"
                      >
                        <UserChatCard :message="message" />
                      </li>
                    </ul>
                  </div>
                  <!-- Message form -->
                  <form
                    v-if="localchat.status == 'Open'"
                    @submit.prevent="newMessage"
                    class="
                      flex-none
                      p-4
                      bg-gray-100
                      pb-2
                      border-t border-gray-200
                    "
                  >
                    <div>
                      <label for="new_message" class="sr-only">About</label>
                      <textarea
                        v-model="new_message"
                        @keyup.enter.exact="newMessage"
                        id="new_message"
                        rows="3"
                        class="
                          shadow-sm
                          block
                          w-full
                          focus:ring-gray-500
                          focus:border-gray-500
                          sm:text-sm
                          border border-gray-300
                          rounded-md
                        "
                        :placeholder="
                          creator.id == store.profile.id
                            ? 'Chat with pilots willing to help you.'
                            : 'How are you able to help?'
                        "
                      ></textarea>
                    </div>
                    <div class="mt-3 flex items-center justify-between">
                      <a
                        href="/community-guidelines"
                        target="_blank"
                        class="
                          group
                          inline-flex
                          items-start
                          text-xs
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
                        <span>Please adhere to our community guidelines.</span>
                      </a>
                      <button
                        type="submit"
                        class="
                          px-4
                          py-2
                          border border-transparent
                          text-sm
                          font-medium
                          rounded-md
                          shadow-sm
                          text-white
                          bg-gray-700
                          hover:bg-gray-800
                          focus:outline-none
                          focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                        "
                      >
                        {{ posting_msg ? "..." : "Post" }}
                      </button>
                    </div>
                  </form>
                  <div
                    v-else
                    class="
                      flex-none
                      p-4
                      bg-gray-100
                      pb-2
                      border-t border-gray-200
                    "
                  >
                    <p class="text-center text-gray-600 font-light">
                      This Local Chat has been marked as
                      <strong>Resolved</strong>, therefore the chatroom is
                      closed.
                    </p>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import { supabase } from "../../../supabase";
import { store } from "../../../store";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import Avatar from "../profile/Avatar.vue";
import ChatDetails from "./ChatDetails.vue";
import UserChatCard from "./UserChatCard.vue";
import { notify } from "notiwind";

import Spinner from "../Spinner.vue";

import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon, ChatIcon } from "@heroicons/vue/solid";

export default {
  components: {
    UserChatCard,
    ChatDetails,
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
    ChatIcon,
    Spinner,
    Avatar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const loading = ref(true);
    const posting_msg = ref(false);
    const localchat = ref({});
    const creator = ref({});
    const aog_airport = ref({});
    const participants = ref({});
    const messages = ref({});
    const subscriptionMessages = ref("");
    const subscriptionParticipants = ref("");
    const new_message = ref(null);
    const error_message = ref(null);
    const open = ref(false);

    async function getLocalchat() {
      try {
        loading.value = true;
        let { error, data } = await supabase
          .from("localchats")
          .select(
            "*, created_by(id, username, phone_number, avatar_url, first_name, last_name, home_airport), aog_airport(identifier, airport_name, icao_id)"
          )
          .eq("id", route.params.id)
          .single();
        if (error) throw error;
        if (data) {
          localchat.value = data;
          creator.value = data.created_by;
          aog_airport.value = data.aog_airport;
        }
      } catch (error) {
        console.log(error.message);
        router.push("/404");
      } finally {
        loading.value = false;
        getParticipants();
      }
    }

    async function getParticipants() {
      try {
        loading.value = true;
        let { error, data } = await supabase
          .from("participants")
          .select("*, profiles(*)")
          .eq("localchat_id", route.params.id);
        if (error) throw error;
        if (data) {
          participants.value = data;
        }
      } catch (error) {
        console.log(error.message);
        router.push("/404");
      } finally {
        loading.value = false;
      }
    }

    async function getMessages() {
      try {
        loading.value = true;
        let { error, data } = await supabase
          .from("messages")
          .select("*, user(username, avatar_url)")
          .eq("localchat_id", route.params.id)
          .order("inserted_at");
        if (error) throw error;
        if (data) {
          messages.value = data;
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        loading.value = false;
      }
    }

    async function subscribeMessages() {
      subscriptionMessages.value = supabase
        .from("messages:localchat_id=eq." + route.params.id)
        .on("INSERT", (message) => {
          if (message.new) {
            pushSingle(message.new.id);
          }
        })
        .subscribe();
    }

    async function subscribeParticipants() {
      subscriptionParticipants.value = supabase
        .from("participants:localchat_id=eq." + route.params.id)
        .on("UPDATE", () => {
          getParticipants();
        })
        .subscribe();
    }

    async function pushSingle(id) {
      try {
        let { error, data } = await supabase
          .from("messages")
          .select("*, user(username, avatar_url)")
          .eq("id", id)
          .single();
        if (error) throw error;
        if (data) {
          messages.value.push(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    async function newMessage() {
      try {
        posting_msg.value = true;
        store.user = supabase.auth.user();

        const payload = {
          user: store.user.id,
          localchat_id: route.params.id,
          message: new_message.value,
        };

        let { error } = await supabase.from("messages").insert(payload, {
          returning: "minimal", // Don't return the value after inserting
        });

        if (error) throw error;
      } catch (error) {
        notify(
          {
            group: "toast",
            type: "error",
            title: "Error",
            text: error.error_description || error.message,
          },
          6000
        );
      } finally {
        posting_msg.value = false;
        new_message.value = null;
      }
    }
    async function showMobilechat() {
      open.value = true;
    }

    onMounted(() => {
      getLocalchat();
      getMessages();
      subscribeMessages();
      subscribeParticipants;
    });

    return {
      store,
      localchat,
      participants,
      creator,
      aog_airport,
      messages,
      subscriptionMessages,
      subscriptionParticipants,
      new_message,
      newMessage,
      pushSingle,
      loading,
      posting_msg,
      error_message,
      showMobilechat,
      open,
      getLocalchat,
    };
  },
};
</script>
