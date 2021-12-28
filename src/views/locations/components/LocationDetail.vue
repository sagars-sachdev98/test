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
            v-model="postForm.categoryId"
            name="categoryId"
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
          label="Site"
        >
          <el-select
            v-model="postForm.siteId"
            name="siteId"
          >
            <el-option
              v-for="item in siteList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Brand"
        >
          <el-select
            v-model="postForm.brandId"
            name="brandId"
          >
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Contact Number 1"
          prop="contactNumber1"
        >
          <el-input
            v-model="postForm.contactNumber1"
            name="contactNumber1"
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Contact Number 2"
          prop="contactNumber2"
        >
          <el-input
            v-model="postForm.contactNumber2"
            name="contactNumber2"
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Address"
          prop="address"
        >
          <el-input
            v-model="postForm.address"
            name="address"
            required
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Pincode"
          prop="pincode"
        >
          <el-input
            v-model="postForm.pincode"
            name="pincode"
            required
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Hot Desking"
          prop="hotDesking"
        >
          <el-input
            v-model="postForm.hotDesking"
            name="hotDesking"
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Area"
          prop="area"
        >
          <el-input
            v-model="postForm.area"
            name="area"
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Spoc Name"
          prop="spocName"
        >
          <el-input
            v-model="postForm.spocName"
            name="spocName"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Spoc Email"
          prop="spocEmail"
        >
          <el-input
            v-model="postForm.spocEmail"
            name="spocEmail"
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Spoc Contact Number"
          prop="spocContactNumber"
        >
          <el-input
            v-model="postForm.spocContactNumber"
            name="spocContactNumber"
          />
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
  getLocationById,
  defaultLocationData,
  updateLocation,
  createLocation
} from '@/api/locations/locations'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'
import { getQuery } from '../../../utils'
import { getCategories } from '@/api/master/categories'
import { getCompanies } from '@/api/master/companies'
// import { getBrands } from '@/api/master/brands'
import { getSites } from '@/api/master/sites'
import { getCountries } from '@/api/locations/countries'
import { getStates } from '@/api/locations/states'
import { getCities } from '@/api/locations/cities'
// import { getBooks } from '../../../api/master/books'

@Component({
  name: 'LocationDetail',
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private categoryList: any = [];
  private businessList: any = [];
  private companyList: any = [];
  private siteList: any = [];
  private brandList: any = [];
  private countryList: any = [];
  private stateList: any = [];
  private cityList: any = [];

  private postForm = Object.assign({}, defaultLocationData);
  private loading = false;
  private rules = {
    spocName: [
      {
        required: true,
        trigger: 'blur'
      },
      {
        min: 3,
        max: 100,
        message: 'Length should be 3 to 100',
        trigger: 'blur'
      }
    ],
    contactNumber1: [
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
    contactNumber2: [
      {
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
    spocContactNumber: [
      {
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

  get lang() {
    return AppModule.language
  }

  created() {
    this.getCategoryList()
    this.getBusinessList()
    this.getCompanyList()
    this.getSiteList()
    this.getBrandList()
    this.getCountryList()

    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    } else {
      this.postForm = Object.assign({}, defaultLocationData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getLocationById(id)
      this.postForm = data
      this.getStateList(data.countryId)
      this.getCityList(data.stateId)
      // Just for test
      const title = this.postForm.address ? this.postForm.address : ''
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
        this.postForm.category.id = this.postForm.categoryId
        this.postForm.business = { id: this.postForm.businessId }
        this.postForm.company = { id: this.postForm.companyId }
        this.postForm.brand = { id: this.postForm.brandId }
        if (this.postForm.siteId) {
          this.postForm.site = { id: this.postForm.siteId }
        }
        this.postForm.country = { id: this.postForm.countryId }
        this.postForm.state = { id: this.postForm.stateId }
        this.postForm.city = { id: this.postForm.cityId }
        // for coordinate
        if (this.postForm.coordinate) {
          const coordinate = JSON.parse(
            JSON.stringify(this.postForm.coordinate)
          )
          this.postForm.coordinate = coordinate.x + ',' + coordinate.y
        } else {
          this.postForm.coordinate = null
        }
        await updateLocation(this.postForm.id, this.postForm)
      } else {
        // delete this.postForm.category
        // delete this.postForm.business
        // delete this.postForm.company
        // delete this.postForm.site
        // delete this.postForm.brand
        // delete this.postForm.country
        // delete this.postForm.state
        // delete this.postForm.city

        await createLocation(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Location saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/locations/list')
    } catch (err) {
      this.loading = false
    }
  }

  private async getCategoryList() {
    try {
      this.categoryList = await getCategories(
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

  private async getSiteList() {
    try {
      this.siteList = await getSites(
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

  private async getBrandList() {
    try {
      // this.brandList = await getBrands(
      getQuery({
        enabled: true,
        filter: {
          enabled: 'eq'
        }
      })
      // )
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
