<template>
  <!-- 自定义滚动条 -->
  <el-scrollbar height="660px">
    <el-row class="flex-col">
      <el-col :span="24" class="flex items-center justify-center flex-col">
        <!-- 标题 -->
        <div class="flex-col">
          <!-- <el-space size="large"></el-space> -->
          <h1 class=" font-bold text-4xl text-indigo-800 text-center my-15">About SPAtial Transcriptomic Analysis Data
            Analysis Platform</h1>
          <el-divider />
        </div>
        <!-- 内容 -->
        <el-space wrap>
          <div class="flex items-center justify-center my-6.85 mx-37 flex-col">
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida
              dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
              vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
            <br><br>
            <p> Single-cell RNA sequencing (scRNA-seq) has enabled comprehensive profiling of molecular signatures of
              diverse cell types. However, the spatial information was lost during the tissue dissociation step,
              hindering
              the further interpretation of crosstalk between different cell types that coordinates tissue formation and
              pathological states. Emerging spatial transcriptomics (ST) methods enable measuring gene expression while
              preserving spatial information. The expanding ST datasets offer the potential for serving as a reference
              atlas for guiding spatial mapping of existing scRNA-seq data, thereby increasing their value in
              deciphering
              intercellular communications in the spatial context.</p>
            <br><br>
            <p>
              STellaris is an integrated web server for accurate and flexible spatial mapping of user-uploaded scRNA-seq
              data. It is founded on a manually curated compilation of ST datasets across diverse organs, developmental
              stages and pathological states in humans and mice. With the inferred spatial information of single cells,
              STellaris can thus characterize spatial distances between cell type pairs and identify intercellular LRIs
              between them. Notably, the spatial construction of other single-cell omics data that were jointly profiled
              with the transcriptome can be resolved simultaneously if provided.
            </p><br><br>
            <h2 class="font-bold text-2xl text-indigo-800 flex items-center justify-center">License</h2><br><br>
            <p> STellaris is an integrated web server for accurate and flexible spatial mapping of user-uploaded
              scRNA-seq
              data. It is founded on a manually curated compilation of ST datasets across diverse organs, developmental
              stages and pathological states in humans and mice. With the inferred spatial information of single cells,
              STellaris can thus characterize spatial distances between cell type pairs and identify intercellular LRIs
              between them. Notably, the spatial construction of other single-cell omics data that were jointly profiled
              with the transcriptome can be resolved simultaneously if provided.</p><br><br>
            <h2 class="font-bold text-2xl text-indigo-800 flex items-center justify-center">Acknowledgement</h2><br><br>
            <p> STellaris is an integrated web server for accurate and flexible spatial mapping of user-uploaded
              scRNA-seq
              data. It is founded on a manually curated compilation of ST datasets across diverse organs, developmental
              stages and pathological states in humans and mice. With the inferred spatial information of single cells,
              STellaris can thus characterize spatial distances between cell type pairs and identify intercellular LRIs
              between them. Notably, the spatial construction of other single-cell omics data that were jointly profiled
              with the transcriptome can be resolved simultaneously if provided.</p><br><br>
            <el-divider>
              <el-icon>★</el-icon>
            </el-divider>
          </div>
          <el-backtop :right="100" :bottom="100" />
        </el-space>
        
      </el-col>
    </el-row>
  </el-scrollbar>
  
</template>
<style>
p{
  color: black;
}
</style>