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
          label="Is Real Money?"
          prop="isRealMoney"
        >
          <el-switch v-model="postForm.isRealMoney" />
        </el-form-item>

        <!-- <el-form-item
          label="User Id"
          style="margin-bottom: 20px;"
          prop="userId"
        >
          <el-input
            v-model="postForm.userId"
            name="userId"
            style="width:50%"
            required
            placeholder="User Id"
          />
        </el-form-item> -->

        <el-form-item
          style="margin-bottom: 20px;"
          label="Prize Amount"
          prop="prizeAmount"
        >
          <el-input
            v-model="postForm.prizeAmount"
            name="prizeAmount"
            style="width:50%"
            required
            placeholder="Prize Amount"
            @change="calculateAmount"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Number Of Participant"
          prop="numberOfParticipants"
        >
          <el-input
            v-model="postForm.numberOfParticipants"
            name="numberOfParticipants"
            style="width:50%"
            required
            placeholder="Number Of Participant"
            @change="calculateAmount"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Per Person Amount"
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
          style="margin-bottom: 20px;"
          label="Winner Count"
          prop="winnerCount"
        >
          <el-input
            v-model="postForm.winnerCount"
            name="winnerCount"
            style="width:50%"
            required
            placeholder="Winner Count"
          />
        </el-form-item>

        <!-- <el-form-item
          style="margin-bottom: 20px;"
          label="Winner 1"
          prop="winner1"
        >
          <el-input
            v-model="postForm.winner1"
            name="winner1"
            style="width:50%"
            required
            placeholder="Winner 1"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Winner 2"
          prop="winner2"
        >
          <el-input
            v-model="postForm.winner2"
            name="winner2"
            style="width:50%"
            required
            placeholder="Winner 2"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Winner 3"
          prop="winner3"
        >
          <el-input
            v-model="postForm.winner3"
            name="winner3"
            style="width:50%"
            required
            placeholder="Winner 3"
          />
        </el-form-item> -->

        <!-- <el-form-item
          style="margin-bottom: 20px;"
          label="Winner 1 Id"
          prop="winner1Id"
        >
          <el-input
            v-model="postForm.winner1Id"
            name="winner1Id"
            style="width:50%"
            required
            placeholder="Winner 1 Id"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Winner 2 Id"
          prop="winner2Id"
        >
          <el-input
            v-model="postForm.winner2Id"
            name="winner2Id"
            style="width:50%"
            required
            placeholder="Winner 2 Id"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Winner 3 Id"
          prop="winner2Id"
        >
          <el-input
            v-model="postForm.winner3Id"
            name="winner3Id"
            style="width:50%"
            required
            placeholder="Winner 3 Id"
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
import { defaultGameData, updateGame, addGame, getGameById } from '@/api/games'
import PanThumb from '@/components/PanThumb/index.vue'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import { uploadFile } from '@/api/common'

@Component({
  name: 'GamesDetail',
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
  private postForm = Object.assign({}, defaultGameData);
  private loading = false;
  private perAmount=0;
  private toggleShow() {
    this.showImageUpload = !this.showImageUpload
  }

  private rules = {

    posttitle: [
      {
        required: true,
        trigger: 'blur',
        message: 'Post Title is required'
      }
    ],

    location: [
      {
        required: true,
        trigger: 'blur',
        message: 'location is required'
      }
    ],

    feature: [
      {
        required: true,
        trigger: 'blur',
        message: 'Feature is required'
      }
    ],

    fileselect: [
      {
        required: true,
        trigger: 'blur',
        message: 'fileselect is required'
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
      this.postForm = Object.assign({}, defaultGameData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getGameById(id)
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

  private calculateAmount() {
    this.postForm.perPersonAmount = (this.postForm.prizeAmount / this.postForm.numberOfParticipants)
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
        await updateGame(this.postForm.id, this.postForm)
      } else {
        // delete this.postForm.adminsRole
        await addGame(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Game saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/games/list')
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
