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
          label="Company"
          prop="symbol"
        >
          <el-select
            v-model="postForm.symbol"
            v-loading="loading"
            filterable="true"
            name="company"
            placeholder="Select"
            prop="company"
            clearable="true"
          >
            <el-option
              v-for="item in companyList"
              :key="item.id"
              v-loading="loading"
              :label="item.symbol"
              :value="item.symbol"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Select Year"
          prop="year"
        >
          <el-date-picker
            v-model="postForm.year"
            type="year"
            name="year"
            value-format="yyyy"
            placeholder="Pick a year"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="File"
          prop="fileUrl"
        >
          <input
            ref="uploadExcel"
            type="file"
            @change="fileUpload"
          >
        </el-form-item>

        <el-form-item>
          <el-button
            v-loading="loading"
            v-waves
            type="success"
            @click="submitForm"
          >
            Go
            <!-- {{ $t('global.form.save') }} -->
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isValidURL } from '@/utils/validate'
// import {
//   getAdminById,
//   defaultAdminData,
//   updateAdmin,
//   register
// } from '@/api/admins'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'
import { getAdminsRoles } from '@/api/adminsRoles'
import { getQuery } from '../../../utils'
import PanThumb from '@/components/PanThumb/index.vue'
import { defaultFileData, updateFile, addFile, getFileById } from '@/api/file'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import { uploadFile, uploadShares } from '@/api/common'
import { getCompanies } from '@/api/company'
import { ICompanyData } from '@/api/types'

@Component({
  name: 'FileDetail',
  components:
   {
     PanThumb,
     AvatarUpload

   }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private roleList: any = [];
  private file:any='';
  private postForm = Object.assign({}, defaultFileData);
   private showImageUpload = false;
  private image = 'https://via.placeholder.com/154'
  private loading = false;
  private companyList: ICompanyData[] = [];
   private total = 0;
  private listLoading = true;
  private downloadLoading = false;

  private listQuery = {
    page: 1,
    limit: 5000,
    filter: {
    }
  };

  private toggleShow() {
    this.showImageUpload = !this.showImageUpload
  }

  private fileUpload(file:any) {
    this.file = this.$refs.uploadExcel
    // ;
    // const data = new FormData()
    // data.append('file', file.files[0])
    // uploadShares(data, (event: ProgressEvent) => {
    //   console.log(event)
    // }).then(res => {
    //
    //   this.postForm.fileURL = res.toString()
    // })
    //
  }

  private handleRemove(file:any, fileList:any) {
    console.log(file, fileList)
  }

  private handlePreview(file:any) {
    console.log(file)
  }

  // private handleExceed(files, fileList) {
  //   this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
  // },
  private beforeRemove(file:any, fileList:any) {
    return this.$confirm(`Cancel the transfert of ${file.name} ?`)
  }

  private onCropUploadSuccess(jsonData: any, field: string) {
    this.showImageUpload = false
    this.image = jsonData.files[field]
  }

  private onClose() {
    this.showImageUpload = false
  }

  private cropSuccess(imgDataUrl: string, field: string) {
    this.image = imgDataUrl
    const data = new FormData()
    fetch(imgDataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'excel.' + blob.type.split('/')[1], {
          type: 'excel/xlsx'
        })

        data.append('file', file)
        uploadFile(data, (event: ProgressEvent) => {
          console.log(event)
        }).then(res => {
          this.postForm.fileURL = res.toString()
        })
      })
  }

  private rules = {
    symbol: [
      {
        required: true,
        message: 'Company is required',
        trigger: 'blur'
      }
    ],
    year: [
      {
        required: true,
        message: 'Year is required',
        trigger: 'blur'
      }

    ]
    // fileUpload: [
    //   {
    //     required: true,
    //     message: 'File is required',
    //     trigger: 'blur'
    //   }
    // ],

  };

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language
  }

  created() {
    this.fetchCompanies()
    this.fetchRoles()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    } else {
      this.postForm = Object.assign({}, defaultFileData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getFileById(id)
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

  private async fetchCompanies() {
    try {
      this.listLoading = true
      const data: any = await getCompanies(getQuery(this.listQuery))
      this.companyList = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
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
        await updateFile(this.postForm.id, this.postForm)
      } else {
        // delete this.postForm.adminsRole
        const data = new FormData()
        data.append('file', this.file.files[0])

        data.append('symbol', this.postForm.symbol)
        data.append('year', this.postForm.year)
        uploadShares(data, (event: ProgressEvent) => {
          console.log(event)
        }).then(res => {
          this.postForm.fileURL = res.toString()
        })

        // await addFile(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'File saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/files/list')
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
  padding: 0.5em;
  border:none;
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
