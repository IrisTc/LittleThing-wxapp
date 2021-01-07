// pages/none/none.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: "一旦我们不停地关注那些我们能够完成的小事，不久我们就会惊奇地发现，我们不能完成的事情实在是微乎其微。",
    author: "（英国）塞·巴特勒"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var noFirst = wx.getStorageSync('userInfo')
    console.log(noFirst)
    if (noFirst) {
      setTimeout(function () {
        wx.switchTab({
          url: '../today/today',
        })
      }, 2000)
    } else {
      setTimeout(function () {
        wx.navigateTo({
          url: '../index/index',
        })
      }, 2000)
    }
    // wx.request({
    //   url: 'https://v1.alapi.cn/api/mingyan?typeid=35',
    //   success: (res)=>{
    //     this.setData({
    //       motto: res.data.data.content
    //     })
    //     // wx.clearStorageSync()
    //     var noFirst = wx.getStorageSync('userInfo')
    //     console.log(noFirst)
    //     if (noFirst) {
    //       setTimeout(function () {
    //         wx.switchTab({
    //           url: '../today/today',
    //         })
    //       }, 1000)
    //     } else {
    //       setTimeout(function () {
    //         wx.navigateTo({
    //           url: '../index/index',
    //         })
    //       }, 1000)
    //     }
    //   }
    // })
    
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