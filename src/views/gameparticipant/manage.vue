<template>
  <gameparticipant-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'ManageGameParticipant',
  components: {

  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
