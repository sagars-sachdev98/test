<template>
  <el-button
    mini
    type="text"
    class="sc-enabled-button-style"
    @click="toggleEnable"
  >
    <el-badge
      is-dot
      class="item enable-dot sc-enabled-button-style"
      :type="type"
    />
  </el-button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { toggleEnable } from '@/api/common'

@Component({
  name: 'Enabled'
})
export default class extends Vue {
  @Prop({ default: false }) private value!: boolean;
  @Prop({ default: '' }) private url!: string;

  private type: string = 'success';

  mounted() {
    this.setType(this.value)
  }

  private async toggleEnable(value: boolean) {
    const newValue = !this.value
    try {
      const data: any = await toggleEnable(this.url, { enabled: newValue })
      if (data) {
        this.$emit('input', data.enabled)
        this.setType(data.enabled)
      }
    } catch (error) {
      this.$message(error.message)
    }
  }

  private setType(newValue: Boolean): void {
    this.type = newValue ? 'success' : 'danger'
  }
}
</script>
