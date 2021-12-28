<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.fullName"
        :placeholder="$t('user.fullName')"
        style="width: 200px;"
        class="filter-item"
        clearable = true
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.contactNumber"
        :placeholder="$t('user.contactNumber')"
        style="width: 200px;"
        class="filter-item"
        clearable = true
        @input="handleFilter"
      />
      <el-select
        v-model="listQuery.isVerified"
        style="width: 140px"
        class="filter-item"
        placeholder="Verified"
        clearable = true
        @change="handleFilter"
      >
        <el-option
          v-for="item in verifyOptions"
          :key="item.key"
          :label="item.label"
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
        width="80px"
        align="center"
        label="ID"
        prop="id"
      />
      <el-table-column
        width="200px"
        align="center"
        label="Personal Details"
        prop="fullName"
      >
        <template slot-scope="scope">
          <enabled
            :key="scope.row.id"
            v-model="scope.row.enabled"
            :url="'/users/' + scope.row.id"
          />
          <span>{{ scope.row.fullName }}</span><br>
          <!-- <span><b>Gender</b>{{ scope.row.gender }}</span><br> -->
          <b>Is Verified: </b>
          <span
            v-if="scope.row.isVerified === true "
            style="color:green"
          >
            Yes
          </span>
          <span
            v-if="scope.row.isVerified === false "
            style="color:red"
          >
            No
          </span>

          <!-- <span>{{ scope.row.usersRole.name }}</span> -->
        </template>
      </el-table-column>

      <el-table-column
        width="200px"
        align="center"
        label="Contact"
        prop="email"
      >
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.email }}</span><br> -->
          <span>{{ scope.row.contactNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200px"
        align="center"
        label="Money Details"
        prop="email"
      >
        <template slot-scope="scope">
          <span>Real Money:{{ scope.row.realMoney }}</span><br>
          <span>fake Money:{{ scope.row.fakeMoney }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200px"
        align="center"
        label="Game Details"
        prop="email"
      >
        <template slot-scope="scope">
          <span>Game Won:{{ scope.row.numberOfGamesWon }}</span><br>
          <span>Prize Won:{{ scope.row.numberOfPrizesWon }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="Plan Details"
        prop="email"
      >
        <template slot-scope="scope">
          <router-link :to="'/plantransaction/list/'+scope.row.id">
            <el-button
              v-waves
              type="primary"
              size="small"
            >
              Plan Details
            </el-button>
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
import { getUsers } from '@/api/users'
import { IUserData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'

import Enabled from '@/components/Enabled/index.vue'

@Component({
  name: 'WalletPlanList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IUserData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private listQuery = {
    page: 1,
    limit: 10,
    fullName: undefined,
    email: undefined,
    contactNumber: undefined,
    sort: 'id,DESC',
    filter: {
      isVerified: 'eq',
      fullName: '$contL',
      contactNumber: 'cont',
      email: 'cont'
    }
  };

  private sortOptions = [
    { label: 'ID Ascending', key: 'id,ASC' },
    { label: 'ID Descending', key: 'id,DESC' }
  ];

  private verifyOptions = [
    { label: 'Yes', key: 'true' },
    { label: 'No', key: 'false' }
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
      const data: any = await getUsers(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getAllList() {
    try {
      this.listLoading = true
      const data: any = await getUsers(getQuery(this.listQuery))
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
    this.handleFilter()
  }

  private async handleDownload(paid: boolean) {
    this.downloadLoading = true
    const fliterData: any = []
    const page = this.listQuery.page
    const limit = this.listQuery.limit
    this.listQuery.page = 1
    this.listQuery.limit = 100000

    const dataAll: any = await getUsers(getQuery(this.listQuery))
    const listAll:IUserData[] = dataAll.data

    this.listQuery.page = page
    this.listQuery.limit = limit
    // this.total = data.total;

    // if (paid) {
    //   fliterData = listAll.filter(list => {
    //     return new Date(list.planExipiryDate) > new Date();
    //   });
    // } else {
    //   fliterData = listAll.filter(list => {
    //     return new Date(list.planExipiryDate) < new Date();
    //   });
    // }
    const tHeader = [
      'id',
      'fullName',
      'email',
      'contactNumber',
      'type',
      'isMonthlyNewsletter',
      'planExipiryDate'
    ]
    const filterVal = [
      'id',
      'fullName',
      'email',
      'contactNumber',
      'type',
      'isMonthlyNewsletter',
      'planExipiryDate'
    ]
    const data = formatJson(filterVal, fliterData)
    exportJson2Excel(
      tHeader,
      data,
      this.$tc('route.userManagement.users.title')
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
