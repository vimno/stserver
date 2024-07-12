<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-form-item label="DATA Sets:">
          <el-tree-select v-model="value" :data="data" multiple :render-after-expand="false" show-checkbox
            style="width: 600px" />
        </el-form-item>
        <el-divider />
      </el-header>

      <el-container>
        <el-aside width="300px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose">
                <el-menu-item index="1">
                  <template #title>
                    <span>Annotation</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="2">
                  <span>Spatial distribution of Gene</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row></el-aside>
        <el-container>
          <el-main><el-empty description="description" /></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { ref } from 'vue'
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
  {
    value: '3',
    label: 'E12.5_E1S3.MOSTA.h5ad',
  },
  {
    value: '4',
    label: 'E12.5_E1S4.MOSTA.h5ad',
  },
  {
    value: '5',
    label: 'E12.5_E1S5.MOSTA.h5ad',
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