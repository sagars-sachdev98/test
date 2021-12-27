<template>
  <users-role-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UsersRoleDetail from './components/UsersRoleDetail.vue'

@Component({
  name: 'ManageUsersRole',
  components: {
    UsersRoleDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
