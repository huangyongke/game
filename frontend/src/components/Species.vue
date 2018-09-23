<template>
  <row>
    <i-col span="8">
      <Card>
        <h2 style="text-align:center;">游戏管理</h2>
        <row class="content">
          <div class="search-form">
            <row class="query">
              <label class="top-label">编号</label>
              <i-input v-model="typedata.id" @on-enter="gettypedata()" placeholder="请输入编号" style="width: 100px"></i-input>
            </row>
            <row class="query">
              <label class="top-label">名称</label>
              <i-input v-model="typedata.name" @on-enter="gettypedata()" placeholder="请输入账号" style="width: 100px"></i-input>
            </row>
            <row class="search">
              <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="gettypedata()">搜索</i-button>
            </row>
          </div>
        </row>
        <row class="content">
          <i-button class="oper" type="primary" @click="addtype">添加游戏</i-button>
          <Modal v-model="addtype1" title="添加游戏" @on-ok="type_addok('addtypeform')" @on-cancel="cancel">
            <Form ref="addtypeform" :model="addtypeform" :rules="addtyperule" label-position="right" :label-width="100">
              <FormItem label="游戏名称" prop="name">
                <Input type="text" v-model="addtypeform.name" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="type_modify">修改游戏</i-button>
          <Modal v-model="type_modify1" title="修改游戏信息" @on-ok="type_modifyok('modifytypeform')" @on-cancel="cancel">
            <Form ref="modifytypeform" :rules="modifytyperule" :model="modifytypeform" label-position="right" :label-width="100">
              <FormItem label="游戏编号">
                <Input type="text" disabled v-model="modifytypeform.id" style="width:200px">
              </FormItem>
              <FormItem label="游戏名称" prop="name">
                <Input type="text" v-model="modifytypeform.name" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="deletetype()">删除游戏</i-button>
        </row>
        <div style="margin-top: 20px;">
          <i-table highlight-row @on-current-change='typecurrentchange' border :height="400" :columns="type_columns" :data="type_table_data"></i-table>
          <p style="text-align:center;margin-top:5px;">共{{type_table_data.length}}条记录</p>

        </div>

      </Card>
    </i-col>
    <i-col span="8">
      <Card>
        <h2 style="text-align:center;">战区管理</h2>
        <row class="content">
          <div class="search-form">
            <row class="query">
              <label class="top-label">编号</label>
              <i-input v-model="zonedata.id" @on-enter="getzonedata()" placeholder="请输入编号" style="width: 100px"></i-input>
            </row>
            <row class="query">
              <label class="top-label">名称</label>
              <i-input v-model="zonedata.name" @on-enter="getzonedata()" placeholder="请输入名称" style="width: 100px"></i-input>
            </row>
            <row class="search">
              <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="getzonedata()">搜索</i-button>
            </row>
          </div>
        </row>
        <row class="content">
          <i-button class="oper" type="primary" @click="addzone">添加战区</i-button>
          <Modal v-model="addzone1" title="新增游戏战区" @on-ok="zone_addok('addzoneform')" @on-cancel="cancel">
            <Form ref="addzoneform" :rules="addzonerule" :model="addzoneform" label-position="right" :label-width="100">
              <FormItem label="战区名称" prop="name">
                <Input type="text" v-model="addzoneform.name" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="zone_modify">修改战区</i-button>
          <Modal v-model="zone_modify1" title="修改战区信息" @on-ok="zone_modifyok('modifyzoneform')" @on-cancel="cancel">
            <Form ref="modifyzoneform" :rules="modifyzonerule" :model="modifyzoneform" label-position="right" :label-width="100">
              <FormItem label="战区编号">
                <Input type="text" disabled v-model="modifyzoneform.id" style="width:200px">
              </FormItem>
              <FormItem label="战区名称" prop="name">
                <Input type="text" v-model="modifyzoneform.name" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="deletezone()">删除战区</i-button>
        </row>
        <div style="margin-top: 20px;">
          <i-table highlight-row @on-current-change='zonecurrentchange' border :height="400" :columns="zone_columns" :data="zone_table_data"></i-table>
          <p style="text-align:center;margin-top:5px;">共{{zone_table_data.length}}条记录</p>
        </div>

      </Card>
    </i-col>
    <i-col span="8">
      <Card>
        <h2 style="text-align:center;">大区管理</h2>
        <row class="content">
          <div class="search-form">
            <row class="query">
              <label class="top-label">编号</label>
              <i-input v-model="areadata.id" @on-enter="getareadata()" placeholder="请输入编号" style="width: 100px"></i-input>
            </row>
            <row class="query">
              <label class="top-label">名称</label>
              <i-input v-model="areadata.name" @on-enter="getareadata()" placeholder="请输入大区" style="width: 100px"></i-input>
            </row>
            <row class="search">
              <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="getareadata()">搜索</i-button>
            </row>
          </div>
        </row>
        <row class="content">
          <i-button class="oper" type="primary" @click="addarea">添加大区</i-button>
          <Modal v-model="addarea1" title="新增游戏大区" @on-ok="area_addok('addareaform')" @on-cancel="cancel">
            <Form ref="addareaform" :rules="addarearule" :model="addareaform" label-position="right" :label-width="100">
              <FormItem label="大区名称" prop="name">
                <Input type="text" v-model="addareaform.name" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="area_modify">修改大区</i-button>
          <Modal v-model="area_modify1" title="修改大区信息" @on-ok="area_modifyok('modifyareaform')" @on-cancel="cancel">
            <Form ref="modifyareaform" :rules="modifyarearule" :model="modifyareaform" label-position="right" :label-width="100">
              <FormItem label="大区编号">
                <Input type="text" disabled v-model="modifyareaform.id" style="width:200px">
              </FormItem>
              <FormItem label="大区名称" prop="name">
                <Input type="text" v-model="modifyareaform.name" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="deletearea()">删除大区</i-button>
        </row>
        <div style="margin-top: 20px;">
          <i-table highlight-row @on-current-change='areacurrentchange' border :height="400" :columns="area_columns" :data="area_table_data"></i-table>
          <p style="text-align:center;margin-top:5px;">共{{area_table_data.length}}条记录</p>
        </div>

      </Card>
    </i-col>
  </row>
</template>
      
<script>
import { Modal } from 'iview'

export default {
  name: 'PersonalBuy',
  data() {
    return {
      addtype1: false,
      type_modify1: false,
      addarea1: false,
      area_modify1: false,
      addzone1: false,
      zone_modify1: false,
      addtypeform: {
        name: ''
      },
      modifytypeform: {
        id: '',
        name: ''
      },
      addzoneform: {
        name: ''
      },
      modifyzoneform: {
        id: '',
        name: ''
      },
      addareaform: {
        name: ''
      },
      modifyareaform: {
        id: '',
        name: ''
      },
      addtyperule: {
        name: [
          {
            required: true,
            message: '游戏名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      modifytyperule: {
        name: [
          {
            required: true,
            message: '游戏名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      addzonerule: {
        name: [
          {
            required: true,
            message: '游戏区域不能为空',
            trigger: 'blur'
          }
        ]
      },
      modifyzonerule: {
        name: [
          {
            required: true,
            message: '游戏区域不能为空',
            trigger: 'blur'
          }
        ]
      },
      addarearule: {
        name: [
          {
            required: true,
            message: '游戏区域不能为空',
            trigger: 'blur'
          }
        ]
      },
      modifyarearule: {
        name: [
          {
            required: true,
            message: '游戏区域不能为空',
            trigger: 'blur'
          }
        ]
      },
      typedata: {
        id: '',
        name: ''
      },
      areadata: {
        id: '',
        name: ''
      },
      zonedata: {
        id: '',
        name: ''
      },
      type_columns: [
        {
          title: '游戏编号',
          align: 'center',
          key: 'id'
        },
        {
          title: '游戏名称',
          key: 'name'
        }
      ],
      zone_columns: [
        {
          title: '战区编号',
          align: 'center',
          key: 'id'
        },
        {
          title: '战区名称',
          key: 'name'
        }
      ],
      area_columns: [
        {
          title: '大区编号',
          align: 'center',
          key: 'id'
        },
        {
          title: '大区名称',
          key: 'area'
        }
      ],
      type_table_data: [],
      zone_table_data: [],
      area_table_data: [],
      typecurrentrow: {
        id: '',
        name: ''
      },
      zonecurrentrow: {
        id: '',
        name: ''
      },
      areacurrentrow: {
        id: '',
        name: ''
      }
    }
  },
  //这两个map是vuex的部分
  computed: {},
  mounted() {
    this.gettypedata()
  },
  watch: {},
  methods: {
    //for vuex
    addtype: function() {
      this.addtype1 = true
    },
    type_modify: function() {
      if (this.typecurrentrow.id == '') {
        this.$Notice.warning({ title: '请选择需要修改的游戏' })
      } else {
        this.type_modify1 = true
      }
    },
    addzone: function() {
      if (this.typecurrentrow.id == '') {
        this.$Notice.warning({ title: '请选择需要添加战区的游戏' })
      } else {
        this.addzone1 = true
      }
    },
    zone_modify: function() {
      if (this.zonecurrentrow.id == '') {
        this.$Notice.warning({ title: '请选择需要修改的战区' })
      } else {
        this.zone_modify1 = true
      }
    },
    addarea: function() {
      if (this.zonecurrentrow.id == '') {
        this.$Notice.warning({ title: '请选择需要添加大区的战区' })
      } else {
        this.addarea1 = true
      }
    },
    area_modify: function() {
      if (this.areacurrentrow.id == '') {
        this.$Notice.warning({ title: '请选择需要修改的战区' })
      } else {
        this.area_modify1 = true
      }
    },
    type_addok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http({
            url: '/api/addGameCategory',
            method: 'POST',
            body: {
              name: this.addtypeform.name
            },
            dataType: 'json'
          }).then(function(res) {
            if (res.body === 'login') {
              this.$Modal.warning({
                title: '您还没有登录',
                content: '<p>是否跳转到登录界面登录</p>',
                onOk: () => {
                  this.$router.push({ path: '/login' })
                },
                onCancel: () => {}
              })
            } else if (res.body === 'admin') {
              this.$Modal.error({
                title: '您没有权限',
                onOk: () => {
                  this.$router.push({ path: '/index' })
                },
                onCancel: () => {}
              })
            } else if (res.body == 'exist') {
              this.$Message.error('添加失败，游戏已存在')
            } else {
              this.gettypedata()
              this.$Message.success('添加成功')
              this.handleReset(name)
            }
          })
        } else {
          this.$Message.error('请正确输入')
        }
      })
    },
    type_modifyok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http({
            url: '/api/updateGameCategory',
            method: 'POST',
            body: {
              id: this.modifytypeform.id,
              name: this.modifytypeform.name
            },
            dataType: 'json'
          }).then(function(res) {
            if (res.body === 'login') {
              this.$Modal.warning({
                title: '您还没有登录',
                content: '<p>是否跳转到登录界面登录</p>',
                onOk: () => {
                  this.$router.push({ path: '/login' })
                },
                onCancel: () => {}
              })
            } else if (res.body === 'admin') {
              this.$Modal.error({
                title: '您没有权限',
                onOk: () => {
                  this.$router.push({ path: '/index' })
                },
                onCancel: () => {}
              })
            } else if (res.body == 'exist') {
              this.$Message.error('修改失败，游戏已存在')
            } else {
              this.gettypedata()
              this.$Message.success('修改成功')
            }
          })
        } else {
          this.$Message.error('请正确输入')
        }
      })
    },
    deletetype() {
      if (this.typecurrentrow.id == '') {
        this.$Notice.warning({ title: '请选择需要删除的游戏' })
      } else {
        this.$Modal.confirm({
          title: '确认删除',
          content: '你确认删除 ' + this.typecurrentrow.name + ' 这个游戏吗吗？',
          onOk: () => {
            this.$http({
              url: '/api/deleteGameCategory',
              method: 'POST',
              body: {
                id: this.typecurrentrow.id
              },
              dataType: 'json'
            }).then(function(res) {
              if (res.body === 'login') {
                this.$Modal.warning({
                  title: '您还没有登录',
                  content: '<p>是否跳转到登录界面登录</p>',
                  onOk: () => {
                    this.$router.push({ path: '/login' })
                  },
                  onCancel: () => {}
                })
              } else if (res.body === 'admin') {
                this.$Modal.error({
                  title: '您没有权限',
                  onOk: () => {
                    this.$router.push({ path: '/index' })
                  },
                  onCancel: () => {}
                })
              } else if (res.body == 'exist') {
                this.$Message.error('删除失败，游戏区域不为空')
              } else {
                this.gettypedata()
                this.$Message.success('删除成功')
              }
            })
          },
          onCancel: () => {}
        })
      }
    },
    zone_addok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http({
            url: '/api/addWarZone',
            method: 'POST',
            body: {
              id: this.typecurrentrow.id,
              name: this.addzoneform.name
            },
            dataType: 'json'
          }).then(function(res) {
            if (res.body === 'login') {
              this.$Modal.warning({
                title: '您还没有登录',
                content: '<p>是否跳转到登录界面登录</p>',
                onOk: () => {
                  this.$router.push({ path: '/login' })
                },
                onCancel: () => {}
              })
            } else if (res.body === 'admin') {
              this.$Modal.error({
                title: '您没有权限',
                onOk: () => {
                  this.$router.push({ path: '/index' })
                },
                onCancel: () => {}
              })
            } else if (res.body == 'exist') {
              this.$Message.error('添加失败，战区已存在')
            } else {
              this.getzonedata()
              this.$Message.success('添加成功')
              this.handleReset(name)
            }
          })
        } else {
          this.$Message.error('请正确输入')
        }
      })
    },
    zone_modifyok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http({
            url: '/api/updateWarZone',
            method: 'POST',
            body: {
              category_id: this.typecurrentrow.id,
              id: this.modifyzoneform.id,
              name: this.modifyzoneform.name
            },
            dataType: 'json'
          }).then(function(res) {
            if (res.body === 'login') {
              this.$Modal.warning({
                title: '您还没有登录',
                content: '<p>是否跳转到登录界面登录</p>',
                onOk: () => {
                  this.$router.push({ path: '/login' })
                },
                onCancel: () => {}
              })
            } else if (res.body === 'admin') {
              this.$Modal.error({
                title: '您没有权限',
                onOk: () => {
                  this.$router.push({ path: '/index' })
                },
                onCancel: () => {}
              })
            } else if (res.body == 'exist') {
              this.$Message.error('修改失败，战区已存在')
            } else {
              this.getzonedata()
              this.$Message.success('修改成功')
            }
          })
        } else {
          this.$Message.error('请正确输入')
        }
      })
    },
    deletezone() {
      if (this.zonecurrentrow.id == '') {
        this.$Notice.warning({ title: '请选择需要删除的战区' })
      } else {
        this.$Modal.confirm({
          title: '确认删除',
          content: '你确认删除 ' + this.zonecurrentrow.name + ' 这个战区区吗？',
          onOk: () => {
            this.$http({
              url: '/api/deleteWarZone',
              method: 'POST',
              body: {
                id: this.zonecurrentrow.id
              },
              dataType: 'json'
            }).then(function(res) {
              if (res.body === 'login') {
                this.$Modal.warning({
                  title: '您还没有登录',
                  content: '<p>是否跳转到登录界面登录</p>',
                  onOk: () => {
                    this.$router.push({ path: '/login' })
                  },
                  onCancel: () => {}
                })
              } else if (res.body === 'admin') {
                this.$Modal.error({
                  title: '您没有权限',
                  onOk: () => {
                    this.$router.push({ path: '/index' })
                  },
                  onCancel: () => {}
                })
              } else if (res.body == 'exist') {
                this.$Message.error('删除失败，大区不为空')
              } else {
                this.getzonedata()
                this.$Message.success('删除成功')
              }
            })
          },
          onCancel: () => {}
        })
      }
    },
    area_addok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http({
            url: '/api/addGameArea',
            method: 'POST',
            body: {
              id: this.zonecurrentrow.id,
              name: this.addareaform.name
            },
            dataType: 'json'
          }).then(function(res) {
            if (res.body === 'login') {
              this.$Modal.warning({
                title: '您还没有登录',
                content: '<p>是否跳转到登录界面登录</p>',
                onOk: () => {
                  this.$router.push({ path: '/login' })
                },
                onCancel: () => {}
              })
            } else if (res.body === 'admin') {
              this.$Modal.error({
                title: '您没有权限',
                onOk: () => {
                  this.$router.push({ path: '/index' })
                },
                onCancel: () => {}
              })
            } else if (res.body == 'exist') {
              this.$Message.error('添加失败，大区已存在')
            } else {
              this.getareadata()
              this.$Message.success('添加成功')
              this.handleReset(name)
            }
          })
        } else {
          this.$Message.error('请正确输入')
        }
      })
    },
    area_modifyok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http({
            url: '/api/updateGameArea',
            method: 'POST',
            body: {
              zone_id: this.zonecurrentrow.id,
              id: this.modifyareaform.id,
              name: this.modifyareaform.name
            },
            dataType: 'json'
          }).then(function(res) {
            if (res.body === 'login') {
              this.$Modal.warning({
                title: '您还没有登录',
                content: '<p>是否跳转到登录界面登录</p>',
                onOk: () => {
                  this.$router.push({ path: '/login' })
                },
                onCancel: () => {}
              })
            } else if (res.body === 'admin') {
              this.$Modal.error({
                title: '您没有权限',
                onOk: () => {
                  this.$router.push({ path: '/index' })
                },
                onCancel: () => {}
              })
            } else if (res.body == 'exist') {
              this.$Message.error('修改失败，大区已存在')
            } else {
              this.getareadata()
              this.$Message.success('修改成功')
            }
          })
        } else {
          this.$Message.error('请正确输入')
        }
      })
    },
    deletearea() {
      if (this.areacurrentrow.id == '') {
        this.$Notice.warning({ title: '请选择需要删除的大区' })
      } else {
        this.$Modal.confirm({
          title: '确认删除',
          content: '你确认删除 ' + this.areacurrentrow.name + ' 这个区吗？',
          onOk: () => {
            this.$http({
              url: '/api/deleteGameArea',
              method: 'POST',
              body: {
                id: this.areacurrentrow.id
              },
              dataType: 'json'
            }).then(function(res) {
              if (res.body === 'login') {
                this.$Modal.warning({
                  title: '您还没有登录',
                  content: '<p>是否跳转到登录界面登录</p>',
                  onOk: () => {
                    this.$router.push({ path: '/login' })
                  },
                  onCancel: () => {}
                })
              } else if (res.body === 'admin') {
                this.$Modal.error({
                  title: '您没有权限',
                  onOk: () => {
                    this.$router.push({ path: '/index' })
                  },
                  onCancel: () => {}
                })
              } else if (res.body == 'exist') {
                this.$Message.error('删除失败，游戏账户不为空')
              } else {
                this.getareadata()
                this.$Message.success('删除成功')
              }
            })
          },
          onCancel: () => {}
        })
      }
    },
    cancel: function() {},
    gettypedata() {
      this.$http({
        url: '/api/getGameCategory',
        method: 'GET',
        params: {
          id: this.typedata.id,
          name: this.typedata.name
        }
      }).then(
        function(res) {
          if (res.body === 'login') {
            this.$Modal.warning({
              title: '您还没有登录',
              content: '<p>是否跳转到登录界面登录</p>',
              onOk: () => {
                this.$router.push({ path: '/login' })
              },
              onCancel: () => {}
            })
          } else if (res.body === 'admin') {
            this.$Modal.error({
              title: '您没有权限',
              onOk: () => {
                this.$router.push({ path: '/index' })
              },
              onCancel: () => {}
            })
          } else {
            this.type_table_data = res.body
            // for (var i = 0; i < this.table_data.length; i++) {
            //   this.table_data[i].admin = this.table_data[i].admin
            //     ? '管理员'
            //     : '普通用户'
            // }
          }
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
    },
    getzonedata() {
      if (this.typecurrentrow.id == '') {
        this.$Notice.warning({ title: '请选择需要搜索的游戏' })
      } else {
        this.$http({
          url: '/api/getZoneById',
          method: 'GET',
          params: {
            type_id: this.typecurrentrow.id,
            zone_id: this.zonedata.id,
            name: this.zonedata.name
          }
        }).then(
          function(res) {
            this.zone_table_data = res.body
            // 返回总记录
            //this.$router.push({path: '/hello', query:{data: res.body}})
          },
          function() {
            this.$Message.error('获取数据失败')
          }
        )
      }
    },
    getareadata() {
      if (this.zonecurrentrow.id == '') {
        this.$Notice.warning({ title: '请选择需要搜索的战区' })
      } else {
        this.$http({
          url: '/api/getAreaById',
          method: 'GET',
          params: {
            zone_id: this.zonecurrentrow.id,
            area_id: this.areadata.id,
            name: this.areadata.name
          }
        }).then(
          function(res) {
            this.area_table_data = res.body
            // 返回总记录
            //this.$router.push({path: '/hello', query:{data: res.body}})
          },
          function() {
            this.$Message.error('获取数据失败')
          }
        )
      }
    },
    typecurrentchange: function(currentRow, oldCurrentRow) {
      this.typecurrentrow.id = currentRow['id']
      this.typecurrentrow.name = currentRow.name

      this.modifytypeform.id = currentRow.id
      this.modifytypeform.name = currentRow.name
      //   if(this.dataList==0){
      //     this.modifySupplierId = this.currentrow.id
      //     this.modifySupplierName = this.currentrow.name
      //     this.modifySupplierPhone = this.currentrow.phone
      //     this.modifyPersonName = this.currentrow.person
      //     this.modifyRemark = this.currentrow.remark
      //   }
      this.getzonedata()
    },
    zonecurrentchange: function(currentRow, oldCurrentRow) {
      this.zonecurrentrow.id = currentRow['id']
      this.zonecurrentrow.name = currentRow.name

      this.modifyzoneform.id = currentRow.id
      this.modifyzoneform.name = currentRow.name
      //   if(this.dataList==0){
      //     this.modifySupplierId = this.currentrow.id
      //     this.modifySupplierName = this.currentrow.name
      //     this.modifySupplierPhone = this.currentrow.phone
      //     this.modifyPersonName = this.currentrow.person
      //     this.modifyRemark = this.currentrow.remark
      //   }
      this.getareadata()
    },
    areacurrentchange: function(currentRow, oldCurrentRow) {
      this.areacurrentrow.id = currentRow['id']
      this.areacurrentrow.name = currentRow.area

      this.modifyareaform.id = currentRow.id
      this.modifyareaform.name = currentRow.area
      //   if(this.dataList==0){
      //     this.modifySupplierId = this.currentrow.id
      //     this.modifySupplierName = this.currentrow.name
      //     this.modifySupplierPhone = this.currentrow.phone
      //     this.modifyPersonName = this.currentrow.person
      //     this.modifyRemark = this.currentrow.remark
      //   }
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style scoped>
.content {
  display: inline-block;
  margin-top: 15px;
  width: 100%;
}
.search-form {
  display: inline-block;
  width: 100%;
}
.query {
  width: 37%;
  margin-left: 5px;
  display: inline-block;
}

.cost-module-btn {
  color: white;
  background-color: #4169e1;
  border-color: #4169e1;
}

.cost-module-btn:hover {
  color: white;
  background-color: #4169e1;
  border-color: #4169e1;
}

.search {
  width: 50px;
  margin-left: 5px;
  display: inline-block;
}

.top-label {
  margin-right: 5%;
}

.addromve {
  width: 35%;
  margin: 0.5% 1%;
  display: inline-block;
}

.oper {
  color: #1c2438;
  margin-left: 5%;
  background-color: #e6e6e6;
}
</style>