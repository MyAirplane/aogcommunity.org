<template>
  <div class="max-w-2xl mx-auto pb-6 sm:px-6 lg:px-8">
    <div class="bg-white sm:rounded-lg shadow">
      <!-- Show success if Verified -->
      <div v-if="store.profile.verified" class="max-w-md mx-auto px-5 py-16">
        <div
          class="
            mx-auto
            flex
            items-center
            justify-center
            h-12
            w-12
            rounded-full
            bg-green-100
          "
        >
          <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3 as="h3" class="text-lg leading-6 font-medium text-gray-900">
            Pilot Verified
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              Your profile was verified successfully!
            </p>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <router-link
            to="/app/profile"
            class="
              inline-flex
              justify-center
              w-full
              rounded-md
              border border-transparent
              shadow-sm
              px-4
              py-2
              bg-gray-600
              text-base
              font-medium
              text-white
              hover:bg-gray-700
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
              sm:text-sm
            "
          >
            Return to My Profile
          </router-link>
        </div>
      </div>
      <!-- Show pending if under review -->
      <div
        v-else-if="store.profile.verified_id == 'under_review'"
        class="max-w-md mx-auto px-5 py-16"
      >
        <div
          class="
            mx-auto
            flex
            items-center
            justify-center
            h-12
            w-12
            rounded-full
            bg-yellow-100
          "
        >
          <ExclamationIcon class="h-6 w-6 text-yellow-600" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3 as="h3" class="text-lg leading-6 font-medium text-gray-900">
            Pending Verification
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              Your profile has been submitted for manual verification and is
              under review. This process may take up to 48 hours.
            </p>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <router-link
            to="/app/profile"
            class="
              inline-flex
              justify-center
              w-full
              rounded-md
              border border-transparent
              shadow-sm
              px-4
              py-2
              bg-gray-600
              text-base
              font-medium
              text-white
              hover:bg-gray-700
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
              sm:text-sm
            "
          >
            Return to My Profile
          </router-link>
        </div>
      </div>
      <div v-else class="p-5">
        <h2 class="text-xl font-bold text-gray-700">
          Automatic Pilot Verification
        </h2>
        <!-- Step 1 -->
        <form
          v-if="step == 1"
          class="space-y-6 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4"
          @submit.prevent="verifyPilot"
        >
          <!-- Important Notice -->
          <div class="rounded-md bg-yellow-50 p-4 md:col-span-2">
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
                <div class="mt-2 text-sm space-y-2 leading-snug text-gray-700">
                  <p>
                    Per our
                    <a
                      href="https://aogcommunity.org/community-guidelines"
                      rel="noopener noreferrer"
                      target="_blank"
                      class="hover:text-gray-800 font-semibold"
                      >Community Guidelines</a
                    >, any pilot wishing to create a Local Chat must hold a
                    valid pilot certificate. This requirement is to protect the
                    community against spam or unauthorized use. We use the FAA's
                    <a
                      href="https://www.faa.gov/licenses_certificates/airmen_certification/releasable_airmen_download/"
                      rel="noopener noreferrer"
                      target="_blank"
                      class="hover:text-gray-800 font-semibold"
                      >Airman Directory Releasable File</a
                    >
                    to automate the verification process, which is publicly
                    available by law.
                  </p>
                  <p>
                    While the information we use for verification is public
                    record, we value your privacy within our community. We will
                    <b>not</b> store the information you input below in your
                    profile or use it for any other purpose within this app.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form -->
          <div class="md:col-span-2">
            <h2
              class="
                text-gray-700
                font-medium
                text-center
                max-w-md
                px-10
                mx-auto
              "
            >
              Enter the following information
              <span class="font-bold">exactly</span>
              as it's written on your medical certificate:
            </h2>
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
            <label
              for="middle_name"
              class="block text-sm font-medium text-gray-700"
              >Middle Name</label
            >
            <input
              id="middle_name"
              type="text"
              class="aog-input"
              v-model="middle_name"
              required
            />
          </div>
          <div class="md:col-span-2">
            <label
              for="last_name"
              class="block text-sm font-medium text-gray-700"
              >Last Name</label
            >
            <input
              id="last_name"
              type="text"
              class="aog-input"
              :value="store.profile.last_name"
              required
              disabled
            />
            <p class="text-xs mt-1 text-gray-500">
              Your Last Name must match your private profile. If it's incorrect,
              go back and
              <router-link
                to="/app/profile"
                class="font-semibold hover:text-gray-700"
                tabindex="-1"
                >Edit Your Profile</router-link
              >
              first.
            </p>
          </div>
          <div>
            <label
              for="med_class"
              class="block text-sm font-medium text-gray-700"
              >Medical Certificate Type</label
            >
            <select
              id="med_class"
              v-model="med_class"
              name="med_class"
              class="aog-input p-2.5"
              required
            >
              <option></option>
              <option value="1">First Class</option>
              <option value="2">Second Class</option>
              <option value="3">Third Class</option>
              <option value="BasicMed">BasicMed</option>
            </select>
          </div>
          <div>
            <label
              for="med_date"
              class="block text-sm font-medium text-gray-700"
              >Issuance Date</label
            >
            <litepie-datepicker
              class="mt-2 rounded-md shadow-sm"
              as-single
              :formatter="
                med_class == 'BasicMed' ? basicmed_formatter : formatter
              "
              required
              v-model="med_date"
            ></litepie-datepicker>
          </div>
          <div class="md:col-span-2">
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
                bg-green-600
                hover:bg-green-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
              "
              :value="
                loading ? 'Checking the FAA Database ...' : 'Verify &rarr;'
              "
              :disabled="loading"
            />
          </div>
        </form>
        <!-- WIP! Step 2 - with city -->
        <form
          v-if="step == 2"
          class="space-y-6 mt-2 grid grid-cols-1"
          @submit.prevent="verifyPilotcity"
        >
          <!-- Important Notice -->
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
                  Action Required
                </h3>
                <div class="mt-2 text-sm space-y-2 leading-snug text-gray-700">
                  <p>
                    More than one result was obtained from the information you
                    submitted, so we need to ask just one more question in order
                    to properly verify you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form -->
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700"
              >What is the name of the <strong>City</strong> listed on your
              certificate?</label
            >
            <input
              id="city"
              type="text"
              class="aog-input"
              v-model="city"
              required
            />
            <p class="text-xs mt-1 text-gray-500">
              This is typically associated with your home address.
            </p>
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
                bg-green-600
                hover:bg-green-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
              "
              :value="loading ? 'Verifying your city ...' : 'Continue &rarr;'"
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
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import { notify } from "notiwind";
import { ExclamationIcon, CheckIcon } from "@heroicons/vue/solid";

import LitepieDatepicker from "litepie-datepicker";

export default {
  components: {
    ExclamationIcon,
    CheckIcon,
    LitepieDatepicker,
  },
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const msg = ref("");
    const first_name = ref("");
    const middle_name = ref("");
    const med_class = ref("");
    const med_date = ref("");
    const city = ref("");
    const formatter = ref({
      date: "M/DD/YYYY",
      month: "MMMM",
    });
    const basicmed_formatter = ref({
      date: "MM/DD/YYYY",
      month: "MMMM",
    });
    const step = ref(1);

    async function nextStep(stepNo) {
      step.value = stepNo;
    }

    async function verifyPilot() {
      loading.value = true;
      try {
        const session = supabase.auth.session();
        const pilotData = {
          first_name: first_name.value,
          middle_name: middle_name.value,
          last_name: store.profile.last_name,
          med_class: med_class.value,
          med_date: med_date.value,
        };
        let res = await fetch(`/.netlify/functions/verify-pilot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: session.access_token,
          },
          body: JSON.stringify(pilotData),
        });
        let data = await res.json();
        if (data.verified == true) {
          notify({
            group: "toast",
            type: "success",
            title: "Success!",
            text: "Your profile has been verified.",
          });
          router.go(); // refresh the page to show verification
        } else if (data.under_review == true) {
          notify({
            group: "toast",
            type: "success",
            title: "Pending",
            text: "Your profile could not be verified automatically and is under review.",
          });
          router.go(); // refresh the page to show verification
        } else {
          // no results
          notify(
            {
              group: "toast",
              type: "error",
              title: "Error",
              text: data.error || "Sorry, there was an error.",
            },
            6000
          );
        }
      } finally {
        loading.value = false;
      }
    }

    watch(
      () => store.profile,
      () => {
        first_name.value = store.profile.first_name;
      }
    );

    return {
      store,
      step,
      loading,
      msg,
      first_name,
      middle_name,
      med_class,
      med_date,
      city,
      formatter,
      basicmed_formatter,

      nextStep,
      verifyPilot,
    };
  },
};
</script>
