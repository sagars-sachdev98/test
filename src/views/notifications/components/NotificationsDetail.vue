<template>
  <div class="form-block">
    <div class="source">
      <el-form
        ref="postForm"
        :model="postForm"
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
          label="Title"
          prop="title"
        >
          <el-input
            v-model="postForm.title"
            name="title"
            required
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Message"
          prop="message"
        >
          <el-input
            v-model="postForm.message"
            type="textarea"
            :rows="2"
            :autosize="{minRows: 2, maxRows: 4}"
            name="message"
            maxlength="100"
            show-word-limit
            required
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Image"
          prop="image"
        >
          <file-upload
            :file-list="image"
            @change="imageUpload"
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Link"
          prop="link"
        >
          <el-input
            v-model="postForm.link"
            type="link"
            name="link"
            required
          >
            <template slot="prepend">
              https://
            </template>
          </el-input>
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Page"
          prop="page"
        >
          <el-select
            v-model="postForm.page"
            name="page"
            clearable = true
            filterable = true
          >
            <el-option
              v-for="page in pageList"
              :key="page"
              :label="page"
              :value="page"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          style="margin-bottom: 20px;"
          label="Params"
          prop="params"
        >
          <el-input
            v-model="postForm.params"
            name="params"
          />
        </el-form-item> -->
        <!-- <el-form-item
          style="margin-bottom: 20px;"
          label="Send to All Users"
          prop="sendToAll"
        >
          <el-switch
            v-model="postForm.sendToAll"
            @change="sendToAllToggled"
          />
        </el-form-item> -->
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
  getNotificationsById,
  defaultNotificationsData,
  updateNotifications,
  createNotifications
} from '@/api/notifications/notifications'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'
import { getQuery } from '../../../utils'
import { getCompanies } from '@/api/master/companies'
import { getCountries } from '@/api/locations/countries'
import { getStates } from '@/api/locations/states'
import { getCities } from '@/api/locations/cities'
import FileUpload from '@/components/FileUpload/index.vue'
import { getAppVersions } from '../../../api/common'

@Component({
  name: 'NotificationsDetail',
  components: {
    FileUpload
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private pageList: any = [
    'Dashboard',
    'Plans',
    'About',
    'FAQ',
  ];


  private postForm = Object.assign({}, defaultNotificationsData);
  private loading = false;
  private rules = {
    title: [
      {
        required: true,
        trigger: 'blur'
      },
      {
        min: 3,
        max: 50,
        message: 'Length should be 3 to 50',
        trigger: 'blur'
      }
    ],
    message: [
      {
        required: true,
        trigger: 'blur'
      },
      {
        min: 3,
        max: 100,
        message: 'Length should be 3 to 50',
        trigger: 'blur'
      }
    ],
    contactNumber: [
      {
        required: true,
        trigger: 'blur'
      },
      {
        min: 10,
        max: 15,
        message: 'Length should be 10 to 15',
        trigger: ['blur', 'change']
      }
    ],
    email: [
      {
        trigger: 'blur'
      },
      {
        type: 'email',
        message: 'Please enter correct email address',
        trigger: ['blur', 'change']
      }
    ],
    link: [
      {
        trigger: 'blur'
      },
      {
        pattern: /[-a-zA-Z0-9@%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
        message: 'Invalid URL format',
        trigger: ['blur', 'change']
      }
    ]
  };

  private image: Array<any> = [];

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language
  }

  created() {

    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    } else {
      this.postForm = Object.assign({}, defaultNotificationsData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getNotificationsById(id)
      this.postForm = data
      this.image.push({
        url: data.image
      })
      // Just for test
      const title = this.postForm.title ? this.postForm.title : ''
      // Set tagsview title
      this.setTagsViewTitle(title)
      // Set page title
      this.setPageTitle(title)
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
        await updateNotifications(this.postForm.id, this.postForm)
      } else {
        await createNotifications(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Data saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/notifications/list')
    } catch (err) {
      this.loading = false
    }
  }


  private imageUpload(file: any) {
    this.postForm.image = file.response
  }

  // private sendToAllToggled() {
  //   if (this.postForm.sendToAll) {
  //     this.$confirm(
  //       'Are you sure want to send notification to All users?',
  //       'Attention!',
  //       {
  //         confirmButtonText: "Yes, I know what I'm doing",
  //         confirmButtonClass: 'el-button--success',
  //         cancelButtonText: this.$tc('table.cancel'),
  //         cancelButtonClass: 'el-button--danger',
  //         type: 'error'
  //       }
  //     )
  //       .then(confirm => {
  //         // let it confirm
  //         // clear other dropdowns
  //       })
  //       .catch(_ => {
  //         this.postForm.sendToAll = false
  //       })
  //   }
  // }
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
