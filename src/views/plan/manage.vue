<template>
  <plan-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PlanDetail from './components/PlanDetail.vue'

@Component({
  name: 'ManagePlan',
  components: {
    PlanDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
