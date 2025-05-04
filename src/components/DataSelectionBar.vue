<script lang="ts">
export default {
  props: {
    datasetName: {
      type: String,
      required: true,
    },
    selectedYear: {
      type: String,
      required: true,
    },
  },
  emits: ["toggleDrawerButtonClicked"],
};
</script>

<template>
  <v-card id="bottom-card" class="ma-2 d-md-none">
    <v-card-text>
      <v-row class="px-2">
        <v-col v-once cols="3" class="text-right">
          <v-btn
            size="small"
            variant="tonal"
            class="me-2"
            icon="$tune"
            color="primary"
            @click="$emit('toggleDrawerButtonClicked')"
          ></v-btn>
        </v-col>
        <v-col cols="9">
          <div class="text-left">
            <div class="font-weight-thin">Dataset</div>
            {{ datasetName }}
            <span class="mx-3 font-weight-thin text-primary">|</span>
            {{ selectedYear }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
