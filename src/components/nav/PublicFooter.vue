<template>
  <div class="mx-auto py-12 px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
    <nav
      class="justify-center grid grid-cols-4 gap-8 pb-12"
      aria-label="Footer"
    >
      <div class="mx-auto col-span-2 md:col-span-1">
        <h3
          class="text-xs font-semibold text-gray-500 tracking-wider uppercase"
        >
          Legal
        </h3>
        <ul class="mt-4 space-y-4">
          <li v-for="item in footerNavigation.legal" :key="item.name">
            <a
              v-if="item.href"
              :href="item.to"
              rel="noopener noreferrer"
              class="text-base text-gray-600 hover:text-gray-800"
            >
              {{ item.name }}
            </a>
            <router-link
              v-if="item.to"
              :to="item.to"
              class="text-base text-gray-600 hover:text-gray-800"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="mx-auto col-span-2 md:col-span-1">
        <h3
          class="text-xs font-semibold text-gray-500 tracking-wider uppercase"
        >
          Support
        </h3>
        <ul class="mt-4 space-y-4">
          <li v-for="item in footerNavigation.support" :key="item.name">
            <a
              v-if="item.href"
              :href="item.href"
              rel="noopener noreferrer"
              target="_blank"
              class="text-base text-gray-600 hover:text-gray-800"
            >
              {{ item.name }}
            </a>
            <router-link
              v-if="item.to"
              :to="item.to"
              class="text-base text-gray-600 hover:text-gray-800"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div
        class="col-span-4 md:col-span-2 text-center md:text-left md:order-first"
      >
        <div>
          <router-link
            to="/"
            class="text-xl md:text-4xl font-bold text-red-600"
          >
            AOG<span class="text-gray-700 tracking-tighter">Community</span
            ><span class="text-gray-600 text-sm md:text-xl">.org</span>
          </router-link>
        </div>
        <div>
          <p class="pt-4 mt-autofont-light text-xs text-gray-600">
            &copy; 2020 MyAirplane&trade; App. All rights reserved.
          </p>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
const footerNavigation = {
  support: [
    { name: "Help Docs", href: "https://docs.aogcommunity.org" },
    { name: "System Status", href: "https://status.aogcommunity.org" },
    { name: "Contact Us", to: "/contact" },
  ],
  legal: [
    { name: "Terms of Use", to: "/terms-of-use" },
    { name: "Privacy Policy", to: "/privacy-policy" },
    { name: "Community Guidelines", to: "/community-guidelines" },
  ],
};

export default {
  setup() {
    return {
      footerNavigation,
    };
  },
};
</script>