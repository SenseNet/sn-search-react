import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import MaterialTextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Repository } from '@sensenet/client-core'
import { MaterialIcon } from '@sensenet/icons-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AdvancedSearch } from './Components/AdvancedSearch'
import { TextField } from './Components/Fields/TextField'

// tslint:disable-next-line:new-parens
const repo = new Repository()

interface ExampleComponentState {
    nameFieldQuery: string
    displayNameFieldQuery: string
    fullQuery: string
}

class ExampleComponent extends React.Component<{}, ExampleComponentState> {
    public state: ExampleComponentState = {
        nameFieldQuery: '',
        displayNameFieldQuery: '',
        fullQuery: '',
    }
    public render() {
        return (<div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        <MaterialIcon iconName="search" style={{ color: 'white', padding: '0 15px 0 0', verticalAlign: 'text-bottom' }} />
                        Advanced Search Example
                    </Typography>
                </Toolbar>
            </AppBar>
            <AdvancedSearch
                style={{
                    height: '100%',
                }}
                onQueryChanged={(q) => {
                    this.setState({ fullQuery: q.toString() })
                }}
                schema={repo.schemas.getSchemaByName('GenericContent')}
                fields={(_options) => (
                    <Paper style={{ margin: '1em' }}>
                        <div style={{
                            display: 'flex',
                            padding: '1em',
                            justifyContent: 'space-evenly',
                            flexWrap: 'wrap',
                        }}>
                            <TextField
                                fieldName="Name"
                                onQueryChange={(key, query) => {
                                    this.setState({ nameFieldQuery: query.toString() })
                                    _options.updateQuery(key, query)
                                }}
                                fieldKey="alma"
                                fieldSetting={_options.getFieldSetting('Name')}
                                helperText={this.state.nameFieldQuery ? `Field Query: ${this.state.nameFieldQuery}` : 'A simple free text query on the Name field'}
                            />

                            <TextField
                                fieldName="DisplayName"
                                onQueryChange={_options.updateQuery}
                                fieldSetting={_options.getFieldSetting('DisplayName')}
                            />
                            <MaterialTextField
                                style={{
                                    flexWrap: 'wrap',
                                }}
                                fullWidth
                                margin="normal"
                                variant="filled"
                                label="Full query"
                                disabled={true}
                                value={this.state.fullQuery}
                            />

                        </div>
                    </Paper>
                )
                }
            />
        </div>)
    }
}

ReactDOM.render(
    <ExampleComponent />,
    document.getElementById('example'),
)
