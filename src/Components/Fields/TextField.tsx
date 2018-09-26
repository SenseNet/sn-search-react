import { FieldSetting, GenericContent } from '@sensenet/default-content-types'
import { Query } from '@sensenet/query'
import React = require('react')

export interface TextFieldProps<T> {
    fieldName: string
    onQueryChange: (key: string, query: Query<T>) => void
    fieldSetting?: Partial<FieldSetting>
    fieldKey?: string
}

export const TextField = <T extends GenericContent>(props: TextFieldProps<T>) => (<input type="text"
    onChange={(ev) => {
        const query = new Query((q) => q.equals(props.fieldName, `*${ev.currentTarget.value}*`))
        return props.onQueryChange(props.fieldKey || props.fieldName, query)
    }}
    placeholder={props.fieldSetting && props.fieldSetting.DisplayName}
    title={props.fieldSetting && props.fieldSetting.Description}
    />)
