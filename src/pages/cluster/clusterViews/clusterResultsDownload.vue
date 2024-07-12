<template>
  <el-table :data="trainingTaskData" stripe style="width: 100%">
    <el-table-column prop="taskID" label="ID" width="100" />
    <el-table-column prop="timestamp" label="timestamp" width="200" />
    <el-table-column label="download">
      <el-select
      v-model="value"
      placeholder="Select"
      size="large"
      style="width: 180px"
    >
      <el-option
        v-for="item in fileTypes"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
      <!-- <select id="download_file_type" @change="select_file_type">
                <option value="" selected hidden>choose one</option>
                <option value="DataSet">Data set file</option>
                <option value="Forecast_category">Forecast category label file</option>
                <option value="Embedding">embedding file</option>
                <option value="Adata">Predict the obtained adata file</option>
            </select> -->
      </el-table-column>
    <el-table-column label="download"><el-icon @click="downloadResult"><Download /></el-icon></el-table-column>
    <el-icon><Download /></el-icon>
  </el-table>
</template>
<script lang="ts" setup>
import { ref,reactive } from 'vue'
// import axios from '../../../http'
import { ElMessage, ElMessageBox,ElNotification } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { Form, Link } from '@icon-park/react'

const value = ref('')
const trainingTaskData = [
  {
    taskID:1,
    timestamp :'1719572094.6682544',
    ID: '1',
  },
]

const fileTypes =  [
  {
    value: 'DataSet',
    label: 'Data set file',
  },
  {
    value: 'Forecast_category',
    label: 'Forecast category label file',
  },
  {
    value: 'Embedding',
    label: 'embedding file',
  },
  {
    value: 'Adata',
    label: 'Predict the obtained adata file',
  },
]
// import { ref } from 'vue'
// import { ElMessage, ElMessageBox } from 'element-plus'

// import type { UploadProps, UploadUserFile } from 'element-plus'

// const fileList = ref<UploadUserFile[]>([
// ])

// const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
//   console.log(file, uploadFiles)
// }

// const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
//   console.log(uploadFile)
// }

// const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
//   ElMessage.warning(
//     `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
//     } totally`
//   )
// }

// const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
//   return ElMessageBox.confirm(
//     `Cancel the transfer of ${uploadFile.name} ?`
//   ).then(
//     () => true,
//     () => false
//   )
// }
const downloadResult = async()=>{
  console.log('onsubmit方法');
  //数据交互
  let formData = new FormData();
  // console.log(form.file.name);
  
  // axios
  // let res = await axios.post('http://192.168.142.128:32768/download/data_path_pred_spagcn.csv');
  //http://localhost:32769/data_input
  // console.log(res);
  ElMessage.success('successfully upload')
}
</script>
<style scoped>

</style>