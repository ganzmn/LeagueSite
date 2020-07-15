<template>
    <q-card v-if="$store.state.token">
      <q-card-section>
        <div class="text-h6">Welcome {{$store.state.userProfile.user.name}}</div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        {{$store.state.userProfile}}
      </q-card-section>
    </q-card>
</template>

<script>

export default {
  async created () {
    if (this.$store.state.token && this.$store.state.userProfile.length === 0) {
      this.$store.dispatch('getUserProfile', this.$store.state.token).then(() => {
        console.log(this.$store.userProfile)
      })
    }
  }
}
</script>
