<template>
  <v-card class="step mx-auto my-2" width="fit-content" min-width="30vw">
    <div class="step-text ma-2">{{ step.text }}</div>
    <v-card-actions>
      <v-btn
        v-if="displayNext"
        @click="onChoiceClick(step)"
        color="primary"
        rounded
      >
        Next
      </v-btn>
      <div v-if="isChoiceStep">
        <v-btn
          class="ma-1"
          v-for="choice in step.choices"
          :key="step.id + choice.id"
          @click="onChoiceClick(choice)"
          color="primary"
          rounded
        >
          {{ choice.text }}
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Step",
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  computed: {
    isActionStep() {
      return this.step.type === "ACTION";
    },
    displayNext() {
      return this.isActionStep && this.step.next;
    },
    isChoiceStep() {
      return this.step.type === "CHOICE";
    }
  },
  methods: {
    ...mapActions("metrics", ["handleChoiceResult"]),
    onChoiceClick(choice) {
      if (choice.result) {
        this.handleChoiceResult(choice.result);
      }
      this.$emit("next", choice.next);
    }
  }
};
</script>
