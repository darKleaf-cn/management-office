<template>
  <div class="home">
    <el-row>
      <el-col
        ><el-radio-group v-model="data.section" size="large">
          <el-radio-button label="1">近一周内</el-radio-button>
          <el-radio-button label="2">近半个月内</el-radio-button>
          <el-radio-button label="3">近一个月内</el-radio-button>
        </el-radio-group></el-col
      >
      <el-col>
        <span>总共申领{{ all }}件设备</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="pie" ref="pie"></div></el-col>
      <el-col :span="12"><div class="bar" ref="bar"></div></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue';
import { applyStatistics } from '@/api/apply';
import { RsApplyStatistics } from '@/interface/response';
import { ApplyStatisticsForm } from '@/interface/applyManage';
import Message from '@/util/message';
import * as echarts from 'echarts';
export default defineComponent({
  setup() {
    const pie = ref();
    const bar = ref();
    const data = reactive({
      typeList: new Array<ApplyStatisticsForm>(),
      section: 1
    });
    let chartPie: echarts.ECharts;
    let chartBar: echarts.ECharts;

    async function queryList() {
      const params = {
        section: data.section
      };
      const res: RsApplyStatistics = await applyStatistics(params);
      if (res.code === 200 && res.data) {
        data.typeList = res.data.typeList;
        updateEcharts();
      } else {
        Message('error', res.message);
      }
    }
    onMounted(() => {
      queryList();
    });
    watch(
      () => data.section,
      () => {
        queryList();
      }
    );

    function updateEcharts() {
      if (!chartBar || !chartPie) {
        chartPie = echarts.init(pie.value);
        chartBar = echarts.init(bar.value);
      }
      chartPie.setOption({
        xAxis: {
          data: data.typeList.map((item) => item.name)
        },
        yAxis: {},
        series: [
          {
            name: '数量',
            type: 'bar',
            data: data.typeList.map((item) => item.value)
          }
        ]
      });
      chartBar.setOption({
        title: {
          text: '近期申领数量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: data.typeList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    }

    const all = computed(() => {
      let num = 0;
      for (const item of data.typeList) {
        num += item.value;
      }
      return num;
    });
    return {
      pie,
      bar,
      data,
      all
    };
  }
});
</script>

<style lang="scss">
.home {
  .el-row {
    margin-bottom: 20px;
    justify-content: space-between;

    .el-col {
      min-height: 60px;
      padding: 10px;
      background-color: #ffffff;
      max-width: 50%;
      display: flex;
      justify-content: left;
      .pie,
      .bar {
        height: 500px;
        width: 100%;
      }
    }
  }
}
</style>
