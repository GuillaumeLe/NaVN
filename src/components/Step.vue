<template>
  <v-card class="step mx-auto my-2" width="fit-content" min-width="30vw">
    <div class="step-text ma-2">{{ step.text }}</div>
    <v-card-actions>
      <v-btn
        v-if="displayNext"
        @click="$emit('next', step.next)"
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
          @click="$emit('next', choice.next)"
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
  }
};
</script>
