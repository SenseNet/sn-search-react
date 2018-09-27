import MaterialTextField, { TextFieldProps as MaterialTextFieldProps } from '@material-ui/core/TextField'
import { FieldSetting, GenericContent } from '@sensenet/default-content-types'
import { Query } from '@sensenet/query'
import React = require('react')

export interface TextFieldProps<T> extends MaterialTextFieldProps {
    fieldName: string
    onQueryChange: (key: string, query: Query<T>) => void
    fieldSetting?: Partial<FieldSetting>
    fieldKey?: string
    // style?: React.CSSProperties
}

export const TextField = <T extends GenericContent>(props: TextFieldProps<T>) => {
    const displayName = props.fieldSetting && props.fieldSetting.DisplayName || props.label
    const description = props.fieldSetting && props.fieldSetting.Description || ''
    const { fieldName, onQueryChange, fieldSetting, fieldKey, ...materialProps } = { ...props }
    return (<MaterialTextField type="text"
        onChange={(ev) => {
            const query = new Query((q) =>
                ev.currentTarget.value ? q.equals(props.fieldName, `*${ev.currentTarget.value}*`) : q,
            )
            return props.onQueryChange(props.fieldKey || props.fieldName, query)
        }}
        label={displayName}
        placeholder={description}
        title={props.fieldSetting && props.fieldSetting.Description}
        {...materialProps}
    />)
}
