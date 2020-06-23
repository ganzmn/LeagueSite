<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
          <q-input @keypress.enter="login" color="orange" filled v-model="userName" label="User Name"></q-input>
          <q-input class="q-my-md" @keypress.enter="login" color="orange" filled v-model="password" label="Password"></q-input>
          <q-btn @click="login" round dense flat icon="send" />
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
    async login () {
      this.$store.dispatch('login', { userName: this.userName, password: this.password }).then((res) => {
        this.$store.state.token ? this.$router.push('/') : console.log(res.message)
      })
    }
  }
}
</script>
