export const pickFields = (array: any, fields: any) => {
    return array.map((item: any) => {
        return fields.reduce((obj: any, field: any) => {
            if (item.hasOwnProperty(field)) {
                if(field == 'id') {
                    obj['value'] = item[field];
                } else {
                    obj['label'] = item[field];
                }
            }
            return obj;
        }, {});
    });
}