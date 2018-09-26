import { FieldSetting, GenericContent, Schema } from '@sensenet/default-content-types'
import { Query, QueryExpression, QueryOperators } from '@sensenet/query'
import * as React from 'react'

export interface AdvancedSearchOptions<T> {
    updateQuery: (key: string, query: Query<T>) => void
    getFieldSetting: <TFieldSetting extends FieldSetting = FieldSetting>(fieldName: keyof T) => TFieldSetting
    schema: Schema
}

export interface AdvancedSearchProps<T extends GenericContent> {
    schema: Schema
    fields: (options: AdvancedSearchOptions<T>) => React.ReactElement<any>
    onQueryChanged?: (q: Query<T>) => void
    onSubmit?: (ev: React.FormEvent, query: Query<T>) => void
}

export interface AdvancedSearchState<T> {
    query: Query<T>
    fieldQueries: Map<string, Query<T>>
}

export class AdvancedSearch<T extends GenericContent = GenericContent> extends React.Component<AdvancedSearchProps<T>, AdvancedSearchState<T>> {

    constructor(props: AdvancedSearchProps<T>) {
        super(props)

        this.updateQuery = this.updateQuery.bind(this)
        this.getFieldSetting = this.getFieldSetting.bind(this)
    }

    public state = {
        query: new Query((q) => q),
        fieldQueries: new Map<string, Query<T>>(),
    }

    private updateQuery(key: string, newQuery: Query<T>) {
        this.state.fieldQueries.set(key, newQuery)
        const fieldQueryArray = Array.from(this.state.fieldQueries.values())
        const query = new Query((q) => {
            fieldQueryArray.map((fieldQuery, currentIndex) => {
                // tslint:disable
                const queryRef = q['queryRef']
                new QueryExpression(queryRef).query(fieldQuery)
                if (currentIndex < fieldQueryArray.length - 1) {

                    new QueryOperators(queryRef).and
                }
                // tslint:enable
            })
            return q
        })
        this.props.onQueryChanged && this.props.onQueryChanged(query)
        this.setState({
            ...this.state,
            query,
        })
    }

    private getFieldSetting<TFieldSetting extends FieldSetting = FieldSetting>(fieldName: keyof T) {
        return this.props.schema.FieldSettings.find((f) => f.Name === fieldName) as TFieldSetting
    }

    public static getDerivedStateFromProps<T extends GenericContent>(_newProps: AdvancedSearchProps<T>, lastState: AdvancedSearchState<T>) {
        const query = new Query<T>((q) => q)
        return {
            ...lastState,
            query,
        }
    }

    public render() {
        return <div>
            {
                this.props.fields({
                    updateQuery: this.updateQuery,
                    schema: this.props.schema,
                    getFieldSetting: this.getFieldSetting,
                })
            }
        </div>
    }
}
