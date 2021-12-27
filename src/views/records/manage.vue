<template>
  <file-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import FileDetail from './components/FileDetail.vue'

@Component({
  name: 'ManageFile',
  components: {
    // FileDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
