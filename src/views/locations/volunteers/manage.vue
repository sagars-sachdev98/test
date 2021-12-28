<template>
  <volunteer-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VolunteerDetail from './components/VolunteerDetail.vue'

@Component({
  name: 'ManageVolunteer',
  components: {
    VolunteerDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
