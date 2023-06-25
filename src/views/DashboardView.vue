<template>
  <v-app id="inspire">
    <v-navigation-drawer class="nav-drawer" app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Opply </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <template v-for="(item, index) in items">
          <v-list-item v-if="showItem(item)" :key="index" :to="item.to" router>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <v-row justify="center" class="nav-btn">
        <v-col cols="9">
          <v-btn width="180" class="mb-5" color="error" @click="logOut"
            ><v-icon>mdi-logout</v-icon>&nbsp; Log Out</v-btn
          >
        </v-col>
      </v-row>
    </v-navigation-drawer>

    <v-app-bar
      @click="drawer = !drawer"
      app
      prominent
      color="primary"
      dark
      src="tools.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title></v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="mx-auto">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!--Router View Goes here  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    clipped: true,
    token: localStorage.getItem("token"),
    staffName: localStorage.getItem("staffName"),
    items: [
      { title: "Supplier", icon: "mdi-bus", to: "/dashboard/suppliers" },
      { title: "Quotes", icon: "mdi-book", to: "/dashboard/quotes" },
    ],
  }),
  methods: {
    logOut() {
      this.token = null;
      localStorage.clear();
      this.$router.push("/login");
    },
    showItem(item) {
      if (item.title === "Home" && localStorage.getItem("token")) {
        return false;
      }
      return true;
    },
  },
  computed: {
    loggedIn() {
      let returnValue;

      if (localStorage.getItem("token")) {
        returnValue = true;
      } else {
        returnValue = false;
      }
      return returnValue;
    },
    welcomeMessage() {
      return `Hello! ${this.staffName} 👋`;
    },
  },
};
</script>

<style>
.nav-btn {
  position: absolute !important;
  bottom: 10px !important;
  display: flex;
  justify-content: center;
}
</style>
