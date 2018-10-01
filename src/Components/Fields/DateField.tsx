import Select, { SelectProps } from '@material-ui/core/Select'
import { FieldSetting, GenericContent } from '@sensenet/default-content-types'
import { Query } from '@sensenet/query'
import React = require('react')

/**
 * Props object for the TextField Component
 */
export interface DateFieldProps<T> extends SelectProps {
    /**
     * Name of the field
     */
    fieldName: string
    /**
     * Callback that will triggered when the query changes
     */
    onQueryChange: (key: string, query: Query<T>) => void
    /**
     * Field settings for setting labels, placeholders and hint texts
     */
    fieldSetting?: Partial<FieldSetting>
    /**
     * Additional key that can be used if you have multiple controls for the same field
     */
    fieldKey?: string
}

/**
 * Component for searching simple text fragments in a specified field
 * @param props
 */
export const DateField = <T extends GenericContent>(props: DateFieldProps<T>) => {
    return <Select />
}
