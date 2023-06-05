<template>
  <div>
    <el-pagination
      :current-page="page"
      :page-size="sise"
      :page-sizes="[5, 10, 20, 50, 100]"
      :total="total"
      :url="url"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
// import { getTableData } from '@/utils/table'

export default {
  props: {
    total: Number,
    url: String
  },
  data() {
    return {
      page: 1, // 当前页数
      size: 10 // 每页显示条数
    }
  }
  /* created() {
     getTableData(this.$parent, '/works', { page: this.page, size: this.size }, [
       'completed'
     ])
   },*/
  /*methods: {
    handleSizeChange(val) {
      this.size = val
      this.page = 1
      getTableData(this.$parent, '/works', { page: this.page, size: val }, ['completed'])
    },
    handleCurrentChange(val) {
      this.page = val
      getTableData(this.$parent, '/works', { page: val, size: this.size }, ['completed'])
    }
  }*/
}
</script>
