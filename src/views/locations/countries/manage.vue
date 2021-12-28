<template>
  <country-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CountryDetail from './components/CountryDetail.vue'

@Component({
  name: 'ManageCountry',
  components: {
    CountryDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
