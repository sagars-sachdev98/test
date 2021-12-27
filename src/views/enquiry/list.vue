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
      >
        <el-option
          v-for="item in enableTypeOptions"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
        </el-select> -->
      <el-input
        v-model="listQuery.name"
        placeholder="Share Holder's Name"
        style="width: 200px;"
        filterable="true"
        clearable="true"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.contactNumber"
        placeholder="Number"
        style="width: 200px;"
        filterable="true"
        clearable="true"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.state"
        placeholder="State"
        style="width: 200px;"
        filterable="true"
        clearable="true"
        @input="handleFilter"
      />
      <!--
      <el-select
        v-model="listQuery.featured"
        placeholder="Featured"
        clearable
        class="filter-item"
        style="width: 130px"
        @change="handleFilter"
      >
        <el-option
          v-for="item in featuredTypeOptions"
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
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>

      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        Export
      </el-button>
      <router-link
        :to="'/enquiry/add'"
        class="margin-horizontal"
      >
        <!-- <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
        >
          {{ $t('global.form.add') }}
        </el-button> -->
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
        :min-width="7"
        align="center"
        :label="$t('table.id')"
        prop="id"
        :class-name="getSortClass('id')"
      />

      <!-- <el-table-column
        :min-width="20"
        align="center"
        width="80px"
        label="Featured"
      >
        <template slot-scope="scope">
          <featured
            v-model="scope.row.featured"
            :url="'/enquiries/' + scope.row.id"
          />
          <span>Gender: {{ scope.row.gender }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        width="180px"
        align="left"
        label="IP Address"
        prop="ip"
      />

      <el-table-column
        width="180px"
        align="left"
        label="Share Holder's Name"
        prop="name"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
          <!-- <span>Gender: {{ scope.row.gender }}</span> -->
        </template>
      </el-table-column>

      <el-table-column
        :min-width="20"
        align="center"
        label="State"
        prop="state"
      />
      <el-table-column
        :min-width="20"
        align="center"
        label="Contact Number"
        prop="contactNumber"
      />

      <el-table-column
        :min-width="20"
        align="center"
        label="status"
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
      </el-table-column>>

      <el-table-column
        v-if="showCreatedDate"
        :label="$t('table.createdDate')"
        :min-width="20"
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
          <router-link :to="'/enquiry/edit/'+scope.row.id">
            <el-button
              v-waves
              type="primary"
              size="small"
              icon="el-icon-edit"
            />
          </router-link> -->
      <!-- <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          />
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
import { IEnquiryData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson, getQuery } from '@/utils'
import Enabled from '@/components/Enabled/index.vue'
// import Featured from '@/components/Featured/index.vue'
import { deleteEnquiry, getEnquiries, updateEnquiry, defaultEnquiryData, getEnquiryById } from '@/api/enquiry'
import { AdminModule } from '@/store/modules/admin'
// import { deleteCareer } from '@/api/career'

@Component({
  name: 'enquiryList',
  components: {
    Pagination,
    Enabled
  }

})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private status = ''
  private list: IEnquiryData[] = [];
  private listLoading = true;
  private checked:any[]=[]
  private downloadLoading = false;
  private myRole = AdminModule.roles;
  private postForm: IEnquiryData[] = [];
  private listQuery = {
    page: 1,
    limit: 10,
    sort: 'id,DESC',
    filter: {
      name: '$contL',
      contactNumber: 'eq',
      state: '$contL'
    }
  };

  private showCreatedDate: boolean = false;
  private sortOptions = [
    { label: 'ID Ascending', key: 'id,ASC' },
    { label: 'ID Descending', key: 'id,DESC' }
  ];

    private statusList = [
      { label: 'Contacted', value: 'Contacted' },
      { label: 'Not-Contacted', value: 'Not-Contacted' }
    ];

  private enableTypeOptions = [
    { key: true, value: 'Enable' },
    { key: false, value: 'Disabled' }
  ];

  private featuredTypeOptions = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' }
  ];

  created() {
    this.getList()
  }

  private handleDelete(data: any) {
    if (data) {
      this.$confirm(
        this.$tc('table.deleteConfirmation', undefined, { name: data.name }),
        this.$tc('table.delete'),
        {
          confirmButtonText: this.$tc('table.delete'),
          confirmButtonClass: 'el-button--danger',
          cancelButtonText: 'Cancel',
          type: 'error'
        }
      )
        .then(() => {
          deleteEnquiry(data.id).then(deleted => {
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

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getEnquiries(getQuery(this.listQuery))
      this.list = data.data

      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async updateStatus(id: number, status: any) {
    const data: any = await getEnquiryById(id)
    data.status = status
    await updateEnquiry(id, data)
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

  private async handleDownload() {
    this.downloadLoading = true
    const page = this.listQuery.page
    const fliterData: any = []
    const limit = this.listQuery.limit
    this.listQuery.page = 1
    this.listQuery.limit = 100000
    const dataAll:any = await getEnquiries(getQuery(this.listQuery))
    const listAll:IEnquiryData[] = dataAll.data

    this.listQuery.page = page
    this.listQuery.limit = limit

    const tHeader = [
      'id',
      'name',
      'state',
      'contactNumber',
      'status'
    ]
    const filterVal = [
      'id',
      'name',
      'state',
      'contactNumber',
      'status'
    ]

    const data = formatJson(filterVal, listAll)
    exportJson2Excel(
      tHeader,
      data,
      this.$tc('route.enquiryManagement.enquiry.title')
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
