<template>
  <games-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import GamesDetail from './components/GamesDetail.vue'

@Component({
  name: 'ManageGames',
  components: {
    // GamesDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
