<template>
  <div class="home">
    <el-row>
      <span>开始时间：</span>
      <el-date-picker
        class="startTime"
        v-model="data.startTime"
        type="datetime"
        placeholder="请选择开始时间" />
      <span>结束时间：</span>
      <el-date-picker
        class="endTime"
        v-model="data.endTime"
        type="datetime"
        placeholder="请选择结束时间"
    /></el-row>
    <el-row>
      <el-col :span="12"><div class="pie" ref="pie"></div></el-col>
      <el-col :span="12"><div class="bar" ref="bar"></div></el-col>
    </el-row>
    <el-row>
      <div class="list"></div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
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
      startTime: new Date().toString(),
      endTime: new Date().toString()
    });
    async function queryList() {
      const params = {
        startTime: data.startTime,
        endTime: data.endTime
      };
      const res: RsApplyStatistics = await applyStatistics(params);
      if (res.code === 200 && res.data) {
        data.typeList = res.data.typeList;
      } else {
        Message('error', res.message);
      }
    }
    onMounted(async function () {
      const chartPie = echarts.init(pie.value);
      const chartBar = echarts.init(bar.value);
      await queryList();
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
          text: 'Referer of a Website',
          subtext: 'Fake Data',
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
    });
    return {
      pie,
      bar,
      data
    };
  }
});
</script>

<style lang="scss">
.home {
  .el-row {
    background-color: #ffffff;
    margin-bottom: 20px;
    align-items: center;
    padding: 20px;
    > span,
    .startTime,
    .endTime {
      margin-right: 20px;
    }
    .pie,
    .bar {
      height: 400px;
    }
  }
}
</style>
