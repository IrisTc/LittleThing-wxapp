// pages/today/today.js
const db = wx.cloud.database()
const app = getApp()
const date = app.globalData.date

let touchBeginX = 0 //触摸的起点
let time = 0 //触摸持续时间

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    list: [],
    motto: "I will be better",
    inputValue: "",
    src: 'image/backgroud.jpg',
    cardShow: false,
    currentId: '',
    currentIndex: '',
    remindShow: false
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
    db.collection('userMotto').where({
      _openid: app.globalData.openid
    }).get().then(res => {
      if (res.data.length != 0) {
        this.setData({
          motto: res.data[0].motto,
          userList: app.globalData.userList
        })
      } else {
        this.setData({
          userList: app.globalData.userList
        })
      }
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

  onCheck: function(e) {
    this.setData({
      cardShow: true,
      currentId: e.currentTarget.dataset.id,
      currentIndex: e.currentTarget.dataset.index
    })
  },

  hideCard: function(e) {
    this.setData({
      cardShow: false
    })
  },

  submitLog: function(e) {
    let content = e.detail.value
    var log = {
      content: content,
      date: date
    }
    var data = {}
    const _ = db.command
    if (this.data.userList[this.data.currentIndex].timeStamp !== date) {
      data = {
        count: _.inc(1),
        dayCount: _.inc(1),
        timeStamp: date,
        logs: _.push(log)
      }
    } else {
      data = {
        count: _.inc(1),
        logs: _.push(log)
      }
    }
    console.log(data)
    db.collection('userList').where({
      _openid: app.globalData.openid,
      id: this.data.currentId
    }).update({
      data: data,
      success: (res) => {
        wx.cloud.callFunction({
          name: 'getUserList',
          success: res => {
            app.globalData.userList = res.result.data
            this.setData({
              userList: app.globalData.userList
            })
          }
        })
        // console.log(res)
        // let index = this.data.currentIndex
        // let updatecount = `userList[${index}].count`
        // let updatedate = `userList[${index}].timeStamp`
        // let count = this.data.userList[index].count + 1
        // this.setData({
        //   [updatecount]: count
        // })
        // this.setData({
        //   [updatedate]: date
        // })
      }
    })
  },

  remind: function() {
    var thingList = this.data.userList
    if (!this.data.remindShow) {
      let newArr = []
      thingList.forEach((item) => {
        if (item.timeStamp !== date) {
          newArr.push(item)
        }
      })
      this.setData({
        list: thingList,
        userList: newArr,
        remindShow: true
      })
    } else {
      this.setData({
        userList: this.data.list,
        remindShow: false
      })
    }
  },

  mottoChange: function(e) {
    this.setData({
      motto: e.detail.value,
      inputValue: ""
    })
    db.collection('userMotto').where({
      _openid: app.globalData.openid
    }).get().then(res => {
      if (res.data.length == 0) {
        db.collection('userMotto').add({
          data: {
            motto: e.detail.value
          }
        })
      } else {
        db.collection('userMotto').where({
          _openid: app.globalData.openid
        }).update({
          data: {
            motto: e.detail.value
          }
        })
      }
    })
  },

  toAdd: function(){
    wx.navigateTo({
      url: '../new/new',
    })
  },

  touchStart: function(e) {
    touchBeginX = e.touches[0].clientX; // 获取触摸时的起点
    time = e.timeStamp
  },

  touchEnd: function(e) {
    console.log(e)
    var touchEndX = e.changedTouches[0].clientX;
    time = e.timeStamp - time
    if (touchEndX - touchBeginX <= -40 && time < 1000) {
      console.log('navi')
      wx.navigateTo({
        url: '../new/new',
      })
    }
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