<template>
  <city-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CityDetail from './components/CityDetail.vue'

@Component({
  name: 'ManageCity',
  components: {
    CityDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
