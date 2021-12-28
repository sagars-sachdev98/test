<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.enabled"
        placeholder="Enabled"
        clearable="true"
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
        v-model="listQuery.userId"
        name="userId"
        placeholder="User"
        clearable="true"
        style="width: 200px;"
        filterable="true"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in userList"
          :key="item.id"
          :label="item.fullName"
          :value="item.id"
        />
      </el-select>

      <el-select
        v-model="listQuery.bankId"
        name="bankId"
        placeholder="Bank Name"
        clearable="true"
        style="width: 200px;"
        filterable="true"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in bankList"
          :key="item.id"
          :label="item.bankName"
          :value="item.id"
        />
      </el-select>
      <el-input
        v-model="listQuery.amount"
        placeholder="Amount"
        style="width: 200px;"
        class="filter-item"
        clearable="true"
        @input="handleFilter"
      />
      <!-- <el-input
        v-model="listQuery.bankId"
        placeholder="Bank ID"
        style="width: 200px;"
        class="filter-item"
        clearable = true
        @input="handleFilter"
      /> -->
      <!-- <el-select
        v-model="listQuery.feature"
        placeholder="Feature"
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
      <!--<router-link
        :to="'/claim/add'"
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
      </router-link>-->
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
        :min-width="5"
        align="center"
        :label="$t('table.id')"
        prop="id"
        :class-name="getSortClass('id')"
      />

      <el-table-column
        label="User Details"
        :min-width="10"
        align="center"
      >
        <template slot-scope="scope">
          <span><b>Full Name:</b> {{ scope.row.user.fullName }}</span>
          <br>
          <span><b>Contact Number: </b>{{ scope.row.user.contactNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :min-width="10"
        align="left"
        label="Bank Account Details"
        prop=""
      >
        <template slot-scope="scope">
          <span><b>Name:</b> {{ scope.row.bank.bankCustomerName }}</span>
          <br>
          <span><b>Account Number: </b>{{ scope.row.bank.bankAccountNumber }}</span>
          <br>
          <span><b>Bank Name: </b>{{ scope.row.bank.bankName }}</span>
          <br>
          <span><b>IFSC: </b>{{ scope.row.bank.ifscCode }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :min-width="10"
        align="left"
        label="Claimed Amount"
        prop="amount"
      />

      <el-table-column
        :min-width="10"
        align="left"
        label="Status"
        prop="status"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.status"
            name="status"
            placeholder="Select"
            @change="updateStatus(scope.row.id,scope.row.status)"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showCreatedDate"
        :label="$t('table.createdDate')"
        :min-width="10"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.createdTimestamp | moment("from") }}</span>
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
import { IClaimData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson, getQuery } from '@/utils'
import Enabled from '@/components/Enabled/index.vue'
import { getClaim, getClaimById, updateClaim } from '@/api/claim'
import { getBank } from '@/api/bank'
import { getUsers } from '@/api/users'
import { AdminModule } from '@/store/modules/admin'

@Component({
  name: 'ClaimList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IClaimData[] = [];
  private bankList: any = [];
  private userList: any = [];
  private listLoading = true;
  private downloadLoading = false;
  private myRole = AdminModule.roles;
  private listQuery = {
    page: 1,
    limit: 10,
    sort: 'id,DESC',
    filter: {
      id: 'ne',
      enabled: 'eq',
      amount: 'eq',
      bankId: 'eq',
      userId: 'eq'
    }
  };

private statusList = [
  { label: 'Pending', value: 0 },
  { label: 'Accepted', value: 1 },
  { label: 'Rejected', value: 2 }
];

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
    this.fetchUsers()
    this.fetchBank()
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getClaim(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async fetchBank() {
    try {
      this.bankList = await getBank(
        getQuery({
          filter: {

          }
        })
      )
    } catch (err) {
      Promise.reject(err)
    }
  }

  private async fetchUsers() {
    try {
      this.userList = await getUsers(
        getQuery({
          filter: {

          }
        })
      )
    } catch (err) {
      Promise.reject(err)
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

  private async updateStatus(id: number, status: any) {
    const data: any = await getClaimById(id)
    data.status = status
    await updateClaim(data)
    debugger
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
      this.$tc('route.ClaimManagement.Claims.title')
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
