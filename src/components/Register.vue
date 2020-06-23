<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
          <q-input @keypress.enter="register" color="orange" filled v-model="userName" label="User Name"></q-input>
          <q-input class="q-my-md" @keypress.enter="register" color="orange" filled v-model="password" label="Password"></q-input>
          <q-btn @click="register" round dense flat icon="send" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userName: null,
      password: null
    }
  },
  methods: {
    async register () {
      this.$store.dispatch('register', { userName: this.userName, password: this.password })
    }
  }
}
</script>
