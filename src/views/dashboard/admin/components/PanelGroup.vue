<template>
  <el-row
    :gutter="40"
    class="panel-group"
  >
    <el-col
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
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <router-link
        :to="'/prize/list'"
        class="margin-horizontal"
      >
        <div
          class="card-panel"
          @click="handleSetLineChartData('purchases')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <unicon
              name="trophy"
              height="50"
              width="50"
              class="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Prizes
            </div>
            <count-to
              :start-val="0"
              :end-val="prizesCount"
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
        :to="'/claim/list'"
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
              Claims
            </div>
            <count-to
              :start-val="0"
              :end-val="claimsCount"
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
          @click="handleSetLineChartData('users')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <unicon
              name="users-alt"
              height="50"
              width="50"
              class="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Users
            </div>
            <count-to
              :start-val="0"
              :end-val="usersCount"
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
        :to="'/bank/list'"
        class="margin-horizontal"
      >
        <div
          class="card-panel"
          @click="handleSetLineChartData('users')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <unicon
              name="university"
              height="50"
              width="50"
              class="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Banks
            </div>
            <count-to
              :start-val="0"
              :end-val="banksCount"
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
        :to="'/games/list'"
        class="margin-horizontal"
      >
        <div
          class="card-panel"
          @click="handleSetLineChartData('users')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <unicon
              name="football"
              height="50"
              width="50"
              class="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Games
            </div>
            <count-to
              :start-val="0"
              :end-val="gamesCount"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </div>
      </router-link>
    </el-col>
    <!-- <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <router-link
        :to="'/transaction/list'"
        class="margin-horizontal"
      >
        <div
          class="card-panel"
          @click="handleSetLineChartData('users')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <unicon
              name="newspaper"
              height="50"
              width="50"
              class="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Transactions
            </div>
            <count-to
              :start-val="0"
              :end-val="transactionsCount"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </div>
      </router-link>
    </el-col> -->
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CountTo from 'vue-count-to'
import { getPrizesCount } from '@/api/prize'
import { getUsersCount } from '@/api/users'
import { getPlansCount } from '@/api/plan'
import { getClaimsCount } from '@/api/claim'
import { getGameCount } from '@/api/games'
import { getBanksCount } from '@/api/bank'
// import { getTransactionsCount } from '@/api/transaction'
import { getQuery } from '@/utils'

@Component({
  name: 'PanelGroup',
  components: {
    CountTo
  }
})
export default class extends Vue {
  private listLoading = true;
  private prizesCount: any = 0;
  private plansCount: any = 0;
  private claimsCount: any = 0;
  private usersCount: any = 0;
  private banksCount: any = 0;
  private gamesCount: any = 0;
  private transactionsCount: any = 0;

  private handleSetLineChartData(type: string) {
    this.$emit('handleSetLineChartData', type)
  }

  created() {
    this.getPrizesCount()
    this.getPlansCount()
    this.getClaimsCount()
    this.getUsersCount()
    this.getBanksCount()
    this.getGameCount()
    // this.getTransactionsCount()
  }

  private async getPrizesCount() {
    try {
      this.listLoading = true
      this.prizesCount = await getPrizesCount(
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

  private async getGameCount() {
    try {
      this.listLoading = true
      this.gamesCount = await getGameCount(
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

  // private async getTransactionsCount() {
  //   try {
  //     this.listLoading = true
  //     this.transactionsCount = await getTransactionsCount(
  //       getQuery({
  //         enabled: true,
  //         filter: {
  //           enabled: 'eq'
  //         }
  //       })
  //     )
  //     this.listLoading = false
  //   } catch (error) {
  //     this.listLoading = false
  //   }
  // }

  private async getBanksCount() {
    try {
      this.listLoading = true
      this.banksCount = await getBanksCount(
        getQuery({
          enabled: true,
          filter: {

          }
        })
      )
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getPlansCount() {
    try {
      this.listLoading = true
      this.plansCount = await getPlansCount(
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

  private async getUsersCount() {
    try {
      this.listLoading = true
      this.usersCount = await getUsersCount(
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

  private async getClaimsCount() {
    try {
      this.listLoading = true
      this.claimsCount = await getClaimsCount(
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
        background:#407B4C;
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
      fill:#407B4C!important;
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
