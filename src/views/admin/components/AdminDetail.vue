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
          label="Full Name"
          prop="fullName"
        >
          <el-input
            v-model="postForm.fullName"
            name="fullName"
            style="width:50%"
            required
            placeholder="Full Name"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Email"
          prop="email"
        >
          <el-input
            v-model="postForm.email"
            name="email"
            style="width:50%"
            required
            placeholder="Email"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Gender"
          prop="gender"
        >
          <el-select
            v-model="postForm.gender"
            name="gender"
            placeholder="Select"
          >
            <el-option
              v-for="item in genderList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Contact Number"
          prop="contactNumber"
        >
          <el-input
            v-model="postForm.contactNumber"
            name="contactNumber"
            style="width:50%"
            required
            placeholder="Contact Number"
          />
        </el-form-item>

        <el-form-item
          v-if="!isEdit"
          style="margin-bottom: 20px;"
          label="Password"
          prop="password"
        >
          <el-input
            v-model="postForm.password"
            placeholder="Password"
            type="password"
            style="width:50%"
            show-password
            name="password"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Role"
        >
          <el-select
            v-model="postForm.adminsRoleId"
            name="adminsRoleId"
            placeholder="Select"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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

@Component({
  name: 'AdminDetail',
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private roleList: any = [];

  private postForm = Object.assign({}, defaultAdminData);
  private loading = false;

  private genderList = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];

  private rules = {
    fullName: [
      {
        required: true,
        message: 'Full Name is required',
        trigger: 'blur'
      },
      {
        pattern: '[A-Za-z]',
        message: 'Invalid input',
        trigger: ['blur', 'change']
      },
      {
        min: 3,
        max: 100,
        message: 'Length should be 3 to 100',
        trigger: 'blur'
      }
    ],
    contactNumber: [
      {
        required: true,
        pattern: '[123456789][0-9]{9}',
        max: 10,
        message: 'Number should be of 10 Digits',
        trigger: ['blur', 'change']
      }

    ],
    gender: [
      {
        required: true,
        message: 'Gender is required',
        trigger: ['blur', 'change']
      }
    ],
    email: [
      {
        required: true,
        message: 'E-Mail is required',
        trigger: ['blur', 'change']
      },
      {
        type: 'email',
        message: 'Please enter correct email address',
        trigger: ['blur', 'change']
      }
    ],
    password: [
      {
        required: true,
        message: 'Password is required',
        trigger: ['blur', 'change']
      },
      {
        min: 8,
        max: 15,
        message: 'Length should be 8 to 15',
        trigger: ['blur', 'change']
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
      this.postForm = Object.assign({}, defaultAdminData)
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
      const title = this.postForm.email
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
        await updateAdmin(this.postForm.id, this.postForm)
      } else {
        // delete this.postForm.adminsRole
        await register(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Admin saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/admins/list')
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
