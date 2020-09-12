<template>
  <div class="step">
    <div class="step-text">{{ step.text }}</div>
    <div>
      <button v-if="isActionStep" @click="$emit('next', step.next)">
        Next
      </button>
      <div v-if="isChoiceStep">
        <button
          v-for="choice in step.choices"
          :key="step.id + choice.id"
          @click="$emit('next', choice.next)"
        >
          {{ choice.text }}
        </button>
      </div>
    </div>
  </div>
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
    isChoiceStep() {
      return this.step.type === "CHOICE";
    }
  }
};
</script>
