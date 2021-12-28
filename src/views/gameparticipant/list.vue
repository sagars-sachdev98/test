<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="Title"
        style="width: 140px;"
        class="filter-item"
        @change="handleFilter"
      />
      <el-select
        v-model="listQuery.enabled"
        placeholder="Enabled"
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
      <!-- <router-link
        :to="'/prize/add'"
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

      <!-- <el-table-column
        :min-width="10"
        align="left"
        label="Featured"
      >
        <template slot-scope="scope">
          <enabled
            v-model="scope.row.feature"
            :url="'/prizes/' + scope.row.id"
          />
        </template>
      </el-table-column> -->
      <el-table-column
        :min-width="25"
        align="left"
        label="User Details"
        prop="title"
      >
        <template slot-scope="scope">
          <!-- <enabled
            v-model="scope.row.enabled"
            :url="'/prizes/' + scope.row.id"
          />
          <span>
          <enabled
            v-model="scope.row.feature"
            :url="'/prizes/' + scope.row.id"
          />
          </span> -->
          <span><b>User :</b> {{ scope.row.user.fullName }}</span><br>
          <span><b>Contact Number :</b> {{ scope.row.user.contactNumber }}</span><br>
        </template>
      </el-table-column>

      <!-- <el-table-column
        width="200px"
        align="left"
        label="Description"
        prop="description"
      /> -->
      <el-table-column
        :min-width="20"
        align="left"
        label="Invitee details"
        prop="amount"
      >
        <template slot-scope="scope">
          <span><b>User :</b> {{ scope.row.invitee.fullName }}</span><br>
          <span><b>Contact Number :</b> {{ scope.row.invitee.contactNumber }}</span><br>
        </template>
      </el-table-column>

      <el-table-column
        :min-width="20"
        align="left"
        label="Game details"
        prop="amount"
      >
        <template slot-scope="scope">
          <span><b>Title:</b> {{ scope.row.game.numberOfParticipants }}</span><br>
          <span><b>No of Participants :</b> {{ scope.row.game.numberOfParticipants }}</span><br>
          <span><b>Per Person Amount :</b> {{ scope.row.game.perPersonAmount }}</span><br>
          <span><b>No of Participants Paid:</b> {{ scope.row.game.numberOfParticipantsPaid }}</span><br>
          <span><b>Total Amount Collected:</b> {{ scope.row.game.totalAmountCollected }}</span><br>
          <!-- <b>Winner</b> <span v-if="scope.row.winnerId!=NUll">{{ scope.row.game.winner.fullName }}</span><br> -->
        </template>
      </el-table-column>
      <el-table-column
        :min-width="10"
        align="left"
        label="Status"
        prop="status"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.status == 0"
            style="color:orange"
          >
            pending
          </span>
          <span
            v-else-if="scope.row.status == 1"
            style="color:red"
          >
            rejected
          </span>
          <span
            v-else
            style="color:green"
          >
            Accepted
          </span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        :min-width="10"
        align="left"
        label="Participant"
        prop="participantId"
      />

      <el-table-column
        :min-width="10"
        align="left"
        label="Winner"
        prop="winnerId"
      /> -->
      <!-- <el-table-column
        :min-width="15"
        align="center"
        prop="image"
        label="Image"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            width="150px"
          >
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
      </el-table-column> -->
      <!-- <el-table-column
        v-if="myRole.indexOf('superadmin') > -1"
        align="center"
        :label="$t('table.actions')"
        :min-width="15"
      >
        <template slot-scope="scope">
          <router-link :to="'/prize/edit/'+scope.row.id">
            <el-button
              v-waves
              type="primary"
              size="small"
              icon="el-icon-edit"
            />
          </router-link><br><br>

        <router-link :to="'/prizeparticipant/list/' + scope.row.id">
        <el-button type="primary">
          Participants
        </el-button>
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
import { IGameParticipantData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson, getQuery } from '@/utils'
import Enabled from '@/components/Enabled/index.vue'
import { getGameParticipants } from '@/api/gameparticipant'
import { AdminModule } from '@/store/modules/admin'

@Component({
  name: 'gameparticipantList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private gameId = 0;
  private list: IGameParticipantData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private myRole = AdminModule.roles;
  private listQuery = {
    page: 1,
    limit: 10,
    sort: 'id,DESC',
    gameId: this.gameId,
    filter: {
      gameId: 'eq',
      enabled: 'eq',
      title: '$contL'
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
    this.gameId = parseInt(this.$route.params && this.$route.params.id)
    this.listQuery.gameId = this.gameId
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getGameParticipants(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      debugger
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
      this.$tc('route.prizeManagement.prizes.title')
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
