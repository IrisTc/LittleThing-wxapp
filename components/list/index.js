// components/list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    thingList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onUpper: function(e){
      let id = e.currentTarget.dataset.id
      this.triggerEvent('upper', {id: id}, {})
    },
    onDelete: function(e){
      let id = e.currentTarget.dataset.id
      this.triggerEvent('delete', {id: id}, {})
    },
    showMore: function(e){
      console.log(e)
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../../pages/showMore/showMore?currentId='+id
      })
    },

    // ListTouch触摸开始
    ListTouchStart(e) {
      this.setData({
        ListTouchStart: e.touches[0].pageX
      })
    },

    // ListTouch计算方向
    ListTouchMove(e) {
      this.setData({
        ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
      })
    },

    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.data.ListTouchDirection == 'left') {
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      } else {
        this.setData({
          modalName: null
        })
      }
      this.setData({
        ListTouchDirection: null
      })
    },
  }
})
