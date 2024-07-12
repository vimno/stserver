<template>
  <div class="common-layout">
      <el-container>
        <el-aside width="300px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu 
              active-text-color="#ffd04b" 
              background-color="#545c64" 
              class="el-menu-vertical-demo"
              default-active="1" 
              text-color="#fff" 
              @open="handleOpen" 
              @close="handleClose">
                <el-menu-item index="1">
                  <template #title>
                    <span>Original Umap</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="2">
                  <span>Embedding Umap</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <span>Results Download</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row></el-aside>
        <el-container>
          <el-main>
            <resultsDownload></resultsDownload>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { ref } from 'vue'
import { ArrowKeys } from '@icon-park/react';
import resultsDownload from './clusterViews/clusterResultsDownload.vue';
const value = ref()
const valueStrictly = ref()
// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}
const data = [
  {
    value: '1',
    label: 'E12.5_E1S1.MOSTA.h5ad',
  },
  {
    value: '2',
    label: 'E12.5_E1S2.MOSTA.h5ad',
  },
]
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>