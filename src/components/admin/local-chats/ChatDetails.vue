<template>
  <div class="grid grid-cols-1 gap-6 col-span-5 lg:col-span-2">
    <!-- Pilot Info -->
    <div class="bg-white sm:rounded-lg shadow">
      <Disclosure v-slot="{ open }" defaultOpen>
        <DisclosureButton
          class="
            flex
            justify-between
            w-full
            p-4
            font-extrabold
            text-left text-gray-900
            hover:bg-gray-200
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-gray-500
            focus-visible:ring-opacity-75
          "
          :class="
            open
              ? 'md:rounded-t-lg border-b border-gray-200 bg-gray-50'
              : 'md:rounded-lg'
          "
        >
          <div class="inline-flex items-center">
            <UserCircleIcon
              class="text-gray-500 h-5 w-5 mr-2"
              aria-hidden="true"
            />
            {{
              creator.id != store.profile.id ? "AOG Pilot" : "Owner Information"
            }}
          </div>
          <ChevronUpIcon
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5 text-gray-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="space-y-4 p-4">
          <div class="flex justify-between items-center flex-wrap gap-4">
            <div class="flex-grow w-full">
              <div class="flex items-center justify-between">
                <div class="flex-shrink-0">
                  <Avatar
                    v-if="creator.username"
                    :avatar_url="creator.avatar_url"
                  />
                </div>
                <div class="ml-2 flex-grow">
                  <h4 class="leading-6 font-semibold text-gray-800">
                    {{ creator.first_name }} {{ creator.last_name }}
                  </h4>
                  <p class="text-gray-500 tracking-tight font-light">
                    @{{ creator.username }}
                  </p>
                </div>

                <a
                  v-if="creator.id != store.profile.id"
                  :href="'tel:' + creator.phone_number"
                  class="
                    inline-flex
                    items-center
                    px-3
                    mx-auto
                    py-2
                    border border-gray-300
                    shadow-sm
                    font-medium
                    rounded-md
                    text-gray-600
                    bg-white
                    hover:bg-gray-100
                    focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                  "
                >
                  <PhoneIcon class="h-5 w-5" aria-hidden="true" />
                  <span class="pl-2"> Call Pilot</span>
                </a>
              </div>
            </div>

            <div>
              <p class="text-gray-500 tracking-tight mb-1 font-light">
                Tail Number:
              </p>
              <p
                class="
                  rounded-md
                  font-semibold
                  tracking-wider
                  text-gray-800
                  break-words
                "
              >
                {{ localchat.aircraft_reg }}
              </p>
            </div>
            <div>
              <p class="text-gray-500 tracking-tight mb-1 font-light">
                Aircraft Type:
              </p>
              <p
                class="
                  rounded-md
                  font-semibold
                  tracking-wider
                  text-gray-800
                  break-words
                "
              >
                {{ localchat.aircraft_type }}
              </p>
            </div>

            <div>
              <p class="text-gray-500 tracking-tight mb-1 font-light">
                Location:
              </p>
              <p
                class="
                  inline-flex
                  items-center
                  rounded-md
                  font-semibold
                  tracking-wider
                  text-gray-800
                  break-words
                "
              >
                <LocationMarkerIcon
                  class="h-5 w-5 pr-1 text-gray-500"
                  aria-hidden="true"
                />

                {{ aog_airport.identifier }}
              </p>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
    <!-- Participants -->
    <div class="bg-white sm:rounded-lg shadow space-y-4">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="
            flex
            justify-between
            w-full
            p-4
            font-extrabold
            text-left text-gray-900
            hover:bg-gray-200
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-gray-500
            focus-visible:ring-opacity-75
          "
          :class="
            open
              ? 'md:rounded-t-lg border-b border-gray-200 bg-gray-50'
              : 'md:rounded-lg'
          "
        >
          <div class="flex inline-flex items-center">
            <UserGroupIcon
              class="text-gray-500 h-5 w-5 mr-2"
              aria-hidden="true"
            />
            Local Participants
          </div>
          <ChevronUpIcon
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5 text-gray-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="space-y-4 p-4">
          <!-- minimal information for participants -->
          <div>
            <p
              v-if="is_moderator"
              class="text-xs mb-2 text-gray-500 tracking-tight pb-2 -mt-2"
            >
              These pilots are included in the chat, but have
              <strong>not</strong> shared their private contact information.
            </p>
            <div class="space-x-2 space-y-2">
              <span
                v-for="participant of participants"
                :key="participant.profiles.username"
                class="
                  inline-flex
                  rounded-full
                  items-center
                  py-0.5
                  px-2.5
                  text-sm
                  font-medium
                  bg-gray-100
                  text-gray-700
                "
              >
                @{{ participant.profiles.username }}
                <div v-if="participant.is_moderator">
                  <UserCircleIcon
                    class="text-gray-500 h-5 w-5 pl-1.5"
                    v-if="participant.profiles.id == creator.id"
                    aria-hidden="true"
                  />
                  <ShieldCheckIcon
                    class="text-gray-500 h-5 w-5 pl-1.5"
                    v-else
                    aria-hidden="true"
                  />
                </div>
                <button
                  v-if="is_moderator && !participant.is_moderator"
                  @click="removeParticipant(participant)"
                  type="button"
                  class="
                    flex-shrink-0
                    ml-1
                    -mr-1
                    h-4
                    w-4
                    rounded-full
                    inline-flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:bg-red-200
                    hover:text-red-500
                    focus:outline-none
                    focus:bg-gray-500
                    focus:text-white
                  "
                >
                  <span class="sr-only">Remove large option</span>
                  <svg
                    class="h-2 w-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 8 8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-width="1.5"
                      d="M1 1l6 6m0-6L1 7"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
          <!-- more information for creator -->
          <div v-if="is_moderator">
            <h2 class="text-gray-800 font-extrabold pt-4">Private Contacts</h2>
            <p class="text-xs mb-2 text-gray-500 tracking-tight py-2">
              If a Local Participant opts-in to share their private contact
              information, you'll be able to contact them here.
            </p>
            <ul class="divide-y divide-gray-200 space-y-4 -mb-2">
              <template
                v-for="participant of sharedContacts.contacts"
                :key="participant.profiles.username"
              >
                <li>
                  <div class="flex items-center space-x-4 py-2">
                    <div class="flex-shrink-0">
                      <Avatar :avatar_url="participant.profiles.avatar_url" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{ participant.profiles.first_name }}
                        {{ participant.profiles.last_name }}
                      </p>
                      <p class="text-sm text-gray-500 truncate">
                        {{ "@" + participant.profiles.username }}
                      </p>
                    </div>
                    <div v-if="participant.profiles.phone_number">
                      <a
                        :href="'tel:' + participant.profiles.phone_number"
                        class="
                          inline-flex
                          items-center
                          shadow-sm
                          py-2
                          px-3
                          border border-gray-300
                          leading-5
                          font-medium
                          rounded-md
                          text-gray-700
                          bg-white
                          hover:bg-gray-50
                        "
                      >
                        <PhoneIcon class="h-4 w-4 mr-1" aria-hidden="true" />
                        Call
                      </a>
                    </div>
                  </div>
                </li>
              </template>
              <li v-if="!sharedContacts.contacts.length">
                <p
                  class="
                    text-sm text-center
                    mb-2
                    text-gray-500
                    tracking-tight
                    py-2
                  "
                >
                  No one has shared yet. Hang tight!
                </p>
              </li>
            </ul>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
    <!-- Moderator/Privacy Controls -->
    <div class="bg-white sm:rounded-lg shadow space-y-4">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="
            flex
            justify-between
            w-full
            p-4
            font-extrabold
            text-left text-gray-900
            hover:bg-gray-200
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-gray-500
            focus-visible:ring-opacity-75
          "
          :class="
            open
              ? 'md:rounded-t-lg border-b border-gray-200 bg-gray-50'
              : 'md:rounded-lg'
          "
        >
          <div class="flex inline-flex items-center">
            <CogIcon class="text-gray-500 h-5 w-5 mr-2" aria-hidden="true" />

            <span v-if="is_moderator">
              {{ creator.id == store.profile.id ? "Owner" : "Moderator" }}</span
            >
            <span v-else>Privacy</span>&nbsp;Controls
          </div>
          <ChevronUpIcon
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5 text-gray-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="space-y-4 p-4">
          <div v-if="creator.id != store.profile.id">
            <p class="text-xs text-gray-500 tracking-tight -mt-2 mb-2">
              You have the option to share your Full Name and Phone Number with
              the AOG Pilot directly. Currently, your private contact
              information
              <strong>{{
                !currentParticipant.shared_contact_info ? "is not" : "is"
              }}</strong>
              being shared with
              {{
                !currentParticipant.shared_contact_info
                  ? "anyone"
                  : "the AOG Pilot only"
              }}.
            </p>

            <button
              @click="
                shareContact(
                  currentParticipant.id,
                  currentParticipant.shared_contact_info ? false : true
                )
              "
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
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              "
            >
              <span v-if="updating">Updating your share setting...</span
              ><span v-else>
                {{
                  !currentParticipant.shared_contact_info
                    ? "Share My Contact Info with AOG Pilot"
                    : "Stop Sharing My Contact Info"
                }}
              </span>
            </button>
          </div>
          <div v-if="is_moderator">
            <p class="text-xs text-gray-500 tracking-tight mb-2">
              <span v-if="localchat.status == 'Open'">
                Once you find a solution, please mark this Local Chat as
                resolved. This will update it's status and close it.</span
              >
              <span v-if="localchat.status == 'Resolved'">
                You can reopen the chatroom if you'd like to.</span
              >
            </p>

            <button
              v-if="localchat.status == 'Open'"
              @click="updateLocalchat(localchat.id, 'Resolved')"
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
                bg-red-700
                hover:bg-red-800
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              "
            >
              {{ updating ? "Updating ..." : "Mark as Resolved" }}
            </button>
            <button
              v-if="localchat.status == 'Resolved'"
              @click="updateLocalchat(localchat.id, 'Open')"
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
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              "
            >
              {{ updating ? "Updating ..." : "Reopen Local Chat" }}
            </button>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>

    <remove-participant
      :open="removeParticipantModal"
      :participant="participantToRemove"
      @my-event="refreshLocalchat"
    ></remove-participant>
  </div>
</template>
<script>
import {
  MailIcon,
  PhoneIcon,
  LocationMarkerIcon,
  CogIcon,
  UserCircleIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChevronUpIcon,
} from "@heroicons/vue/solid";

import { onMounted, ref } from "vue";
import { supabase } from "../../../supabase";
import { store } from "../../../store";
import { notify } from "notiwind";

import Avatar from "../profile/Avatar.vue";
import RemoveParticipant from "./RemoveParticipant.vue";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

export default {
  props: {
    localchat: Object,
    creator: Object,
    participants: Object,
    aog_airport: Object,
  },
  components: {
    MailIcon,
    PhoneIcon,
    LocationMarkerIcon,
    Avatar,
    CogIcon,
    UserCircleIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    RemoveParticipant,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
  },
  setup(props, { emit }) {
    const removeParticipantModal = ref(false);
    const participantToRemove = ref("");
    const updating = ref(false);
    const is_moderator = ref(false);
    const currentParticipant = ref("");

    async function checkModerator() {
      try {
        let { data, error, status } = await supabase.rpc("check_moderator", {
          chat: props.localchat.id,
          participant: store.user.id,
        });
        if (status == 200) {
          is_moderator.value = data;
        }
        if (error) throw error;
      } catch (error) {
        console.log(error.message);
      }
    }

    async function updateLocalchat(id, status) {
      updating.value = true;
      try {
        const { data, error } = await supabase
          .from("localchats")
          .update({ status: status })
          .eq("id", id)
          .single();
        if (error) throw error;
        if (data) {
          sendNotification(data);
          emit("myEvent");
        }
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
        updating.value = false;
      }
    }

    async function shareContact(id, value) {
      updating.value = true;
      try {
        const { data, error } = await supabase
          .from("participants")
          .update({ shared_contact_info: value })
          .eq("id", id);
        if (error) throw error;
        if (data) {
          emit("myEvent");
        }
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
        updating.value = false;
      }
    }

    async function getCurrentparticipant() {
      try {
        const { data, error } = await supabase
          .from("participants")
          .select("*")
          .eq("user_id", store.user.id)
          .eq("localchat_id", props.localchat.id)
          .single();
        if (error) throw error;
        if (data) {
          currentParticipant.value = data;
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function sendNotification(updatedChat) {
      updating.value = true;
      try {
        const session = supabase.auth.session();
        const bodyData = {
          localchat: updatedChat,
        };
        let res = await fetch(`/.netlify/functions/notify_participants`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: session.access_token,
          },
          body: JSON.stringify(bodyData),
        });
        let data = await res.json();
        if (res.status == 200) {
          notify({
            group: "toast",
            type: "success",
            title: "Success!",
            text: "Participants have been notified.",
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
        updating.value = false;
      }
    }

    function removeParticipant(participant) {
      participantToRemove.value = participant;
      removeParticipantModal.value = true;
    }

    function refreshLocalchat() {
      emit("myEvent");
    }

    onMounted(() => {
      checkModerator();
      getCurrentparticipant();
    });

    return {
      store,
      removeParticipantModal,
      participantToRemove,
      removeParticipant,
      updateLocalchat,
      updating,
      refreshLocalchat,
      is_moderator,
      currentParticipant,
      shareContact,
      sendNotification,
    };
  },
  computed: {
    sharedContacts() {
      const contacts = [];
      for (let participant of this.participants) {
        if (participant.shared_contact_info) {
          contacts.push(participant);
        }
      }
      return {
        contacts,
      };
    },
  },
};
</script>