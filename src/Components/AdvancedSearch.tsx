import { GenericContent } from '@sensenet/default-content-types'
import { Query } from '@sensenet/query'
import React from 'react'

export interface AdvancedSearchProps<T extends GenericContent> {
    query: Query<T>
}

export class AdvancedSearch<T extends GenericContent = GenericContent> extends React.Component<AdvancedSearchProps<T>> {
    public render() {
        return <div></div>
    }
}
