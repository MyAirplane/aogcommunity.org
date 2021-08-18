<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      static
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="open = false"
      :open="open"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block
          sm:p-0
        "
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              inline-block
              align-bottom
              bg-white
              rounded-lg
              px-4
              pt-5
              pb-4
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8
              sm:align-middle
              sm:max-w-2xl
              sm:w-full
              sm:p-6
            "
          >
            <div v-if="verified">
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
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  Payment successful
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eius aliquam laudantium explicabo pariatur iste dolorem
                    animi vitae error totam. At sapiente aliquam accusamus
                    facere veritatis.
                  </p>
                </div>
              </div>
            </div>
            <div v-else>
              <div>
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  Automatic Pilot Verification
                </DialogTitle>
                <div class="mt-2 space-y-2">
                  <p class="text-sm text-gray-500">
                    In accordance with our Community Guidelines, any pilot
                    wishing to create a Local Chat must hold a valid pilot
                    certificate. This requirement is to protect the community
                    against spam or unauthorized use. To automate the
                    verification process, we use the FAA's
                    <a
                      href="https://www.faa.gov/licenses_certificates/airmen_certification/releasable_airmen_download/"
                      >Airman Directory Releasable File</a
                    >, which is publicly available by law.
                  </p>
                  <p class="text-sm text-gray-500">
                    While the information we use for verification is public
                    record, we value your privacy within our community. The
                    information you input below will <b>not</b> be stored in
                    your profile. It will be used to query the directory one
                    time to verify your identity, and never be used again for
                    any other purpose within this app.
                  </p>
                </div>
              </div>
            </div>
            <div
              v-if="!verified"
              class="
                mt-5
                sm:mt-6
                sm:grid sm:grid-cols-2
                sm:gap-3
                sm:grid-flow-row-dense
              "
            >
              <button
                type="button"
                class="
                  w-full
                  inline-flex
                  justify-center
                  rounded-md
                  border border-transparent
                  shadow-sm
                  px-4
                  py-2
                  bg-green-600
                  text-base
                  font-medium
                  text-white
                  hover:bg-green-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                  sm:col-start-2
                  sm:text-sm
                "
                @click="open = false"
              >
                Verify
              </button>
              <button
                type="button"
                class="
                  mt-3
                  w-full
                  inline-flex
                  justify-center
                  rounded-md
                  border border-gray-300
                  shadow-sm
                  px-4
                  py-2
                  bg-white
                  text-base
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                  sm:mt-0
                  sm:col-start-1
                  sm:text-sm
                "
                @click="open = false"
                ref="cancelButtonRef"
              >
                Cancel
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/outline";

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    CheckIcon,
  },
  setup() {
    const open = ref(true);

    return {
      open,
    };
  },
};
</script>