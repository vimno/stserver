<template>
  <div id="fileUploadCard">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>File Upload</span>
        </div>
      </template>
        <el-form :model="form" label-width="240px">
          <el-form-item label="Data File Upload">
            <el-upload
              v-model:file-list="formDataFile" 
              class="upload-Data"
              :http-request="uploadDataFile"
              :limit="2"
              :on-exceed="handleDataUploadExceed"
              :before-upload="beforeDataFileUpload"
              :on-remove="uploadDataRemove"
              accept=".h5ad"
            >
              <el-button type="primary">Click to upload</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  .h5ad files with a size less than 10MB.
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="Label File Upload">
            <el-upload
              v-model:file-list="formLabelFile " 
              class="upload-Label"
              :http-request="uploadLabelFile"
              :limit="2"
              :on-exceed="handleLabelUploadExceed"
              :before-upload="beforeLabelFileUpload"
              :on-remove="uploadLabelRemove"
              id="LabelUploadFile"
            >
              <el-button type="primary">Click to upload</el-button>
              <template #tip>
                <div class="el-upload__tip">
                .txt/.csv files with a size less than 10MB.
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">submit</el-button>
          </el-form-item>
        </el-form>
    
    </el-card>
    <div id="help">
      <div> <img src="../../assets/help.png" alt=""></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref,reactive } from 'vue'
import axios from '../../http'
import { ElMessage, ElMessageBox,ElNotification } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { Form, Link } from '@icon-park/react'
import App from '../../App.vue'
const form = reactive({
  name:'',
  data_file:'',
  label_file:'',
})
let isDataFileCorrent = true
let isLabelFileCorrent = true
const formDataFile= ref([])
const formLabelFile = ref([])
const data:any = ref([{
  name: '',
  data_file: '',
}])
const label:any=ref([{
  name: '',
  label_file: ''
}])
//data文件自定义上传
const uploadDataFile = ( v ) => {
  // console.log(v);
  form.data_file = v.file
}
//Label文件自定义上传
const uploadLabelFile = ( v ) => {
  form.label_file = v.file

}

const handleDataUploadExceed = () => {
  ElMessage.warning(
    'The maximum number of data files has been exceeded.'
  )
}

//处理Label文件上传数量溢出
const handleLabelUploadExceed = () => {
  ElMessage.warning(
    'The maximum number of label files has been exceeded.'
  )
}

// 上传data文件前的钩子，data文件的格式，大小的校验
//类型校验，data文件要求为h5ad格式
const beforeDataFileUpload = (file)=>{
  //获取data文件后缀名
  var suffix = file.name.substring(file.name.lastIndexOf("."));
  //记录data文件格式是否正确
  const isH5ad = suffix === '.h5ad'
  //记录data文件大小是否符合要求,单data文件限制在10mb
  const isLimit1000M = file.size/1024/1024 < 10
  //大小校验
  if(!isH5ad){
    ElMessage.warning('The file format is incorrect. Please upload the h5ad file.')
    console.log('The data file format is wrong.');
  } else{
    console.log('The data file format is correct.');
  }
  //格式校验
  if(!isLimit1000M){
    ElMessage.warning('The size of the uploaded data file cannot exceed 10mb.')
    console.log('The size of the uploaded file is incorrect.');
  } else{
    console.log('The size of the uploaded file is correct.');
  }
  isDataFileCorrent = isH5ad && isLimit1000M
  return isH5ad && isLimit1000M
}

// 上传label文件前的钩子，label文件的格式，大小的校验
//类型校验，label文件要求为.csv或者.txt格式
const beforeLabelFileUpload = (file)=>{
  //获取label文件后缀名
  var suffix = file.name.substring(file.name.lastIndexOf("."));
  //记录label文件格式是否正确
  const isTxt = suffix === '.txt'
  const isCsv = suffix === '.csv'
  //记录label文件大小是否符合要求,单label文件限制在10mb
  const isLimit10M = file.size/1024/1024 < 10
  //大小校验
  if(!(isTxt||isCsv)){
    ElMessage.warning('The label file format is incorrect. Please upload the .txt/.csv file.')
    console.log('The label file format is wrong.');
    
  } else{
    console.log('The label file format is correct.');
  }
  //格式校验
  if(!isLimit10M){
    ElMessage.warning('The size of the uploaded label data file cannot exceed 10mb.')
    console.log('The size of the uploaded label file is incorrect.');
  } else{
    console.log('The size of the uploaded label file is correct.');
  }
  isLabelFileCorrent = (isTxt||isCsv) && isLimit10M
  return (isTxt||isCsv) && isLimit10M
}

//data文件上传移除钩子
const uploadDataRemove = ()=>{
  if(isDataFileCorrent) {
    alert('真的要移除吗？')
    //
  }
  isDataFileCorrent = !isDataFileCorrent
}

//label文件上传移除钩子
const uploadLabelRemove = ()=>{
  if(isLabelFileCorrent) {
    alert('Do we really have to remove it?')
    //弹窗：真的要移除吗？
  }
  isLabelFileCorrent = !isLabelFileCorrent
}
const onSubmit = async()=>{
  console.log('onsubmit方法');
  //数据交互
  let formData = new FormData();
  // console.log(form.file.name);
  
  formData.append('data_file',form.data_file)
  formData.append('label_file',form.label_file)
  console.log(form.label_file);
  console.log(form.data_file);
  // axios
  let res = await axios.post('http://192.168.142.128:32768/data_input',formData);
  //http://localhost:32769/data_input
  console.log(res);
  ElMessage.success('successfully upload')
}
const ontry = async()=>{
  console.log('ontry方法');
  //数据交互
  // axios
  let res = await axios.get('http://192.168.142.128:32768/single');
  //http://localhost:32769/data_input
  console.log(res);
  console.log('ontry方法结束');
}
</script>
<style scoped>
div#uploadCard{
  display: flex;
  background-color:#FFFFFF;
}
div#upload{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:#010C3A;
  width: 50vw;
  height: 800px;
}
div#help{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:#010C3A;
  width: 50vw;
  height: 800px;
}
Span {
  color: #010C3A;
  margin: 10px 20px;
  word-spacing: 6px;
  font-weight: bold;
}

img.imgButton {
  width: 30px;
  height: 30px;
  display: inline-block;
  margin: 10px 20px;
}
div.card{
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  width: 400px;
  height: 600px;
  border-radius: 8px;

}
.uploadButton {
  background-color: #FFFFFF;
  /* Green */
  border: none;
  color: #010C3A;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  border-radius: 8px;
  border: 4px solid #010C3A;
  -webkit-transition-duration: 0.4s;
  /* Safari */
  transition-duration: 0.4s;
  margin: 10px 20px;
  padding: 15px;
}

.uploadButton:hover {
  background-color: #010C3A;
  /* Green */
  border: 4px solid #010C3A;
  color: white;
}
#fileUploadCard{
  background-color: #010C3A;
  /* Green */
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: center;
}
</style>