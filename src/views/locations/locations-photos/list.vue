<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.enabled"
        :placeholder="$t('location.locationsPhoto.enabled')"
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
      <router-link
        :to="'/locations-photos/add/'+locationId"
        class="margin-horizontal"
      >
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-edit"
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
        :label="$t('location.locationsPhoto.image')"
      >
        <template slot-scope="scope">
          <enabled
            :key="scope.row.id"
            v-model="scope.row.enabled"
            :url="'/locations-photos/' + scope.row.id"
          />
          <el-avatar
            shape="square"
            fit="contain"
            :size="50"
            :src="scope.row.image"
          />
        </template>
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        :label="$t('location.locationsPhoto.user')"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.userId">{{ scope.row.admin.fullName }}</span>
          <span v-else>{{ scope.row.user.fullName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        prop="admin.fullName"
        :label="$t('location.locationsPhoto.admin')"
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
      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="180"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <router-link :to="'/locations-photos/edit/'+scope.row.id">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>&nbsp;
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          />
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
import {
  getLocationsPhotos,
  deleteLocationsPhoto
} from '@/api/locations/locations-photos'
import { ILocationsPhotoData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import Enabled from '@/components/Enabled/index.vue'

@Component({
  name: 'LocationsPhotoList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: ILocationsPhotoData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private locationId = 0;
  private listQuery = {
    page: 1,
    limit: 10,
    enabled: undefined,
    locationId: 0,
    sort: 'id,DESC',
    filter: {
      enabled: 'eq',
      locationId: 'eq'
    }
  };

  private showCreatedDate: boolean = false;
  private sortOptions = [
    { label: 'ID Ascending', key: 'id,ASC' },
    { label: 'ID Descending', key: 'id,DESC' }
  ];

  private enableTypeOptions = [
    { key: true, value: 'Enabled' },
    { key: false, value: 'Disabled' }
  ];

  created() {
    this.locationId = parseInt(
      this.$route.params && this.$route.params.locationId
    )
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      this.listQuery.locationId = this.locationId
      const data: any = await getLocationsPhotos(getQuery(this.listQuery))
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

  private handleDelete(data: any) {
    if (data) {
      this.$confirm(
        this.$tc('table.deleteConfirmation', undefined, { name: data.id }),
        this.$tc('table.delete'),
        {
          confirmButtonText: this.$tc('table.delete'),
          confirmButtonClass: 'el-button--danger',
          cancelButtonText: 'Cancel',
          type: 'error'
        }
      )
        .then(() => {
          deleteLocationsPhoto(data.id).then(deleted => {
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
      this.$tc('route.locations.locationsPhotos.title')
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
