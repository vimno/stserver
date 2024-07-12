<template>
  <div class="common-layout">
    <el-form :model="form" label-width="auto" style="max-width: 1200px" class="parameterSetting">

      <!-- methods选择，form.single_method绑定当前选择值 -->
      <el-form-item label="Methods：">
        <el-select
          v-model="form.single_method"
          placeholder="please select a training method."
          @change="methodChange"
        >
          <el-option
            v-for="item in single_methods"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- method 参数 -->
      <el-form-item label="Param:">
        <div style="color: black;">{{para_list}}</div>
        
      </el-form-item>
      <!-- 数据集选择，form.dataSets绑定当前选择值 -->
      <el-form-item label="DataSet：">
        <el-select
          v-model="form.dataset"
          placeholder="please select a dataset."
        >
          <el-option
            v-for="item in datasets"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 聚类方法选择 -->
      <el-form-item label="Cluster Method:">
        <el-select v-model="form.trainModel" placeholder="please select Cluster Method">
          <el-option
            v-for="(Cluster_Method) in clusterMethods"
            :label="Cluster_Method.name"
            :value="Cluster_Method.value" />
        </el-select>
      </el-form-item>
      <!-- 聚类数量，form.cluster_num -->
      <el-form-item label="Cluster Number:">
        <el-input-number v-model="form.cluster_num" :min="1" :max="100" />
      </el-form-item>
      <!-- 聚类评分标准 -->
      <el-form-item label="Cluster Score:">
        <el-checkbox-group v-model="score_methods" :min="2" :max="4"  @change="trainmodelchange">
          <el-checkbox label="ARI" value="ARI" />
          <el-checkbox label="AMI" value="AMI" />
          <el-checkbox label="NMI" value="NMI" />
        </el-checkbox-group>
      </el-form-item>
      
    
      
      <el-form-item>
        <button @click="process_single_slice" style="background-color: white;"><img src="../../../assets/play.png" style="
        width: 60px;
        height: 60px;
        background-color: white;" 
        alt="run"></button>
        <!-- <router-link to="/cluster-view" @click="process_single_slice"><img src="../../../assets/play.png" style="
        width: 60px;
        height: 60px;
        margin: 40px 240px;" 
        alt="run"></router-link> -->
      </el-form-item>
      <!-- <el-form-item>
        <button @click="process_single_slice">preparing</button>
      </el-form-item> -->
      <!-- Spatial Based on Pred-Label -->
      <el-form-item>
        <button @click="spatial_based_on_pred_label">Spatial Based on Pred-Label</button>
      </el-form-item>
      
      <el-form-item>
         <div id="SpatialPred" style="width: 1200px;height:800px;"></div>  
      </el-form-item>

      <!-- Spatial Based on Truth-Label -->
      <el-form-item>
        <button @click="spatial_based_on_truth_label">Spatial Based on Truth-Label</button>
      </el-form-item>
      
      <el-form-item>
         <div id="SpatialTruth" style="width: 1200px;height:800px;"></div>  
      </el-form-item>

      <!-- Embedding Umap Loc Based On Pred-Label -->
      <el-form-item>
        <button @click="embedding_umap_loc_based_on_pred_label">Embedding Umap Loc Based On Pred-Label</button>
      </el-form-item>
      
      <el-form-item>
         <div id="EmbeddingUmapPred" style="width: 1200px;height:800px;"></div>  
      </el-form-item>

      <!-- Embedding Umap Loc Based On Truth-Label -->
      <el-form-item>
        <button @click="embedding_umap_loc_based_on_truth_label">Embedding Umap Loc Based On Truth-Label</button>
      </el-form-item>
      
      <el-form-item>
         <div id="EmbeddingUmapTruth" style="width: 1200px;height:800px;"></div>  
      </el-form-item>

      <!-- Original Umap Loc Based On Pred-Label -->
      <el-form-item>
        <button @click="original_umap_loc_based_on_pred_label">Original Umap Loc Based On Pred-Label</button>
      </el-form-item>
      
      <el-form-item>
         <div id="OriginalUmapPred" style="width: 1200px;height:800px;"></div>  
      </el-form-item>

      <!-- Original Umap Loc Based On Truth-Label -->
      <el-form-item>
        <button @click="original_umap_loc_based_on_truth_label">Original Umap Loc Based On Truth-Label</button>
      </el-form-item>
      
      <el-form-item>
         <div id="OriginalUmapTruth" style="width: 1200px;height:800px;"></div>  
      </el-form-item>
      </el-form>
  </div>
   
</template>
<style scoped>
.parameter{
  position: relative;
}
.parameterSetting {
  height: 1200px;
  width: 1200px;
  position: absolute;
  left: calc(50% - 300px);
  top: calc(50% - 100px);

}
</style>
<script lang="ts" setup>
import { ref,onMounted,onUpdated,reactive} from 'vue'
import axios from 'axios';
import * as echarts from 'echarts';
import { Log } from '@icon-park/react';

// 基于准备好的dom，初始化echarts实例

const gene_exp = ref([[]]);

var ami = 0;
var ari = 0;
var nmi = 0;
let backend_message = ref(null);
let progress_bar_value = ref(0);
let progress_bar_status = ref('hidden');
let data_list = ref(null);
let para_list = ref(null);
let file = null;
let arr = new Array();
let a;

const embedding_umap_loc = ref([[]]);
const gene_id = ref([]);
const ground_truth = ref([]);
const original_umap_loc = ref([[]]);
const paga_adj_matrix = ref([[]]);
const paga_pos = ref([[]]);
const pred_label = ref([]);
const spatial = ref([[]]);
const spot_id = ref([]);
const svg = ref([[]]);
var spatial_based_on_pred_label_chart;
var spatial_based_on_truth_label_chart;
var embedding_umap_loc_based_on_pred_label_chart;
var embedding_umap_loc_based_on_truth_label_chart;
var original_umap_loc_based_on_pred_label_chart;
var original_umap_loc_based_on_truth_label_chart;
onMounted( async () => {
    
// 绘制图表
    spatial_based_on_pred_label_chart = echarts.init(document.getElementById('SpatialPred'));
    spatial_based_on_truth_label_chart = echarts.init(document.getElementById('SpatialTruth'));
    embedding_umap_loc_based_on_pred_label_chart = echarts.init(document.getElementById('EmbeddingUmapPred'));
    embedding_umap_loc_based_on_truth_label_chart = echarts.init(document.getElementById('EmbeddingUmapTruth'));
    original_umap_loc_based_on_pred_label_chart = echarts.init(document.getElementById('OriginalUmapPred'));
    original_umap_loc_based_on_truth_label_chart = echarts.init(document.getElementById('OriginalUmapTruth'));
    progress_bar_status.value = 'hidden';
});

// 单张默认训练方法
const single_methods = [
  {
    value: 'STAGATE',
    label: 'STAGATE',
  },
  {
    value: 'GraphST',
    label: 'GraphST',
  },
  {
    value: 'SEDR',
    label: 'SEDR',
  },
  {
    value: 'SpaGCN',
    label: 'SpaGCN',
  },
  {
    value: 'CCST',
    label: 'CCST',
  },
  {
    value: 'test',
    label: 'test',
  }
]

//默认数据集
const datasets = [
  {
    value: '1',
    label: 'mouse_somatosensory_cortex.h5ad',
  },
]
// 聚类方法选项
const clusterMethods = [
  {
    id: '1',
    name:'K-Means',
    value: 'kmeans',
  },{
    id: '2',
    name:'Louvain',
    value: 'louvain',
  },{
    id: '3',
    name:'mclust-EEE',
    value: 'mclust',
  },
]

//表单数据
const form = reactive({
  singleOrMultiple: '',
  single_method: '',
  dataset:'',
  trainModel: '',
  score_method:'',
  cluster_num: 1,
  param: ''
})

const onSubmit = () => {
  console.log('submit!')
}
const trainmodelchange = () => {
  for(let item of score_methods.value.slice(1)) {
    arr.push(item)
  }
}
const datatesting = () => {
  console.log(a.toString());
  
}

const spatial_based_on_pred_label = () => {
  
  let arr = new Array(spot_id.value.length);
  let pred = 0;
  let truth = 0;
  for (let i = 0; i < spot_id.value.length; i++) {
    arr[i] = new Array(9);
  }
  for (let i = 0; i < spot_id.value.length; i++) {
    if( pred === 0) {
      pred = parseInt(pred_label.value[i]);
    } else if( pred < parseInt(pred_label.value[i])) {
      pred = parseInt(pred_label.value[i]);
    }
    if( truth === 0) {
      truth = parseInt(ground_truth.value[i]);
    } else if( truth < parseInt(ground_truth.value[i])) {
      truth = parseInt(ground_truth.value[i]);
    }
    arr[i][0] = spot_id.value[i];
    arr[i][1] = ground_truth.value[i];
    arr[i][2] = pred_label.value[i];
    arr[i][3] = spatial.value[i][0];
    arr[i][4] = spatial.value[i][1];
    arr[i][5] = embedding_umap_loc.value[i][0];
    arr[i][6] = embedding_umap_loc.value[i][1];
    arr[i][7] = original_umap_loc.value[i][0];
    arr[i][8] = original_umap_loc.value[i][1];
  }
  pred = pred + 1;
  console.log(arr);
  console.log(truth,pred);

  let arr_spatial = new Array(pred);
  for (let i = 0; i < pred; i++) {
    arr_spatial[i] = [];
  }

  for (let i = 0; i < spot_id.value.length; i++) {
    let flag = parseInt(arr[i][2]);
    arr_spatial[flag].push([arr[i][3],arr[i][4],arr[i][0]]);
  }

  var Option = {
    legend: {},
    xAxis: {},
    yAxis: {},
    title: {
        text: 'Spatial Based on Pred-Label',
        subtext: 'Data from: mouse_somatosensory_cortex.h5ad'
    },
    tooltip: {
      position: 'top',
      // trigger: 'axis',
      showDelay: 0,
      formatter: function (params) {
        return 'spot_id : ' + params.value[2] + '<br/>' 
        + 'x : ' + params.value[0] + '<br/>' 
        + 'y : ' + params.value[1];
    },
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      }
    },
  };
  Option['series'] = [];
  for(let i = 0; i < pred; i++) {
    Option['series'].push({'name': 'cluser'+ (i+1),  
    'type': 'scatter','data': arr_spatial[i],'colorBy': 'series','symbolSize': 3},)
  }
  Option && spatial_based_on_pred_label_chart.setOption(Option);
//       testChart.setOption({
//       xAxis: {},
//       yAxis: {},
//       series: [
//         {
//       type: 'scatter',
      
//       data: spatial.value,
//       symbolSize: 3,
      
//     }
//   ]
// });
      
}
//Spatial Based on Truth-Label
const spatial_based_on_truth_label = () => {
  let arr = new Array(spot_id.value.length);
  let pred = 0;
  let truth = 0;
  for (let i = 0; i < spot_id.value.length; i++) {
    arr[i] = new Array(9);
  }
  for (let i = 0; i < spot_id.value.length; i++) {
    if( pred === 0) {
      pred = parseInt(pred_label.value[i]);
    } else if( pred < parseInt(pred_label.value[i])) {
      pred = parseInt(pred_label.value[i]);
    }
    if( truth === 0) {
      truth = parseInt(ground_truth.value[i]);
    } else if( truth < parseInt(ground_truth.value[i])) {
      truth = parseInt(ground_truth.value[i]);
    }
    arr[i][0] = spot_id.value[i];
    arr[i][1] = ground_truth.value[i];
    arr[i][2] = pred_label.value[i];
    arr[i][3] = spatial.value[i][0];
    arr[i][4] = spatial.value[i][1];
    arr[i][5] = embedding_umap_loc.value[i][0];
    arr[i][6] = embedding_umap_loc.value[i][1];
    arr[i][7] = original_umap_loc.value[i][0];
    arr[i][8] = original_umap_loc.value[i][1];
  }
  pred = pred + 1;
  console.log(arr);
  console.log(truth,pred);
  //修改点
  let arr_spatial = new Array(truth);
  for (let i = 0; i < truth; i++) {
    arr_spatial[i] = [];
  }
  //
  for (let i = 0; i < spot_id.value.length; i++) {
    let flag = parseInt(arr[i][1]) - 1;
    arr_spatial[flag].push([arr[i][3],arr[i][4],arr[i][0]]);
  }

  var Option = {
    legend: {},
    xAxis: {},
    yAxis: {},
    title: {
        text: 'Spatial Based on Truth-Label',
        subtext: 'Data from: mouse_somatosensory_cortex.h5ad'
    },
    tooltip: {
      position: 'top',
      // trigger: 'axis',
      showDelay: 0,
      formatter: function (params) {
        return 'spot_id : ' + params.value[2] + '<br/>' 
        + 'x : ' + params.value[0] + '<br/>' 
        + 'y : ' + params.value[1];
    },
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      }
    },
  };
  Option['series'] = [];
  for(let i = 0; i < truth; i++) {
    Option['series'].push({'name': 'cluser'+ (i + 1),
      'type': 'scatter','data': arr_spatial[i],
      'colorBy': 'series','symbolSize': 3},)
  }
  Option && spatial_based_on_truth_label_chart.setOption(Option);   
}

//Embedding Umap Loc Based On Pred-Label
const embedding_umap_loc_based_on_pred_label = () => {
  let arr = new Array(spot_id.value.length);
  let pred = 0;
  let truth = 0;
  for (let i = 0; i < spot_id.value.length; i++) {
    arr[i] = new Array(9);
  }
  for (let i = 0; i < spot_id.value.length; i++) {
    if( pred === 0) {
      pred = parseInt(pred_label.value[i]);
    } else if( pred < parseInt(pred_label.value[i])) {
      pred = parseInt(pred_label.value[i]);
    }
    if( truth === 0) {
      truth = parseInt(ground_truth.value[i]);
    } else if( truth < parseInt(ground_truth.value[i])) {
      truth = parseInt(ground_truth.value[i]);
    }
    arr[i][0] = spot_id.value[i];
    arr[i][1] = ground_truth.value[i];
    arr[i][2] = pred_label.value[i];
    arr[i][3] = spatial.value[i][0];
    arr[i][4] = spatial.value[i][1];
    arr[i][5] = embedding_umap_loc.value[i][0];
    arr[i][6] = embedding_umap_loc.value[i][1];
    arr[i][7] = original_umap_loc.value[i][0];
    arr[i][8] = original_umap_loc.value[i][1];
  }
  pred = pred + 1;
  console.log(arr);
  console.log(truth,pred);
  //修改点
  let arr_spatial = new Array(pred);
  for (let i = 0; i < pred; i++) {
    arr_spatial[i] = [];
  }
  //
  for (let i = 0; i < spot_id.value.length; i++) {
    let flag = parseInt(arr[i][2]);
    arr_spatial[flag].push([arr[i][5],arr[i][6],arr[i][0]]);
  }

  var Option = {
    legend: {},
    xAxis: {},
    yAxis: {},
    title: {
        text: 'Embedding Umap Loc Based On Pred-Label',
        subtext: 'Data from: mouse_somatosensory_cortex.h5ad'
    },
    tooltip: {
      position: 'top',
      // trigger: 'axis',
      showDelay: 0,
      formatter: function (params) {
        return 'spot_id' + params.value[2] + '<br/>' 
        + 'x:' + params.value[0] + '<br/>' 
        + 'y:' + params.value[1];
    },
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      }
    },
  };
  Option['series'] = [];
  for(let i = 0; i < pred; i++) {
    Option['series'].push({'name': 'cluser'+ (i + 1),  'type': 'scatter','data': arr_spatial[i],'colorBy': 'series','symbolSize': 3},)
  }
  Option && embedding_umap_loc_based_on_pred_label_chart.setOption(Option);   
}

//Embedding Umap Loc Based On Truth-Label
const embedding_umap_loc_based_on_truth_label = () => {
  let arr = new Array(spot_id.value.length);
  let pred = 0;
  let truth = 0;
  for (let i = 0; i < spot_id.value.length; i++) {
    arr[i] = new Array(9);
  }
  for (let i = 0; i < spot_id.value.length; i++) {
    if( pred === 0) {
      pred = parseInt(pred_label.value[i]);
    } else if( pred < parseInt(pred_label.value[i])) {
      pred = parseInt(pred_label.value[i]);
    }
    if( truth === 0) {
      truth = parseInt(ground_truth.value[i]);
    } else if( truth < parseInt(ground_truth.value[i])) {
      truth = parseInt(ground_truth.value[i]);
    }
    arr[i][0] = spot_id.value[i];
    arr[i][1] = ground_truth.value[i];
    arr[i][2] = pred_label.value[i];
    arr[i][3] = spatial.value[i][0];
    arr[i][4] = spatial.value[i][1];
    arr[i][5] = embedding_umap_loc.value[i][0];
    arr[i][6] = embedding_umap_loc.value[i][1];
    arr[i][7] = original_umap_loc.value[i][0];
    arr[i][8] = original_umap_loc.value[i][1];
  }
  pred = pred + 1;
  console.log(arr);
  console.log(truth,pred);
  //修改点
  let arr_spatial = new Array(truth);
  for (let i = 0; i < truth; i++) {
    arr_spatial[i] = [];
  }
  //
  for (let i = 0; i < spot_id.value.length; i++) {
    let flag = parseInt(arr[i][1]) - 1;
    arr_spatial[flag].push([arr[i][5],arr[i][6],arr[i][0]]);
  }

  var Option = {
    legend: {},
    xAxis: {},
    yAxis: {},
    title: {
        text: 'Embedding Umap Loc Based On Truth-Label',
        subtext: 'Data from: mouse_somatosensory_cortex.h5ad'
    },
    tooltip: {
      position: 'top',
      // trigger: 'axis',
      showDelay: 0,
      formatter: function (params) {
        return 'spot_id : ' + params.value[2] + '<br/>' 
        + 'x : ' + params.value[0] + '<br/>' 
        + 'y : ' + params.value[1];
    },
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      }
    },
  };
  Option['series'] = [];
  for(let i = 0; i < truth; i++) {
    Option['series'].push({'name': 'cluser'+ (i + 1),  'type': 'scatter','data': arr_spatial[i],'colorBy': 'series','symbolSize': 3},)
  }
  Option && embedding_umap_loc_based_on_truth_label_chart.setOption(Option);   
}
//Original Umap Loc Based On Pred-Label
const original_umap_loc_based_on_pred_label = () => {
  let arr = new Array(spot_id.value.length);
  let pred = 0;
  let truth = 0;
  for (let i = 0; i < spot_id.value.length; i++) {
    arr[i] = new Array(9);
  }
  for (let i = 0; i < spot_id.value.length; i++) {
    if( pred === 0) {
      pred = parseInt(pred_label.value[i]);
    } else if( pred < parseInt(pred_label.value[i])) {
      pred = parseInt(pred_label.value[i]);
    }
    if( truth === 0) {
      truth = parseInt(ground_truth.value[i]);
    } else if( truth < parseInt(ground_truth.value[i])) {
      truth = parseInt(ground_truth.value[i]);
    }
    arr[i][0] = spot_id.value[i];
    arr[i][1] = ground_truth.value[i];
    arr[i][2] = pred_label.value[i];
    arr[i][3] = spatial.value[i][0];
    arr[i][4] = spatial.value[i][1];
    arr[i][5] = embedding_umap_loc.value[i][0];
    arr[i][6] = embedding_umap_loc.value[i][1];
    arr[i][7] = original_umap_loc.value[i][0];
    arr[i][8] = original_umap_loc.value[i][1];
  }
  pred = pred + 1;
  console.log(arr);
  console.log(truth,pred);
  //修改点
  let arr_spatial = new Array(pred);
  for (let i = 0; i < truth; i++) {
    arr_spatial[i] = [];
  }
  //
  for (let i = 0; i < spot_id.value.length; i++) {
    let flag = parseInt(arr[i][2]);
    arr_spatial[flag].push([arr[i][7],arr[i][8],arr[i][0]]);
  }

  var Option = {
    legend: {},
    xAxis: {},
    yAxis: {},
    title: {
        text: 'Original Umap Loc Based On Pred-Label',
        subtext: 'Data from: mouse_somatosensory_cortex.h5ad'
    },
    tooltip: {
      position: 'top',
      // trigger: 'axis',
      showDelay: 0,
      formatter: function (params) {
        return 'spot_id : ' + params.value[2] + '<br/>' 
        + 'x : ' + params.value[0] + '<br/>' 
        + 'y : ' + params.value[1];
    },
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      }
    },
  };
  Option['series'] = [];
  for(let i = 0; i < pred; i++) {
    Option['series'].push({'name': 'cluser'+ (i + 1),  'type': 'scatter','data': arr_spatial[i],'colorBy': 'series','symbolSize': 3},)
  }
  Option && original_umap_loc_based_on_pred_label_chart.setOption(Option);   
}

//Original Umap Loc Based On Truth-Label
const original_umap_loc_based_on_truth_label = () => {
  let arr = new Array(spot_id.value.length);
  let pred = 0;
  let truth = 0;
  for (let i = 0; i < spot_id.value.length; i++) {
    arr[i] = new Array(9);
  }
  for (let i = 0; i < spot_id.value.length; i++) {
    if( pred === 0) {
      pred = parseInt(pred_label.value[i]);
    } else if( pred < parseInt(pred_label.value[i])) {
      pred = parseInt(pred_label.value[i]);
    }
    if( truth === 0) {
      truth = parseInt(ground_truth.value[i]);
    } else if( truth < parseInt(ground_truth.value[i])) {
      truth = parseInt(ground_truth.value[i]);
    }
    arr[i][0] = spot_id.value[i];
    arr[i][1] = ground_truth.value[i];
    arr[i][2] = pred_label.value[i];
    arr[i][3] = spatial.value[i][0];
    arr[i][4] = spatial.value[i][1];
    arr[i][5] = embedding_umap_loc.value[i][0];
    arr[i][6] = embedding_umap_loc.value[i][1];
    arr[i][7] = original_umap_loc.value[i][0];
    arr[i][8] = original_umap_loc.value[i][1];
  }
  pred = pred + 1;
  console.log(arr);
  console.log(truth,pred);
  //修改点
  let arr_spatial = new Array(truth);
  for (let i = 0; i < truth; i++) {
    arr_spatial[i] = [];
  }
  //
  for (let i = 0; i < spot_id.value.length; i++) {
    let flag = parseInt(arr[i][1]) - 1;
    arr_spatial[flag].push([arr[i][7],arr[i][8],arr[i][0]]);
  }

  var Option = {
    legend: {},
    xAxis: {},
    yAxis: {},
    title: {
        text: 'Original Umap Loc Based On Truth-Label',
        subtext: 'Data from: mouse_somatosensory_cortex.h5ad'
    },
    tooltip: {
      position: 'top',
      // trigger: 'axis',
      showDelay: 0,
      formatter: function (params) {
        return 'spot_id : ' + params.value[2] + '<br/>' 
        + 'x : ' + params.value[0] + '<br/>' 
        + 'y : ' + params.value[1];
    },
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      }
    },
  };
  Option['series'] = [];
  for(let i = 0; i < truth; i++) {
    Option['series'].push({'name': 'cluser'+ (i + 1),  'type': 'scatter','data': arr_spatial[i],'colorBy': 'series','symbolSize': 3},)
  }
  Option && original_umap_loc_based_on_truth_label_chart.setOption(Option);   
}
const trying = () => {
        console.log(result_msg);
        console.log('data');


        console.log(ami,ari,nmi);
        //获取spot_id数据5328

        console.log(spot_id.value[0]);
        console.log(spot_id.value);
        console.log(spot_id.value.length);
        //获取gene_exp
        console.log('geng_exp');

        console.log(gene_exp.value.length);
        console.log(gene_exp.value);
        console.log(gene_exp.value[0][0]);
        //获取embedding_umap_loc
        console.log('embedding_umap_loc');

        console.log(embedding_umap_loc.value);
        console.log(embedding_umap_loc.value.length);
        //获取original_umap_loc
        console.log('original_umap_loc');

        console.log(original_umap_loc.value);
        console.log(original_umap_loc.value.length);
        //获取pred_label
        console.log('pred_label');

        console.log(pred_label.value);
        console.log(pred_label.value.length);
        //获取ground_truth
        console.log('ground_truth');

        console.log(ground_truth.value);
        console.log(ground_truth.value.length);
        //获取svg
        console.log('svg');

        console.log(svg.value);
        console.log(svg.value.length);
        //获取paga_adj_matrix
        console.log('paga_adj_matrix');

        console.log(paga_adj_matrix.value);
        console.log(paga_adj_matrix.value.length);
        //获取paga_pos
        console.log('paga_pos');

        console.log(paga_pos.value);
        console.log(paga_pos.value.length);
        //获取spatial
        console.log('spatial');

        console.log(spatial.value);
        console.log(spatial.value.length);
        //获取gene_id
        console.log('gene_id');

        console.log(gene_id.value);
        console.log(gene_id.value.length);
      
}
//method选择后的参数param呈现
const methodChange= async () => {
  console.log(form.single_method);
  
    const response_list = await axios.get('http://192.168.142.128:32768' + 
    '/single?method=' + form.single_method);
    // data_list.value = response_list['data']['data'];
    para_list.value = response_list['data']['paras'];
};
//聚类评分参数选项
const score_methods = ref(['Value selected and disabled', 'ARI'])
const result_msg = null;

async function process_single_slice() {
    try {
        const method_paras = '&preprocessing=True';
        const data_id = '1';    // use id data
        const method = form.single_method;  // find model
        const clustering_method = form.trainModel; // find clustering method
        const cluster_num = form.cluster_num; // find cluster number
        // upload label
        const formData = new FormData();
        const score_method = arr.toString();
        
        if (null == file) {
  
        } else {
            formData.append('file', file);
            
        }
        
        const params = 'method=' + method + 
                       '&data_id=' + data_id + 
                    //    '&do_cluster=' + do_cluster + 
                       '&clustering_method=' + clustering_method + 
                       '&cluster_num=' + cluster_num +
                      //  '&score_method=' + score_method + 
                       method_paras;
                       //
        console.log(params);
        const result_msg = await axios.post('http://192.168.142.128:32768'+ '/single?' + 'method=GraphST&data_id=1&clustering_method=kmeans&cluster_num=5&preprocessing=True', formData);
        // const result_msg = await axios.post('http://192.168.142.128:32768' + '/single?' + params, formData);
        
        console.log(result_msg);
        console.log('data');
        console.log(result_msg.data);
        console.log('data-clustering_score');
        console.log(result_msg.data.downstream.clustering_score);
        console.log(result_msg.data.downstream.clustering_score.ami);
        ami = result_msg.data.downstream.clustering_score.ami;
        console.log(result_msg.data.downstream.clustering_score.ari);
        ari = result_msg.data.downstream.clustering_score.ari;
        console.log(result_msg.data.downstream.clustering_score.nmi);
        nmi = result_msg.data.downstream.clustering_score.nmi;
        console.log(ami,ari,nmi);
        //获取spot_id数据5328
        spot_id.value = result_msg.data.downstream.spot_id;
        console.log(spot_id.value[0]);
        console.log(spot_id.value);
        console.log(spot_id.value.length);
        //获取gene_exp
        console.log('geng_exp');
        gene_exp.value = result_msg.data.downstream.gene_exp;
        console.log(gene_exp.value.length);
        console.log(gene_exp.value);
        console.log(gene_exp.value[0][0]);
        //获取embedding_umap_loc
        console.log('embedding_umap_loc');
        embedding_umap_loc.value = result_msg.data.downstream.embedding_umap_loc;
        console.log(embedding_umap_loc.value);
        console.log(embedding_umap_loc.value.length);
        //获取original_umap_loc
        console.log('original_umap_loc');
        original_umap_loc.value = result_msg.data.downstream.original_umap_loc;
        console.log(original_umap_loc.value);
        console.log(original_umap_loc.value.length);
        //获取pred_label
        console.log('pred_label');
        pred_label.value = result_msg.data.downstream.pred_label;
        console.log(pred_label.value);
        console.log(pred_label.value.length);
        //获取ground_truth
        console.log('ground_truth');
        ground_truth.value = result_msg.data.downstream.ground_truth;
        console.log(ground_truth.value);
        console.log(ground_truth.value.length);
        //获取svg
        console.log('svg');
        svg.value = result_msg.data.downstream.svg;
        console.log(svg.value);
        console.log(svg.value.length);
        //获取paga_adj_matrix
        console.log('paga_adj_matrix');
        paga_adj_matrix.value = result_msg.data.downstream.paga_adj_matrix;
        console.log(paga_adj_matrix.value);
        console.log(paga_adj_matrix.value.length);
        //获取paga_pos
        console.log('paga_pos');
        paga_pos.value = result_msg.data.downstream.paga_pos;
        console.log(paga_pos.value);
        console.log(paga_pos.value.length);
        //获取spatial
        console.log('spatial');
        spatial.value = result_msg.data.downstream.spatial;
        console.log(spatial.value);
        console.log(spatial.value.length);
        //获取gene_id
        console.log('gene_id');
        gene_id.value = result_msg.data.downstream.gene_id;
        console.log(gene_id.value);
        console.log(gene_id.value.length);
        a = result_msg;
        arr = [];
    } catch (error) {
        backend_message.value = error;
    }
};
</script>
