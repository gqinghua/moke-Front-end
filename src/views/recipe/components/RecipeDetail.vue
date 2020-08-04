<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="recipe" :rules="loginRules" ref="recipeFrom" label-width="150px">
      <el-form-item label="name" prop="nickName">
        <el-input v-model="recipe.name"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="username">
        <el-input v-model="recipe.pic" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('recipeFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('recipeFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createAdmin, getAdmin, updateAdmin,userRoles,userRoleCheck} from '@/api/sys/admin'
  import {isvalidUsername} from '@/utils/validate';
  import {fetchList} from '@/api/sys/role'
  import SingleUpload from '@/components/Upload/singleUpload'
  import {getByRecipe, insertRecipe,updateRecipe} from '@/api/recipe/recipe'
  const defaultrecipe={
    username: '',
      pic:'',

  };
  export default {
    name: 'recipeDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };
      return {
          recipe:Object.assign({}, defaultrecipe),
        allRoles:null,
        userRoles:null,
        roleIds:null,
        listQuery: {
          pageNum: 1,
          pageSize: 100
        },
        loginRules: {
          // username: [{required: true, trigger: 'blur', message: '请输入用户名',}]
        }

        }

    },
    created() {
      if (this.isEdit) {
        this.listQuery.recipeId=this.$route.query.id;
      //     getByRecipe(this.listQuery).then(res => {
      //     if(res.code==200){
      //     this.allRoles =  res.data
      //   }
      // });

          getByRecipe(this.$route.query.id).then(response => {
          this.recipe = response.data;
      });
      }else{
        fetchList(this.listQuery).then(response => {
          this.allRoles = response.data.records;
      });
        this.recipe = Object.assign({},defaultrecipe);
      };


    },
    computed: {
      //选中的服务保证
      allRoles1: {
        get() {
          let list = [];
          if (this.roleIds === undefined || this.roleIds == null || this.roleIds === '') return list;
          let ids = this.roleIds.split(',');
          for (let i = 0; i < ids.length; i++) {
            list.push(Number(ids[i]));
          }
          return list;
        },
        set(newValue) {
          let serviceIds = '';
          if (newValue != null && newValue.length > 0) {
            for (let i = 0; i < newValue.length; i++) {
              serviceIds += newValue[i] + ',';
            }
            if (serviceIds.endsWith(',')) {
              serviceIds = serviceIds.substr(0, serviceIds.length - 1)
            }
            this.roleIds = serviceIds;
          } else {
            this.roleIds = null;
          }
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                  updateRecipe(this.$route.query.id, this.recipe).then(response => {
                  if(response.code==200){
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                  }else{
                  this.$message({
                    message: response.msg,
                    type: 'error',
                    duration:1000
                  });

                }


                });
              } else {
                  console.log(1);
                  insertRecipe(this.recipe).then(response => {
                  if(response.code==200) {
                  this.$refs[formName].resetFields();
                  this.recipe = Object.assign({}, defaultrecipe);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                }else{
                  this.$message({
                    message: response.msg,
                    type: 'error',
                    duration:1000
                  });

                }
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.recipe = Object.assign({},defaultrecipe);
      }
    }
  }
</script>
<style>
</style>


