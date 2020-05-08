<template>
  <v-navigation-drawer
    dark
    mini-variant
    mini-variant-width="56"
    fixed
    app
    permanent
    hide-overlay
  >
    <v-list nav>
      <v-list-item v-for="item in items" :key="item.title">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Files", icon: "mdi-file" },
        { title: "Actions", icon: "mdi-directions" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
