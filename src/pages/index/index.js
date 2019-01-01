import store, { create } from '../../libs/index.js'
import { log } from '../../utils/index.js'
const app = getApp()

create(store, {
  data: {
    motto: '会被 store 覆盖掉'
  },
  onLoad() {
    log(this.store)
    this.store.logMotto()
  }
})
