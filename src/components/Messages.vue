<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Locker Room</div>
      </q-card-section>
      <q-separator/>
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        class="q-pa-md"
        ref="chatScroll"
        style="height: 400px; width: 400px">
          <q-chat-message
            v-bind:key="message.id"
            v-for="message in this.$store.state.messages"
            :name="message.user.userName"
            :text="message.messageBody"
            :sent="message.user.id == user"
          />
      </q-scroll-area>
      <q-separator/>
      <q-card-section>
          <q-input @keypress.enter="submitMessage" color="orange" filled v-model="messageBody" label="New Message">
        <template v-if="messageBody" v-slot:append>
          <q-icon name="cancel" @click.stop="messageBody = null" class="cursor-pointer" />
        </template>
        <template v-if="messageBody" v-slot:after>
          <q-btn @click="submitMessage" round dense flat icon="send" />
        </template>
      </q-input>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      messageBody: '',
      user: 0,
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      }
    }
  },
  async created () {
    this.$store.dispatch('getMessages').then(() => {
      this.updateScroll()
    })
    this.user = localStorage.getItem('token')
  },
  methods: {
    async submitMessage () {
      try {
        this.$store.dispatch('newMessage', this.messageBody)
        this.messageBody = null
        this.updateScroll()
      } catch (error) {
        console.error(error)
      }
    },
    async updateScroll () {
      const scrollArea = this.$refs.chatScroll
      console.log(scrollArea)
      const scrollTarget = scrollArea.getScrollTarget()
      const duration = 300
      scrollArea.setScrollPosition(scrollTarget.scrollHeight, duration)
    }
  }
}
</script>
