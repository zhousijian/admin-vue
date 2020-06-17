<template>
  <div class="videoEdit">
    <!-- 头部 -->
    <header class="header">
      <div class="header-left">标签分类</div>
      <div class="header-right">
        <!-- <div class="delete-btn" v-if="isIndex != -1">删除</div>
        <div class="edit-btn" v-if="isIndex != -1">编辑</div> -->
        <div
          class="delete-btn"
          v-if="isIndex.length > 0"
          @click="handleClickDelType"
        >
          删除
        </div>
        <div
          class="edit-btn"
          v-if="isIndex.length > 0"
          @click="handleClickEditType"
        >
          编辑
        </div>
        <div class="add-btn" @click="handleClickAddType">+ 新增类别</div>
        <div class="add-btn" @click="handleClickEmpty">清空</div>
      </div>
    </header>
    <!-- 对应标题 -->
    <div class="cpd-title">
      <div class="type">类别</div>
      <div class="contain">所含标签</div>
      <div class="operate">标签操作</div>
    </div>
    <!-- 标签内容 -->
    <div class="label-content">
      <div
        class="label-content-item"
        v-for="(item, index) in myData"
        :key="index"
      >
        <div class="stair-label" @click="handleClickLabel(index)">
          <!-- <img src="../images/zend.png" alt v-if="isIndex == index" /> -->
          <!-- <img
            src="../images/icon_shoucang1.png"
            alt
            v-if="isIndex.indexOf(index) > -1"
          /> -->
          <div class="pitch_c" v-if="isIndex.indexOf(index) > -1"></div>
          <div class="checkbox" v-else></div>
          <div class="text">{{ item.type_value }}</div>
        </div>
        <div class="second-label">
          <!-- :class="{ active: isLabelIndex.indexOf(index2) > -1 }" -->
          <div
            :class="{ active: isLabelIndex.indexOf(item2.typelabel__id) > -1 }"
            class="second-label-item"
            v-for="(item2, index2) in item.label_info"
            :key="index2"
            @click="handleClickCheck(index, index2)"
          >
            {{ item2.typelabel__name }}
          </div>
          <div
            class="second-label-add"
            @click="handleClickAddLabel(item.type_sort)"
          >
            + 新增标签
          </div>
        </div>
        <div class="second-label-operate">
          <span @click="handleClickEditLabel(index)">修改</span>
          <span></span>
          <span @click="handleClickDelLabel(index)">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTypeLabel,
  addLabel,
  addType,
  editLabel,
  editType,
  deleteType,
  deleteLabel
} from "../apis/info";
export default {
  // second-label-item
  data() {
    return {
      // 一级类别的选中索引
      // isIndex: -1,
      isIndex: [],
      // 二级标签的选中的索引
      isLabelIndex: [],
      // 模拟数据
      myData: [
        // {
        //   type: "美食",
        //   children: [
        //     { label: "粤菜", id: 1 },
        //     { label: "川菜", id: 2 },
        //     { label: "湘菜", id: 3 },
        //     { label: "客家菜", id: 4 },
        //     { label: "粤菜", id: 5 },
        //     { label: "川菜", id: 6 },
        //     { label: "湘菜", id: 7 },
        //     { label: "客家菜", id: 8 },
        //     { label: "粤菜", id: 9 },
        //     { label: "川菜", id: 10 },
        //     { label: "湘菜", id: 11 },
        //     { label: "客家菜", id: 12 }
        //   ]
        // },
        // {
        //   type: "服装",
        //   children: [
        //     { label: "男装", id: 13 },
        //     { label: "女装", id: 14 },
        //     { label: "儿童装", id: 15 }
        //   ]
        // },
        // {
        //   type: "家电",
        //   children: [
        //     { label: "冰箱", id: 16 },
        //     { label: "电视机", id: 17 },
        //     { label: "洗衣机", id: 18 },
        //     { label: "微波炉", id: 19 },
        //     { label: "冰箱", id: 20 },
        //     { label: "电视机", id: 21 },
        //     { label: "洗衣机", id: 22 },
        //     { label: "微波炉", id: 23 }
        //   ]
        // }
      ],
      // 当前操作标签所属类别的id
      typeId: ""
    };
  },
  methods: {
    // 点击一级类别
    handleClickLabel(index) {
      if (this.isLabelIndex.length > 0) {
        this.$alert("类别和标签不能同时进行操作", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      // index == this.isIndex ? (this.isIndex = -1) : (this.isIndex = index);
      let status = this.isIndex.findIndex(v => {
        return v == index;
      });
      status == -1 ? this.isIndex.push(index) : this.isIndex.splice(status, 1);
    },
    // 点击修改一级类别
    handleClickEditType() {
      let that = this;
      if (this.isIndex.length == 0) {
        this.$alert("请选择需要编辑的类别", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else if (this.isIndex.length > 1) {
        this.$alert("每次只允许编辑一个类别", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else {
        let inputValue = this.myData[this.isIndex[0]].type_value;
        this.$prompt("请输入类别名称", "类别编辑", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // /[\u4e00-\u9fa5]/gm
          // inputPattern: /[\u4e00-\u9fa5]/gm,
          // inputErrorMessage: "类别名称格式不正确",
          inputValue: this.myData[this.isIndex[0]].type_value,
          beforeClose: (action, instance, done) => {
            if (action == "confirm") {
              console.log(instance.inputValue);
              if (inputValue == instance.inputValue) {
                this.$message({
                  type: "error",
                  message: "两次类别名称编辑不能为一致"
                });
                return;
              }
              editType({
                type_sort: that.myData[this.isIndex[0]].type_sort,
                type_value: instance.inputValue
              }).then(res => {
                // console.log(res);
                this.$message({
                  type: "success",
                  message: res.info
                });
                done();
                that.isLabelIndex = [];
                that.getData();
                that.isIndex = [];
              });
            } else {
              this.$message({
                type: "info",
                message: "取消编辑"
              });
              done();
            }
          }
        });
        // .then(({ value }) => {
        //   this.$message({
        //     type: "success",
        //     message: "编辑类别为: " + value
        //   });
        // })
        // .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "取消输入"
        //   });
        // });
        // 发请求
      }
    },
    // 点击新增一级类别
    handleClickAddType() {
      // if (this.isLabelIndex.length > 0) {
      //   this.$alert("类别和标签不能同时进行操作", "提示", {
      //     confirmButtonText: "确定",
      //     type: "warning"
      //   });
      //   return;
      // }
      this.$prompt("请输入类别名称", "类别新增", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // /[\u4e00-\u9fa5]/gm
        // inputPattern: /[\u4e00-\u9fa5]/gm,
        // inputErrorMessage: "类别名称格式不正确"
      })
        .then(({ value }) => {
          addType({ type_value: value }).then(res => {
            // console.log(res);
            this.$message({
              type: "success",
              message: res.info
            });
            this.getData();
          });
          // this.$message({
          //   type: "success",
          //   message: "新增类别是: " + value
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 点击删除一级类别
    handleClickDelType() {
      let type_sort_list = [];

      let isIndex = this.isIndex.map(v => {
        type_sort_list.push(this.myData[v].type_sort);
      });
      if (this.isIndex.length == 0) {
        this.$alert("请选择需要删除的类别", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else {
        this.$confirm("此操作将永久删除该类别, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
          beforeClose: (action, instance, done) => {
            if (action == "confirm") {
              deleteType({
                type_sort_list
              }).then(res => {
                // console.log(res);
                this.$message({
                  type: "success",
                  message: res.info
                });
                done();
                this.getData();
                this.isIndex = [];
              });
            } else {
              this.$message({
                type: "info",
                message: "取消删除"
              });
              done();
            }
          }
        });
        // .then(() => {
        //   this.$message({
        //     type: "success",
        //     message: "删除成功!"
        //   });
        // })
        // .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "已取消删除"
        //   });
        // });
      }
    },
    // 点击二级标签
    handleClickCheck(index, index2) {
      if (this.isIndex.length > 0) {
        this.$alert("类别和标签不能同时进行操作", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.myData[index].type_sort != this.typeId) {
        this.isLabelIndex = [];
      }
      let status = this.isLabelIndex.findIndex(v => {
        // return v == index2
        return v == this.myData[index].label_info[index2].typelabel__id;
      });
      if (status == -1) {
        this.isLabelIndex.push(
          this.myData[index].label_info[index2].typelabel__id
        );
        this.typeId = this.myData[index].type_sort;
      } else {
        this.isLabelIndex.splice(status, 1);
        this.typeId = "";
      }
    },
    // 点击修改二级标签
    handleClickEditLabel(index) {
      let that = this;
      // console.log(index);
      console.log(this.isLabelIndex);
      let isIndex = this.myData[index].label_info.findIndex(v => {
        return v.typelabel__id == this.isLabelIndex[0];
      });
      console.log(isIndex);

      if (this.isLabelIndex.length == 0) {
        this.$alert("请选择需要修改的标签", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else if (this.isLabelIndex.length > 1) {
        if (isIndex == -1) {
          this.$alert("请在选择标签的所属类别进行操作", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return;
        }
        this.$alert("每次只允许修改一个标签", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else {
        if (isIndex == -1) {
          this.$alert("请在选择标签的所属类别进行操作", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return;
        }
        let inputValue = this.myData[index].label_info[isIndex].typelabel__name;
        console.log(inputValue);

        this.$prompt("请输入标签名称", "标签修改", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          // /[\u4e00-\u9fa5]/gm
          // inputPattern: /[\u4e00-\u9fa5]/gm,
          // inputErrorMessage: "标签名称格式不正确",
          // inputValue: this.isLabelIndex[0]
          inputValue,
          beforeClose: (action, instance, done) => {
            if (action == "confirm") {
              console.log(instance.inputValue);
              if (inputValue == instance.inputValue) {
                this.$message({
                  type: "error",
                  message: "两次标签名称修改不能为一致"
                });
                return;
              }
              editLabel({
                type_sort: that.myData[index].type_sort,
                typelabel__id:
                  that.myData[index].label_info[isIndex].typelabel__id,
                typelabel__name: instance.inputValue
              }).then(res => {
                // console.log(res);
                this.$message({
                  type: "success",
                  message: res.info
                });
                done();
                that.isLabelIndex = [];
                that.getData();
              });
            } else {
              this.$message({
                type: "info",
                message: "取消修改"
              });
              done();
            }
          }
        });
      }
    },
    // 点击新增二级标签
    handleClickAddLabel(type_sort) {
      if (this.isIndex.length > 0) {
        this.$alert("类别和标签不能同时进行操作", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.$prompt("请输入标签名称", "标签新增", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // /[\u4e00-\u9fa5]/gm
        // inputPattern: /[\u4e00-\u9fa5]/gm,
        // inputErrorMessage: "标签名称格式不正确"
      })
        .then(({ value }) => {
          addLabel({ type_sort, typelabel__name: value }).then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: res.info
            });
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 点击删除二级标签
    handleClickDelLabel(index) {
      let typelabel__id_list = this.isLabelIndex;

      let isIndex = this.myData[index].label_info.findIndex(v => {
        return v.typelabel__id == this.isLabelIndex[0];
      });
      // console.log(this.isLabelIndex);

      // console.log(isIndex);
      if (isIndex == -1) {
        this.$alert("请在选择标签的所属类别进行操作", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.isLabelIndex.length == 0) {
        this.$alert("请选择需要删除的标签", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else {
        this.$confirm("此操作将永久删除该标签, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
          beforeClose: (action, instance, done) => {
            if (action == "confirm") {
              deleteLabel({
                typelabel__id_list
              }).then(res => {
                // console.log(res);
                this.$message({
                  type: "success",
                  message: res.info
                });
                done();
                this.getData();
              });
            } else {
              this.$message({
                type: "info",
                message: "取消删除"
              });
              done();
            }
          }
        });
        // .then(() => {
        //   this.$message({
        //     type: "success",
        //     message: "删除成功!"
        //   });
        // })
        // .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "已取消删除"
        //   });
        // });
      }
    },
    // 封装函数获取类别标签数据
    async getData() {
      let res = await getTypeLabel();
      console.log(res);
      this.myData = res.res;
    },
    // 清空所有选项
    handleClickEmpty() {
      this.isIndex = [];
      this.isLabelIndex = [];
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.videoEdit {
  padding: 20px;
  min-height: calc(100vh - 138px);
  background-color: #fff;
  color: #555;
  .header {
    display: flex;
    justify-content: space-between;
    .header-left {
      // letter-spacing: 2px;
      color: #000;
      font-size: 16px;
      font-weight: 700;
    }
    .header-right {
      display: flex;
      div {
        padding: 5px 30px;
        margin-left: 10px;
        cursor: pointer;
        border-radius: 5px;
      }
      .delete-btn {
        color: #fff;
        background: #f66c6c;
      }
      .edit-btn {
        color: #fff;
        background: #147ff8;
      }
      .add-btn {
        padding: 5px 8px;
        color: #147ff8;
        border: 1px solid #147ff8;
      }
    }
  }
  .cpd-title {
    display: flex;
    padding: 15px 0;
    margin-top: 15px;
    background-color: #eee;
    .type {
      flex: 1.1;
      text-indent: 40px;
    }
    .contain {
      flex: 5;
    }
    .operate {
      flex: 1.2;
      text-align: center;
    }
  }
  .label-content {
    .label-content-item {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      .stair-label {
        flex: 1.1;
        display: flex;
        align-items: center;
        text-indent: 10px;
        padding: 5px 0;
        height: 20px;
        cursor: pointer;
        .text {
          color: #000;
        }
        .checkbox {
          margin-left: 15px;
          width: 15px;
          height: 15px;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }
        .pitch_c {
          cursor: pointer;
          margin-left: 15px;
          box-sizing: border-box;
          width: 15px;
          height: 15px;
          //margin-right: 27px;
          //border: 1px solid #CCCCCC;
          border-radius: 4px;
          background-color: #147ff9;
          position: relative;
        }
        .pitch_c:after {
          display: block;
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          top: -3px;
          right: -1px;
          width: 8px;
          height: 4px;
          margin: auto;
          transform: rotate(-45deg);
          border-bottom: 1px solid #fff;
          border-left: 1px solid #ffffff;
        }
        img {
          margin-left: 15px;
          width: 15px;
          height: 15px;
        }
      }
      .second-label {
        flex: 5;
        display: flex;
        flex-wrap: wrap;
        .second-label-item {
          cursor: pointer;
          padding: 5px 15px;
          margin: 0 10px 10px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .second-label-add {
          padding: 5px 15px;
          margin: 0 10px 10px 0;

          border: 1px solid #147ff8;
          border-radius: 5px;
          color: #147ff8;
          cursor: pointer;
        }
        .active {
          color: #fff;
          background: #147ff8;
        }
      }
      .second-label-operate {
        flex: 1.2;
        display: flex;
        justify-content: center;
        padding: 5px 0;
        color: #157ff9;
        span {
          cursor: pointer;
        }
        span:nth-child(2) {
          margin: 0 8px;
          // margin-top: 5px;
          display: inline-block;
          height: 18px;
          border-left: 1px solid #157ff9;
        }
      }
    }
  }
}
</style>
