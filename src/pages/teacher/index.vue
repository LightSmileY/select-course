<template>
  <div id="page">
    <div class="loginMask" v-if="!isLogin"><!-- !isLogin -->
      <div class="login">
        <div class="title">教师登录</div>
        <div class="input">
          <Input type="text" v-model="adminId" placeholder="教职工号">
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

    <!-- 评分框 -->
    <Modal v-model="isScore" draggable title="给该学生评分">
      <Form>
        <Col span="24">
            <Input style="margin-bottom: 15px" v-model="studentScore" placeholder="请输入该学生的得分..."></Input>
        </Col>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="isScore = false">取消</Button>
        <Button type="primary" @click="updateGrade">提交</Button>
      </div>
    </Modal> 


    <div class="body">
      <div class="container">
        <div class="info">
          <div class="title">
            <p>{{title}}</p>
            <dl>
              <dt>{{myInfo.tnumber}}</dt>
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
      studentScoreId: 0,

      isScore: false,
      studentScore: "",  //学生成绩

      g_cid: 0,
      g_sid: 0,

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
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '15px',
                    color: '#fff'
                  },
                  on: {
                    click: () => {
                      let _this = this;
                      let _cid = _this.courses[params.index].cid;
                      _this.g_cid = _this.courses[params.index].cid;
                      console.log(_this.myInfo.tid);
                      console.log(typeof(_this.myInfo.tid));
                      console.log(typeof(_cid));
                      console.log(_cid);
                      _this.$axios.get('http://106.14.46.10:8082/TeachingAffairs/electCourse/getAllStudents',{
                        params: {
                          cid: _cid
                        }
                      })
                      .then(response => {
                        console.log(response);
                        _this.title = _this.courses[params.index].name + "课程学生列表"
                        _this.studentObj.myCourses = response.data;
                        _this.dataObj = this.studentObj;
                        _this.columns = this.dataObj.viewColumns;
                        _this.courses = this.dataObj.myCourses;
                        _this.handleListApprove();
                      })
                      .catch(error => {
                        console.log(error);
                      });
                    }
                  }
                }, '学生'),
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
                        title: '确定不再教授该课程吗',
                        onOk: () => {
                          let _this = this;
                          let _cid = _this.courses[params.index].cid;
                          _this.$axios.delete('http://106.14.46.10:8082/TeachingAffairs/teach/delete',{
                              params: {
                                tid: _this.myInfo.tid,
                                cid: _cid
                              }
                            }
                          )
                          .then(response => {
                            this.remove(params.index)
                            console.log(response);
                            _this.$Message.success('退课成功');
                            _this.login();
                          })
                          .catch(error => {
                            console.log(error);
                            _this.$Message.error('退课失败');
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
                    marginRight: '15px',
                    color: '#fff'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '确定选择教授该课程吗',
                        onOk: () => {
                          let _this = this;
                          let _cid = _this.courses[params.index].cid;
                          console.log(_this.myInfo.tid);
                          console.log(typeof(_this.myInfo.tid));
                          console.log(typeof(_cid));
                          console.log(_cid);
                          _this.$axios.post('http://106.14.46.10:8082/TeachingAffairs/teach/add',
                            _this.$qs.stringify({
                              tid: _this.myInfo.tid,
                              cid: _cid
                              // grade: 100
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
                }, '选课'),
                
              ]);
            }
          }
        ]
      },

      studentObj: {
        viewColumns: [
          {
            title: 'id',
            key: 'sid',
            align: 'center',
          },
          {
            title: '学号',
            key: 'snumber',
            align: 'center',
          },
          {
            title: '姓名',
            key: 'name',
            align: 'center',
          },
          {
            title: '性别',
            key: 'sex',
            align: 'center',
          },
          {
            title: '电话',
            key: 'telephone',
            align: 'center',
          },
          {
            title: '分数',
            key: 'grade',
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
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '15px',
                    color: '#fff'
                  },
                  on: {
                    click: () => {
                        this.showStudent(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: '',
                    size: 'small'
                  },
                  style: {
                    color: '#fff'
                  },
                  on: {
                    click: () => {
                      let _this = this;
                      let _sid = _this.courses[params.index].sid;
                      _this.g_sid = _this.courses[params.index].sid;

                      _this.isScore = true;
                      // _this.$axios.put('http://106.14.46.10:8082/TeachingAffairs/electCourse/updateRecord',
                      //   _this.$qs.stringify({
                      //       sid: _sid,
                      //       cid: _this.g_cid, //全局监听获取
                      //       grade: 90
                      //   })
                      // )
                      // .then(response => {
                      //   console.log(response);
                      //   console.log("评分成功");
                      //   _this.$Message.success('评分成功');
                      // })
                      // .catch(error => {
                      //   console.log(error);
                      //   _this.$Message.error('评分失败');
                      // });
                    }
                  }
                }, '评分')
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
      _this.$axios.post('http://106.14.46.10:8082/TeachingAffairs/login/teacher',
        _this.$qs.stringify({
          tnumber: _this.adminId,
          password: _this.adminPassword
        })
      )
      .then(response => {
        console.log(response);
        console.log("获取数据成功");
        _this.isLogin = true;
        _this.myCourseObj.myCourses = response.data.records;
        _this.courseObj.myCourses = response.data.remains;

        // 查询一位老师
        _this.$axios.get('http://106.14.46.10:8082/TeachingAffairs/teacher/get',{
            params: {
              tnumber: _this.adminId
            }
          })
        .then(response => {
          console.log(response);
          console.log("获取教师资料成功");
          _this.myInfo = response.data;
          console.log(_this.myInfo);
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
    //评分
    updateGrade(){
      let _this = this;
      _this.studentScore = parseInt(_this.studentScore);
      _this.$axios.put('http://106.14.46.10:8082/TeachingAffairs/electCourse/updateRecord',
        _this.$qs.stringify({
            sid: _this.g_sid,
            cid: _this.g_cid, //全局监听获取
            grade: _this.studentScore
        })
      )
      .then(response => {
        console.log(response);
        _this.isScore = false;
        console.log("评分成功");
        _this.$Message.success('评分成功');
        _this.studentScore = "";
      })
      .catch(error => {
        console.log(error);
        _this.$Message.error('评分失败');
      });
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
    showStudent(index){
      this.$Modal.info({
      title: '学生信息',
        content:
        `
          id：${this.courses[index].sid}<br>
          学号：${this.courses[index].snumber}<br>
          姓名：${this.courses[index].name}<br>
          性别：${this.courses[index].sex}<br>
          电话：${this.courses[index].telephone}<br>
          密码：${this.courses[index].password}
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