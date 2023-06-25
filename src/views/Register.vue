<template>
  <v-container class="login-container" fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="login-card">
          <v-card-title class="headline justify-center">Register</v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="username"
                label="Username"
                :rules="usernameRules"
                required
              />
              <v-text-field
                v-model="password"
                label="Password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                required
              />
              <v-text-field
                v-model="firstname"
                label="First name"
                :rules="firstnameRules"
                required
              />
              <v-text-field
                v-model="lastname"
                label="Last name"
                :rules="lastnameRules"
                required
              />
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                required
              />
              <v-card-text class="my-2">
                <span>Already registered? </span>
                <span class="red--text">
                  Click
                  <router-link class="red--text" to="/login">
                    here
                  </router-link>
                  to sign in.
                </span>
              </v-card-text>
              <v-btn
                color="primary"
                block
                @click.prevent="login"
                :loading="isLoading"
                class="mt-5"
                :disabled="!validForm()"
                >Sign Up</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      isLoading: false as boolean,
      username: "" as string,
      password: "" as string,
      firstname: "" as string,
      lastname: "" as string,
      showPassword: false as boolean,
      email: "" as string,
      usernameRules: [(v: string) => !!v || "Username is required"],
      passwordRules: [
        (v: string) => !!v || "Password is required",
        (v: string) =>
          (v && v.length >= 8) || "Password must be at least 8 characters",
      ],
      firstnameRules: [(v: string) => !!v || "First name is required"],
      lastnameRules: [(v: string) => !!v || "Last name is required"],
      emailRules: [
        (v: string) => !!v || "Email is required",
        (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    validForm() {
      return (this.$refs.form as Vue & { validate: () => boolean })?.validate();
    },
    async login() {
      if (!this.validForm()) {
        return false;
      }

      this.isLoading = true;
      try {
        let result = await axios.post(
          "https://february-21.herokuapp.com/api/v1/users/",
          {
            username: this.username,
            password: this.password,
          }
        );
        this.isLoading = false;
        console.log(result);
        if (result && result.status === 201) {
          this.$toast.success(`Signed up successfully!`);
          // Redirect to login screen
          this.$router.push("/login");
        }
      } catch (error: any) {
        this.isLoading = false;
        this.$toast.error(`Sign up error, kindly try again!`);
        throw new Error(error);
      }
    },
  },
});
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  max-width: 600px;
  padding: 20px;
}

.headline {
  text-align: center;
  margin-bottom: 20px;
}
.v-text-field input {
  opacity: 1 !important;
}
</style>
