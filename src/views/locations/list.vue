<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- v-if="['category','business','company','site','brand','country','state','city'].includes(filter.name)" -->
      <span
        v-for="filter in filters"
        :key="filter.id"
      >
        <el-select
          v-model="listQuery[filter.name + 'Id']"
          filterable = true
          :placeholder="filter.name"
          clearable = true
          class="filter-item"
          style="width: 130px"
          @change="handleFilter"
        >
          <el-option
            v-for="item in filter.filterValues"
            v-show="filter.name in item && item[filter.name]"
            :key="item.id"
            :label="filter.name in item && item[filter.name]? item[filter.name].name : null"
            :value="filter.name in item && item[filter.name]? item[filter.name].id : null"
          />
        </el-select>
      </span>
      <el-select
        v-model="listQuery.enabled"
        :placeholder="$t('admin.enabled')"
        clearable = true
        class="filter-item"
        style="width: 130px"
        @change="handleFilter"
      >
        <el-option
          v-for="item in enableTypeOptions"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>
      <router-link
        :to="'/locations/add'"
        class="margin-horizontal"
      >
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
        >
          {{ $t('global.form.add') }}
        </el-button>
      </router-link>
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('table.export') }}</el-button> -->
      <el-checkbox
        v-model="showCreatedDate"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >
        {{ $t('table.createdDate') }}
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        sortable="custom"
        width="80"
        align="center"
        :label="$t('table.id')"
        prop="id"
        :class-name="getSortClass('id')"
      />
      <el-table-column
        width="180px"
        align="center"
        :label="$t('location.location.company')"
        prop="company.name"
      >
        <template slot-scope="scope">
          <enabled
            :key="scope.row.id"
            v-model="scope.row.enabled"
            :url="'/admins/' + scope.row.id"
          />
          <span>{{ scope.row.company.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        :label="$t('location.location.address')"
        prop="address"
      />
      <el-table-column
        width="180px"
        align="center"
        :label="$t('location.location.state')"
        prop="state.name"
      />
      <el-table-column
        width="180px"
        align="center"
        :label="$t('location.location.city')"
        prop="city.name"
      />
      <el-table-column
        v-if="showCreatedDate"
        :label="$t('table.createdDate')"
        width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.createdTimestamp | moment("from") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        :label="$t('table.actions')"
        width="180px"
      >
        <template slot-scope="scope">
          <router-link :to="'/locations/edit/'+scope.row.id">
            <el-button
              v-waves
              type="primary"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>&nbsp;
          <router-link :to="'/volunteers/list/'+scope.row.id">
            <el-button
              v-waves
              type="primary"
              size="small"
              icon="el-icon-user"
            />
          </router-link>&nbsp;
          <router-link :to="'/locations-photos/list/'+scope.row.id">
            <el-button
              v-waves
              type="primary"
              size="small"
              icon="el-icon-picture"
            />
          </router-link>
          <div>&nbsp;</div>
          <router-link :to="'/locations-amenities/list/'+scope.row.id">
            <el-button
              v-waves
              type="primary"
              size="small"
              icon="el-icon-s-claim"
              style="mardin-top:20px;"
            />
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getLocations, getFilters } from '@/api/locations/locations'
import { ILocationData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import Enabled from '@/components/Enabled/index.vue'

@Component({
  name: 'LocationList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: ILocationData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private listQuery = {
    page: 1,
    limit: 20,
    categoryId: 1,
    businessId: undefined,
    companyId: undefined,
    siteId: undefined,
    brandId: undefined,
    countryId: undefined,
    stateId: undefined,
    cityId: undefined,
    sort: 'id,ASC',
    filter: {
      id: 'ne',
      categoryId: 'eq',
      businessId: 'eq',
      companyId: 'eq',
      siteId: 'eq',
      brandId: 'eq',
      countryId: 'eq',
      stateId: 'eq',
      cityId: 'eq',
      enabled: 'eq'
    }
  };

  private showCreatedDate: boolean = false;
  private sortOptions = [
    { label: 'ID Ascending', key: 'id,ASC' },
    { label: 'ID Descending', key: 'id,DESC' }
  ];

  private enableTypeOptions = [
    { key: true, value: 'Enable' },
    { key: false, value: 'Disabled' }
  ];

  private filters: any = [];

  created() {
    this.getList()
    if (this.listQuery.categoryId) {
      this.getFilters()
    }
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getLocations(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getFilters() {
    this.filters = await getFilters(
      getQuery({
        categoryId: this.listQuery.categoryId,
        countryId: this.listQuery.countryId,
        sort: 'name,ASC'
      })
    )
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
    if (this.listQuery.categoryId) {
      this.getFilters()
    }
  }

  private sortChange(data: any) {
    const { prop, order } = data
    if (prop) {
      this.listQuery.sort =
        `${prop},` + (order === 'ascending' ? 'ASC' : 'DESC')
      this.handleFilter()
    }
  }

  private getSortClass(key: string) {
    const sort = this.listQuery.sort
    return sort === `${key},ASC`
      ? 'ascending'
      : sort === `${key},DESC`
        ? 'descending'
        : ''
  }

  private handleDownload() {
    this.downloadLoading = true
    const tHeader = [
      'ID',
      'Full Name',
      'Email',
      'Contact Number',
      'Status',
      'timestamp'
    ]
    const filterVal = [
      'id',
      'fullName',
      'email',
      'contactNumber',
      'enabled',
      'createdTimestamp'
    ]
    const data = formatJson(filterVal, this.list)
    exportJson2Excel(
      tHeader,
      data,
      this.$tc('route.adminManagement.admins.title')
    )
    this.downloadLoading = false
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.el-button--small {
  margin-top: 3px;
}
</style>
