import { GenericContent, Schema } from '@sensenet/default-content-types'
import { Query, QueryExpression, QueryOperators } from '@sensenet/query'
import * as React from 'react'

import debounce = require('lodash.debounce')

/**
 * Callback object for the Advanced Search Fields method
 */
export interface AdvancedSearchOptions<T> {
    /**
     * Updates the aggregated query
     */
    updateQuery: (key: string, query: Query<T>) => void
    /**
     * Returns the full Schema object
     */
    schema: Schema
}

/**
 * Props object for the Advanced Search component
 */
export interface AdvancedSearchProps<T extends GenericContent> {
    /**
     * Schema that will be used for filling descriptions, placeholders, etc..
     */
    schema: Schema
    /**
     * Callback that will be used to create the Field Components
     */
    fields: (options: AdvancedSearchOptions<T>) => React.ReactElement<any>
    /**
     * Callback that will be triggered when the query changes
     */
    onQueryChanged?: (q: Query<T>) => void
    /**
     * Optional style definitions
     */
    style?: React.CSSProperties
}

/**
 * State object for the Advanced Search component
 */
export interface AdvancedSearchState<T> {
    fieldQueries: Map<string, Query<T>>
    onQueryChanged?: (q: Query<T>) => void

}

/**
 * Wrapper component for creating an Advanced Search UI
 */
export class AdvancedSearch<T extends GenericContent = GenericContent> extends React.Component<AdvancedSearchProps<T>, AdvancedSearchState<T>> {

    constructor(props: AdvancedSearchProps<T>) {
        super(props)
        this.updateQuery = this.updateQuery.bind(this)
    }

    /**
     * The Advanced Search State object
     */
    public state: AdvancedSearchState<T> = {
        fieldQueries: new Map<string, Query<T>>(),
    }

    private updateQuery(key: string, newQuery: Query<T>) {
        this.state.fieldQueries.set(key, newQuery)
        const fieldQueryArray = Array.from(this.state.fieldQueries.values())
        const query = new Query((q) => {
            const filteredQueries = fieldQueryArray
                .filter((f) => f.toString().length > 0)

            filteredQueries
                .map((fieldQuery, currentIndex) => {
                    // tslint:disable
                    const queryRef = q['queryRef']
                    new QueryExpression(queryRef).query(fieldQuery)
                    if (currentIndex < filteredQueries.length - 1) {

                        new QueryOperators(queryRef).and
                    }
                    // tslint:enable
                })
            return q
        })
        this.state.onQueryChanged && this.state.onQueryChanged(query)
    }

    /**
     * Creates a derived state from a specified props object
     * @param _newProps The new props
     * @param lastState The last component state
     */
    public static getDerivedStateFromProps<T extends GenericContent>(_newProps: AdvancedSearchProps<T>, lastState: AdvancedSearchState<T>) {
        const query = new Query<T>((q) => q)
        return {
            ...lastState,
            onQueryChanged: _newProps.onQueryChanged && debounce(_newProps.onQueryChanged, 50),
            query,
        }
    }

    /**
     * Renders the component
     */
    public render() {
        return <div style={this.props.style}>
            {
                this.props.fields({
                    updateQuery: this.updateQuery,
                    schema: this.props.schema,
                })
            }
        </div>
    }
}
