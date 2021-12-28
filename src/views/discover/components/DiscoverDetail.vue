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
          label="Category"
        >
          <el-select
            v-model="postForm.discoverCategoryId"
            name="discoverCategoryId"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
          label="Sub Title"
          prop="subTitle"
        >
          <el-input
            v-model="postForm.subTitle"
            name="subTitle"
            required
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Description"
          prop="description"
        >
          <el-input
            v-model="postForm.description"
            name="description"
            required
            maxlength="100"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Image"
          prop="image"
        >
          <file-upload
            :file-list="image"
            @change="imageUploaded"
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
          v-if="postForm.discoverCategoryId === 3"
          style="margin-bottom: 20px;"
          label="How To Redeem"
          prop="howToRedeem"
        >
          <el-input
            v-model="postForm.howToRedeem"
            name="howToRedeem"
            required
          />
        </el-form-item>
        <el-form-item
          v-if="postForm.discoverCategoryId === 3"
          style="margin-bottom: 20px;"
          label="Spoc Name"
          prop="spocName"
        >
          <el-input
            v-model="postForm.spocName"
            name="spocName"
            required
          />
        </el-form-item>
        <el-form-item
          v-if="postForm.discoverCategoryId === 3"
          style="margin-bottom: 20px;"
          label="Spoc Contact Number"
          prop="spocContactNumber"
        >
          <el-input
            v-model="postForm.spocContactNumber"
            name="spocContactNumber"
            required
          />
        </el-form-item>
        <el-form-item
          v-if="postForm.discoverCategoryId === 3"
          style="margin-bottom: 20px;"
          label="Spoc Email"
          prop="spocEmail"
        >
          <el-input
            v-model="postForm.spocEmail"
            name="spocEmail"
            required
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Business"
        >
          <el-select
            v-model="postForm.businessId"
            name="businessId"
          >
            <el-option
              v-for="item in businessList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Company"
        >
          <el-select
            v-model="postForm.companyId"
            name="companyId"
          >
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Country"
        >
          <el-select
            v-model="postForm.countryId"
            name="countryId"
            @change="getStateList"
          >
            <el-option
              v-for="item in countryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="State"
        >
          <el-select
            v-model="postForm.stateId"
            name="stateId"
            @change="getCityList"
          >
            <el-option
              v-for="item in stateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="City"
        >
          <el-select
            v-model="postForm.cityId"
            name="cityId"
          >
            <el-option
              v-for="item in cityList"
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
  getDiscoverById,
  defaultDiscoverData,
  updateDiscover,
  createDiscover
} from '@/api/discover/discover'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'
import { getQuery } from '../../../utils'
import { getDiscoverCategories } from '@/api/discover/discoverCategories'
import { getCompanies } from '@/api/master/companies'
import { getCountries } from '@/api/locations/countries'
import { getStates } from '@/api/locations/states'
import { getCities } from '@/api/locations/cities'

import FileUpload from '@/components/FileUpload/index.vue'
// import { getBooks } from '@/api/master/books'

@Component({
  name: 'DiscoverDetail',
  components: {
    FileUpload
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private categoryList: any = [];
  private businessList: any = [];
  private companyList: any = [];
  private countryList: any = [];
  private stateList: any = [];
  private cityList: any = [];

  private postForm = Object.assign({}, defaultDiscoverData);
  private loading = false;
  private rules = {
    title: [
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
    spocContactNumber: [
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
    spocEmail: [
      {
        trigger: 'blur'
      },
      {
        type: 'email',
        message: 'Please enter correct email address',
        trigger: ['blur', 'change']
      }
    ]
  };

  private tempTagView?: ITagView;
  private image: Array<any> = [];

  get lang() {
    return AppModule.language
  }

  created() {
    this.getCategoryList()
    this.getBusinessList()
    this.getCompanyList()
    this.getCountryList()

    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    } else {
      this.postForm = Object.assign({}, defaultDiscoverData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getDiscoverById(id)
      this.postForm = data
      this.image.push({
        url: data.image,
        name: data.title
      })
      if (data.stateId) {
        this.getCityList(data.stateId)
      }
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

  private imageUploaded(file: any) {
    this.postForm.image = file.response
  }

  @Action
  public async saveForm() {
    try {
      this.loading = true
      if (this.isEdit) {
        this.postForm.discoverCategory.id = this.postForm.discoverCategoryId
        this.postForm.business = { id: this.postForm.businessId }
        this.postForm.company = { id: this.postForm.companyId }
        this.postForm.country = { id: this.postForm.countryId }
        this.postForm.state = { id: this.postForm.stateId }
        this.postForm.city = { id: this.postForm.cityId }
        await updateDiscover(this.postForm.id, this.postForm)
      } else {
        delete this.postForm.discoverCategory
        delete this.postForm.business
        delete this.postForm.company
        delete this.postForm.country
        delete this.postForm.state
        delete this.postForm.city
        await createDiscover(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Data saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/discover/list')
    } catch (err) {
      this.loading = false
    }
  }

  private async getCategoryList() {
    try {
      this.categoryList = await getDiscoverCategories(
        getQuery({
          enabled: true,
          filter: {
            enabled: 'eq'
          }
        })
      )
    } catch (err) {
      Promise.reject(err)
    }
  }

  private async getBusinessList() {
    // try {
    //   this.businessList = await getBooks(
    //     getQuery({
    //       enabled: true,
    //       filter: {
    //         enabled: 'eq'
    //       }
    //     })
    //   )
    // } catch (err) {
    //   Promise.reject(err)
    // }
  }

  private async getCompanyList() {
    try {
      this.companyList = await getCompanies(
        getQuery({
          enabled: true,
          filter: {
            enabled: 'eq'
          }
        })
      )
    } catch (err) {
      Promise.reject(err)
    }
  }

  private async getCountryList() {
    try {
      this.countryList = await getCountries(
        getQuery({
          enabled: true,
          filter: {
            enabled: 'eq'
          }
        })
      )
    } catch (err) {
      Promise.reject(err)
    }
  }

  private async getStateList(countryId: number) {
    try {
      this.stateList = await getStates(
        getQuery({
          enabled: true,
          select: 'id,name',
          sort: 'name,ASC',
          countryId,
          filter: {
            enabled: 'eq',
            countryId: 'eq'
          }
        })
      )
    } catch (err) {
      Promise.reject(err)
    }
  }

  private async getCityList(stateId: number) {
    try {
      this.cityList = await getCities(
        getQuery({
          enabled: true,
          select: 'id,name',
          sort: 'name,ASC',
          stateId,
          filter: {
            enabled: 'eq',
            stateId: 'eq'
          }
        })
      )
    } catch (err) {
      Promise.reject(err)
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
