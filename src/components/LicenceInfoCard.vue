<script lang="ts">
export default {
  props: {
    licenceType: {
      type: String,
      default: "open_government_licence_v3",
    },
  },
};
</script>

<template>
  <v-card class="mt-5 border" prepend-icon="$license" variant="flat">
    <template #title>Licence information</template>
    <template #text>
      <div v-if="licenceType == 'open_government_licence_v3'">
        Contains public sector information licensed under the
        <a
          href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
          target="blank"
        >
          Open Government Licence v3.0
        </a>
        .
      </div>
      <div
        v-else-if="licenceType == 'open_government_licence_v3_hm_land_registry'"
      >
        Contains HM Land Registry data © Crown copyright and database right
        2020. This data is licensed under the
        <a
          href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
          target="blank"
        >
          Open Government Licence v3.0
        </a>
        .
      </div>
    </template>
  </v-card>
</template>
