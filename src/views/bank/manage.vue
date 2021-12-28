<template>
  <bank-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BankDetail from './components/BankDetail.vue'

@Component({
  name: 'ManageBank',
  components: {
    BankDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
