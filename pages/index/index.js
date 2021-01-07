// pages/index/index.js

const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseList: [],
    comfirm: false,
    userList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    db.collection('baseThings').where({}).get({
      success: (res)=> {
        this.setData({
          baseList: res.data
        })
      }
    })
  },

  onCheck: function(e) {
    let list = this.data.baseList
    let user = this.data.userList
    let id = e.currentTarget.dataset.id
    list[id].checked = list[id].checked == false ? true : false
    if (list[id].checked == true) {
      user.push(list[id])
      this.setData({
        baseList: list,
        userList: user,
        confirm: true
      })
    } else {
      user.pop()
      this.setData({
        baseList: list,
        userList: user
      })
      if(user.length == 0){
        this.setData({
          confirm: false
        })
      }
    }
  },

  goNext: function (e) {
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })
    wx.switchTab({
      url: '/pages/today/today',
    })
    console.log(this.data.userList)
    var list = this.data.userList
    for (var i = 0; i < list.length; i++) {
      db.collection('userList').add({
        data: list[i]
      })
    }
    app.globalData.userList = this.data.userList
  }
})