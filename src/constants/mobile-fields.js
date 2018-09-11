
import sharedFields from './shared-fields';

export default function (data) {
    data = data || {};
    return sharedFields(data).concat([
        {
            name: 'brand',
            friendlyName: 'Brand',
            translates: {
                ar: 'نوع الجهاز'
            },
            required: true
        },
        {
            name: 'model',
            friendlyName: 'Model',
            translates: {
                ar: 'موديل الجهاز'
            },
            required: true
        },
        {
            name: 'imei1',
            friendlyName: 'IMEI1',
            translates: {
                ar: 'ايمي ١'
            },
            required: true
        },
        {
            name: 'imei2',
            friendlyName: 'IMEI2',
            translates: {
                ar: 'ايمي ٢'
            },
            required: false
        },
        {
            name: 'distinguishingCharacteristic',
            friendlyName: 'Distinguishing Characteristic',
            translates: {
                ar: 'علامات مميزة'
            },
            required: true
        },
        {
            name: 'moreDetails',
            friendlyName: 'More Details',
            translates: {
                ar: 'ملاحظات'
            },
            required: false
        }
    ]);
}
