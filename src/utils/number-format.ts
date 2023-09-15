// /* eslint-disable complexity */
export const formatNull = (number: number | string) => {
    const arr = (number + '').split('.');
    const int = arr[0] + '';
    const fraction = arr[1] || '';
    const f = int.length % 3;
    let r = int.substring(0, f);

    for (let i = 0; i < Math.floor(int.length / 3); i++) {
        r += ',' + int.substring(f + i * 3, f + (i + 1) * 3);
    }

    if (f === 0) {
        r = r.substring(1);
    }
    return r + (fraction ? '.' + fraction : '');
};

/**
 * 单位转换功能
 */

// 计算-空判断
const isEmpty = (value) => {
    return [0, '-', '0.00', '0', '0%', 'N/A', undefined, null].includes(value);
};

// 计算-转化cent位小数
const valueFloat = (numP, cent = 0) => {
    let num = numP || 0;
    // 去掉所有的$和,和k
    num = (num - 0).toString().replace(/\$|\,|k/g, '');
    // 检查传入数值为数值类型
    if (isNaN(num)) num = '0';
    // 获取符号(正/负数)
    const sign = num >= 0;
    // const sign = num === (num = Math.abs(num));
    num = Math.abs(num);
    // Math.pow(10, 0) = 1
    const pow = Math.pow(10, cent);
    // 把指定的小数位先转换成整数  .多余的小数位四舍五入
    num = Math.floor(num * pow + 0.50000000001);
    // 求出整数位数值
    const intNum = Math.floor(num / pow).toString();
    // 求出小数位数值
    let cents: number | string = num % pow;
    // 把小数位转换成字符串,以便求小数位长度
    cents = (cents - 0).toString();
    // 补足小数位到指定的位数
    while (cents.length < cent) cents = '0' + cents;
    const abs = sign ? '' : '-';
    if (cent > 0) return abs + intNum + '.' + cents;
    else return abs + intNum;
};

// 计算-千分位
const formatThousandth = (num, scale, ...rest): string => {
    const [unit, delimiter] = rest;
    const reg = new RegExp(`(\\d{1,${scale}})(?=(?:\\d{${scale}})+$)`, 'g');
    const str = num + '';
    const [nums] = str.split(/[%kw千万]/);
    const [pInt] = nums.split('.');
    return str.replace(pInt, pInt.replace(reg, `$1${delimiter}`)) + unit;
};

// fc-指定显示
const fcShowValue = (value, showValue, ...rest) => {
    const [currency, suffix] = rest;
    return !isEmpty(value) ? `${currency} ${showValue}${suffix}` : '-';
};

// fc百分比
const fcFormatPercent = (value, count = 0, unit = '%') => {
    if (isEmpty(value)) return '-';
    // 百分号 or 千分号
    const cent = unit === '‰' ? 1000 : 100;
    const num = valueFloat(+value * cent, count);
    return num + unit;
};

/**
 * fc-千分位
 * @param value
 * @param unit 单位
 * @param count 小数位
 * @returns 千分位
 */
const fcFormatThousandth = (value, count, ...rest) => {
    if (isEmpty(value)) return '-';
    const [unit, currency, scale, delimiter] = rest;
    let cent = 1;
    switch (unit) {
        case 'k':
            cent = 1000;
            break;
        case 'w':
        case '万':
            cent = 10000;
            break;
        case 'kw':
        case '千万':
            cent = 10000000;
            break;
        default:
            cent = 1;
            break;
    }
    let val = Number(value);
    let newUnit = unit;
    val < cent ? (newUnit = '') : (val = val / cent);

    const num = valueFloat(val, count);
    const newValue = formatThousandth(num, scale, newUnit, delimiter);
    return `${currency || ''} ${newValue}`;
};

const fcFormatThousandthForNew = (value, count, ...rest) => {
    if (isEmpty(value)) return '-';
    const [unit, currency, scale, delimiter] = rest;
    let cent = 1;
    switch (unit) {
        case 'k':
            cent = 1000;
            break;
        case 'w':
        case '万':
            cent = 10000;
            break;
        case 'kw':
        case '千万':
            cent = 10000000;
            break;
        default:
            cent = 1;
            break;
    }
    let val = Number(value);
    let newUnit = unit;

    if (val < cent) {
        newUnit = '';
        const num = val;
        const newValue = formatThousandth(num, scale, newUnit, delimiter);
        return `${currency || ''} ${newValue}`;
    } else {
        val = val / cent;
        const num = valueFloat(val, count);
        const newValue = formatThousandth(num, scale, newUnit, delimiter);
        return `${currency || ''} ${newValue}`;
    }
};

// 纯数字
const fcFormatNumber = (value, count) => {
    return !isEmpty(value) ? valueFloat(+value, count) : '-';
};

// 优化版formatNull
export const formatFactory = (
    value,
    type?:
        | 'showValue'
        | 'percent'
        | 'thousandth'
        | 'number'
        | 'thousandthForNew'
        | ''
        | undefined
        | null,
    data?: {
        showValue?: any; // 显示指定的值
        currency?: string; // 货币单位（前缀）
        count?: number; // 小数位(默认1位)
        unit?: string; // 单位 k / %
        scale?: number; // 千分位比例，隔几位加delimiter分隔符
        delimiter?: string; // 千分位分隔符
        suffix?: string; // 后缀
    }
) => {
    const {
        showValue,
        currency = '',
        count = 1,
        unit = '',
        scale = 3,
        delimiter = ',',
        suffix = ''
    } = data || {};

    switch (type) {
        case 'showValue':
            return fcShowValue(value, showValue, currency, suffix);
        case 'percent':
            return fcFormatPercent(value, count, unit);
        case 'thousandth':
            return fcFormatThousandth(value, count, unit, currency, scale, delimiter);
        case 'number':
            return fcFormatNumber(value, count);
        case 'thousandthForNew':
            return fcFormatThousandthForNew(value, count, unit, currency, scale, delimiter);
        default:
            return !isEmpty(value) ? `${currency} ${value}${suffix}` : '-';
    }
};
