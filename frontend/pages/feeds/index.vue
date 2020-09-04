<template>
  <v-row>
    <v-col>
      <c-card>
        <v-btn @click="addFeed">記事を追加</v-btn>
      </c-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    addFeed: async function () {
      let result = prompt("Rssを追加")
      if (result) {
        const res = await this.$axios.post("/feeds", {
          feeds: result
        })
        return {
          : res.
        }
      } else {
        alert("記事を入力してください")
      }
    }
  }
}

</script>
