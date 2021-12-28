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
          label="Feature"
          prop="feature"
        >
          <el-switch v-model="postForm.feature" />
        </el-form-item>

        <el-form-item
          label="Title"
          style="margin-bottom: 20px;"
          prop="title"
        >
          <el-input
            v-model="postForm.title"
            name="Title"
            style="width:50%"
            required
            placeholder="Title"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Description"
          prop="description"
        >
          <el-input
            v-model="postForm.description"
            type="textarea"
            name="description"
            style="width:50%"
            required
            placeholder="Description"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Game Date & Time"
          prop="dateTimeOfStart"
        >
          <el-date-picker
            v-model="postForm.dateTimeOfStart"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>

        <el-form-item
          label="Per Person Amount"
          style="margin-bottom: 20px;"
          prop="perPersonAmount"
        >
          <el-input
            v-model="postForm.perPersonAmount"
            name="perPersonAmount"
            style="width:50%"
            required
            placeholder="Per Person Amount"
          />
        </el-form-item>
        <el-form-item
          label="Number Of Participants"
          style="margin-bottom: 20px;"
          prop="numberOfParticipants"
        >
          <el-input
            v-model="postForm.numberOfParticipants"
            name="numberOfParticipants"
            style="width:50%"
            required
            placeholder="Number Of Participants"
          />
        </el-form-item>

        <el-form-item
          label="Prize"
          style="margin-bottom: 20px;"
          prop="prize"
        >
          <el-input
            v-model="postForm.prize"
            name="prize"
            style="width:50%"
            required
            placeholder="Prize"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Image"
          prop="image"
        >
          <div
            style="margin: auto;padding: 10px;display: flex;align-items: center;background:white;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
          >
            <div style="width:50%;text-align:center;">
              <pan-thumb
                :image="image"
                border="10%"
                width="154px"
                height="154px"
              />
            </div>
            <div
              style="float:right;text-align:center;padding-left:30px;border-left:2px solid red;width:50%"
            >
              <unicon
                name="upload"
                height="50"
                width="50"
                class="card-panel-icon"
                fill="red"
              />
              <br>
              <el-button
                type="primary"
                icon="el-icon-upload"
                @click="toggleShow"
              >
                Browse
              </el-button>
            </div>
          </div>
          <avatar-upload
            v-model="showImageUpload"
            field="file"
            :width="360"
            :height="256"
            @crop-success="cropSuccess"
            @close="onClose"
            @crop-upload-success="onCropUploadSuccess"
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
import { defaultPrizeData, updatePrize, addPrize, getPrizeById } from '@/api/prize'
import PanThumb from '@/components/PanThumb/index.vue'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import { uploadFile } from '@/api/common'

@Component({
  name: 'PrizeDetail',
  components: {
    PanThumb,
    AvatarUpload
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private roleList: any = [];
  private showImageUpload = false;
  private image = 'https://via.placeholder.com/154'
  private postForm = Object.assign({}, defaultPrizeData);
  private loading = false;
  private toggleShow() {
    this.showImageUpload = !this.showImageUpload
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
        const file = new File([blob], 'img.' + blob.type.split('/')[1], {
          type: 'image/png'
        })
        debugger
        data.append('file', file)
        uploadFile(data, (event: ProgressEvent) => {
          console.log(event)
        }).then(res => {
          debugger
          this.postForm.image = res.toString()
        })
      })
  }

  private rules = {
    image: [
      {
        required: true,
        trigger: 'blur',
        message: 'Image is required'
      }
    ],
    title: [
      {
        required: true,
        trigger: 'blur',
        message: 'Title is required'
      }
    ],
    description: [
      {
        required: true,
        trigger: 'blur',
        message: 'Description is required'
      }
    ],
    amount: [
      {
        required: true,
        trigger: 'blur',
        message: 'Amount is required'
      },
      {
        trigger: ['blur'],
        pattern: '[123456789][0-9]',
        message: 'Invalid input'
      }
    ],

    prize: [
      {
        required: true,
        trigger: 'blur',
        message: 'Prize is required'
      }
    ],
    participantId: [
      {
        required: true,
        trigger: 'blur',
        message: 'Participant Id is required'
      }
    ],

    winnerId: [
      {
        required: true,
        trigger: 'blur',
        message: 'Winner Id is required'
      }
    ],

    feature: [
      {
        required: true,
        trigger: 'blur',
        message: 'Feature is required'
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
      this.postForm = Object.assign({}, defaultPrizeData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getPrizeById(id)
      this.postForm = data
      this.image = data.image
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
    this.image = 'https://via.placeholder.com/154'
  }

  @Action
  public async saveForm() {
    try {
      this.loading = true
      if (this.isEdit) {
        // this.postForm.adminsRole.id = this.postForm.adminsRoleId
        await updatePrize(this.postForm.id, this.postForm)
      } else {
        // delete this.postForm.adminsRole
        await addPrize(this.postForm)
        debugger
      }

      this.$notify({
        title: 'Success',
        message: 'Prize saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/Prize/list')
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
