import { GenericContent } from '@sensenet/default-content-types'
import { Query } from '@sensenet/query'
import React = require('react')
import {SearchFieldProps } from '../AdvancedSearch'

// tslint:disable-next-line:variable-name
export const TextField = <T extends GenericContent>(props: SearchFieldProps<T>) => (<input type="text"
    onChange={(ev) => {
        const query = new Query((q) => q.equals(props.fieldName, `*${ev.currentTarget.value}*`))
        return props.onValueChange(query)
    }
}
    />)
