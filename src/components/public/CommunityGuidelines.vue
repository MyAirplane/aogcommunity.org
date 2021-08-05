<template>
  <div class="relative py-16 bg-white overflow-hidden">
    <Dots />
    <div class="relative px-4 sm:px-6 lg:px-8">
      <LegalHeader />
      <div class="mt-6 prose prose-red text-gray-500 mx-auto">
        <p>
          Welcome! We are a community of general aviation pilots willing to help
          each other during a time of need, specifically an&nbsp;<strong
            >AOG (aircraft on ground) event</strong
          >. Our website contains a robust messaging platform for connecting
          pilots via private chatrooms known as&nbsp;<strong>Local Chats</strong
          >. When a pilot creates a new&nbsp;<strong>Local Chat</strong>, email
          and SMS notifications are sent immediately to other pilots within a
          50nm radius, encouraging them to join the chatroom.
        </p>
        <p>
          Getting stranded with a broken airplane when you're away from home can
          be inconvenient or downright scary. This community exists to bring
          local knowledge and connections to a non-local pilot.
        </p>
        <h2>How it works</h2>
        <ol>
          <li>
            <strong>Sign up</strong>&nbsp;for our community by visiting
            <router-link to="/login">aogcommunity.org</router-link>. Our web-app
            is passwordless, so be sure to use the same email or social provider
            each time.
          </li>
          <li>
            <strong>Complete your profile</strong>&nbsp;so you can get notified
            of Local Chats in your area. You won't be able to do anything within
            the app until then.
          </li>
          <li>
            <strong>Contribute</strong>&nbsp;by creating a Local Chat or
            participating in one; your activity is vital to our community!
          </li>
        </ol>
        <h2>What&nbsp;<u>is</u>&nbsp;appropriate</h2>
        <ul>
          <li>Treat others online as you would treat them in real life</li>
          <li>
            Partake in civil discussion within Local Chats to assist the pilot
            who is AOG
          </li>
          <li>Respect the privacy and personal information of other pilots</li>
          <li>Communicate with courtesy and respect</li>
        </ul>
        <h2>What&nbsp;<u>is not</u>&nbsp;appropriate</h2>
        <p>
          You can't use the system to spam other pilots. By creating a new Local
          Chat, you must have a legitimate reason outlined below.
        </p>
        <p>
          You must be at least 18 years of age in order to join our community.
          Advertisements, personal attacks, defamatory remarks about another
          user or the community in general, profanity, bullying, conversation
          that is political or religous in nature, or hate speech are not
          allowed and have a zero-tolerance policy. Each Local Chat includes at
          least one moderator who will remove you from the chatroom and
          community entirely if you do not comply with our Community Guidelines.
        </p>
        <h2>Requirements for creating a Local Chat</h2>
        <p>
          <strong>After</strong>&nbsp;you have exhausted all other known
          resources available to you, a Local Chat can be used to find local
          connection or resources to assist you during
          a&nbsp;<strong>legitimate</strong>&nbsp;time of need.
        </p>
        <p>
          By creating a Local Chat, you affirm you hold a&nbsp;<strong
            >valid pilot certificate</strong
          >&nbsp;from the FAA and are currently encountering an issue
          thataffects
          the&nbsp;<strong>airworthiness</strong>&nbsp;of&nbsp;<strong>your</strong>&nbsp;aircraft.
          You may not create a Local Chat on behalf of another party.
        </p>
        <h2>Terms of Use &amp; Privacy Policy</h2>
        <p>
          In addition to our Community Guidelines, it's recommended you review
          the
          <router-link to="/terms-of-use">Terms of Use</router-link> and
          <router-link to="/privacy-policy">Privacy Policy</router-link> for
          this website.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Dots from "./Dots.vue";
import LegalHeader from "../nav/LegalHeader.vue";

export default {
  components: {
    Dots,
    LegalHeader,
  },
};
</script>