import { SchemaStore } from '@sensenet/client-core/dist/Schemas/SchemaStore'
import { GenericContent } from '@sensenet/default-content-types'
import { Query, QueryExpression, QueryOperators } from '@sensenet/query'
import * as React from 'react'

export interface SearchFieldProps<T> {
    fieldName: keyof T,
    onValueChange: (query: Query<T>) => void
}

export interface SearchField<T, K extends keyof T> {
    fieldName: K,
    control: React.StatelessComponent<SearchFieldProps<T[K]>>,
}

export interface AdvancedSearchProps<T extends GenericContent> {
    schemas: SchemaStore
    searchRoots: GenericContent[]
    fields: Array<SearchField<T, any>>
    onSearch: (q: Query<T>) => void
}

export interface AdvancedSearchState<T> {
    query: Query<T>
    fieldQueries: Map<keyof T, Query<T>>
}

export class AdvancedSearch<T extends GenericContent = GenericContent> extends React.Component<AdvancedSearchProps<T>, AdvancedSearchState<T>> {

    constructor(props: AdvancedSearchProps<T>) {
        super(props)
        this.updateQuery = this.updateQuery.bind(this)
    }

    public state = {
        query: new Query((q) => q),
        fieldQueries: new Map<keyof T, Query<T>>(),
    }

    private updateQuery(field: keyof T, newQuery: Query<T>) {
        this.state.fieldQueries.set(field, newQuery)
        const fieldQueryArray = Array.from(this.state.fieldQueries.values())
        const query = new Query((q) => undefined as any)
        fieldQueryArray.map((fieldQuery, currentIndex) => {
            query.addSegment(new QueryExpression(query).term(fieldQuery.toString()))
            if (currentIndex < fieldQueryArray.length - 1) {
                query.addSegment(new QueryOperators(query).and)
            }
            return fieldQuery
        })

        this.setState({
            ...this.state,
            query,
        })
    }

    public static getDerivedStateFromProps<T extends GenericContent>(newProps: AdvancedSearchProps<T>, lastState: AdvancedSearchState<T>) {
        const query = new Query<T>((q) => q)
        return {
            ...lastState,
            query,
        }
    }

    public render() {
        return <div>
            {this.props.fields.map((f) => React.createElement(f.control, {
                    key: f.fieldName,
                    fieldName: f.fieldName,
                    query: this.state.query,
                    // tslint:disable-next-line:no-console
                    onValueChange: (q) => this.updateQuery(f.fieldName, q),
                } as SearchFieldProps<T> as any),
            )}
        </div>
    }
}
