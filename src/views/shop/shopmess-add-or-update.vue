<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="门店名称" prop="shopName">
      <el-input v-model="dataForm.shopName" placeholder="门店名称"></el-input>
    </el-form-item>
    <el-form-item label="门店电话" prop="shopIpone">
      <el-input v-model="dataForm.shopIpone" placeholder="门店电话"></el-input>
    </el-form-item>
    <el-form-item label="门店负责人" prop="shopPersion">
      <el-input v-model="dataForm.shopPersion" placeholder="门店负责人"></el-input>
    </el-form-item>
    <el-form-item label="门店logo" prop="shopLogo">
      <el-input v-model="dataForm.shopLogo" placeholder="门店logo"></el-input>
    </el-form-item>
    <el-form-item label="门店ip" prop="shopIp">
      <el-input v-model="dataForm.shopIp" placeholder="门店ip"></el-input>
    </el-form-item>
    <el-form-item label="门店详细地址" prop="shopAddr">
      <el-input v-model="dataForm.shopAddr" placeholder="门店详细地址"></el-input>
    </el-form-item>
    <el-form-item label="门店经纬度" prop="shopJwd">
      <el-input v-model="dataForm.shopJwd" placeholder="门店经纬度"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="" prop="coordinate">
      <el-input v-model="dataForm.coordinate" placeholder=""></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          shopName: '',
          shopIpone: '',
          shopPersion: '',
          shopLogo: '',
          shopIp: '',
          shopAddr: '',
          shopJwd: '',
          createTime: '',
          updateTime: '',
          coordinate: ''
        },
        dataRule: {
          shopName: [
            { required: true, message: '门店名称不能为空', trigger: 'blur' }
          ],
          shopIpone: [
            { required: true, message: '门店电话不能为空', trigger: 'blur' }
          ],
          shopPersion: [
            { required: true, message: '门店负责人不能为空', trigger: 'blur' }
          ],
          shopLogo: [
            { required: true, message: '门店logo不能为空', trigger: 'blur' }
          ],
          shopIp: [
            { required: true, message: '门店ip不能为空', trigger: 'blur' }
          ],
          shopAddr: [
            { required: true, message: '门店详细地址不能为空', trigger: 'blur' }
          ],
          shopJwd: [
            { required: true, message: '门店经纬度不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          coordinate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/wms/shopmess/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.shopName = data.shopmess.shopName
                this.dataForm.shopIpone = data.shopmess.shopIpone
                this.dataForm.shopPersion = data.shopmess.shopPersion
                this.dataForm.shopLogo = data.shopmess.shopLogo
                this.dataForm.shopIp = data.shopmess.shopIp
                this.dataForm.shopAddr = data.shopmess.shopAddr
                this.dataForm.shopJwd = data.shopmess.shopJwd
                this.dataForm.createTime = data.shopmess.createTime
                this.dataForm.updateTime = data.shopmess.updateTime
                this.dataForm.coordinate = data.shopmess.coordinate
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/wms/shopmess/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'shopName': this.dataForm.shopName,
                'shopIpone': this.dataForm.shopIpone,
                'shopPersion': this.dataForm.shopPersion,
                'shopLogo': this.dataForm.shopLogo,
                'shopIp': this.dataForm.shopIp,
                'shopAddr': this.dataForm.shopAddr,
                'shopJwd': this.dataForm.shopJwd,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
                'coordinate': this.dataForm.coordinate
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
