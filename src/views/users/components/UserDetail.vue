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
            required
            placeholder="Full Name"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Contact Number"
          prop="contactNumber"
        >
          <el-input
            v-model="postForm.contactNumber"
            name="contactNumber"
            required
            placeholder="Contact Number"
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
            name="Gender"
            placeholder="Select"
          >
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Password"
          prop="password"
        >
          <el-input
            v-model="postForm.password"
            name="email"
            required
            placeholder="Password"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Role"
        >
          <el-select
            v-model="postForm.usersRoleId"
            name="usersRoleId"
            placeholder="Select"
          >
            <el-option
              v-for="role in roleList"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            />
          </el-select>
        </el-form-item>

        <!-- <el-form-item style="margin-bottom: 20px;" label="Plan">
          <el-select  v-model="planName" placeholder="Select"
          @change="updatePlan($event)"
          >
            <el-option
              v-for="plan in planList"
              :key="plan.id"
              :label="plan.name"
              :value="plan"
            />
          </el-select>
        </el-form-item> -->

        <!-- <el-form-item style="margin-bottom: 20px;" label="Newsletter" prop="isMonthlyNewsletter">
          <el-switch v-model="postForm.isMonthlyNewsletter" />
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
  getUserById,
  defaultUserData,
  updateUser,
  register
} from '@/api/users'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'
import { getUsersRoles } from '@/api/usersRoles'
import { getQuery } from '../../../utils'
import { getCompanies } from '@/api/master/companies'
import { getCountries } from '@/api/locations/countries'
import { getCities } from '@/api/locations/cities'
import { getStates } from '@/api/locations/states'

@Component({
  name: 'UserDetail',
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private roleList: any = [];
  private planList: any = [];
  private typeList: any = [
    'Agent',
    'Development Officer',
    'SBA',
    'CLIA',
    'Other'
  ];

  private countryList: any = [];
  private stateList: any = [];
  private cityList: any = [];
  private planName='';
  private validateRequire = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      if (rule.field === 'imageURL') {
        this.$message({
          message: 'Upload cover image is required',
          type: 'error'
        })
      } else {
        this.$message({
          message: rule.field + ' is required',
          type: 'error'
        })
      }
      callback(new Error(rule.field + ' is required'))
    } else {
      callback()
    }
  };

  private postForm = Object.assign({}, defaultUserData);
  private loading = false;
  private rules = {
    fullName: [
      { required: true, message: 'Please enter full name', trigger: 'blur' },
      {
        min: 3,
        max: 150,
        message: 'Length should be 3 to 150',
        trigger: 'blur'
      }
    ],
    email: [
      { required: true, message: 'Please enter email', trigger: 'blur' },
      {
        type: 'email',
        required: true,
        message: 'Please enter valid email',
        trigger: 'change'
      }
    ],
    contactNumber: [
      {
        required: true,
        message: 'Please enter mobile number',
        trigger: 'blur'
      },
      {
        min: 10,
        max: 15,
        message: 'Length should be 10 to 15',
        trigger: ['blur', 'change']
      }
    ]
  };

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language
  }

  get filteredStates() {
    return this.stateList
      .filter
      // (p: any) => p.countryId === this.postForm.countryId
      ()
  }

  get filteredCities() {
    return this.cityList
      .filter
      // (p: any) =>
      // p.countryId === this.postForm.countryId &&
      // p.stateId === this.postForm.stateId
      ()
  }

  created() {
    this.fetchRoles()
    // this.fetchCompany();

    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    } else {
      this.postForm = Object.assign({}, defaultUserData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

   private selectOptions = [
     { name: 'Male', value: 'male' },
     { name: 'Female', value: 'female' }
   ];

   private async fetchData(id: number) {
     try {
       const data: any = await getUserById(id)
       this.postForm = data
       // Just for test
       const title = this.postForm.email
       // Set tagsview title
       this.setTagsViewTitle(title)
       // Set page title
       this.setPageTitle(title)
     } catch (err) {
       console.error(err)
     }
   }

   private async fetchRoles() {
     try {
       this.roleList = await getUsersRoles(
         getQuery({
           enabled: true,
           sort: 'name,ASC',
           filter: {
             enabled: 'eq'
           }
         })
       )
     } catch (err) {
       console.error(err)
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

   // updatePlan(index: any, event: any) {
   //   debugger
   //   // this.postForm.planExipiryDate = new Date(
   //   //   new Date().getFullYear(),
   //   //   new Date().getMonth() + this.planList[event - 1].duration,
   //   //   new Date().getDate()
   //   // )
   // }

   private updatePlanId(post: any) {
     //   debugger;
     //   this.postForm.planId = post.id;
     //   this.postForm.duration = post.duration;
     //   this.planName = post.name;
     // }
     //   private submitForm() {
     //     debugger;
     //     (this.$refs.postForm as Form).validate(valid => {
     //       if (valid) {
     //         this.saveForm();
     //       } else {
     //         console.error("Submit Error!");
     //         return false;
     //       }
     //     });
   }

   private submitForm() {
     debugger;
     (this.$refs.postForm as Form).validate(valid => {
       if (valid) {
         this.saveForm()
       } else {
         console.error('Submit Error!')
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
         await updateUser(this.postForm.id, this.postForm)
       } else {
         await register(this.postForm)
       }

       this.$notify({
         title: 'Success',
         message: 'User saved successfully',
         type: 'success',
         duration: 2000
       })
       router.push('/users/list')
     } catch (err) {
       this.loading = false
       console.error(err)
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
    border-bottom: 1px solid #bfcbd9;
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
