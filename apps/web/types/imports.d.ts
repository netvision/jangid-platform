declare module '#imports' {
  export * from 'nuxt/app'
  export { useRoute, useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
  export { storeToRefs } from 'pinia'
}
