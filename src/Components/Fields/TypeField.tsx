import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Select, {SelectProps} from '@material-ui/core/Select'
import { SchemaStore } from '@sensenet/client-core/dist/Schemas/SchemaStore'
import { GenericContent } from '@sensenet/default-content-types'
import { Query, QueryExpression, QueryOperators } from '@sensenet/query'
import React = require('react')

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

export interface TypeFieldProps extends SelectProps {
    types: Array<{new(...args: any[]): GenericContent}>,
    schemaStore: SchemaStore
    onQueryChange: (query: Query<GenericContent>) => void
}

export interface TypeFieldState {
    selected: Array<{new(...args: any[]): GenericContent}>
    name: string
    query?: Query<any>
}

export class TypeField extends React.Component<TypeFieldProps, TypeFieldState> {

    public state: TypeFieldState = {
        name: '',
        selected: [],
    }

    /**
     *
     */
    constructor(props: TypeFieldProps) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    private handleChange(ev: React.ChangeEvent<HTMLSelectElement>) {
        const values = ev.target.value as any as string[]
        const selected = this.props.types.filter((typeName) => values.indexOf(typeName.name) > -1)
        const query = new Query((q) => {
            selected
            .map((contentType, currentIndex) => {
                // tslint:disable
                const queryRef = q['queryRef']
                new QueryExpression(queryRef).type(contentType)
                if (currentIndex < selected.length - 1) {
                    new QueryOperators(queryRef).or
                }
            })
            return q
        })
        this.props.onQueryChange(query)
        this.setState({
            name: ev.target.value,
            selected,
            query
        })
    }

    public render() {

        const selectedNames = this.state.selected.map((s) => this.props.schemaStore.getSchemaByName(s.name).ContentTypeName)
        const { onQueryChange, types, schemaStore, ...selectProps } = {...this.props}

        return (<Select
            multiple
            value={selectedNames}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={() => selectedNames.join(', ')}
            MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                  },
                },
              }}
              {...selectProps}
          >
            {this.props.types.map((contentType) => (
              <MenuItem key={contentType.name} value={contentType.name} title={this.props.schemaStore.getSchemaByName(contentType.name).Description}>
                <Checkbox checked={selectedNames.indexOf(contentType.name) > -1} />
                <ListItemText primary={contentType.name} />
              </MenuItem>
            ))}
          </Select>)
    }
}
