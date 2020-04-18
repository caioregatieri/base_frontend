import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import { 
    AddBox, 
    ArrowDownward, 
    Check, 
    ChevronLeft, 
    ChevronRight, 
    Clear, 
    DeleteOutline, 
    Edit, 
    FilterList, 
    FirstPage, 
    LastPage, 
    Remove, 
    SaveAlt, 
    Search, 
    ViewColumn,
} from '@material-ui/icons'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const localization = {
    pagination: {
        labelDisplayedRows: "{from}-{to} de {count}",
        labelRowsSelect: "registros",

        firstAriaLabel: "Inicio",
        firstTooltip: "Inicio",
        previousAriaLabel: "Anterior",
        previousTooltip: "Anterior",
        nextAriaLabel: "Proxímo",
        nextTooltip: "Proxímo",
        lastAriaLabel: "Fim",
        lastTooltip: "Fim",
    },
    toolbar: {
        searchTooltip: "Localizar",
        searchPlaceholder: "Localizar",
    },
    header: {
        actions: 'Ações'
    },
    body: {
        emptyDataSourceMessage: "Nada a exibir"
    }
}

const options = {
    debounceInterval: 500,
    searchFieldStyle: {
        fontSize: '14px'
    },
    headerStyle: {
        backgroundColor: '#01579b',
        color: '#FFF',
        fontSize: '14px'
    },
    actionsColumnIndex: -1,
    // exportButton: true,
    pageSize: 10,
    pageSizeOptions: [
        10, 20, 50, 100
    ],
    // paginationType: 'stepped'
}

const onRowClick = (event, rowData) => {
    alert('onRowClick', JSON.stringify(rowData))
}

const onChangePage = (page) => {
    alert('onChangePage', page)
}

const onChangeRowsPerPage = (pageSize) => {
    alert('onChangeRowsPerPage', pageSize)
}

const onOrderChange = (orderedColumnId, orderDirection) => {
    alert('onOrderChange', orderedColumnId, orderDirection)
}

const onSearchChange = (obj) => {
    alert('onSearchChange', JSON.stringify(obj))
}

export default (props) => {
    return (
        <MaterialTable
            icons={tableIcons}
            localization={localization}
            options={options}
            {...props}
        />
    )
}

