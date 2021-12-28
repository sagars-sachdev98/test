<template>
  <discover-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DiscoverDetail from './components/DiscoverDetail.vue'

@Component({
  name: 'ManageLocation',
  components: {
    DiscoverDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
