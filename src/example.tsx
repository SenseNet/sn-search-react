import { Repository } from '@sensenet/client-core'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AdvancedSearch } from './Components/AdvancedSearch'
import { TextField } from './Components/Fields/TextField'

// tslint:disable-next-line:new-parens
const repo = new Repository()

ReactDOM.render(
        <AdvancedSearch
            onQueryChanged={(q) => {
                // tslint:disable-next-line:no-console
                console.log(q.toString())
            }}
            schema={repo.schemas.getSchemaByName('GenericContent')}
            fields={(_options) => (
                <div>
                    <TextField
                        fieldName="DisplayName"
                        onQueryChange={_options.updateQuery}
                        fieldSetting={_options.getFieldSetting('DisplayName')}
                    />
                    <TextField
                        fieldName="DisplayName"
                        onQueryChange={_options.updateQuery}
                        fieldKey="alma"
                        fieldSetting={{
                            FieldClassName: 'DisplayName',
                        }}
                    />
                </div>)
            }
                /> ,
    document.getElementById('example'),
)
