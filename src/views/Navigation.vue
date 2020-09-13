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
import { mapMutations, mapState } from "vuex";
import chart from "@/assets/flowcharts/SG.json";

const getCurrentAvailableStep = (stepId, flags, chart) => {
  const currentStep = chart.find(s => s.id === stepId);
  if (currentStep.conditional) {
    switch (currentStep.conditional.type) {
      case "FLAG":
        if (
          flags.find(f => f.id === currentStep.conditional.id).status ===
          currentStep.conditional.value
        ) {
          return currentStep;
        }
        return getCurrentAvailableStep(
          currentStep.conditional.else,
          flags,
          chart
        );
      default:
        console.error("Unknown conditional type");
    }
  }
  return currentStep;
};

export default {
  name: "Navigation",
  components: { Step, FullNavigationPanel },
  data: () => ({
    chart: chart.path,
    stepId: 1,
    visitedSteps: []
  }),
  watch: {
    currentStep(val, oldVal) {
      if (val.id != oldVal.id) this.visitedSteps.push(this.currentStep);
    }
  },
  computed: {
    ...mapState("metrics", ["flags"]),
    currentStep() {
      return getCurrentAvailableStep(this.stepId, this.flags, this.chart);
    },
    isEndOfRoute() {
      return this.currentStep && this.currentStep.next === null;
    }
  },
  mounted() {
    this.initFlags(chart.flags);
    this.initAchievements(chart.achievements);
    this.visitedSteps.push(this.currentStep);
  },
  methods: {
    ...mapMutations("metrics", ["initFlags", "initAchievements"]),
    onNext(nextId) {
      this.stepId = nextId;
    }
  }
};
</script>
