/**
 * Created with JetBrains WebStorm.
 * User: wuqinglong
 * Date: 13-4-16
 * Time: 上午11:44
 * To change this template use File | Settings | File Templates.
 */
function each(list, fn) {
    if (!list || !fn) {
        return;
    }
    if (list instanceof Array) {
        for (var i = 0, j = list.length; i < j; i++) {
            fn(list[i]);
        }
    } else if (list instanceof Object) {
        for (var i in list) {
            if (list.hasOwnProperty(i)) {
                fn(list[i]);
            }
        }
    }
}