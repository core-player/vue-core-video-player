import Vue from 'vue'
import { i18n } from '../helper'

Vue.directive('t', {
  bind: function (el, binding) {
    console.log(binding.value)
    el.innerText = i18n.t(binding.expression)
  }
})
