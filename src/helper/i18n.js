import zhCNLocale from '../lang/zh-CN.json'
import enLocale from '../lang/en.json'
import jaLocale from '../lang/ja.json'

const globallocale = {
  'zh-CN': zhCNLocale,
  'ja': jaLocale,
  'en': enLocale
}

let locale

const I18n = {
  t: (keyStr, defaultVal) => {
    const keys = keyStr.split('.')
    const length = keys.length
    let last = locale
    console.log();
    for (let i = 0; i < length; i++) {
      if (last.hasOwnProperty(keys[i])) {
        last = last[keys[i]]
      }
    }

    return last || defaultVal
  },
  setLocale: (lang) => {
    if (typeof lang === 'object') {
      locale = lang
    } else {
      locale = globallocale[lang || 'en']
    }
    return locale
  }
}

export default I18n
