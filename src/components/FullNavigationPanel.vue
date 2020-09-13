<template>
  <v-navigation-drawer app permanent right>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Route</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="step in visitedSteps" :key="step.id">
        <v-list-item-content>
          <v-list-item-title>{{ step.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append v-if="hasAchievements">
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Achievements</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list dense>
        <v-list-item
          v-for="achievement in completedAchievements"
          :key="achievement.id"
        >
          <v-list-item-content>
            <v-list-item-title>{{ achievement.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FullNavigationPanel",
  props: {
    visitedSteps: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState("metrics", ["achievements"]),
    completedAchievements() {
      return this.achievements.filter(a => a.value === a.target);
    },
    hasAchievements() {
      return this.completedAchievements.length > 0;
    }
  }
};
</script>

<style></style>
