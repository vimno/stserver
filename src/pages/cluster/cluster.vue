<template>
  <div class="common-layout">
    <el-container>
      <el-header class="clHeader">
        <h1 class="clH1">Clustering Analysis</h1>
        <el-divider />
      </el-header>
      <el-main >
        <button @click="to_single">single</button>
        <button @click="to_multi">multi</button>
        <div>
          <component :is="current_component"/>
        </div>
      </el-main>
    </el-container>
  </div>
  
</template>
<style scoped>
.clHeader {
  height: 100px;
}
.clH1 {
  font-size: 40px;
  margin: 30px;
  text-align: left;
  color: #010C3A;
  ;
}
</style>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ref } from 'vue'
import { shallowRef } from 'vue';
import single_slice from './form/single_slice.vue';
import multi_slice from './form/multi_slice.vue';
import '../cluster/style.css'

let current_component = shallowRef(single_slice);

const to_single = () => {
  current_component.value = single_slice;
};

const to_multi = () => {
  current_component.value = multi_slice;
};

const value = ref()
const valueStrictly = ref()

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

const ceshi = ()=> {
  console.log(form);
}
// do not use same name with ref
const form = reactive({
  singleOrMultiple: '',
  single_method: '',
  dataSets:[],
  trainModel: '',
})

const onSubmit = () => {
  console.log('submit!')
}
const dataDefaultSets = [
  {
    id: '1',
    name:'STDS0000001:Spatiotemporal analysis of human intestinal devement at single-cell resolution'
  },{
    id: '2',
    name:'STDS0000002:Spatiotemporal analysis of human intestinal devement at single-cell resolution'
  }
]
//单张训练方法选项
const singleTrainingMethods = [
  {
    id: '1',
    name:'STAGATE'
  },{
    id: '2',
    name:'GraphST'
  },{
    id: '3',
    name:'SEDR'
  },{
    id: '4',
    name:'CCST'
  },{
    id: '5',
    name:'SpaGCN'
  },{
    id: '6',
    name:'TEST'
  }
]
//多张训练方法选项
const multiTrainingMethods = [
  {
    id: '1',
    name:'STAligner'
  },{
    id: '2',
    name:'SEDR'
  },{
    id: '3',
    name:'TEST'
  },
]
// 聚类方法选项
const clusterMethods = [
  {
    id: '1',
    name:'K-Means'
  },{
    id: '2',
    name:'Louvain'
  },{
    id: '3',
    name:'mclust-EEE'
  },
]

//默认数据集
const data = [
  {
    value: '1',
    label: 'E12.5_E1S4.MOSTA.h5ad',
  },
  {
    value: '5',
    label: 'E12.5_E1S5.MOSTA.h5ad',
  },
]
//聚类评分参数选项
const score_methods= ['ARI', 'NMI', 'AMI']
const scoreMethods = ref(['ARI'])
</script>
