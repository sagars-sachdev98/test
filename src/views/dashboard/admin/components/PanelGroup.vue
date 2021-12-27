<template>
  <el-row
    :gutter="40"
    class="panel-group"
  >
    <!--  <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <router-link
        :to="'/plan/list'"
        class="margin-horizontal"
      >
        <div
          class="card-panel"
          @click="handleSetLineChartData('purchases')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <unicon
              name="calendar-alt"
              height="50"
              width="50"
              class="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Plan
            </div>
            <count-to
              :start-val="0"
              :end-val="plansCount"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </div>
      </router-link>
    </el-col> -->
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <!-- <router-link
        :to="'/company/list'"
        class="margin-horizontal"
      > -->
      <br>
      <div
        class="card-panel"
        @click="handleSetLineChartData('purchases')"
      >
        <div class="card-panel-icon-wrapper icon-money">
          <unicon
            name="sitemap"
            height="50"
            width="50"
            class="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Company
          </div>
          <count-to
            :start-val="0"
            :end-val="companyCount"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
      <!-- </router-link> -->
    </el-col>

    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <router-link
        :to="'/records/list'"
        class="margin-horizontal"
      >
        <div
          class="card-panel"
          @click="handleSetLineChartData('purchases')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <unicon
              name="clipboard-alt"
              height="50"
              width="50"
              class="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Records
            </div>
            <count-to
              :start-val="0"
              :end-val="recordsCount"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </div>
      </router-link>
    </el-col>

    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <router-link
        :to="'/files/list'"
        class="margin-horizontal"
      >
        <div
          class="card-panel"
          @click="handleSetLineChartData('purchases')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <unicon
              name="file-blank"
              height="50"
              width="50"
              class="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Files
            </div>
            <count-to
              :start-val="0"
              :end-val="filesCount"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </div>
      </router-link>
    </el-col>

    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <router-link
        :to="'/enquiry/list'"
        class="margin-horizontal"
      >
        <div
          class="card-panel"
          @click="handleSetLineChartData('purchases')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <unicon
              name="blogger-alt"
              height="50"
              width="50"
              class="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Enquiry
            </div>
            <count-to
              :start-val="0"
              :end-val="enquiryCount"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </div>
      </router-link>
    </el-col>

    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <router-link
        :to="'/users/list'"
        class="margin-horizontal"
      >
        <div
          class="card-panel"
          @click="handleSetLineChartData('purchases')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <unicon
              name="user-square"
              height="50"
              width="50"
              class="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Agent
            </div>
            <count-to
              :start-val="0"
              :end-val="userCount"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </div>
      </router-link>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CountTo from 'vue-count-to'
import { getQuery } from '@/utils'
import { getCompaniesCount } from '@/api/company'
import { getSharesCount } from '@/api/share'
import { getEnquiryCount } from '@/api/enquiry'
import { getFilesCount } from '@/api/file'
import { getUserCount } from '@/api/users'

@Component({
  name: 'PanelGroup',
  components: {
    CountTo
  }
})
export default class extends Vue {
  private listLoading = true;
  private companyCount: any = 0;
  private recordsCount: any = 0;
  private filesCount: any = 0;
  private enquiryCount: any = 0;
  private userCount: any = 0;

  private handleSetLineChartData(type: string) {
    this.$emit('handleSetLineChartData', type)
  }

  created() {
    this.getCompanyCount()
    this.getRecordsCount()
    this.getFilesCount()
    this.getEnquiryCount()
    this.getUserCount()
  }

  private async getCompanyCount() {
    try {
      this.listLoading = true
      this.companyCount = await getCompaniesCount(
        getQuery({
          enabled: true,
          filter: {
            enabled: 'eq'
          }
        })
      )
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getRecordsCount() {
    try {
      this.listLoading = true
      this.recordsCount = await getSharesCount(
        getQuery({
          enabled: true,
          filter: {
            enabled: 'eq'
          }
        })
      )
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getEnquiryCount() {
    try {
      this.listLoading = true
      this.enquiryCount = await getEnquiryCount(
        getQuery({
          enabled: true,
          filter: {
            enabled: 'eq'
          }
        })
      )
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getUserCount() {
    try {
      this.listLoading = true
      this.userCount = await getUserCount(
        getQuery({
          enabled: true,
          filter: {
            enabled: 'eq'
          }
        })
      )
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getFilesCount() {
    try {
      this.listLoading = true
      this.filesCount = await getFilesCount(
        getQuery({
          enabled: true,
          filter: {
            enabled: 'eq'
          }
        })
      )
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper .card-panel-icon {
        color: #fff;
        fill:#fff;
      }

      .icon-people {
        background: #E3363A;
      }

      .icon-message {
        background: #E3363A;
      }

      .icon-money {
        background:#388fe0;
      }

      .icon-money .card-panel-icon{
        fill:#fff;
      }

      .icon-shopping {
        background: #E3363A;
      }
      .icon-money .card-panel-icon {
      fill:white!important;
    }
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
      fill:#388fe0!important;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.card-panel-icon{
  fill:red;
}
</style>
