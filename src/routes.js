import Public from "./views/Public.vue";
import LoginLanding from "./components/public/LoginLanding.vue";
import Terms from "./components/public/Terms.vue";
import Privacy from "./components/public/Privacy.vue";
import CommunityGuidelines from "./components/public/CommunityGuidelines.vue";
import Contact from "./components/public/Contact.vue";
import NotFound from "./components/public/NotFound.vue";

export const routes = [
  {
    path: "/",
    name: "index",
    component: Public,
    meta: { title: "Landing Page" },
    children: [
      {
        path: "/",
        name: "login",
        alias: "/login",
        meta: { title: "Home" },
        component: LoginLanding,
      },
      {
        path: "/terms-of-use",
        alias: "/terms",
        name: "terms",
        meta: { title: "Terms of Use" },
        component: Terms,
      },
      {
        path: "/privacy-policy",
        alias: "/privacy",
        name: "privacy",
        meta: { title: "Privacy Policy" },
        component: Privacy,
      },
      {
        path: "/community-guidelines",
        alias: "/guidelines",
        name: "guidelines",
        meta: { title: "Community Guidelines" },
        component: CommunityGuidelines,
      },
      {
        path: "/contact",
        alias: "/contact-us",
        name: "contact",
        meta: { title: "Contact Us" },
        component: Contact,
      },
      {
        path: "/:path(.*)",
        name: "404",
        meta: { title: "404 - Not Found" },
        component: NotFound,
      },
    ],
  },

  {
    path: "/app",
    name: "app",
    redirect: { name: "dashboard" },
    component: () => import("./views/Admin.vue"),
    children: [
      {
        path: "/app",
        name: "dashboard",
        alias: "/app/local-chats",
        meta: {
          title: "Dashboard",
          requiresAuth: true,
          requiresProfile: true,
        },
        component: () =>
          import("./components/admin/local-chats/LocalChatsDashboard.vue"),
      },
      {
        path: "/app/local-chats/create",
        name: "newlocalchat",
        meta: {
          title: "Create a Local Chat",
          parentTitle: "Local Chats",
          parentPath: "/app",
          requiresAuth: true,
          requiresProfile: true,
        },
        component: () =>
          import("./components/admin/local-chats/LocalChatForm.vue"),
      },
      {
        path: "/app/local-chats/:id",
        name: "localchat",
        meta: {
          title: ":id",
          parentTitle: "Local Chats",
          parentPath: "/app",
          requiresAuth: true,
          requiresProfile: true,
        },
        component: () => import("./components/admin/local-chats/LocalChat.vue"),
        props: true,
      },
      {
        path: "/app/profile",
        name: "profile",
        meta: { title: "My Profile", requiresAuth: true },
        component: () => import("./components/admin/profile/Profile.vue"),
      },
    ],
  },
];
