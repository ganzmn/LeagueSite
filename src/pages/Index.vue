<template>
  <q-page class="flex flex-center">
    <dashboard />
    <Messages />
  </q-page>
</template>

<script>
import Messages from '../components/Messages.vue'
import Dashboard from '../components/Dashboard.vue'
export default {
  name: 'PageIndex',
  components: {
    Messages,
    Dashboard
  }
}
</script>
