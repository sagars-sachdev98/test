<template>
  <location-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LocationDetail from './components/LocationDetail.vue'

@Component({
  name: 'ManageLocation',
  components: {
    LocationDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
