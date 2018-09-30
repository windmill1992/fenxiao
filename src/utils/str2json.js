export const str2json = str => {
    let { p = {}, q = [] } = {};
    if(str && typeof str == 'string' && str.includes('_')){
        let arr = str.split('@');
        for (const v of arr) {
            q = v.split('_');
            p[q[0]] = q[1];
        }
    }
    return p;
}