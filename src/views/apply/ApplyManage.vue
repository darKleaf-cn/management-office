<template>
  <div class="apply-manage">
    <el-form :inline="true" :model="data.searchForm" ref="searchForm" label-width="90px">
      <el-form-item label="申领人">
        <el-input v-model="data.searchForm.applyPeople" placeholder="请输入申领人"></el-input>
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="submitForm">搜索</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="operation">
      <el-button type="primary" icon="Plus" @click="dialogFormVisible = true">新增申领</el-button>
    </div>
    <div class="table">
      <el-table
        :data="data.applyData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        :border="true"
      >
        <el-table-column prop="applyId" label="申领记录id"></el-table-column>
        <el-table-column prop="applyPeople" label="申领人"> </el-table-column>
        <el-table-column prop="applyPhone" label="申领人电话"> </el-table-column>
        <el-table-column prop="applyDeviceName" label="申领物品"> </el-table-column>
        <el-table-column prop="applyDeviceNum" label="申领物品数量"> </el-table-column>
        <el-table-column prop="applyReason" label="申领理由"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" plain @click="update1(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="small" plain @click="delete1(scope.row.applyId)"
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
    <el-dialog title="申领信息" v-model="dialogFormVisible" :before-close="cancel">
      <el-form :model="data.applyForm" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="申领人" prop="applyPeople">
          <el-input v-model="data.applyForm.applyPeople"></el-input>
        </el-form-item>
        <el-form-item label="申领人电话" prop="applyPhone">
          <el-input
            v-model="data.applyForm.applyPhone"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="申领物品" prop="applyDeviceId">
          <el-input v-model="data.applyForm.applyDeviceId"></el-input>
        </el-form-item>
        <el-form-item label="申领物品数量" prop="applyDeviceNum">
          <el-input v-model="data.applyForm.applyDeviceNum" type="number" min="1"></el-input>
        </el-form-item>
        <el-form-item label="申领理由" prop="applyReason">
          <el-input v-model="data.applyForm.applyReason"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="check">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { ApplyForm } from '@/interface/applyManage,';
import { RsNormal, RsApplyList } from '@/interface/response';
import { applyList, applyDelete, applyAdd, applyUpdate } from '@/api/apply';
import Message from '@/util/message';
import { ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

export default defineComponent({
  setup() {
    const data = reactive({
      applyData: [],
      searchForm: {
        applyPeople: '',
        size: 10,
        page: 1
      },
      applyForm: {
        applyId: '',
        applyPeople: '',
        applyPhone: '',
        applyDeviceId: '',
        applyDeviceNum: 1,
        applyReason: ''
      }
    });
    // 搜索模块

    function submitForm() {
      queryList();
    }
    function resetForm() {
      data.searchForm = {
        applyPeople: '',
        size: 10,
        page: 1
      };
      queryList();
    }

    // 新增模块
    const dialogFormVisible = ref(false);
    const form = ref<FormInstance>();
    const rules = reactive<FormRules>({
      applyPeople: [{ required: true, message: '请输入申领人', trigger: 'blur' }],
      applyPhone: [{ required: true, message: '请输入申领人电话', trigger: 'blur' }],
      applyDeviceId: [{ required: true, message: '请选择申领物品', trigger: 'blur' }],
      applyReason: [{ required: true, message: '请输入申领理由', trigger: 'blur' }]
    });
    // 列表模块
    const total = ref(0);
    async function queryList() {
      const params = data.searchForm;
      const res: RsApplyList = await applyList(params);
      if (res.code === 200 && res.data) {
        total.value = res.data.total;
        (data.applyData as Array<ApplyForm>) = res.data.applyList;
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
    function update1(row: ApplyForm) {
      data.applyForm = row;
      dialogFormVisible.value = true;
    }
    async function delete1(applyId: string) {
      ElMessageBox.confirm('此操作将删除该申领记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const params = {
            applyId
          };
          const res: RsNormal = await applyDelete(params);
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
    function check() {
      if (data.applyForm.applyId) {
        update();
      } else {
        add();
      }
    }
    function cancel() {
      data.applyForm = {
        applyId: '',
        applyPeople: '',
        applyPhone: '',
        applyDeviceId: '',
        applyDeviceNum: 1,
        applyReason: ''
      };
      dialogFormVisible.value = false;
      queryList();
    }
    async function update() {
      if (form.value) {
        await form.value.validate(async (valid) => {
          if (valid) {
            const params = { ...data.applyForm };

            const res: RsNormal = await applyUpdate(params);
            if (res.code === 200) {
              Message('success', '修改成功');
            } else {
              Message('error', res.message);
            }
            dialogFormVisible.value = false;
            data.applyForm = {
              applyId: '',
              applyPeople: '',
              applyPhone: '',
              applyDeviceId: '',
              applyDeviceNum: 1,
              applyReason: ''
            };
            await queryList();
          }
        });
      }
    }
    async function add() {
      if (form.value) {
        await form.value.validate(async (valid) => {
          if (valid) {
            const params = { ...data.applyForm };

            const res: RsNormal = await applyAdd(params);
            if (res.code === 200) {
              Message('success', '添加成功');
            } else {
              Message('error', res.message);
            }
            dialogFormVisible.value = false;
            data.applyForm = {
              applyId: '',
              applyPeople: '',
              applyPhone: '',
              applyDeviceId: '',
              applyDeviceNum: 1,
              applyReason: ''
            };
            queryList();
          }
        });
      }
    }

    onMounted(function () {
      queryList();
    });
    return {
      data,
      submitForm,
      resetForm,
      dialogFormVisible,
      update1,
      delete1,
      total,
      handleSizeChange,
      handleCurrentChange,
      queryList,
      check,
      cancel,
      form,
      rules
    };
  }
});
</script>

<style lang="scss" scoped>
.apply-manage {
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
