<template>
  <div class="bg-red-800 fixed bottom-0 w-full shadow-lg">
    <div class="max-w-7xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
      <div
        class="
          text-center text-white text-sm
          md:text-base
          flex flex-wrap
          justify-between
          font-mono
          tracking-tighter
          gap-x-4
        "
      >
        <span class="flex-auto font-bold"> [BETA TESTING] </span>
        <span class="flex-auto">
          Pilots will <strong>not</strong> be notified.
        </span>
        <router-link
          to="/contact"
          class="flex-auto text-white font-bold hover:text-gray-200"
        >
          Send Feedback
          <span aria-hidden="true">&rarr;</span></router-link
        >
      </div>
    </div>
  </div>
</template>