<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="vn in importedNaVN" :key="vn.meta.name" cols="3">
          <v-card>
            <v-card-title>{{ vn.meta.name }}</v-card-title>
            <v-card-subtitle>{{ vn.meta.date }}</v-card-subtitle>
            <v-card-actions>
              <v-btn @click="removeNaVN({ id: vn.meta.slug })">Remove</v-btn>
              <v-btn link :to="`/nav/${vn.meta.slug}`">
                Play
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card height="100%">
            <v-card-title>New entry</v-card-title>
            <v-card-subtitle> </v-card-subtitle>
            <v-card-actions>
              <input
                type="file"
                id="uploaded"
                ref="uploaded"
                value="import"
                v-on:change="handleFileUpload()"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Collection",
  data() {
    return {
      files: []
    };
  },
  computed: {
    ...mapState(["importedNaVN"])
  },
  methods: {
    ...mapMutations(["addNaVN", "removeNaVN"]),
    handleFileUpload() {
      this.files = this.$refs.uploaded.files;
      this.files.forEach(f => {
        const fr = new FileReader();
        fr.onload = e => {
          const res = JSON.parse(e.target.result);
          this.addNaVN(res);
        };
        fr.readAsText(f);
      });
    }
  }
};
</script>

<style></style>
