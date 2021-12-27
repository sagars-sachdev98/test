<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <el-input
          v-model="listQuery.global"
          placeholder=" Global Search"
          style="width: 100%;"
          class="filter-item"
          clearable="true"
          @keyup.enter.native="globalSearch(listQuery.global)"
        /><br>
        <el-input
          v-model="listQuery.fatherHusbandFirstName"
          placeholder=" Father's/Husband Name"
          style="width: 200px;"
          class="filter-item"
          clearable="true"
          @input="handleFilter"
        />
        <el-input
          v-model="listQuery.address"
          placeholder="Addresss"
          style="width: 200px;"
          class="filter-item"
          clearable="true"
          @input="handleFilter"
        />
        <el-input
          v-model="listQuery.state"
          placeholder="State"
          style="width: 200px;"
          class="filter-item"
          clearable="true"
          @input="handleFilter"
        />
        <el-input
          v-model="listQuery.pincode"
          placeholder="Pincode"
          style="width: 200px;"
          class="filter-item"
          clearable="true"
          @input="handleFilter"
        />
        <el-input
          v-model="listQuery.folioNumber"
          placeholder="Folio Number"
          style="width: 200px;"
          class="filter-item"
          clearable="true"
          @input="handleFilter"
        />
        <el-input
          v-model="listQuery.numberOfShares"
          placeholder="Number Of Shares"
          style="width: 200px;"
          class="filter-item"
          clearable="true"
          @input="handleFilter"
        />
        <el-input
          v-model="listQuery.symbol"
          placeholder="Company Name"
          style="width: 200px;"
          class="filter-item"
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
          class="filter-item"
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
          v-if="isListExport==false && isChecked "
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-export"
          @click="exportList"
        >
          View Checked
        </el-button>

        <el-button
          v-if="isListExport "
          class="filter-item"
          type="primary"
          @click="reload"
        >
          Back
        </el-button>

        <el-button
          v-if="isListExport "
          type="success"
          icon="el-icon-printer"
          @click="print"
        />

        <el-button
          v-if="printAllButton == false"
          :disabled="printAllButton"
          type="success"
          @click="printAll"
        >
          Print All
        </el-button>
      <!-- <router-link
        :to="'/file/add'"
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
      <!-- <el-checkbox
        v-model="showCreatedDate"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >
        {{ $t('table.createdDate') }}
      </el-checkbox> -->
      </div>

      <div
        id="printMe"
      >
        <el-table
          v-if="isListExport"
          :key="tableKey"
          v-loading="listLoading"
          :data="exportData"
          class="table"
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
          >
            <!-- <template slot-scope="scope">
          <span><el-checkbox  @change="checkedValue(scope.row.id)"></el-checkbox></span>&nbsp;
          <span>{{ scope.row.id }}</span>

        </template>

       -->
          </el-table-column>
          <el-table-column
            :min-width="20"
            align="center"
            prop=""
            label="Investor Details"
          >
            <template slot-scope="scope">
              <span><b>First Name:</b> {{ scope.row.investorFirstName }}</span><br>
              <span><b>Middle Name:</b>  {{ scope.row.investorMiddleName }}</span><br>
              <span><b>Last Name:</b>  {{ scope.row.investorLastName }}</span><br>
            </template>
          </el-table-column>

          <el-table-column
            :min-width="20"
            align="center"
            prop=""
            label="Father/Husband Details"
          >
            <template slot-scope="scope">
              <span><b>First Name:</b> {{ scope.row.fatherHusbandFirstName }}</span><br>
              <span><b>Middle Name:</b>  {{ scope.row.fatherHusbandMiddleName }}</span><br>
              <span><b>Last Name:</b>  {{ scope.row.fatherHusbandLastName }}</span><br>
            </template>
          </el-table-column>

          <el-table-column
            :min-width="20"
            align="center"
            prop=""
            label="Address"
          >
            <template slot-scope="scope">
              <span><b>Address:</b> <br> {{ scope.row.address }}</span><br>
              <span><b>State:</b>  {{ scope.row.state }}</span><br>
              <span><b>Pincode:</b>  {{ scope.row.pincode }}</span><br>
            </template>
          </el-table-column>

          <el-table-column
            :min-width="20"
            align="center"
            prop=""
            label="Share Details"
          >
            <template slot-scope="scope">
              <span><b>No. of Shares:</b> {{ scope.row.numberOfShares }}</span><br>
              <span><b>DP. ID:</b>  {{ scope.row.clientAccountNumber }}</span><br>
              <span><b>Nominal Value Of Shares:</b>  {{ scope.row.nominalValueOfShares }}</span><br>
              <span><b>Folio No.:</b>  {{ scope.row.folioNumber }}</span><br>
              <span><b>Total Value:</b>  {{ scope.row.numberOfShares * scope.row.nominalValueOfShares }}</span><br>
            </template>
          </el-table-column>

          <el-table-column
            :min-width="11"
            align="center"
            label="Company Name"
            prop="symbol"
          />
        </el-table>
        <b
          v-if="isListExport"
          class="totalValue"
        > Total Value:{{ this.totalValue }}</b>
      </div>
      <div
        v-if="isListExport==false"
        id="printRecord"
      >
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          class="table"
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
          >
            <template slot-scope="scope">
              <span><el-checkbox
                id="checkbox"
                @change="checkedValue(scope.row.id)"
              /></span>&nbsp;
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="20"
            align="center"
            prop=""
            label="Investor Details"
          >
            <template slot-scope="scope">
              <span><b>First Name:</b> {{ scope.row.investorFirstName }}</span><br>
              <span><b>Middle Name:</b>  {{ scope.row.investorMiddleName }}</span><br>
              <span><b>Last Name:</b>  {{ scope.row.investorLastName }}</span><br>
            </template>
          </el-table-column>

          <el-table-column
            :min-width="20"
            align="center"
            prop=""
            label="Father/Husband Details"
          >
            <template slot-scope="scope">
              <span><b>First Name:</b> {{ scope.row.fatherHusbandFirstName }}</span><br>
              <span><b>Middle Name:</b>  {{ scope.row.fatherHusbandMiddleName }}</span><br>
              <span><b>Last Name:</b>  {{ scope.row.fatherHusbandLastName }}</span><br>
            </template>
          </el-table-column>

          <el-table-column
            :min-width="20"
            align="center"
            prop=""
            label="Address"
          >
            <template slot-scope="scope">
              <span><b>Address:</b> <br> {{ scope.row.address }}</span><br>
              <span><b>State:</b>  {{ scope.row.state }}</span><br>
              <span><b>Pincode:</b>  {{ scope.row.pincode }}</span><br>
            </template>
          </el-table-column>

          <el-table-column
            :min-width="20"
            align="center"
            prop=""
            label="Share Details"
          >
            <template slot-scope="scope">
              <span><b>No. of Shares:</b> {{ scope.row.numberOfShares }}</span><br>
              <span><b>DP. ID:</b>  {{ scope.row.clientAccountNumber }}</span><br>
              <span><b>Nominal Value Of Shares:</b>  {{ scope.row.nominalValueOfShares }}</span><br>
              <span><b>Folio No.:</b>  {{ scope.row.folioNumber }}</span><br>
              <span><b>Total Value:</b>  {{ scope.row.numberOfShares * scope.row.nominalValueOfShares }}</span><br>
            </template>
          </el-table-column>

          <el-table-column
            :min-width="11"
            align="center"
            label="Company Name"
            prop="symbol"
          />
        </el-table>
      </div>
     
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getAdmins } from '@/api/admins'
import { IAdminData, IShareData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'

import { getShares, getShareById, getSearchById } from '@/api/share'

import Enabled from '@/components/Enabled/index.vue'
import { AdminModule } from '../../store/modules/admin'
import { Checkbox } from 'element-ui'
import { indexOf } from 'lodash'

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
  private list: IShareData[] = [];
  private exportData: IShareData[] = [];
  private listLoading = true;
  private isListExport = false;
  private printAllButton = false;
  private exists = false;
  private isChecked = false;
  private checkedValues:any[]=[];
  private viewCheckBox:boolean=true;
  private downloadLoading = false;
  private global:any
  private totalValue:any=0;
  private myRole = AdminModule.roles;
  private listQuery = {
    page: 1,
    limit: 100000,
    sort: 'id,DESC',
    filter: {

      fatherHusbandFirstName: '$contL',
      address: '$contL',
      pincode: '$contL',
      state: '$contL',
      folioNumber: '$contL',
      numberOfShares: 'eq',
      symbol: '$contL'

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
      const data: any = await getShares(getQuery(this.listQuery))
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
  private reload()
  {
    location.reload()

  }

  private async globalSearch(text: any) {
    const data: any = await getSearchById(text)
    this.list = data.data
  }

  private async exportList() {
    for (let i = 0; i < this.checkedValues.length; i++) {
      const data: any = await getShareById(this.checkedValues[i])
      this.exportData[this.exportData.length] = data
      this.totalValue = this.totalValue + this.exportData[i].nominalValueOfShares * this.exportData[i].numberOfShares
    }
    this.isListExport = true
  }

  private print() {
    // Pass the element id here
    var temp:any = this
    temp.$htmlToPaper('printMe')
  }

  private printAll() {
    // Pass the element id here
    var temp:any = this
    temp.$htmlToPaper('printRecord')
  }

  private checkedValue(id:number) {
    if (this.checkedValues.includes(id, 0) == true) {
      this.checkedValues.splice(this.checkedValues.indexOf(id), 1)
    } else {
      this.checkedValues[this.checkedValues.length] = id
      // this.isChecked=true
    }

    if (this.checkedValues.length > 0) { this.printAllButton = true } else { this.printAllButton = false }

    if (this.checkedValues.length > 0) { this.isChecked = true } else { this.isChecked = false }
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

.totalValue
{
  float:right;
}
</style>
