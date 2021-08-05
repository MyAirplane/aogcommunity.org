<template>
  <div class="bg-white">
    <!-- Hero section -->
    <div class="overflow-hidden sm:pt-12 lg:relative lg:py-24">
      <div
        class="
          mx-auto
          sm:max-w-3xl
          items-center
          lg:px-8
          lg:max-w-7xl
          lg:grid lg:grid-cols-2
          lg:gap-24
        "
      >
        <header class="p-6 text-center sm:text-left">
          <h1>
            <router-link to="/" class="text-3xl font-bold text-red-600">
              AOG<span class="text-gray-700 tracking-tighter">Community</span
              ><span class="text-gray-600 text-base">.org</span>
            </router-link>
          </h1>
          <div class="mt-20">
            <div>
              <span
                class="
                  rounded
                  bg-red-50
                  px-2.5
                  py-1
                  text-xs
                  font-semibold
                  text-red-700
                  tracking-wide
                  uppercase
                "
              >
                Now in beta
              </span>
            </div>
            <div class="mt-6 sm:max-w-xl">
              <h1
                class="
                  text-4xl
                  font-extrabold
                  text-gray-900
                  tracking-tight
                  sm:text-5xl
                "
              >
                Don't get stuck on the ground.
              </h1>
              <p class="mt-6 text-xl text-gray-500">
                Join a community of general aviation pilots willing to help
                their fellow aviators in times of need.
              </p>
            </div>
          </div>
        </header>

        <div class="sm:mx-auto md:px-4 sm:max-w-4xl mt-20">
          <Auth />
        </div>
      </div>
    </div>

    <!-- Testimonial/stats section -->
    <div class="relative mt-20">
      <div
        class="
          lg:mx-auto
          lg:max-w-7xl
          lg:px-8
          lg:grid lg:grid-cols-2
          lg:gap-24
          lg:items-start
        "
      >
        <div class="relative sm:py-16 lg:py-0">
          <div
            aria-hidden="true"
            class="
              hidden
              sm:block
              lg:absolute
              lg:inset-y-0
              lg:right-0
              lg:w-screen
            "
          >
            <div
              class="
                absolute
                inset-y-0
                right-1/2
                w-full
                bg-gray-50
                rounded-r-3xl
                lg:right-72
              "
            />
            <svg
              class="
                absolute
                top-8
                left-1/2
                -ml-3
                lg:-right-8
                lg:left-auto
                lg:top-12
              "
              width="404"
              height="392"
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="392"
                fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
              />
            </svg>
          </div>
          <div
            class="
              relative
              mx-auto
              max-w-md
              px-4
              sm:max-w-3xl
              sm:px-6
              lg:px-0
              lg:max-w-none
              lg:py-20
            "
          >
            <!-- Testimonial card-->
            <div
              class="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden"
            >
              <img
                class="absolute inset-0 h-full w-full object-cover"
                src="/img/cessna_172_cockpit.jpeg"
                alt="Cessna C172 Cockpit Photo"
              />
              <div class="absolute inset-0 bg-red-200 mix-blend-multiply" />
              <div
                class="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-gray-800
                  via-gray-700
                  opacity-90
                "
              />
            </div>
          </div>
        </div>

        <div
          class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0"
        >
          <!-- Content area -->
          <div class="pt-12 sm:pt-16 lg:pt-20">
            <h2
              class="
                text-3xl text-gray-900
                font-extrabold
                tracking-tight
                sm:text-4xl
              "
            >
              Pilots helping pilots
            </h2>
            <div class="mt-6 text-gray-500 text-base space-y-6">
              <p>
                AOG events cause significant headaches. Not only is being stuck
                on the ground inconvenient at times, but it can even scare you.
                Whether you get stranded and need a ride to a local hotel or
                could use that spare tire sitting on a shelf in a local’s
                hangar–without a trusted network, you’ll end up lost.
              </p>
              <p class="leading-7">
                When you sign up with our community, you are declaring to your
                fellow aviators: “I'm here to help.” We are a network of pilots
                willing to come together for each other in times of need,
                pooling our resources to help get us home.
              </p>
              <p class="text-lg leading-7">
                AOGCommunity.org exists to bring you the local aviation
                knowledge you need to safely get back off the ground.
              </p>
            </div>
          </div>

          <!-- Stats section -->
          <div class="mt-10">
            <dl class="grid grid-cols-2 gap-x-4 gap-y-8">
              <div class="border-t-2 border-gray-100 pt-6">
                <dt class="text-base font-medium text-gray-500">
                  Community Founded
                </dt>
                <dd
                  class="text-3xl font-extrabold tracking-tight text-gray-900"
                >
                  July 2021
                </dd>
              </div>
              <div class="border-t-2 border-gray-100 pt-6">
                <dt class="text-base font-medium text-gray-500">
                  Pilots Joined
                </dt>
                <dd
                  v-show="beta_count"
                  class="text-3xl font-extrabold tracking-tight text-gray-900"
                >
                  {{ beta_count }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-36 sm:px-6 lg:px-8">
      <div class="max-w-2xl lg:mx-auto lg:text-center">
        <h2
          class="
            text-3xl
            font-extrabold
            tracking-tight
            text-gray-900
            sm:text-4xl
          "
        >
          Frequently asked questions
        </h2>
        <p class="mt-4 hidden text-gray-500">
          Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
          Malesuada adipiscing sagittis vel nulla nec. Urna, sed a lectus
          elementum blandit et.
        </p>
      </div>
      <div class="mt-20">
        <dl
          class="
            space-y-10
            lg:space-y-0
            lg:grid lg:grid-cols-2
            lg:gap-x-8 lg:gap-y-10
          "
        >
          <div v-for="faq in faqs" :key="faq.id">
            <dt class="font-semibold text-gray-900">
              {{ faq.question }}
            </dt>
            <dd class="mt-3 text-gray-500">
              {{ faq.answer }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- CTA section -->
    <div class="hidden relative mt-24 sm:mt-32 sm:py-16">
      <div aria-hidden="true" class="hidden sm:block">
        <div class="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
        <svg
          class="absolute top-8 left-1/2 -ml-3"
          width="404"
          height="392"
          fill="none"
          viewBox="0 0 404 392"
        >
          <defs>
            <pattern
              id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="392"
            fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
          />
        </svg>
      </div>
      <div
        class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <div
          class="
            relative
            rounded-2xl
            px-6
            py-10
            bg-red-500
            overflow-hidden
            shadow-xl
            sm:px-12
            sm:py-20
          "
        >
          <div
            aria-hidden="true"
            class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
          >
            <svg
              class="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1463 360"
            >
              <path
                class="text-red-400 text-opacity-40"
                fill="currentColor"
                d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
              />
              <path
                class="text-red-600 text-opacity-40"
                fill="currentColor"
                d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
              />
            </svg>
          </div>
          <div class="relative">
            <div class="sm:text-center">
              <h2
                class="
                  text-3xl
                  font-extrabold
                  text-white
                  tracking-tight
                  sm:text-4xl
                "
              >
                Join our community today.
              </h2>
              <p class="mt-6 mx-auto max-w-2xl text-lg text-red-100">
                Sagittis scelerisque nulla cursus in enim consectetur quam.
                Dictum urna sed consectetur neque tristique pellentesque.
              </p>
            </div>
            <form action="#" class="mt-12 sm:mx-auto sm:max-w-lg sm:flex">
              <div class="min-w-0 flex-1">
                <label for="cta-email" class="sr-only">Email address</label>
                <input
                  id="cta-email"
                  type="email"
                  class="
                    block
                    w-full
                    border border-transparent
                    rounded-md
                    px-5
                    py-3
                    text-base text-gray-900
                    placeholder-gray-500
                    shadow-sm
                    focus:outline-none
                    focus:border-transparent
                    focus:ring-2
                    focus:ring-white
                    focus:ring-offset-2
                    focus:ring-offset-red-500
                  "
                  placeholder="Enter your email"
                />
              </div>
              <div class="mt-4 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  class="
                    block
                    w-full
                    rounded-md
                    border border-transparent
                    px-5
                    py-3
                    bg-gray-900
                    text-base
                    font-medium
                    text-white
                    shadow
                    hover:bg-black
                    focus:outline-none
                    focus:ring-2
                    focus:ring-white
                    focus:ring-offset-2
                    focus:ring-offset-red-500
                    sm:px-10
                  "
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Sponsored By -->
    <div class="relative bg-gray-800">
      <div
        class="
          h-56
          bg-indigo-600
          sm:h-72
          md:absolute
          md:left-0
          md:h-full
          md:w-1/2
        "
      >
        <img
          class="w-full h-full object-cover"
          src="/img/cockpit_photo.jpeg"
          alt="General Aviation Cockpit Photo"
        />
      </div>
      <div
        class="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div class="md:ml-auto md:w-1/2 md:pl-10">
          <h2
            class="
              text-base
              font-semibold
              uppercase
              tracking-wider
              text-gray-300
            "
          >
            Yes, it's really free.
          </h2>
          <p
            class="
              mt-2
              text-white text-3xl
              font-extrabold
              tracking-tight
              sm:text-4xl
            "
          >
            Built for your benefit
          </p>
          <p class="mt-3 text-lg text-gray-300">
            This service is developed and maintained by the core team behind the
            <span class="text-white font-semibold">MyAirplane&trade; App</span>.
            It exists to benefit the general aviation community.
          </p>
          <div class="mt-6 xl:flex">
            <div
              class="
                space-y-4
                xl:space-y-0
                xl:inline-grid
                xl:grid-cols-2
                xl:space-x-5
              "
            >
              <a
                href="https://myairplane.io"
                target="_blank"
                rel="noopener noreferrer"
                class="
                  inline-flex
                  items-center
                  justify-center
                  w-full
                  px-5
                  py-3
                  border border-gray-600
                  text-sm
                  font-medium
                  rounded-md
                  text-gray-900
                  bg-white
                  hover:bg-gray-100
                "
              >
                Learn more about MyAirplane&trade; &rarr;
              </a>
              <a
                href="https://github.com/myairplane/aogcommunity.org"
                target="_blank"
                rel="noopener noreferrer"
                class="
                  inline-flex
                  items-center
                  justify-center
                  w-full
                  px-5
                  py-3
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-gray-700
                  border border-gray-600
                  hover:bg-gray-800
                "
              >
                <span class="pr-2">View source code</span>
                <!-- GitHub Logo -->
                <svg
                  class="w-5 h-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../../store";
import { ref, onMounted } from "vue";
import Auth from "./Auth.vue";

const faqs = [
  {
    id: 1,
    question: "How do I sign up?",
    answer:
      "Enter your email address or use any of our social providers. We use passwordless authorization for our web-app. Each time you access the service, the app will provide you a magic link to log in securely. When you sign in for the first time, you'll be required to complete your profile to verify you are an FAA Registered Airmen.",
  },
  {
    id: 2,
    question: "Is my information private?",
    answer:
      "Yes, we take privacy extremely seriously. Other pilots will not see any of your contact information until you explicitly provide authorization to share it with another pilot directly. Our database is not searchable in any way.",
  },
  {
    id: 3,
    question: "What happens when I create a new AOG Local Chat?",
    answer:
      "After you complete the AOG Local Chat form, the app will send a text message to any pilots within a 50 nm radius of your location. Pilots gain access to a private chatroom to discuss how they are willing to assist. If a pilot agrees to help you, they will give the authorization to share their contact information to arrange a meetup.",
  },
  {
    id: 4,
    question: "How much does it cost?",
    answer:
      "Nothing, our app is free to use. Our service is simply a networking tool to connect you with another pilot nearby during a time of need, built to benefit the GA community as a whole.",
  },
  {
    id: 5,
    question: "What does 'beta' mean?",
    answer:
      "While we are just getting off the ground with our app, we are considered a beta product. Therefore, your feedback and feature requests are essential to the community's success; we want to hear from you!",
  },
  {
    id: 6,
    question: "Why should I join?",
    answer:
      "Have you ever been stuck at an unfamiliar airport? What if it felt like your home field instead? Our community exists to help each other during times where a local network is essential. It could be as simple as getting a ride into town or as critical as connecting with an experienced mechanic.",
  },
];

export default {
  components: {
    Auth,
  },
  setup() {
    const beta_count = ref("");

    async function getCount() {
      const res = await fetch("/api/pilot-count");
      const data = await res.json();
      beta_count.value = data.count;
    }

    onMounted(() => {
      getCount();
    });

    return {
      store,
      faqs,
      beta_count,
      getCount,
    };
  },
};
</script>