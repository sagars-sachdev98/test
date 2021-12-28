<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-select
        v-model="listQuery.enabled"
        placeholder="Enabled"
        clearable
        class="filter-item"
        style="width: 130px"
        @change="handleFilter"
      > -->
      <el-option
        v-for="item in enableTypeOptions"
        :key="item.key"
        :label="item.value"
        :value="item.key"
      />
      <!-- </el-select> -->
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

      <el-input
        v-model="listQuery.prizeAmount"
        placeholder="Price Amount"
        style="width: 200px;"
        class="filter-item"
        clearable="true"
        @input="handleFilter"
      />

      <!-- <el-input
        v-model="listQuery.userId"
        placeholder="User ID"
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
      <!-- <router-link
        :to="'/games/add'"
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
      </router-link> -->
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
        :min-width="10"
        align="left"
        label="User Details"
        prop="userId"
      >
        <template slot-scope="scope">
          <span><b>Name:</b>{{ scope.row.user.fullName }}</span><br>
          <span><b>Contact:</b>{{ scope.row.user.contactNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :min-width="15"
        align="left"
        label="Prize Details"
        prop="prizeAmount"
      >
        <template slot-scope="scope">
          <span><b>Number Of Participants: </b>{{ scope.row.numberOfParticipants }}</span><br>
          <span><b>Per Person Amount: </b>{{ scope.row.perPersonAmount }}</span><br>
          <span><b>Number Of Participants Paid: </b>{{ scope.row.numberOfParticipantsPaid }}</span><br>
          <span><b>Total AmountCollected: </b>{{ scope.row.totalAmountCollected }}</span><br>
          <span><b>Prize Amount: </b>{{ scope.row.prizeAmount }}</span><br>
        </template>
      </el-table-column>
      <!-- <el-table-column
        :min-width="15"
        align="left"
        label="Total Amount"
        prop="totalAmountCollected"
      />
      <el-table-column
        :min-width="17"
        align="left"
        label="Number Of Participants"
        prop="numberOfParticipants"
      /> -->

      <!-- <el-table-column
        width="180px"
        align="left"
        label="Total Amount collected"
        prop="totalAmountCollected"
      /> -->

      <!-- <el-table-column
        :min-width="15"
        align="left"
        label="Per Person Amount"
        prop="perPersonAmount"
      /> -->
      <el-table-column
        :min-width="10"
        align="left"
        label="Game Details"
      >
        <template slot-scope="scope">
          <!-- <span><b>Game Code:</b> {{ scope.row.gameCode }}</span><br> -->
          <b>Real Money:</b>
          <span
            v-if="scope.row.isRealMoney == true"
            style="color:green"
          > Yes </span>
          <span
            v-if="scope.row.isRealMoney == false"
            style="color:red"
          > No </span><br>
          <b>Claimed:</b>
          <span
            v-if="scope.row.claimed == true"
            style="color:green"
          > Yes </span>
          <span
            v-if="scope.row.claimed == false"
            style="color:red"
          > No </span>
          <br>
          <span><b>Status:</b></span>
          <span
            v-if="scope.row.status == 0"
            style="color:red"
          > Not Started </span>
          <span
            v-if="scope.row.status == 1"
            style="color:green"
          > Started </span>
        </template>
      </el-table-column>
      <el-table-column
        :min-width="13"
        align="left"
        label="Winner Details"
        prop="winnerCount"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.winnerId!=NULL"><b>Name:</b> {{ scope.row.winner.fullName }}</span><br>
          <span v-if="scope.row.winnerId!=NULL"><b>Contact: </b>{{ scope.row.winner.contactNumber }}</span><br>
        </template>
      </el-table-column>

      <el-table-column
        :min-width="13"
        align="left"
        label="Participants"
        prop="winnerCount"
      >
        <template slot-scope="scope">
          <router-link :to="'/gameparticipant/list/' + scope.row.id">
            <el-button type="success">
              Participants
            </el-button>
          </router-link>
        </template>
      </el-table-column>

      <!-- <el-table-column
        width="180px"
        align="left"
        label="Winner 1"
        prop="winner1"
      />

      <el-table-column
        width="180px"
        align="left"
        label="Winner 2"
        prop="winner2"
      />
      <el-table-column
        width="180px"
        align="left"
        label="Winner 3"
        prop="winner3"
      />

      <el-table-column
        width="180px"
        align="left"
        label="Winner 1 Id"
        prop="winner1Id"
      />

      <el-table-column
        width="180px"
        align="left"
        label="Winner 2 Id"
        prop="winner2Id"
      />

      <el-table-column
        width="180px"
        align="left"
        label="Winner 3 Id"
        prop="winner3Id"
      /> -->

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
import { IGameData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson, getQuery } from '@/utils'
import Enabled from '@/components/Enabled/index.vue'
import { getGame } from '@/api/games'
import { getUsers } from '@/api/users'
import { AdminModule } from '@/store/modules/admin'

@Component({
  name: 'GamesList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IGameData[] = [];
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
      userId: 'eq',
      prizeAmount: 'eq',
      fullName: '$contL'
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
    this.fetchUsers()
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getGame(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
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

  private getSortClass(key: string) {
    const sort = this.listQuery.sort
    return sort === `${key},ASC`
      ? 'ascending'
      : sort === `${key},DESC`
        ? 'descending'
        : ''
  }
  // /private async fetchUser(){
  //   cont data:any = await get
  // }

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
    // const data = formatJson(filterVal, this.list)
    exportJson2Excel(
      tHeader,
      // data,
      this.$tc('route.GameManagement.Game.title')
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
