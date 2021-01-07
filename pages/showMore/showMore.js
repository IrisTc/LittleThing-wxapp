// pages/showMore/showMore.js

const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseList: [],
    typeList: ["任意", "早晨", "上午", "午间", "下午", "傍晚", "睡前"],
    currentColor: '',
    currentName: '',
    changedName: '',
    currentImage: '',
    currentTime: '',
    currentId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    db.collection('userList').where({
      _openid: app.globalData.openid,
      id: options.currentId
    }).get({
      success: (res) => {
        console.log(res)
        let thing = res.data[0]
        this.setData({
          thing: thing,
          currentTime: thing.time,
          currentName: thing.name,
          currentColor: thing.color,
          currentImage: thing.image,
          currentId: options.currentId
        })
      }
    })
    wx.cloud.callFunction({
      name: 'getSourceList',
      success: res => {
        this.setData({
          baseList: res.result.data
        })
      }
    })
  },

  submit: function(e) {
    let data = {
      time: this.data.currentTime,
      name: this.data.changedName || this.data.currentName,
      color: this.data.currentColor,
      image: this.data.currentImage
    }
    console.log(data)
    db.collection('userList').where({
      _openid: app.globalData.openid,
      id: this.data.currentId
    }).update({
      data: data,
      success: (res) => {
        wx.showToast({
          title: '修改成功',
          duration: 1000,
        })
        wx.cloud.callFunction({
          name: 'getUserList',
          success: res => {
            app.globalData.userList = res.result.data
          }
        })
        wx.switchTab({
          url: '../manager/manager',
        })
      }
    })
  },

  delete: function(e) {
    db.collection('userList').where({
      _openid: app.globalData.openid,
      id: this.data.currentId
    }).remove({
      success: (res) => {
        wx.showToast({
          title: '删除成功',
          duration: 1000,
        })
      }
    })
    wx.cloud.callFunction({
      name: 'getUserList',
      success: res => {
        app.globalData.userList = res.result.data
      }
    })
    wx.switchTab({
      url: '../manager/manager',
    })
  },

  nameInput: function(e) {
    this.setData({
      changedName: e.detail.value
    })
  },

  colorPick: function(e) {
    this.setData({
      currentColor: e.currentTarget.dataset.color
    })
  },
  ImagePick: function(e) {
    this.setData({
      currentImage: e.currentTarget.dataset.image
    })
  },
  timePick: function(e) {
    this.setData({
      currentTime: e.currentTarget.dataset.time
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  pageBack: function() {
    wx.switchTab({
      url: '../manager/manager',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})