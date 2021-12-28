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
          label="Plan Name"
          prop="planName"
        >
          <el-input
            v-model="postForm.planName"
            name="planName"
            style="width:50%"
            required
            placeholder="Plan Name"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Price"
          prop="price"
        >
          <el-input
            v-model="postForm.price"
            name="price"
            style="width:50%"
            required
            placeholder="Price"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Coins"
          prop="coins"
        >
          <el-input
            v-model="postForm.coins"
            name="coins"
            style="width:50%"
            required
            placeholder="Coins"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Plan Expiry"
          prop="planExpiry"
        >
          <el-date-picker
            v-model="postForm.planExpiry"
            type="date"
            name="planExpiry"
            style="width:50%"
            required
            placeholder="Plan Expiry"
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
import { defaultPlanData, updatePlan, addPlan, getPlanById } from '@/api/plan'
import PanThumb from '@/components/PanThumb/index.vue'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import { uploadFile } from '@/api/common'

@Component({
  name: 'PlanDetail',
  components: {
    PanThumb,
    AvatarUpload
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private roleList: any = [];
  private postForm = Object.assign({}, defaultPlanData);
  private loading = false;

  private rules = {

    coins: [
      {
        required: true,
        trigger: 'blur',
        message: 'Coins is required'
      },
      {
        trigger: ['blur'],
        pattern: '[123456789][0-9]',
        message: 'Invalid input'
      }
    ],

    noOfUsersPurchased: [
      {
        required: true,
        trigger: 'blur',
        message: 'No of users purchased is required'
      },
      {
        trigger: ['blur', 'change'],
        pattern: '[0-9]+',
        message: 'Invalid input'
      }
    ],
    price: [
      {
        required: true,
        trigger: 'blur',
        message: 'Price is required'
      },
      {
        trigger: ['blur'],
        pattern: '[123456789][0-9]',
        message: 'Invalid input'
      }
    ],
    planExpiry: [
      {
        required: true,
        trigger: 'blur',
        message: 'Plan Expiry is required'
      }
    ],

    planName: [
      {
        required: true,
        trigger: 'blur',
        message: 'Plan Name is required'
      },
      {
        pattern: '[A-Za-z]+$',
        message: 'Name should contain characters only',
        trigger: ['blur', 'change']
      }
    ]

    // noOfUsersPurchased: [
    //   {
    //     required: true,
    //     trigger: 'blur',
    //     message: 'No of users purchased is required'
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
      this.postForm = Object.assign({}, defaultPlanData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getPlanById(id)
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
        await updatePlan(this.postForm.id, this.postForm)
      } else {
        // delete this.postForm.adminsRole
        await addPlan(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Plan saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/Plan/list')
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
