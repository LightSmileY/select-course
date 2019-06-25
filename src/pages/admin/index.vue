<template>
  <div id="admin">
    <div class="loginMask" v-if="!isLogin"><!-- !isLogin -->
      <div class="login">
        <div class="title">管理员登录</div>
        <div class="input">
          <Input type="text" v-model="adminId" placeholder="管理员账号">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </div>
        <div class="input">
          <Input type="password" v-model="adminPassword" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </div>
        <div class="input">
          <Button type="primary" @click="login">登录</Button>
        </div>
      </div>
    </div>
    <!-- 添加课程抽屉 -->
    <Drawer
      title="录入课程"
      v-model="isAddCourse"
      width="360"
      :styles="styles"
    >
      <Form :model="newCourse">
          <Col span="24">
            <FormItem label="课程名" label-position="top">
                <Input v-model="newCourse.name" placeholder="请输入课程名..." />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="学分" label-position="top">
              <Input v-model="newCourse.credit" placeholder="请输入课程学分..."></Input>
            </FormItem>
          </Col>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="isAddCourse = false">取消</Button>
        <Button type="primary" @click="addRecord">提交</Button>
      </div>
    </Drawer> 

    <!-- 添加学生抽屉 -->
    <Drawer
      title="录入学生"
      v-model="isAddStudent"
      width="360"
      :styles="styles"
    >
      <Form :model="newStudent">
          <Col span="24">
            <FormItem label="姓名" label-position="top">
                <Input v-model="newStudent.name" placeholder="请输入学生姓名..." />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="性别" label-position="top">
              <Select v-model="newStudent.sex" placeholder="请选择学生性别">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="电话" label-position="top">
              <Input v-model="newStudent.telephone" placeholder="请输入学生电话..."></Input>
            </FormItem>
          </Col>
          
          <Col span="24">
            <FormItem label="学号" label-position="top">
                <Input v-model="newStudent.snumber" placeholder="请输入学生学号..." />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="密码" label-position="top">
              <Input v-model="newStudent.password" placeholder="请输入学生密码..."></Input>
            </FormItem>
          </Col>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="isAddStudent = false">取消</Button>
        <Button type="primary" @click="addRecord">提交</Button>
      </div>
    </Drawer>

    <!-- 添加教师抽屉 -->
    <Drawer
      title="录入教师"
      v-model="isAddTeacher"
      width="360"
      :styles="styles"
    >
      <Form :model="newTeacher">
          <Col span="24">
            <FormItem label="姓名" label-position="top">
                <Input v-model="newTeacher.name" placeholder="请输入教师姓名..." />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="性别" label-position="top">
              <Select v-model="newTeacher.sex" placeholder="请选择教师性别">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="电话" label-position="top">
              <Input v-model="newTeacher.telephone" placeholder="请输入教师电话..."></Input>
            </FormItem>
          </Col>
          
          <Col span="24">
            <FormItem label="教师号" label-position="top">
                <Input v-model="newTeacher.tnumber" placeholder="请输入教师号..." />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="密码" label-position="top">
              <Input v-model="newTeacher.password" placeholder="请输入教师密码..."></Input>
            </FormItem>
          </Col>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="isAddTeacher = false">取消</Button>
        <Button type="primary" @click="addRecord">提交</Button>
      </div>
    </Drawer>

    <!-- 编辑课程弹框 -->
    <Modal v-model="isEditCourse" draggable title="编辑课程资料">
      <Form :model="editCourse">
          <Col span="24">
            <FormItem label="课程名" label-position="top">
                <Input v-model="editCourse.name" placeholder="请输入课程名..." />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="学分" label-position="top">
              <Input v-model="editCourse.credit" placeholder="请输入课程学分..."></Input>
            </FormItem>
          </Col>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="isEditCourse = false">取消</Button>
        <Button type="primary" @click="updateRecord">提交</Button>
      </div>
    </Modal> 

    <!-- 编辑学生弹框 -->
    <Modal v-model="isEditStudent" draggable title="编辑学生资料">
      <Form :model="editStudent">
          <Col span="24">
            <FormItem label="姓名" label-position="top">
                <Input v-model="editStudent.name" placeholder="请输入学生姓名..." />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="性别" label-position="top">
              <Select v-model="editStudent.sex" placeholder="请选择学生性别">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="电话" label-position="top">
              <Input v-model="editStudent.telephone" placeholder="请输入学生电话..."></Input>
            </FormItem>
          </Col>
          
          <Col span="24">
            <FormItem label="学号" label-position="top">
                <Input v-model="editStudent.snumber" placeholder="请输入学生学号..." />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="密码" label-position="top">
              <Input v-model="editStudent.password" placeholder="请输入学生密码..."></Input>
            </FormItem>
          </Col>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="isEditStudent = false">取消</Button>
        <Button type="primary" @click="updateRecord">提交</Button>
      </div>
    </Modal>

    <!-- 编辑教师弹框 -->
    <Modal v-model="isEditTeacher" draggable title="编辑教师资料">
      <Form :model="editTeacher">
          <Col span="24">
            <FormItem label="姓名" label-position="top">
                <Input v-model="editTeacher.name" placeholder="请输入教师姓名..." />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="性别" label-position="top">
              <Select v-model="editTeacher.sex" placeholder="请选择教师性别">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="电话" label-position="top">
              <Input v-model="editTeacher.telephone" placeholder="请输入教师电话..."></Input>
            </FormItem>
          </Col>
          
          <Col span="24">
            <FormItem label="教师号" label-position="top">
                <Input v-model="editTeacher.tnumber" placeholder="请输入教师号..." />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="密码" label-position="top">
              <Input v-model="editTeacher.password" placeholder="请输入教师密码..."></Input>
            </FormItem>
          </Col>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="isEditTeacher = false">取消</Button>
        <Button type="primary" @click="updateRecord">提交</Button>
      </div>
    </Modal>



    <div class="body">
      <div class="container">
        <div class="nav">
          <dl @click="toCourseList">
            <dt><img src="@/assets/images/course.png"></dt>
            <dd>课程</dd>
          </dl>
          <dl @click="toStudentList">
            <dt><img src="@/assets/images/student.png"></dt>
            <dd>学生</dd>
          </dl>
          <dl @click="toTeacherList">
            <dt><img src="@/assets/images/teacher.png"></dt>
            <dd>教师</dd>
          </dl>
        </div>
        <div class="info">
          <div class="title">
            <p>{{title}}</p>
            <dl>
              <dt></dt>
              <dd></dd>
            </dl>
            <!-- <div class="viewCourse" title="查看所有课程" @click="viewCourse">
              <img src="@/assets/icon/view.png">
            </div> -->
            <div class="addCourse" title="添加" @click="toAddRecord">
              <div class="add">+</div>
            </div>
          </div>
          <!-- 搜索课程 -->
          <div class="main">
            <div class="search">
              <Input class-name="input" search placeholder="输入课程名查询课程..." v-model="searchData" @on-change="searchObj"/>
            </div>
            <!-- 我的课表 || 添加课程 -->
            <Table  highlight-row ellipsis="true" :columns="columns" :data="sliceMyCourses"></Table>
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
      formValidate: {
          name: '',
          mail: '',
          city: '',
          gender: '',
          interest: [],
          date: '',
          time: '',
          desc: ''
      },
      ruleValidate: {
          name: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          mail: [
              { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
              { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
          ],
          city: [
              { required: true, message: 'Please select the city', trigger: 'change' }
          ],
          gender: [
              { required: true, message: 'Please select gender', trigger: 'change' }
          ],
          interest: [
              { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
              { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
          ],
          date: [
              { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
          ],
          time: [
              { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
          ],
          desc: [
              { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
              { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
          ]
      },
      // 抽屉
      isAddCourse: false,
      isAddStudent: false,
      isAddTeacher: false,
      isEditCourse: false,
      isEditStudent: false,
      isEditTeacher: false,

      editIndex: 0,

      styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
      },

      isLogin: false,

      // 登录表单
      formInline: {
        user: '',
        password: ''
      },
      // 课程对象
      newCourse:{
        cid: "",
        name: "",
        credit: ""
      },
      editCourse: {
        cid: "",
        name: "",
        credit: ""
      },
      // 学生对象
      newStudent:{
        snumber: "",
        name: "",
        password: "",
        sex: "",
        telephone: ""
      },
      editStudent:{
        snumber: "",
        name: "",
        password: "",
        sex: "",
        telephone: ""
      },
      // 教师对象
      newTeacher:{
        tnumber: "",
        name: "",
        password: "",
        sex: "",
        telephone: ""
      },
      editTeacher:{
        tnumber: "",
        name: "",
        password: "",
        sex: "",
        telephone: ""
      },

      // 表单验证
      loginRule: {
        adminId: [
          { required: true, message: '请输入用户名！', trigger: 'blur' }
        ],
        adminPassword: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ]
      },

      modal7: false,

      status: 1,  //状态码
      title: "课程",
      dataObj: {},
      columns: [],
      courses: [],
      searchData: "",

      adminId: "",
      adminPassword: "",
      //分页器中临时数据
      ajaxMyCourses: [],
      sliceMyCourses: [],
      // 分页控制
      dataCount: 0,
      pageSize: 8,
      // pageCurrent: 0,
      
      courseObj: {
        viewColumns: [
          {
            title: 'id',
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
                  props:{
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
                      _this.editIndex = _this.courses[params.index].cid;
                      console.log(_this.editIndex);
                      _this.isEditCourse = true;
                    }
                  }
                }, '编辑'),
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
                        title: '确定删除该课程吗',
                        onOk: () => {
                          let _this = this;
                          let _cid = _this.courses[params.index].cid;
                          console.log(_cid);
                          _this.$axios.delete('http://106.14.46.10:8082/TeachingAffairs/course/delete',{
                              params: {
                                  cid: _cid
                              }
                            }
                          )
                          .then(response => {
                            this.remove(params.index)
                            console.log(response);
                            _this.$Message.success('删除成功');
                            _this.login();
                          })
                          .catch(error => {
                            console.log(error);
                          });
                        },
                        onCancel: () => {
                          this.$Message.info('取消删除');
                        }
                      });
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      },

      teacherObj: {
        viewColumns: [
          {
            title: 'id',
            key: 'tid',
            align: 'center',
          },
          {
            title: '教师号',
            key: 'tnumber',
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
            title: '密码',
            key: 'password',
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
                        this.showTeacher(params.index)
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
                      _this.editIndex = _this.courses[params.index].tid;
                      console.log(_this.editIndex);
                      _this.isEditTeacher = true;
                    }
                  }
                }, '编辑'),
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
                        title: '确定删除该教师吗',
                        onOk: () => {
                          let _this = this;
                          let _tid = _this.courses[params.index].tid;
                          console.log(_tid);
                          _this.$axios.delete('http://106.14.46.10:8082/TeachingAffairs/teacher/delete',{
                              params: {
                                  tid: _tid
                              }
                            }
                          )
                          .then(response => {
                            this.remove(params.index)
                            console.log(response);
                            _this.$Message.success('删除成功');
                            _this.login();
                          })
                          .catch(error => {
                            console.log(error);
                          });
                        },
                        onCancel: () => {
                          this.$Message.info('取消删除');
                        }
                      });
                    }
                  }
                }, '删除')
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
            title: '密码',
            key: 'password',
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
                        this.showStudent(params.index)
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
                      _this.editIndex = _this.courses[params.index].sid;
                      console.log(_this.editIndex);
                      _this.isEditStudent = true;
                    }
                  }
                }, '编辑'),
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
                        title: '确定删除该学生吗',
                        onOk: () => {
                          let _this = this;
                          let _sid = _this.courses[params.index].sid;
                          console.log(_sid);
                          _this.$axios.delete('http://106.14.46.10:8082/TeachingAffairs/student/deleteStudent',{
                              params: {
                                  sid: _sid
                              }
                            }
                          )
                          .then(response => {
                            this.remove(params.index)
                            console.log(response);
                            _this.$Message.success('删除成功');
                            _this.login();
                          })
                          .catch(error => {
                            console.log(error);
                          });
                        },
                        onCancel: () => {
                          this.$Message.info('取消删除');
                        }
                      });
                    }
                  }
                }, '删除')
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
      _this.$axios.post('http://106.14.46.10:8082/TeachingAffairs/login/admin',
        _this.$qs.stringify({
          name: _this.adminId,
          password: _this.adminPassword
        })
      )
      .then(response => {
        console.log(response);
        _this.$store.state.status.admin = true;
        console.log("获取数据成功");
        _this.isLogin = _this.$store.state.status.admin;
        _this.courseObj.myCourses = response.data.courses;
        _this.studentObj.myCourses = response.data.students;
        _this.teacherObj.myCourses = response.data.teachers;
        if(_this.status === 1){
          _this.toCourseList();
        }else if(_this.status === 2) {
          _this.toStudentList();
        }else{
          _this.toTeacherList();
        }
        
      })
      .catch(error => {
        console.log(error);
        console.log("获取数据失败");
      });
    },

    // 搜索数据
    searchObj(){
      if(this.searchData === ""){
        this.login();
      }else{
        for(let i in this.courses){
          if(this.courses[i].name === this.searchData){
            let tempData = this.courses[i];
            this.courses.splice(0,this.courses.length);
            this.courses.push(tempData);
          }
        }
      }
      console.log(this.courses);
    },

    //切换菜单
    toCourseList(){
      this.title = "课程";
      this.status = 1;
      console.log(this.status);
      this.dataObj = this.courseObj;
      this.columns = this.dataObj.viewColumns;
      this.courses = this.dataObj.myCourses;
      this.handleListApprove();
    },
    toStudentList(){
      this.title = "学生";
      this.status = 2;
      console.log(this.status);
      this.dataObj = this.studentObj;
      this.columns = this.dataObj.viewColumns;
      this.courses = this.dataObj.myCourses;
      this.handleListApprove();
    },
    toTeacherList(){
      this.title = "教师";
      this.status = 3;
      console.log(this.status);
      this.dataObj = this.teacherObj;
      this.columns = this.dataObj.viewColumns;
      this.courses = this.dataObj.myCourses;
      this.handleListApprove();
    },

    // 打开对应抽屉
    toAddRecord(){
      if(this.status === 1){
        this.isAddCourse = true;
      }else if(this.status === 2) {
        this.isAddStudent = true;
      }else{
        this.isAddTeacher = true;
      }
    },
    // 清空数据
    clearCourse(){
      this.newCourse.name = "",
      this.newCourse.credit = "",
      this.editCourse.name = "",
      this.editCourse.credit = ""
    },
    clearStudent(){
      this.newStudent.name = "",
      this.newStudent.sex = "",
      this.newStudent.telephone = "",
      this.newStudent.snumber = "",
      this.newStudent.password = "",
      this.editStudent.name = "",
      this.editStudent.sex = "",
      this.editStudent.telephone = "",
      this.editStudent.snumber = "",
      this.editStudent.password = ""
    },
    clearTeacher(){
      this.newTeacher.name = "",
      this.newTeacher.sex = "",
      this.newTeacher.telephone = "",
      this.newTeacher.tnumber = "",
      this.newTeacher.password = "",
      this.editTeacher.name = "",
      this.editTeacher.sex = "",
      this.editTeacher.telephone = "",
      this.editTeacher.tnumber = "",
      this.editTeacher.password = ""
    },

    //添加
    addRecord(){
      let _this = this;
      if(_this.status === 1){
        // 添加课程
        _this.newCourse._credit = parseInt(_this.newCourse.credit);
        _this.$axios.post('http://106.14.46.10:8082/TeachingAffairs/course/add',
          _this.$qs.stringify({
            cid: _this.newCourse.cid,
            name: _this.newCourse.name,
            credit: _this.newCourse._credit
          })
        )
        .then(response => {
          console.log(response);
          _this.$Message.success('添加成功');
          _this.login();
          _this.isAddCourse = false;
          _this.clearCourse();
        })
        .catch(error => {
          console.log(error);
          _this.$Message.error('添加失败');
        });
      }else if(_this.status === 2){
        // 添加学生
        _this.newStudent._sex = parseInt(_this.newStudent.sex);
        _this.$axios.post('http://106.14.46.10:8082/TeachingAffairs/student/addStudent',
          _this.$qs.stringify({
            snumber: _this.newStudent.snumber,
            name: _this.newStudent.name,
            password: _this.newStudent.password,
            sex: _this.newStudent._sex,
            telephone: _this.newStudent.telephone
          })
        )
        .then(response => {
          console.log(response);
          _this.$Message.success('添加成功');
          _this.isAddStudent = false;
          _this.clearStudent();
          _this.login();
        })
        .catch(error => {
          console.log(error);
          _this.$Message.error('添加失败');
        });
      }else{
        // 添加教师
        _this.newTeacher._sex = parseInt(_this.newTeacher.sex);
        _this.$axios.post('http://106.14.46.10:8082/TeachingAffairs/teacher/add',
          _this.$qs.stringify({
            tnumber: _this.newTeacher.tnumber,
            name: _this.newTeacher.name,
            password: _this.newTeacher.password,
            sex: _this.newTeacher._sex,
            telephone: _this.newTeacher.telephone
          })
        )
        .then(response => {
          console.log(response);
          _this.$Message.success('添加成功');
          _this.login();
          _this.isAddTeacher = false;
          _this.clearTeacher();
        })
        .catch(error => {
          console.log(error);
          _this.$Message.error('添加失败');
        });
      }

    },

    //修改
    updateRecord(){
      let _this = this;
      if(_this.status === 1){
        console.log(this.editIndex);
        _this.editCourse.credit = parseInt(_this.editCourse.credit);
        _this.$axios.put('http://106.14.46.10:8082/TeachingAffairs/course/update',
          _this.$qs.stringify({
            cid: _this.editIndex,
            name: _this.editCourse.name,
            credit: _this.editCourse.credit
          })
        )
        .then(response => {
          console.log(response);
          _this.isEditCourse = false;
          _this.login();
          _this.$Message.success('修改成功');
        })
        .catch(error => {
          console.log(error);
          _this.isEditStudent = false;
          _this.$Message.error('修改失败');
        });
      }else if(_this.status === 2){
        _this.editStudent.sex = parseInt(_this.editStudent.sex);
        _this.$axios.put('http://106.14.46.10:8082/TeachingAffairs/student/updateStudent', 
          _this.$qs.stringify({
            sid: _this.editIndex,
            snumber: _this.editStudent.snumber,
            name: _this.editStudent.name,
            password: _this.editStudent.password,
            sex: _this.editStudent.sex,
            telephone: _this.editStudent.telephone
          })
        )
        .then(response => {
          console.log(response);
          _this.isEditStudent = false;
          _this.login();
          _this.$Message.success('修改成功');
        })
        .catch(error => {
          console.log(error);
          _this.isEditStudent = false;
          _this.$Message.error('修改失败');
        });
      }else{
        _this.editStudent.sex = parseInt(_this.editStudent.sex);
        console.log(this.status);
        _this.$axios.put('http://106.14.46.10:8082/TeachingAffairs/teacher/update',
          _this.$qs.stringify({
            tid: _this.editIndex,
            tnumber: _this.editTeacher.tnumber,
            name: _this.editTeacher.name,
            password: _this.editTeacher.password,
            sex: _this.editTeacher.sex,
            telephone: _this.editTeacher.telephone
          })
        )
        .then(response => {
          console.log(response);
          _this.isEditTeacher = false;
          _this.login();
          _this.$Message.success('修改成功');
        })
        .catch(error => {
          console.log(error);
          _this.isEditStudent = false;
          _this.$Message.error('修改失败');
        });
      }
      _this.login();
    },

    showCourse (index) {
      this.$Modal.info({
        title: '课程信息',
        content: 
        `
          id：${this.courses[index].cid}<br>
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
    showTeacher(index){
      this.$Modal.info({
      title: '教师信息',
        content:
        `
          id：${this.courses[index].tid}<br>
          教师号：${this.courses[index].tnumber}<br>
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
    },


    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  },
  beforeCreate(){
    // this.$Modal.confirm({
    //   render: (h) => {
    //     return h('div', [
    //       h("Input", {
    //         props: {
    //           value: this.value,
    //           autofocus: true,
    //           placeholder: 'Please enter your name...'
    //         },
    //         on: {
    //           input: (val) => {
    //             this.value = val;
    //           }
    //         }
    //       }),
    //       h("Input", {
    //         props: {
    //           value: this.value,
    //           autofocus: true,
    //           placeholder: 'Please enter your name...'
    //         },
    //         on: {
    //           input: (val) => {
    //             this.value = val;
    //           }
    //         }
    //       }),
    //     ])
    //   },
    // })
  },
  dataAssign(data){
    this.dataObj = this.studentObj;
    this.columns = this.dataObj.viewColumns;
    this.courses = this.dataObj.myCourses;
    this.handleListApprove();
  },
  created(){
    this.modal7 = true;
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/admin";
  .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>