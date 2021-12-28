<template>
  <prize-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PrizeDetail from './components/PrizeDetail.vue'

@Component({
  name: 'ManagePrize',
  components: {
    PrizeDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
