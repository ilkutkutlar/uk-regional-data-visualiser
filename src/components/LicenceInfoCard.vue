<script lang="ts">
export default {
  props: {
    licenceType: {
      type: String,
      default: "open_government_licence_v3",
    },
  },
  data() {
    return {
      OGLInfoLink:
        "http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    };
  },
};
</script>

<template>
  <v-card class="mt-5 border" prepend-icon="$license" variant="flat">
    <template #title>Licence information</template>
    <template #text>
      <div class="mb-3">
        <span v-once class="text-subtitle-1 mb-1 font-weight-medium">
          For the datasets
        </span>
        <div v-if="licenceType == 'open_government_licence_v3'">
          Contains public sector information licensed under the
          <a :href="OGLInfoLink" target="blank">
            Open Government Licence v3.0.
          </a>
        </div>
        <div
          v-else-if="
            licenceType == 'open_government_licence_v3_hm_land_registry'
          "
        >
          Contains HM Land Registry data © Crown copyright and database right
          2020. This data is licensed under the
          <a :href="OGLInfoLink" target="blank"
            >Open Government Licence v3.0.
          </a>
        </div>
      </div>

      <div v-once>
        <span class="text-subtitle-1 mb-1 font-weight-medium">
          For the county and region code lookups
        </span>
        <div>
          Source: Office for National Statistics licensed under the
          <a :href="OGLInfoLink">Open Government Licence v.3.0</a>
        </div>
      </div>
    </template>
  </v-card>
</template>
