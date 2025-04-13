<script lang="ts">
import { useCurrent } from "@/store";

export default {
  data() {
    return {
      current: useCurrent(),
    };
  },
};
</script>

<template>
  <v-card id="bottom-card" class="ma-2 d-md-none">
    <v-card-text>
      <v-row class="px-2">
        <v-col cols="3" class="text-right">
          <v-btn
            size="small"
            variant="tonal"
            class="me-2"
            icon="$tune"
            color="primary"
            @click="current.toggleDrawer"
          ></v-btn>
        </v-col>
        <v-col cols="9">
          <div class="text-left">
            <div class="font-weight-thin">Dataset</div>
            {{ current.dataset.metadata.name }}
            <span class="mx-3 font-weight-thin text-primary">|</span>
            {{ current.year }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
