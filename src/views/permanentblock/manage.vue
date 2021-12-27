<template>
  <permanent-block-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PermanentBlockDetail from './components/PermanentBlockDetail.vue'

@Component({
  name: 'ManagePermanentBlock',
  components: {
    PermanentBlockDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
