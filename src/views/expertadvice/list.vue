<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.fullName"
        placeholder="Full Name"
        style="width: 200px;"
        filterable="true"
        clearable="true"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.email"
        placeholder="Email"
        style="width: 200px;"
        filterable="true"
        clearable="true"
        @input="handleFilter"
      />

      <el-input
        v-model="listQuery.contactNumber"
        placeholder="Contact Number"
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
      <!-- <router-link
        v-if="myRole.indexOf('superadmin') > -1 || myRole.indexOf('admin') > -1 "
        :to="'/ExpertAdvices/add'"
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
      </router-link> -->
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
        prop=""
        label="User Details"
      >
        <template slot-scope="scope">
          <b>Full Name:</b> {{ scope.row.fullName }}<br>
          <b>Email:</b> {{ scope.row.email }}<br>
          <b>Contact Number: </b>{{ scope.row.contactNumber }}<br>
        </template>
      </el-table-column>

      <el-table-column
        width="280px"
        align="center"
        prop="occupation"
        label="Occupation"
      />
      <el-table-column
        width="280px"
        align="center"
        prop="address"
        label="Address"
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
      <!-- <el-table-column
        v-if="myRole.indexOf('superadmin') > -1"
        align="center"
        :label="$t('table.actions')"
        width="180"
      >
        <template slot-scope="scope">
          <router-link :to="'/ExpertAdvices/edit/'+scope.row.id">
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
import { getExpertAdvices } from '@/api/expertadvice'
import { IExpertAdviceData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'

import Enabled from '@/components/Enabled/index.vue'
import { AdminModule } from '../../store/modules/admin'

@Component({
  name: 'ExpertAdviceList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IExpertAdviceData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private myRole = AdminModule.roles;
  private listQuery = {
    page: 1,
    limit: 10,
    sort: 'id,DESC',
    filter: {
      fullName: '$contL',
      contactNumber: '$contL',
      email: '$contL'

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
      const data: any = await getExpertAdvices(getQuery(this.listQuery))
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
      this.$tc('route.adminManagement.ExpertAdvices.title')
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
