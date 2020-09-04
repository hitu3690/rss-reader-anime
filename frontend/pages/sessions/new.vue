<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card>
        <v-subheader>ログイン</v-subheader>
        <v-form ref="form">
          <v-card-text>
            <v-text-field v-model="loginForm.email" label="メールアドレス"></v-text-field>
            <v-text-field
              v-model="loginForm.password"
              type="password"
              label="パスワード"
              class="input-group--focused"
            ></v-text-field>
          </v-card-text>
        </v-form>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition></v-slide-x-reverse-transition>
          <v-btn color="primary" raised @click="submit">ログイン</v-btn>
        </v-card-actions>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn color="primary" text to="/users/new" nuxt>ユーザー登録はこちら</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submit: async function() {
      try {
        const res = await this.$axios.post("/api/v1/sessions", {
          session: this.loginForm
        });
        alert(`ログインしました。こんにちは${res.data.name}さん`);
        this.$router.push({ path: "/profile" });
      } catch (e) {
        console.log(e.response.data.error);
        alert("ログイン失敗");
      }
    },
  }
};
</script>
