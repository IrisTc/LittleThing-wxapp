// components/card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow: Boolean,
    currentId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    textarea: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal: function(e) {
      console.log(e)
      this.triggerEvent('hideModal',{},{})
    },

    bindFormSubmit: function(e){
      console.log(e)
      let value = e.detail.value.textarea
      this.setData({
        textarea: ''
      })
      this.triggerEvent('submit',{value: value},{})
    },

    calcle: function(){
      this.setData({
        textarea: ''
      })
    }
  }
})
