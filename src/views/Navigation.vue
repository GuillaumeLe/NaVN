<template>
  <div class="navigation">
    <step :step="currentStep" @next="onNext"></step>
  </div>
</template>

<script>
import Step from "@/components/Step";
import chart from "@/assets/flowcharts/FSN.json";

export default {
  name: "Navigation",
  components: { Step },
  data: () => ({
    chart,
    stepId: 1
  }),
  computed: {
    currentStep() {
      return chart.find(s => s.id === this.stepId);
    }
  },
  methods: {
    onNext(nextId) {
      this.stepId = nextId;
    }
  }
};
</script>
