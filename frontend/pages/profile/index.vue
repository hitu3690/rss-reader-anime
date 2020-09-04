<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card>
        <v-subheader>プロフィール</v-subheader>
        <v-simple-table v-if="authUser != null">
          <template v-slot:default>
            <tr>
              <td>名前</td>
              <td>{{ authUser.name }}</td>
            </tr>
            <tr>
              <td>メールアドレス</td>
              <td>{{ authUser.email }}</td>
            </tr>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      authUser: null
    };
  },
  async asyncData({ $axios }) {
    try {
      const res = await $axios.get(`/api/v1/users/me`);
      return {
        authUser: res.data
      };
    } catch (e) {
      console.log(e.response.data.error);
      alert("ログインユーザー取得失敗。ログインできてない。");
    }
  }
};
</script>
