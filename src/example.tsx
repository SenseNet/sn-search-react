import { Repository } from '@sensenet/client-core'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AdvancedSearch } from './Components/AdvancedSearch'
import { TextField } from './Components/Fields/TextField'

// tslint:disable-next-line:new-parens
const repo = new Repository()

ReactDOM.render(
        <AdvancedSearch
            onSearch={(q) => {
                // tslint:disable-next-line:no-console
                console.log(q.toString())
            }}
            searchRoots={[]}
            schemas={repo.schemas}
            fields={[
                {
                    fieldName: 'DisplayName',
                    control: TextField,
                },
                {
                    fieldName: 'Name',
                    control: TextField,
                },
            ]}
                /> ,
    document.getElementById('example'),
)
