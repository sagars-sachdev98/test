<template>
  <enquiry-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EnquiryDetail from './components/EnquiryDetail.vue'

@Component({
  name: 'ManageEnquiry',
  components: {
    EnquiryDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
