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
          label="Featured"
          prop="featured"
        >
          <el-switch v-model="postForm.featured" />
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

        <!-- <el-form-item
          style="margin-bottom: 20px;"
          label="Short Content"
          prop="shortContent"
        >
          <div class="editor-container">
            <markdown-editor
              ref="markdownEditor"
              v-model="content1"
              name="description"
              height="300px"
            /> -->
        <!-- <tinymce-editor
      :id="id"
      v-model="tinymceContent"
      :init="initOptions"
    /> -->
        <!-- <tinymce
        :height="400"
      /> -->

        <!-- <tinymce-editor
      :id="id"
      v-model="tinymceContent"
      :init="initOptions"

    /> -->
        <!-- </div>
        </el-form-item> -->

        <el-form-item
          style="margin-bottom: 20px;"
          label="Content"
          prop="content"
        >
          <el-input
            v-model="postForm.content"
            type="textarea"
            name="content"
            style="width:50%"
            required
            placeholder="Content"
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Written BY"
          prop="blogWriter"
        >
          <el-input
            v-model="postForm.blogWriter"
            type="textarea"
            name="content"
            style="width:50%"
            required
            placeholder="Content"
          />
        </el-form-item>
        <!-- <el-form-item
          label="Validity"
          style="margin-bottom: 20px;"
          prop="validity"
        >
           <el-date-picker
             v-model="postForm.validity"
             type="date"
             placeholder="validity">
          </el-date-picker>

        </el-form-item> -->

        <el-form-item
          style="margin-bottom: 20px;"
          label="Type"
          prop="type"
        >
          <el-select
            v-model="postForm.type"
            name="type"
            placeholder="Select"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Images"
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
import { defaultBlogData, updateBlog, addBlog, getBlogById } from '@/api/blog'
import PanThumb from '@/components/PanThumb/index.vue'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import { uploadFile } from '@/api/common'

import Tinymce from '@/components/Tinymce/index.vue'

import TinymceEditor from '@tinymce/tinymce-vue' // TinyMCE vue wrapper
const content = ''

@Component({
  name: 'BlogDetail',
  components: {
    MarkdownEditor,
    PanThumb,
    AvatarUpload,
    TinymceEditor
  }
})
export default class extends Vue {
  private hasChange = false
  private hasInit = false
  private fullscreen = false

  @Prop({ default: false }) private isEdit!: boolean;
  private content1 = content;
  private roleList: any = [];
  private showImageUpload = false;
  private image = 'https://via.placeholder.com/154'
  private postForm = Object.assign({}, defaultBlogData);
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

        data.append('file', file)
        uploadFile(data, (event: ProgressEvent) => {
          console.log(event)
        }).then(res => {

          // this.postForm.image = res.toString()
        })
      })
  }

 private typeList = [
   { label: 'Web Development', value: 'Web Development' },
   { label: 'App Develpment', value: 'App Development' },
   { label: 'UI/UX', value: 'UI/UX' },
   { label: 'Infrastructure', value: 'Infrastructure' }
 ];

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
    content: [
      {
        required: true,
        trigger: 'blur',
        message: 'Content is required'
      }
    ],

    shortContent: [
      {
        required: true,
        trigger: 'blur',
        message: 'Short Content is required'
      }
    ],
    validity: [
      {
        required: true,
        trigger: 'blur',
        message: ' Validityis required'
      }
    ],

    type: [
      {
        required: true,
        trigger: 'blur',
        message: 'Type  is required'
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
      this.postForm = Object.assign({}, defaultBlogData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getBlogById(id)
      this.postForm = data
      // this.content1 = this.postForm.shortContent
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
      // this.postForm.shortContent = (this.$refs.markdownEditor as MarkdownEditor)
      //   .getHtml()
      //   .toString()
      if (this.isEdit) {
        // this.postForm.adminsRole.id = this.postForm.adminsRoleId
        await updateBlog(this.postForm.id, this.postForm)
      } else {
        // delete this.postForm.adminsRole
        await addBlog(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Blog saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/blog/list')
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
