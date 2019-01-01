import create from './westore/create'

export default {
  data: {
    motto: 'Hello World'
  },
  logMotto: function() {
    console.log(this.data.motto)
  }
}

export { create }
