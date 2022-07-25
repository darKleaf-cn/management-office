<template>
  <div class="purchase-manage">
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
    <div class="operation">
      <el-button type="primary" icon="Plus" @click="dialogFormVisible = true">新增采购</el-button>
    </div>
    <div class="table">
      <el-table
        :data="data.purchaseData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        :border="true"
      >
        <el-table-column prop="purchaseDeviceName" label="采购设备"> </el-table-column>
        <el-table-column prop="purchaseDeviceTypeName" label="采购设备类型"> </el-table-column>
        <el-table-column prop="purchaseDeviceDescribe" label="采购设备描述"> </el-table-column>
        <el-table-column prop="purchaseDeviceSupplier" label="采购设备供应商"> </el-table-column>
        <el-table-column prop="purchaseDeviceNum" label="采购设备数量"> </el-table-column>
        <el-table-column prop="purchaseState" label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.purchaseState === 1">审核中</el-tag>
            <el-tag v-else-if="scope.row.purchaseState === 2" type="success">审核成功</el-tag>
            <el-tag v-else type="danger">审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button type="danger" size="small" plain @click="delete1(scope.row.purchaseId)"
              >删除</el-button
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
    <el-dialog title="采购信息" v-model="dialogFormVisible" :before-close="cancel">
      <el-form :model="data.purchaseForm" label-width="150px" :rules="rules" ref="form">
        <el-form-item label="采购设备" prop="purchaseDeviceName">
          <el-input v-model="data.purchaseForm.purchaseDeviceName"></el-input>
        </el-form-item>
        <el-form-item label="采购设备类型" prop="purchaseDeviceTypeId">
          <el-select v-model="data.purchaseForm.purchaseDeviceTypeId" placeholder="Select">
            <el-option
              v-for="item in data.typeData"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="采购设备供应商" prop="purchaseDeviceSupplier">
          <el-input v-model="data.purchaseForm.purchaseDeviceSupplier"></el-input>
        </el-form-item>
        <el-form-item label="采购设备描述" prop="purchaseDeviceDescribe">
          <el-input v-model="data.purchaseForm.purchaseDeviceDescribe"></el-input>
        </el-form-item>
        <el-form-item label="采购设备数量" prop="purchaseDeviceNum">
          <el-input v-model="data.purchaseForm.purchaseDeviceNum" type="number" min="1"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="add">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { TypeForm } from '@/interface/type';
import { RsNormal, RsTypeList, RsPurchaseList } from '@/interface/response';
import { purchaseList, purchaseAdd, purchaseDelete } from '@/api/purchase';
import { typeList } from '@/api/type';
import Message from '@/util/message';
import { ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { PurchaseForm } from '@/interface/purchase';

export default defineComponent({
  setup() {
    const data = reactive({
      purchaseData: [],
      searchForm: {
        deviceName: '',
        deviceTypeId: '',
        size: 10,
        page: 1
      },
      purchaseForm: {
        purchaseDeviceName: '',
        purchaseDeviceTypeId: '',
        purchaseDeviceDescribe: '',
        purchaseDeviceSupplier: '',
        purchaseDeviceNum: 1
      },
      typeData: new Array<TypeForm>()
    });
    // 搜索模块

    function submitForm() {
      queryList();
    }
    function resetForm() {
      data.searchForm = {
        deviceName: '',
        deviceTypeId: '',
        size: 10,
        page: 1
      };
      queryList();
    }

    // 新增模块
    const dialogFormVisible = ref(false);
    const form = ref<FormInstance>();
    const rules = reactive<FormRules>({
      purchaseDeviceName: [{ required: true, message: '请输入采购设备', trigger: 'blur' }],
      purchaseDeviceTypeId: [{ required: true, message: '请选择采购设备类型', trigger: 'blur' }],
      purchaseDeviceDescribe: [{ required: true, message: '请输入设备描述', trigger: 'blur' }],
      purchaseDeviceSupplier: [{ required: true, message: '请输入设备供应商', trigger: 'blur' }],
      purchaseDeviceNum: [{ required: true, message: '请输入采购设备数量', trigger: 'blur' }]
    });
    // 列表模块
    const total = ref(0);
    async function queryList() {
      const params = data.searchForm;
      const res: RsPurchaseList = await purchaseList(params);
      if (res.code === 200 && res.data) {
        total.value = res.data.total;
        (data.purchaseData as Array<PurchaseForm>) = res.data.purchaseList;
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
    async function delete1(purchaseId: string) {
      ElMessageBox.confirm('此操作将删除该采购记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const params = {
            purchaseId
          };
          const res: RsNormal = await purchaseDelete(params);
          if (res.code === 200) {
            Message('success', '删除成功');
          } else {
            Message('error', res.message);
          }
          queryList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function cancel() {
      data.purchaseForm = {
        purchaseDeviceName: '',
        purchaseDeviceTypeId: '',
        purchaseDeviceDescribe: '',
        purchaseDeviceSupplier: '',
        purchaseDeviceNum: 1
      };
      dialogFormVisible.value = false;
      queryList();
    }
    async function add() {
      if (form.value) {
        await form.value.validate(async (valid) => {
          if (valid) {
            const params = { ...data.purchaseForm };

            const res: RsNormal = await purchaseAdd(params);
            if (res.code === 200) {
              Message('success', '添加成功');
            } else {
              Message('error', res.message);
            }
            dialogFormVisible.value = false;
            data.purchaseForm = {
              purchaseDeviceName: '',
              purchaseDeviceTypeId: '',
              purchaseDeviceDescribe: '',
              purchaseDeviceSupplier: '',
              purchaseDeviceNum: 1
            };
            queryList();
          }
        });
      }
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
      delete1,
      total,
      handleSizeChange,
      handleCurrentChange,
      queryList,
      cancel,
      form,
      rules,
      add
    };
  }
});
</script>

<style lang="scss" scoped>
.purchase-manage {
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
  .operation {
    background-color: #ffffff;
    padding: 20px;
    display: flex;
    .el-button-group {
      margin-right: 20px;
    }
  }
  .table {
    background-color: #ffffff;
    padding: 0 20px 20px 20px;
  }
  .pagination {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
