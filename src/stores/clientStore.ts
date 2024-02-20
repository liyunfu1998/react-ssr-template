import {configureStore} from '@reduxjs/toolkit'
import demoSlice from './demoSlice'

const store = configureStore({
  reducer: {
    demo: demoSlice
  }
})

export default store
