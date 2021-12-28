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
          label="Amenity"
        >
          <el-select
            v-model="postForm.amenityIds"
            name="amenityId"
            multiple
            placeholder="Select"
          >
            <el-option
              v-for="item in amenityList"
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
  getLocationsAmenityById,
  defaultLocationsAmenityData,
  createLocationsAmenity,
  getLocationsAmenities
} from '@/api/locations/locations-amenities'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from '@/router'
import { Action } from 'vuex-module-decorators'
import { getQuery } from '@/utils'
import { getAmenities } from '@/api/master/amenities'

@Component({
  name: 'LocationsAmenityDetail'
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private amenityList: any = [];
  private locationId: number = 0;

  private postForm = Object.assign({}, defaultLocationsAmenityData);
  private loading = false;
  private rules = {
    image: [{ required: true, message: 'Please enter name', trigger: 'blur' }]
  };

  private image: Array<any> = [];
  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language
  }

  created() {
    this.fetchAmenities()
    this.locationId = parseInt(
      this.$route.params && this.$route.params.locationId
    )
    this.fetchData(this.locationId)
    if (!this.isEdit) {
      this.postForm = Object.assign({}, defaultLocationsAmenityData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getLocationsAmenities({ id })
      if (data && data.amenities) {
        this.postForm.amenityIds = []
        for (const value of data.amenities) {
          this.postForm.amenityIds.push(value.id)
        }
      }
      // Just for test
      const title = 'Locations Amenity'
      // Set tagsview title
      this.setTagsViewTitle(title)
      // Set page title
      this.setPageTitle(title)
    } catch (err) {
      console.error(err)
    }
  }

  private async fetchAmenities() {
    try {
      this.amenityList = await getAmenities(
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

  private submitForm() {
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
      if (!this.isEdit) {
        this.postForm.amenities = []
        this.postForm.id = this.locationId
        this.postForm.amenityIds.forEach((value : any) => {
          this.postForm.amenities.push({ id: value })
        })
        await createLocationsAmenity(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Amenity saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/locations-amenities/list/' + this.postForm.id)
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
