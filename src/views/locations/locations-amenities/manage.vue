<template>
  <locations-amenity-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LocationsAmenityDetail from './components/LocationsAmenityDetail.vue'

@Component({
  name: 'ManageLocationsAmenity',
  components: {
    LocationsAmenityDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
