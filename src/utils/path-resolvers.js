export const resolvePath = (object, path, defaultValue) => path
.split(/[\.\[\]\'\"]/)
.filter(p => p)
.reduce((o, p) => o ? o[p] : defaultValue, object)