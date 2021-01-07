// pages/category/category.js
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currentType: '全部',
    typeList: ["全部", "任意", "早晨", "上午", "午间", "下午", "傍晚", "睡前"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let list = app.globalData.userList
    console.log(app.globalData.userList)
    list.forEach((item) => {
      if (item.timeStamp == app.globalData.date) {
        item.todayCheck = true
      }
    })
    if (this.data.currentType != '全部') {
      list = this._typeList(this.data.currentType)
    }
    console.log(list)
    this.setData({
      list: list
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.onShow()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1000);
  },

  _typeList(timeType) {
    var newArr = []
    app.globalData.userList.forEach((item) => {
      if (item.time == timeType) {
        newArr.push(item)
      }
    })
    return newArr
  },

  onSort: function(e) {
    var timeType = e.currentTarget.dataset.type
    if (timeType == '全部') {
      this.setData({
        list: app.globalData.userList,
        currentType: timeType
      })
    } else {
      this.setData({
        list: this._typeList(timeType),
        currentType: timeType
      })
    }
  },

  onUpper(e) {
    let list = this.data.list
    let id = e.detail.id
    let first = list[id]
    for (var i = list.length; i > 0; i--) {
      if (i <= id) {
        list[i] = list[i - 1]
      }
    }
    list[0] = first
    this.setData({
      list: list
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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