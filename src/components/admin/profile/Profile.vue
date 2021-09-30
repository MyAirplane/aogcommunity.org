<template>
  <div class="max-w-2xl mx-auto pb-6 sm:px-6 lg:px-8">
    <div class="bg-white sm:rounded-lg shadow px-4 py-6">
      <InfoCard
        v-if="!store.profile.username"
        class="mb-6"
        title="Profile Required"
        msg="You must complete your profile before you can participate in our community."
      />
      <InfoCard
        v-else-if="!store.profile.verified"
        class="mb-6"
        title="Pilot Verification Recommended"
        msg="Per our Community Guidelines, until your profile is verified you will not be able to create a new Local Chat."
        linktitle="Verify Now"
        linkto="/app/profile/verify"
      />
      <form
        class="space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-x-4"
        @submit.prevent="updateProfile"
      >
        <div class="col-span-1 lg:col-span-2">
          <h2 class="text-lg mt-1 text-gray-700 font-semibold">
            Public Profile
          </h2>
          <p class="text-sm mt-1 text-gray-500">
            Your username, avatar and home airport are shared with other pilots
            in the Local Chats you choose to participate in.
          </p>
        </div>
        <AvatarUploader
          class="col-span-1 lg:col-span-2"
          v-model:path="avatar_url"
          @upload="updateProfile"
        />
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            id="username"
            type="text"
            class="aog-input"
            maxlength="15"
            v-model="username"
            required
          />
        </div>
        <div>
          <label
            for="home_airport"
            class="block text-sm font-medium text-gray-700"
            >Home Airport</label
          >
          <airport-search v-model="home_airport"></airport-search>

          <p class="text-xs mt-1 text-gray-500">
            Your home or nearest airport used for notifications of AOG events
            within 50nm.
          </p>
        </div>
        <div class="col-span-1 lg:col-span-2 border-t border-gray-200 pt-4">
          <h2 class="text-lg mt-1 text-gray-700 font-semibold">
            Private Contact Information

            <router-link
              to="/app/profile/verify"
              class="
                float-right
                text-xs
                flex
                items-center
                justify-center
                font-medium
              "
            >
              <CheckIcon
                class="
                  mr-1.5
                  p-0.5
                  text-green-600
                  h-5
                  w-5
                  rounded-full
                  bg-green-100
                "
                aria-hidden="true"
              />
              Verified
            </router-link>
          </h2>
          <p class="text-sm mt-1 text-gray-500">
            Your full name, email and phone number are
            <b class="font-semibold">never</b> shared publicly to other pilots
            without your direct authorization.
          </p>
        </div>
        <div>
          <label
            for="first_name"
            class="block text-sm font-medium text-gray-700"
            >First Name</label
          >
          <input
            id="first_name"
            type="text"
            class="aog-input"
            v-model="first_name"
            required
          />
        </div>
        <div>
          <label for="last_name" class="block text-sm font-medium text-gray-700"
            >Last Name</label
          >
          <input
            id="last_name"
            type="text"
            class="aog-input"
            v-model="last_name"
            required
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email Address</label
          >
          <input
            id="email"
            type="text"
            class="aog-input"
            :value="store.user.email"
            disabled
          />
        </div>
        <div>
          <label
            for="phone_number"
            class="block text-sm font-medium text-gray-700"
            >Phone number</label
          >
          <input
            id="phone_number"
            type="tel"
            class="aog-input"
            :class="
              validPhone
                ? 'focus:border-green-500 focus:ring-green-600'
                : 'focus:ring-red-600 focus:border-red-500'
            "
            v-model="phone_number"
          />
          <p class="text-xs mt-1 text-gray-500 tracking-tight">
            Used for SMS alerts of nearby AOG events. Leave blank for email
            notifications only.
          </p>
        </div>
        <div class="col-span-1 lg:col-span-2">
          <input
            type="submit"
            class="
              w-full
              px-4
              py-2
              border border-transparent
              rounded-md
              shadow-sm
              font-medium
              text-white
              bg-gray-700
              hover:bg-gray-800
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
            "
            :value="loading ? 'Loading ...' : 'Update Profile'"
            :disabled="loading"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { supabase } from "../../../supabase";
import { store } from "../../../store";
import { onMounted, watch, ref } from "vue";
import AvatarUploader from "../profile/AvatarUploader.vue";
import AirportSearch from "../AirportSearch.vue";
import { notify } from "notiwind";
import InfoCard from "../InfoCard.vue";
import { CheckIcon } from "@heroicons/vue/solid";

import { AsYouType } from "libphonenumber-js";

export default {
  components: {
    AvatarUploader,
    AirportSearch,
    InfoCard,
    CheckIcon,
  },
  setup() {
    const loading = ref(true);
    const username = ref("");
    const first_name = ref("");
    const last_name = ref("");
    const avatar_url = ref("");
    const phone_number = ref("");
    const e164_number = ref("");
    const phone_formatted = ref("");
    const validPhone = ref(false);
    const home_airport = ref("");
    const selected = ref(false);

    async function getProfile() {
      try {
        loading.value = true;
        store.user = supabase.auth.user();

        let { data, error, status } = await supabase
          .from("profiles")
          .select()
          .eq("id", store.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          username.value = data.username;
          first_name.value = data.first_name;
          last_name.value = data.last_name;
          avatar_url.value = data.avatar_url;
          phone_number.value = data.phone_formatted;
          home_airport.value = data.home_airport;
          selected.value = true;
        }
      } catch (error) {
        notify(
          {
            group: "toast",
            type: "error",
            title: "Error",
            text: error.message,
          },
          6000
        );
      } finally {
        loading.value = false;
      }
    }

    async function updateProfile() {
      try {
        loading.value = true;

        if (phone_number.value && !validPhone.value) {
          notify(
            {
              group: "toast",
              type: "error",
              title: "Error",
              text: "Please enter a valid phone number.",
            },
            6000
          );
          return;
        }

        store.user = supabase.auth.user();

        const updates = {
          id: store.user.id,
          username: username.value,
          avatar_url: avatar_url.value,
          updated_at: new Date(),
          first_name: first_name.value,
          last_name: last_name.value,
          phone_number: e164_number.value,
          home_airport: home_airport.value,
          phone_formatted: phone_formatted.value,
          email: store.user.email,
        };

        let { data, error } = await supabase
          .from("profiles")
          .upsert(updates)
          .single();
        if (data) {
          store.profile = data;
          notify({
            group: "toast",
            type: "success",
            title: "Success!",
            text: "Your profile was updated.",
          });
        }
        if (error) throw error;
      } catch (error) {
        notify(
          {
            group: "toast",
            type: "error",
            title: "Error",
            text: error.message,
          },
          6000
        );
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      getProfile();
    });

    async function phoneParser() {
      if (phone_number.value) {
        const asYouType = new AsYouType("US");
        phone_number.value = asYouType.input(phone_number.value);
        validPhone.value = asYouType.isValid();
        e164_number.value = asYouType.getNumber().number;
        phone_formatted.value = asYouType.getNumber().formatNational();
      }
    }

    watch(
      () => phone_number.value,
      () => {
        phoneParser();
      }
    );

    return {
      store,
      loading,
      username,
      first_name,
      last_name,
      avatar_url,
      phone_number,
      e164_number,
      validPhone,
      home_airport,
      selected,

      updateProfile,
      phoneParser,
    };
  },
};
</script>
