// pages/addNew/new.js
const db = wx.cloud.database()
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseList: [],
    typeList: ["任意", "早晨", "上午", "午间", "下午", "傍晚", "睡前"],
    submited: false,
    currentColor: '',
    currentName: '',
    currentImage: '',
    currentTime: "任意",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
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
    db.collection('userList').where({
      _openid: app.globalData.openid
    }).get({
      success: (res) => {
        let id = String(res.data.length + 21)
        console.log(this.data.currentName)
        let data = {
          time: this.data.currentTime,
          name: this.data.currentName,
          color: this.data.currentColor,
          image: this.data.currentImage,
          count: 0,
          dayCount: 0,
          timeStamp: '',
          todayCheck: false,
          id: id
        }
        console.log(data)
        db.collection('userList').add({
          data: data,
          success: (res) => {
            wx.showToast({
              title: '添加成功',
              duration: 1000,
            })
            wx.cloud.callFunction({
              name: 'getUserList',
              success: res => {
                app.globalData.userList = res.result.data
              }
            })
            wx.switchTab({
              url: '../today/today',
            })
          }
        })
      }
    })

  },

  nameInput: function(e) {
    this.setData({
      currentName: e.detail.value
    })
  },

  colorPick: function(e) {
    this.setData({
      currentColor: e.currentTarget.dataset.color
    })
  },
  imagePick: function(e) {
    this.setData({
      currentImage: e.currentTarget.dataset.image
    })
  },
  timePick: function(e) {
    this.setData({
      currentTime: e.currentTarget.dataset.time
    })
  },

  pageBack: function() {
    wx.switchTab({
      url: '../today/today',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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