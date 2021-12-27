<template>
  <company-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CompanyDetail from './components/CompanyDetail.vue'

@Component({
  name: 'ManageFile',
  components: {
    CompanyDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
