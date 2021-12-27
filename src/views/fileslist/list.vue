<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="2010">
          2010
        </el-checkbox>
        <el-checkbox label="2011">
          2011
        </el-checkbox>
        <el-checkbox label="2012">
          2012
        </el-checkbox>
      </el-checkbox-group>
    </div> -->

    <el-date-picker
      v-model="year[year.length]"
      type="year"
      placeholder="Pick a year"
    />
    <br>

    <el-table
      :key="key"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="symbol"
        label="Company Name"
        width="180"
      />
      <el-table-column
        v-for="year in formThead"
        :key="year"
        :label="year"
      >
        <template slot-scope="scope">
          {{ scope.row[year] }}
        </template>
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getFiles } from '@/api/file'
import { IFileData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'
import moment from 'moment'

import Enabled from '@/components/Enabled/index.vue'
import { AdminModule } from '../../store/modules/admin'

const defaultFormThead = ['2010']

@Component({
  name: 'FileYearList',
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
  private year=[]
  private fileCount:number=0
  private tableData: IFileData[] = [];
  private key = 1 // Table key
  private formTheadOptions= []
  private checkboxVal = defaultFormThead
  private formThead = [] // Default header

  private listQuery = {
    page: 1,
    limit: 10,
    year: undefined,
    sort: 'id,DESC',
    filter: {

    }
  };

  // @Watch('year')
  // private onCheckboxValChange(value:[]) {
  //   debugger
  //   var formattedDate=moment(this.year[this.year.length - 1]).format('YYYY')
  //   this.formTheadOptions[this.formTheadOptions.length] = formattedDate.toString()
  //   this.getFileCount(formattedDate)
  //   this.formThead = this.formTheadOptions.filter(i => this.formTheadOptions.indexOf(i) >= 0)
  //   debugger
  //   this.key = this.key + 1 // Ensure the table will be re-rendered each time
  //   debugger
  // }

  // private removeYear(year:any)
  // {
  //   for (let i=0;i<this.formTheadOptions.length;i++)
  //     {
  //       if(this.formTheadOptions[i]==year)
  //       {
  //          this.formTheadOptions.splice(this.formTheadOptions.indexOf(i), 1)
  //          debugger

  //       }

  //     }

  // }

  private async getFileCount(year:any) {
    this.listQuery.year = year
    const data: any = await getFiles(getQuery(this.listQuery))
    this.fileCount = data.total
    this.tableData = data.data
    debugger
  }

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
      this.tableData = this.list
      debugger
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
