<template>
  <q-page class="flex flex-center">
    <Messages />
  </q-page>
</template>

<script>
import Messages from '../components/Messages.vue'
export default {
  name: 'PageIndex',
  components: {
    Messages
  },
  async created () {
    if (!this.$store.state.token) this.$router.push('login')
  }
}
</script>
