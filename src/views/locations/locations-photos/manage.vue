<template>
  <locations-photo-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LocationsPhotoDetail from './components/LocationsPhotoDetail.vue'

@Component({
  name: 'ManageLocationsPhoto',
  components: {
    LocationsPhotoDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
