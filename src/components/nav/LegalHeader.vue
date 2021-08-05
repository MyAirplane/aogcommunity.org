<template>
  <header class="text-lg max-w-prose mx-auto">
    <div class="text-center w-full mx-auto mb-6">
      <router-link to="/" class="text-2xl font-bold text-red-600">
        AOG<span class="text-gray-700 tracking-tighter">Community</span
        ><span class="text-gray-600 text-sm">.org</span>
      </router-link>
    </div>
    <h1 class="mt-12">
      <span
        class="
          block
          text-sm text-center text-red-600
          font-semibold
          tracking-wide
          uppercase
        "
        >Legal Stuff</span
      >
      <span
        class="
          mt-2
          block
          text-3xl text-center
          leading-8
          font-extrabold
          tracking-tight
          text-gray-900
          sm:text-4xl
        "
        >{{ $route.meta.title }}</span
      >
    </h1>
  </header>
</template>