<template>
  <div class="purchase-manage">
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
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="success" size="small" plain @click="auditSuccess(scope.row.applyId)"
              >审核通过</el-button
            >
            <el-button type="danger" size="small" plain @click="auditFail(scope.row.applyId)"
              >审核不通过</el-button
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
import { RsNormal, RsPurchaseList } from '@/interface/response';
import { auditPurchase, auditPurchaseList } from '@/api/audit';
import Message from '@/util/message';
import { ElMessageBox } from 'element-plus';
import { PurchaseForm } from '@/interface/purchase';

export default defineComponent({
  setup() {
    const data = reactive({
      purchaseData: [],
      searchForm: {
        size: 10,
        page: 1
      }
    });

    // 列表模块
    const total = ref(0);
    async function queryList() {
      const params = data.searchForm;
      const res: RsPurchaseList = await auditPurchaseList(params);
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

    async function auditSuccess(purchaseId: string) {
      ElMessageBox.confirm('是否确认审核通过?', '审核信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const params = {
            purchaseId,
            flag: 1
          };
          const res: RsNormal = await auditPurchase(params);
          if (res.code === 200) {
            Message('success', '审核成功');
          } else {
            Message('error', res.message);
          }
          queryList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    async function auditFail(purchaseId: string) {
      ElMessageBox.prompt('请填写审核不通过原因', '审核信息', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /.+/,
        inputErrorMessage: '原因不能为空'
      })
        .then(async ({ value }) => {
          const params = {
            purchaseId,
            flag: 0,
            reason: value
          };
          const res: RsNormal = await auditPurchase(params);
          if (res.code === 200) {
            Message('success', '审核成功');
          } else {
            Message('error', res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMounted(function () {
      queryList();
    });
    return {
      data,
      total,
      handleSizeChange,
      handleCurrentChange,
      auditSuccess,
      auditFail
    };
  }
});
</script>

<style lang="scss" scoped>
.purchase-manage {
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
