<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.symbol"
        placeholder="Company Name"
        style="width: 200px;"
        filterable="true"
        clearable="true"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.year"
        placeholder="Year"
        style="width: 200px;"
        filterable="true"
        clearable="true"
        @input="handleFilter"
      />
      <!-- <el-select
        v-model="listQuery.enabled"
        :placeholder="$t('admin.enabled')"
        clearable
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
      </el-select> -->
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        filterable="true"
        clearable="true"
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
        filterable="true"
        clearable="true"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>
      <router-link
        v-if="myRole.indexOf('superadmin') > -1 || myRole.indexOf('admin') > -1 "
        :to="'/files/add'"
        class="margin-horizontal"
      >
        <el-button
          v-waves
          filterable="true"
          clearable="true"
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
      <!-- <el-checkbox
        v-model="showCreatedDate"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >
        {{ $t('table.createdDate') }}
      </el-checkbox> -->
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
        width="280px"
        align="center"
        prop="symbol"
        label="Company Name"
      />
      <el-table-column
        width="220px"
        align="center"
        label="Year"
        prop="year"
      >
        <template slot-scope="scope">
          <span> {{ scope.row.year | moment("YYYY") }} </span>
        </template>
      </el-table-column>

      <el-table-column
        width="220px"
        align="center"
        label="File"
        prop="fileURL"
      >
        <template slot-scope="scope">
          <a
            v-if="scope.row.fileURL"
            :href="$t(scope.row.fileURL)"
            target="_blank"
            style="font-size:32px;color:#388fe0;"
          >
            <svg-icon name="documentation" />
          </a>
        </template>
      </el-table-column>

      <el-table-column
        width="220px"
        align="center"
        label="Incomplete File"
        prop="IncommpletefileURL"
      >
        <template slot-scope="scope">
          <a
            v-if="scope.row.incompleteFileURL"
            :href="$t(scope.row.incompleteFileURL)"
            target="_blank"
            style="font-size:32px;color:#388fe0;"
          >
            <svg-icon name="documentation" />
          </a>
        </template>
      </el-table-column>
      <!-- <el-table-column
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
        v-if="myRole.indexOf('superadmin') > -1"
        align="center"
        :label="$t('table.actions')"
        width="180"
      >
        <template slot-scope="scope">
          <router-link :to="'/files/edit/'+scope.row.id">
            <el-button
              v-waves
              type="primary"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>
        </template>
      </el-table-column> -->
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
import { getFiles } from '@/api/file'
import { IFileData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'

import Enabled from '@/components/Enabled/index.vue'
import { AdminModule } from '../../store/modules/admin'

@Component({
  name: 'FileList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IFileData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private myRole = AdminModule.roles;
  private listQuery = {
    page: 1,
    limit: 10,
    sort: 'id,DESC',
    filter: {
      symbol: '$contL',
      year: 'eq'

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

  created() {
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getFiles(getQuery(this.listQuery))
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
      this.$tc('route.adminManagement.files.title')
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
