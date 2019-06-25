<template>
  <div id="page">
    <div class="loginMask" v-if="!isLogin"><!-- !isLogin -->
      <div class="login">
        <div class="title">学生登录</div>
        <div class="input">
          <Input type="text" v-model="adminId" placeholder="学号">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </div>
        <div class="input">
          <Input type="password" v-model="adminPassword" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </div>
        <div class="input btn">
          <Button type="primary" @click="login">登录</Button>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="container">
        <div class="info">
          <div class="title">
            <p>{{title}}</p>
            <dl>
              <dt>{{myInfo.snumber}}</dt>
              <dd>{{myInfo.name}}</dd>
            </dl>
            <div class="viewCourse" title="查看我的课程" @click="viewCourse">
              <img src="@/assets/icon/view.png">
            </div>
            <div class="addCourse" title="添加新课程"  @click="addCourse">
              <div class="add">+</div>
            </div>
          </div>
          <!-- 搜索课程 -->
          <div class="main">
            <div class="search">
              <Input class-name="input" search enter-button="搜索" placeholder="输入课程名查询课程···" on-search="" />
            </div>
            <!-- 我的课表 || 添加课程 -->
            <Table ellipsis="true" :columns="columns" :data="sliceMyCourses"></Table>
          </div>
          <!-- <div class="courses" v-if="isShowAddCourses">
            <Table ellipsis="true" :columns="columns" :data="addCourses"></Table>
          </div> -->
          <!-- 分页 -->
          <div class="pagin">
            <Page :total="dataCount" :page-size="pageSize" show-total  @on-change="changepage" class-name="pagination"></Page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {

      isLogin: false,
      adminId: "",
      adminPassword: "",
      students: [],
      myInfo: {},

      title: "我的课表",
      columns: [],
      courses: [],

      ajaxMyCourses: [],
      sliceMyCourses: [],

      // 分页控制
      dataCount: 0,
      pageSize: 8,
      // pageCurrent: 0,

      myCourseObj: {
        viewColumns: [
          {
            title: '课程id',
            key: 'cid',
            align: 'center',
          },
          {
            title: '课程名',
            key: 'name',
            align: 'center',
          },
          {
            title: '学分',
            key: 'credit',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: '',
                    size: 'small'
                  },
                  style: {
                    marginRight: '15px',
                    color: '#fff'
                  },
                  on: {
                    click: () => {
                        this.showCourse(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    color: '#fff'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '确定退选该课程吗',
                        onOk: () => {
                          let _this = this;
                          let _cid = _this.courses[params.index].cid;
                          _this.$axios.delete('http://106.14.46.10:8082/TeachingAffairs/electCourse/deleteRecord',{
                              params: {
                                sid: _this.myInfo.sid,
                                cid: _cid
                              }
                            }
                          )
                          .then(response => {
                            this.remove(params.index)
                            console.log(response);
                            _this.$Message.success('退选成功');
                            _this.login();
                          })
                          .catch(error => {
                            console.log(error);
                            _this.$Message.error('退选失败');
                          });
                        },
                        onCancel: () => {
                          this.$Message.info('取消退选');
                        }
                      });
                    }
                  }
                }, '退选')
              ]);
            }
          }
        ]
      },
      courseObj: {
        viewColumns: [
          {
            title: '课程id',
            key: 'cid',
            align: 'center',
          },
          {
            title: '课程名',
            key: 'name',
            align: 'center',
          },
          {
            title: '学分',
            key: 'credit',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    // type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '15px',
                    color: '#fff'
                  },
                  on: {
                    click: () => {
                        this.showCourse(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    color: '#fff'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '确定选择该课程吗',
                        onOk: () => {
                          let _this = this;
                          let _cid = _this.courses[params.index].cid;
                          _this.$axios.post('http://106.14.46.10:8082/TeachingAffairs/electCourse/addRecord',
                            _this.$qs.stringify({
                              sid: _this.myInfo.sid,
                              cid: _cid
                            })
                          )
                          .then(response => {
                            console.log(response);
                            if(response.data.message){
                              _this.$Message.error(response.data.message);
                            }else{
                              _this.$Message.success('选课成功');
                              this.remove(params.index)
                              _this.login();
                            }
                          })
                          .catch(error => {
                            console.log(error);
                            _this.$Message.error('选课失败');
                          });
                        },
                        onCancel: () => {
                          this.$Message.info('取消选课');
                        }
                      });
                    }
                  }
                }, '选课')
              ]);
            }
          }
        ]
      }
    }
  },
  methods: {
    login(){
      let _this = this;
      _this.$axios.post('http://106.14.46.10:8082/TeachingAffairs/login/student',
        _this.$qs.stringify({
          snumber: _this.adminId,
          password: _this.adminPassword
        })
      )
      .then(response => {
        console.log(response);
        console.log("获取数据成功");
        _this.isLogin = true;
        _this.myCourseObj.myCourses = response.data.records;
        _this.courseObj.myCourses = response.data.remains;
        // 查询所有学生
        _this.$axios.get('http://106.14.46.10:8082/TeachingAffairs/student/findAllStudents')
        .then(response => {
          console.log(response);
          console.log("获取数据成功");
          _this.students = response.data;
          for(let i in _this.students){
            if(_this.students[i].snumber === _this.adminId){
              _this.myInfo = _this.students[i];
              console.log(_this.myInfo);
            }
          }
        })
        .catch(error => {
          console.log(error);
          console.log("获取数据失败");
        });

      })
      .catch(error => {
        console.log(error);
        console.log("获取数据失败");
      });
    },
    viewCourse(){
      this.title = "我的课表",
      this.columns = this.myCourseObj.viewColumns;
      this.courses = this.myCourseObj.myCourses;
      this.handleListApprove();
    },
    addCourse(){
      this.title = "可选课程",
      this.columns = this.courseObj.viewColumns;
      this.courses = this.courseObj.myCourses;
      this.handleListApprove();
    },
    showCourse(index) {
      this.$Modal.info({
        title: '课程信息',
        content: 
        `
          课程号：${this.courses[index].cid}<br>
          课程名：${this.courses[index].name}<br>
          学分：${this.courses[index].credit}
        `
      })
    },
    remove (index) {
      this.courses.splice(index, 1);
      this.handleListApprove();
    },
    // 分页控制
    // 获取记录信息
    handleListApprove(){
        // 保存取到的所有数据
        this.ajaxMyCourses = this.courses;
        this.dataCount = this.courses.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(this.courses.length < this.pageSize){
            this.sliceMyCourses = this.ajaxMyCourses;
        }else{
            this.sliceMyCourses = this.ajaxMyCourses.slice(0,this.pageSize);
        }
        console.log(this.sliceMyCourses);
    },
    changepage(index){
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.sliceMyCourses = this.ajaxMyCourses.slice(_start,_end);
    }
  },
  created(){
    this.columns = this.viewColumns;
    this.courses = this.myCourses;
    this.handleListApprove();
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/page";
</style>