<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        :placeholder="$t('location.country.name')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.code"
        :placeholder="$t('location.country.code')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.enabled"
        :placeholder="$t('location.country.enabled')"
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
        :to="'/countries/add'"
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
      stripe
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
        width="280px"
        align="center"
        prop="name"
        :label="$t('location.country.name')"
      >
        <template slot-scope="scope">
          <enabled
            :key="scope.row.id"
            v-model="scope.row.enabled"
            :url="'/countries/' + scope.row.id"
          />
          <router-link :to="'/states/list/'+scope.row.id">
            <el-link type="primary">
              {{ scope.row.name }}
            </el-link>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        prop="code"
        :label="$t('location.country.code')"
      />

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

      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="180"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <router-link :to="'/countries/edit/'+scope.row.id">
            <el-button
              v-waves
              type="primary"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>&nbsp;
          <el-button
            v-waves
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          />
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
import { getCountries, deleteCountry } from '@/api/locations/countries'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import Enabled from '@/components/Enabled/index.vue'
import { ICountryData } from '../../../api/types'

@Component({
  name: 'CountryList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: ICountryData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private listQuery = {
    page: 1,
    limit: 10,
    code: undefined,
    name: undefined,
    enabled: undefined,
    sort: 'id,ASC',
    filter: {
      code: 'cont',
      name: 'cont',
      enabled: 'eq'
    }
  };

  private showCreatedDate: boolean = false;
  private sortOptions: any = [];
  private enableTypeOptions: any = [];

  created() {
    this.sortOptions = [
      { label: this.$tc('table.sort.id.asc'), key: 'id,ASC' },
      { label: this.$tc('table.sort.id.desc'), key: 'id,DESC' }
    ]
    this.enableTypeOptions = [
      { key: true, value: this.$tc('table.sort.enable.enabled') },
      { key: false, value: this.$tc('table.sort.enable.disabled') }
    ]
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getCountries(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }

  private handleDelete(data: any) {
    if (data) {
      this.$confirm(
        this.$tc('table.deleteConfirmation', 0, { name: data.name }),
        this.$tc('table.delete'),
        {
          confirmButtonText: this.$tc('table.delete'),
          confirmButtonClass: 'el-button--danger',
          cancelButtonText: this.$tc('table.cancel'),
          type: 'error'
        }
      )
        .then(() => {
          deleteCountry(data.id).then(deleted => {
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$tc('table.deleteCanceled')
          })
        })
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
    const tHeader = ['ID', 'Name', 'Code', 'Status', 'Timestamp']
    const filterVal = ['id', 'name', 'code', 'enabled', 'createdTimestamp']
    const data = formatJson(filterVal, this.list)
    exportJson2Excel(
      tHeader,
      data,
      this.$tc('route.locations.countries.title')
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
</style>
