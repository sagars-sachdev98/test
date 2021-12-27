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
        <!-- <el-form-item
          style="margin-bottom: 20px;"
          label="Enabled"
          prop="enabled"
        >
          <el-switch v-model="postForm.enabled" />
        </el-form-item> -->

        <el-form-item
          style="margin-bottom: 20px;"
          prop='fileUrl'
          label="File:"
        >
          <input
            ref="uploadExcel"
            v-waves
            loading
            style="margin-bottom: 20px;"
            type="file"
            @change="fileUpload"
          >

          <!-- <avatar-upload
            v-model="showImageUpload"
            field="file"
            :width="154"
            :height="154"
            @crop-success="cropSuccess"
            @close="onClose"
            @crop-upload-success="onCropUploadSuccess"
          /> -->
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
import { uploadFile } from '@/api/common'
import { addCompany, defaultCompanyData, updateCompany } from '@/api/company'

@Component({
  name: 'CompanyDetail',
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private roleList: any = [];

  private postForm = Object.assign({}, defaultCompanyData);
  private loading = false;
  private file:any='';

  private companyList = [
    { label: 'fist', value: 1 },
    { label: 'second', value: 2 }
  ];

  private rules = {
    fileUrl: [
      {
        required: true,
        message: 'File is required',
        trigger: 'blur'
      }],
    // fullName: [
    //   {
    //     required: true,
    //     message: 'Full Name is required',
    //     trigger: 'blur'
    //   },
    //   {
    //     pattern: '[A-Za-z]',
    //     message: 'Invalid input',
    //     trigger: ['blur', 'change']
    //   },
    //   {
    //     min: 3,
    //     max: 100,
    //     message: 'Length should be 3 to 100',
    //     trigger: 'blur'
    //   }
    // ],
    // contactNumber: [
    //   {
    //     required: true,
    //     message: 'Contact Number is required',
    //     trigger: 'blur'
    //   },
    //   {
    //     min: 10,
    //     max: 15,
    //     message: 'Length should be 10 to 15',
    //     trigger: ['blur', 'change']
    //   },
    //   {
    //     trigger: ['blur', 'change'],
    //     pattern: '[0-9]+',
    //     message: 'Invalid input'
    //   }
    // ],
    // email: [
    //   {
    //     required: true,
    //     message: 'E-Mail is required',
    //     trigger: 'blur'
    //   },
    //   {
    //     type: 'email',
    //     message: 'Please enter correct email address',
    //     trigger: ['blur', 'change']
    //   }
    // ],
    // password: [
    //   {
    //     required: true,
    //     message: 'Password is required',
    //     trigger: 'blur'
    //   },
    //   {
    //     min: 8,
    //     max: 15,
    //     message: 'Length should be 8 to 15',
    //     trigger: ['blur', 'change']
    //   }
    // ]
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
      this.postForm = Object.assign({}, defaultCompanyData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getAdminById(id)
      this.postForm = data
      // Just for test
      // const title = this.postForm.email
      // Set tagsview title
      // this.setTagsViewTitle(title)
      // Set page title
      // this.setPageTitle(title)
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

  private fileUpload(file:any) {
    this.file = this.$refs.uploadExcel
    debugger
    // ;
    //
    // const data = new FormData()
    // data.append('file', file.files[0])
    // uploadFile(data, (event: ProgressEvent) => {
    //   console.log(event)
    // }).then(res => {
    //
    //   console.log(res.toString())
    // })
    //  this.$notify({
    //     title: 'Success',
    //     message: 'File saved successfully',
    //     type: 'success',
    //     duration: 2000
    //   })
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
        await updateCompany(this.postForm.id, this.postForm)
      } else {
        // delete this.postForm.adminsRole
        // await addCompany(this.postForm)
        // this.file= this.$refs.uploadExcel
        // ;

        const data = new FormData()
        data.append('file', this.file.files[0])
        debugger

        uploadFile(data, (event: ProgressEvent) => {
          console.log(event)
          debugger
        }).then(res => {
          this.$notify({
            title: 'Success',
            message: 'File saved successfully',
            type: 'success',
            duration: 2000
          })
          router.push('/company/list')

          console.log(res.toString())
        })
      }

      this.$notify({
        title: 'Please wait',
        message: 'Uploading Data!! Please wait!!',
        type: 'warning',
        duration: 5000
      })
      // router.push('/files/list')
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
::-webkit-file-upload-button {
  background: #388fe0;
  color:white;
  border:none;
  padding: 0.5em;
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
