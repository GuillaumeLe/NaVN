<template>
  <v-navigation-drawer app permanent right>
    <v-list dense>
      <v-list-item v-for="step in visitedSteps" :key="step.id">
        <v-list-item-content>
          <v-list-item-title>{{ step.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "FullNavigationPanel",
  props: {
    visitedSteps: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style></style>
