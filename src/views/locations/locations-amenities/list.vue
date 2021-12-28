<template>
  <div class="app-container">
    <div class="filter-container">
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
        :to="'/locations-amenities/add/'+id"
        class="margin-horizontal"
      >
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-edit"
        >
          {{ $t('global.form.manage') }}
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
        width="180px"
        align="center"
        :label="$t('location.amenity.icon')"
      >
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            fit="contain"
            :size="50"
            :src="scope.row.icon"
          />
          <div>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
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
import { getLocationsAmenities } from '@/api/locations/locations-amenities'
import { ILocationsAmenityData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'

@Component({
  name: 'LocationsPhotoList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: ILocationsAmenityData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private id = 0;
  private listQuery = {
    page: 1,
    limit: 10,
    id: 0,
    sort: 'id,DESC',
    fields: ['id'],
    relation: ['amenities']
  };

  private showCreatedDate: boolean = false;
  private sortOptions = [
    { label: 'ID Ascending', key: 'id,ASC' },
    { label: 'ID Descending', key: 'id,DESC' }
  ];

  created() {
    this.id = parseInt(this.$route.params && this.$route.params.locationId)
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      this.listQuery.id = this.id
      const data: any = await getLocationsAmenities(getQuery(this.listQuery))
      this.list = data.amenities
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
    const tHeader = ['id', 'name', 'enabled', 'timestamp']
    const filterVal = ['id', 'name', 'enabled', 'createdTimestamp']
    const data = formatJson(filterVal, this.list)
    exportJson2Excel(
      tHeader,
      data,
      this.$tc('route.locations.locationsAmenities.title')
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
