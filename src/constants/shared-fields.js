
export default function (data) {
    data = data || {};
    return [
        {
            name: 'owner',
            friendlyName: 'Owner',
            translates: {
                ar: 'المالك'
            },
            defaultValue: data.displayName,
            required: false
        },
        {
            name: 'mobileNumber',
            friendlyName: 'Mobile Number',
            translates: {
                ar: 'رقم الهاتف'
            },
            required: false
        },
        {
            name: 'emailAddress',
            friendlyName: 'Email Address',
            translates: {
                ar: 'بريد الكتروني'
            },
            defaultValue: data.email,
            required: false
        },
        {
            name: 'city',
            friendlyName: 'City',
            translates: {
                ar: 'المدينة'
            },
            required: true
        }
    ];
}
