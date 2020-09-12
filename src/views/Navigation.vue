<template>
  <div class="navigation">
    <v-main>
      <step :step="currentStep" @next="onNext"></step>
      <v-alert v-if="isEndOfRoute" type="success" class="mx-4">
        End
      </v-alert>
    </v-main>
    <full-navigation-panel
      :visited-steps="visitedSteps"
    ></full-navigation-panel>
  </div>
</template>

<script>
import Step from "@/components/Step";
import FullNavigationPanel from "@/components/FullNavigationPanel";
import chart from "@/assets/flowcharts/FSN.json";

export default {
  name: "Navigation",
  components: { Step, FullNavigationPanel },
  data: () => ({
    chart,
    stepId: 1,
    visitedSteps: []
  }),
  watch: {
    currentStep() {
      this.visitedSteps.push(this.currentStep);
    }
  },
  computed: {
    currentStep() {
      return chart.find(s => s.id === this.stepId);
    },
    isEndOfRoute() {
      return this.currentStep && this.currentStep.next === null;
    }
  },
  mounted() {
    this.visitedSteps.push(this.currentStep);
  },
  methods: {
    onNext(nextId) {
      this.stepId = nextId;
    }
  }
};
</script>
