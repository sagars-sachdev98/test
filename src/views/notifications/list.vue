<template>
  <div class="app-container">
    <div class="filter-container">
      <span
        v-for="filter in filters.filters"
        :key="filter"
      >
        <el-select
          v-if="['category','business','company','country','state','city'].includes(filter.name)"
          v-model="listQuery[filter.name + 'Id']"
          :placeholder="filter.name"
          clearable = true
          class="filter-item"
          style="width: 130px"
          @change="handleFilter"
        >
          <el-option
            v-for="item in filter.filterValues"
            :key="item[filter.name]['id']"
            :label="item[filter.name]['name']"
            :value="item[filter.name]['id']"
          />
        </el-select>
      </span>
      <el-select
        v-model="listQuery.enabled"
        :placeholder="$t('notifications.enabled')"
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
        :to="'/notifications/add'"
        class="margin-horizontal"
      >
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
        >
          {{ $t('notifications.send') }}
        </el-button>
      </router-link>
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('table.export') }}</el-button>-->
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
        :label="$t('notifications.title')"
        prop="title"
      >
        <template slot-scope="scope">
          <enabled
            :key="scope.row.id"
            v-model="scope.row.enabled"
            :url="'/notifications/' + scope.row.id"
          />
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        label="Message"
        prop="message"
      />
      <el-table-column
        width="180px"
        align="center"
        label="Link"
        prop="link"
      />
      <el-table-column
        width="180px"
        align="center"
        label="Page"
        prop="page"
      />
      <el-table-column
        width="180px"
        align="center"
        label="Image"
        prop="image"
      >
        <template slot-scope="scope">
          <pan-thumb
            v-if="scope.row.image"
            :image="scope.row.image"
            style="border-radius: 0%;"
            width="140px"
            height="140px"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="showCreatedDate"
        :label="$t('table.createdDate')"
        width="110px"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.createdTimestamp | moment("from") }}</span>
        </template>
      </el-table-column>
      <!-- Sandesh create stats if possible -->
      <!-- <el-table-column align="center" :label="$t('table.actions')" width="180">
        <template slot-scope="scope">
          <router-link :to="'/notifications/view/'+scope.row.id">
            <el-button v-waves type="primary" size="small" icon="el-icon-eye"/>
          </router-link>
        </template>
      </el-table-column>-->
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
import {
  getNotifications,
  getFilters
} from '@/api/notifications/notifications'
import { INotificationsData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'

import Enabled from '@/components/Enabled/index.vue'
import PanThumb from '@/components/PanThumb/index.vue'

@Component({
  name: 'NotificationsList',
  components: {
    Pagination,
    Enabled,
    PanThumb
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: INotificationsData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private listQuery = {
    page: 1,
    limit: 20,
    businessId: undefined,
    companyId: undefined,
    countryId: undefined,
    stateId: undefined,
    cityId: undefined,
    sort: 'id,DESC',
    filter: {
      id: 'ne',
      businessId: 'eq',
      companyId: 'eq',
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
    if (this.listQuery.businessId) {
      this.getFilters()
    }
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getNotifications(getQuery(this.listQuery))
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
        sort: 'name,ASC'
      })
    )
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
    if (this.listQuery.businessId) {
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
    exportJson2Excel(tHeader, data, this.$tc('route.notifications.title'))
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
</style>
