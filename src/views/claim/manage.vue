<template>
  <claim-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ClaimDetail from './components/ClaimDetail.vue'

@Component({
  name: 'ManageClaim',
  components: {
    ClaimDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
