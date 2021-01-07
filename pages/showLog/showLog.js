// pages/showLog/showLog.js

const db = wx.cloud.database()
const app = getApp()

let touchBeginX = 0 //
let touchBeginY = 0 //触摸的起点
let time = 0 //触摸持续时间
var num = 5

Page({
  /**
   * 页面的初始数据
   */
  data: {
    newLog: [],
    logs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('userList').where({
      _openid: app.globalData.openid,
      id: options.currentId
    }).get({
      success: (res) => {
        let arr = this._logsByDate(res.data[0].logs)
        this.setData({
          logs: arr,
          newLog: arr.slice(0,5)
        })
      }
    })   
  },

  _logsByDate: function(_list){
    let newArr = [];
    _list.forEach((item, i) => {
      let index = -1;
      let isExists = newArr.some((newItem, j) => {
        if (item.date == newItem.date) {
          index = j;
          return true
        }
      })
      if (!isExists) {
        newArr.push({
          date: item.date,
          subList: [item]
        })
      } else {
        newArr[index].subList.push(item);
      }
    })
   return newArr
  },

  touchStart: function (e) {
    console.log(e)
    touchBeginX = e.touches[0].clientX; // 获取触摸时的起点
    touchBeginY = e.touches[0].clientY; // 获取触摸时的起点
    time = e.timeStamp
  },

  touchEnd: function (e) {
    console.log(e)
    var touchEndX = e.changedTouches[0].clientX;
    var touchEndY = e.changedTouches[0].clientY;
    time = e.timeStamp - time
    if (touchEndX - touchBeginX >= 40 && time < 1000) {
      console.log('navi')
      wx.switchTab({
        url: '../today/today',
      })
    }
    // 向下滑动
    if (touchEndY - touchBeginY <= -40 && time < 1000) {
      console.log("下一页");
      num += 5;
      this.setData({
        newLog: this.data.logs.slice(0, num)
      })
    }
  },

  pageBack: function() {
    wx.switchTab({
      url: '../today/today',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})