<template>
  <div class="sku-manage">
    <el-form :inline="true" :model="data.searchForm" ref="searchForm" label-width="90px">
      <el-form-item label="设备名称">
        <el-input v-model="data.searchForm.deviceName" placeholder="请输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="data.searchForm.deviceTypeId" placeholder="Select">
          <el-option
            v-for="item in data.typeData"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="submitForm">搜索</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table">
      <el-table
        :data="data.deviceData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        :border="true"
      >
        <el-table-column prop="deviceName" label="设备名称"> </el-table-column>
        <el-table-column prop="deviceTypeName" label="设备类型"> </el-table-column>
        <el-table-column prop="deviceSupplier" label="设备供应商"> </el-table-column>
        <el-table-column prop="deviceDescribe" label="设备描述"> </el-table-column>
        <el-table-column prop="deviceNum" label="库存"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" plain @click="updateSku(scope.row.deviceId)"
              >修改库存</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :currentPage="data.searchForm.page"
        :page-size="data.searchForm.size"
        :page-sizes="[5, 10, 15, 20]"
        layout="sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { deviceForm } from '@/interface/deviceManage';
import { TypeForm } from '@/interface/type';
import { RsNormal, RsDeviceList, RsTypeList } from '@/interface/response';
import { deviceList, deviceSku } from '@/api/device';
import { typeList } from '@/api/type';
import Message from '@/util/message';
import { ElMessageBox } from 'element-plus';

export default defineComponent({
  setup() {
    const data = reactive({
      deviceData: [],
      searchForm: {
        deviceName: '',
        deviceTypeId: '',
        size: 10,
        page: 1
      },
      typeData: new Array<TypeForm>()
    });
    // 搜索模块

    function submitForm() {
      queryList();
    }
    function resetForm() {
      data.searchForm = {
        deviceTypeId: '',
        deviceName: '',
        size: 10,
        page: 1
      };
      queryList();
    }

    // 新增模块
    const dialogFormVisible = ref(false);
    // 列表模块
    const total = ref(0);
    async function queryList() {
      const params = data.searchForm;
      const res: RsDeviceList = await deviceList(params);
      if (res.code === 200 && res.data) {
        total.value = res.data.total;
        (data.deviceData as Array<deviceForm>) = res.data.deviceList;
      } else {
        Message('error', res.message);
      }
    }
    function handleSizeChange(val: number) {
      data.searchForm.size = val;
      queryList();
    }
    function handleCurrentChange(val: number) {
      data.searchForm.page = val;
      queryList();
    }
    function updateSku(deviceId: string) {
      ElMessageBox.prompt('请填写修改库存数量', '库存信息', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^[0-9]+$/,
        inputErrorMessage: '库存数量不为空且大于等于0'
      })
        .then(async ({ value }) => {
          const params = {
            deviceId,
            deviceNum: parseInt(value)
          };
          const res: RsNormal = await deviceSku(params);
          if (res.code === 200) {
            Message('success', '修改成功');
          } else {
            Message('error', res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function queryTypeList() {
      const res: RsTypeList = await typeList();
      if (res.code === 200 && res.data) {
        (data.typeData as Array<TypeForm>) = res.data.typeList;
      } else {
        Message('error', res.message);
      }
    }

    onMounted(function () {
      queryList();
      queryTypeList();
    });
    return {
      data,
      submitForm,
      resetForm,
      dialogFormVisible,
      updateSku,
      total,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style lang="scss" scoped>
.sku-manage {
  > .el-form {
    background-color: #ffffff;
    padding: 20px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    overflow: hidden;
    .el-form-item {
      float: left;
      margin-bottom: 10px;
    }
    .form-button {
      float: right;
      display: flex;
    }
  }
  .table {
    background-color: #ffffff;
    padding: 20px;
  }
  .pagination {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
