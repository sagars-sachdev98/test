<template>
  <div class="form-block">
    <div class="source">
      <el-form
        ref="postForm"
        :model="postForm"
        status-icon
        :rules="rules"
        label-width="160px"
        class="demo-form"
        label-position="left"
      >
        <el-form-item
          style="margin-bottom: 20px;"
          label="Enabled"
          prop="enabled"
        >
          <el-switch v-model="postForm.enabled" />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="User Id"
          prop="userId"
        >
          <el-input
            v-model="postForm.userId"
            name="userId"
            style="width:50%"
            required
            placeholder="User Id"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Bank Account Number"
          prop="bankAccountNumber"
        >
          <el-input
            v-model="postForm.bankAccountNumber"
            name="bankAccountNumber"
            style="width:50%"
            required
            placeholder="Bank Account Number"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="IFSC Code"
          prop="ifscCode"
        >
          <el-input
            v-model="postForm.ifscCode"
            name="ifscCode"
            style="width:50%"
            required
            placeholder="IFSC Code"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Bank Name"
          prop="bankName"
        >
          <el-input
            v-model="postForm.bankName"
            name="bankName"
            style="width:50%"
            required
            placeholder="Bank Name"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Branch Name"
          prop="branchName"
        >
          <el-input
            v-model="postForm.branchName"
            name="branchName"
            style="width:50%"
            required
            placeholder="Branch Name"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Bank Customer Name"
          prop="bankCustomerName"
        >
          <el-input
            v-model="postForm.bankCustomerName"
            name="bankCustomerName"
            style="width:50%"
            required
            placeholder="Bank Customer Name"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            v-loading="loading"
            v-waves
            type="success"
            @click="submitForm"
          >
            {{ $t('global.form.save') }}
          </el-button>
          <el-button
            v-waves
            type="reset"
            @click="resetForm"
          >
            {{ $t('global.form.reset') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isValidURL } from '@/utils/validate'
import {
  getAdminById,
  defaultAdminData,
  updateAdmin,
  register
} from '@/api/admins'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'
import { getAdminsRoles } from '@/api/adminsRoles'
import { getQuery } from '../../../utils'
import { defaultBankData, updateBank, addBank, getBankById } from '@/api/bank'
import PanThumb from '@/components/PanThumb/index.vue'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import { uploadFile } from '@/api/common'

@Component({
  name: 'BankDetail',
  components: {
    PanThumb,
    AvatarUpload
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private roleList: any = [];
  private showImageUpload = false;
  private image = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Crystal_Mall_Rajkot_Road_View.jpg'
  private postForm = Object.assign({}, defaultBankData);
  private loading = false;
  private toggleShow() {
    this.showImageUpload = !this.showImageUpload
  }

   private statusList = [
     { label: 'Successful', value: 1 },
     { label: 'Pending', value: 2 }
   ];

  private rules = {

    userId: [
      {
        required: true,
        trigger: 'blur',
        message: 'User Id is required'
      }
    ],

    feature: [
      {
        required: true,
        trigger: 'blur',
        message: 'Feature is required'
      }
    ],

    bankAccountNumber: [
      {
        required: true,
        trigger: 'blur',
        message: 'Bank Account Number is required'
      },
      {
        trigger: ['blur', 'change'],
        pattern: '[0-9]+',
        message: 'Invalid input'
      }
    ],

    bankName: [
      {
        required: true,
        trigger: 'blur',
        message: 'Bank Name is required'
      }
    ],

    bankCustomerName: [
      {
        required: true,
        trigger: 'blur',
        message: 'Bank Customer Name is required'
      }
    ],

    branchName: [
      {
        required: true,
        trigger: 'blur',
        message: 'Branch Name is required'
      }
    ],

    ifscCode: [
      {
        required: true,
        trigger: 'blur',
        message: 'IFSC Code is required'
      },
      {
        trigger: ['blur', 'change'],
        pattern: '[0-9]+',
        message: 'Invalid input'
      }
    ]

  };

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language
  }

  created() {
    this.fetchRoles()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    } else {
      this.postForm = Object.assign({}, defaultBankData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getBankById(id)
      this.postForm = data
      // Just for test
      const title = 'image'
      // Set tagsview title
      this.setTagsViewTitle(title)
      // Set page title
      this.setPageTitle(title)
    } catch (err) {
      Promise.reject(err)
    }
  }

  private async fetchRoles() {
    try {
      this.roleList = await getAdminsRoles(
        getQuery({
          enabled: true,
          sort: 'name,ASC',
          filter: {
            enabled: 'eq'
          }
        })
      )
    } catch (err) {
      Promise.reject(err)
    }
  }

  private setTagsViewTitle(title: string) {
    const tagView = this.tempTagView
    if (tagView) {
      tagView.title = `${title}-${this.postForm.id}`
      TagsViewModule.updateVisitedView(tagView)
    }
  }

  private setPageTitle(title: string) {
    document.title = `${title} - ${this.postForm.id}`
  }

  private submitForm() {
    (this.$refs.postForm as Form).validate(valid => {
      if (valid) {
        this.saveForm()
      } else {
        return false
      }
    })
  }

  private resetForm() {
    (this.$refs.postForm as Form).resetFields()
  }

  @Action
  public async saveForm() {
    try {
      this.loading = true
      if (this.isEdit) {
        // this.postForm.adminsRole.id = this.postForm.adminsRoleId
        // await update(this.postForm.id, this.postForm)
      } else {
        // delete this.postForm.adminsRole
        await addBank(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Bank Details saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/bank/list')
    } catch (err) {
      this.loading = false
    }
  }
}

</script>
<style lang="scss">
.admin-textarea {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid $textAreaBottom;
  }
}
</style>

<style lang="scss" scoped>
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
</style>
