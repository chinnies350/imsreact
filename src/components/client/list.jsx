import 'styles/client.scss';
import _ from 'lodash';
import React, { Component } from 'react';
import update from 'react-addons-update';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledButtonDropdown,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import XlsExport from 'xlsexport'
import { CSVLink } from "react-csv";
import { deleteClient } from 'services/clientService';
import ToastService from 'services/toastService'
import {subDirectory} from '../../config.json'

export default class ClientList extends Component {
    state = {
        data: [],
        type: "",
        columns: [],
        columnHeaders: { "keys": [], "def": {} },
        hideColumns: [],
        sort: [],
        isPageLoading: true,
        isLoading: false,
        errors: [],
        success: [],
        selected: [],
        exportData: [],
        toggleColumns: false,
        labels: {}
    }

    async componentDidMount() {
        const labels = this.getDefaultClientLabels();
        console.log(";;;;;;;;;;;;;;;;;;;;;;; labels ", labels)
        const { type, rightsData, data } = this.props;
        console.log(":;;;;;;;;;;;;;;;;;;;;;; props", this.props)
        console.log(":;;;;;;;;;;;;;;;;;;;;;; type", type)
        console.log(":;;;;;;;;;;;;;;;;;;;;;; rightsdata", rightsData)
        console.log(":;;;;;;;;;;;;;;;;;;;;;; datassss", data)
        await this.initTableData()
     
        await this.setState({ data, rightsData, type, labels, isPageLoading: false });
        await this.props.props.isPageLoadingFalse();
    }

    initTableData = async () => {
        const columnHeaders = this.getColumnHeaders(this.props.type, this.props.prefixUrl);
        const hideColumns = this.state.hideColumns;
        const columns = this.getColumns('client', columnHeaders, hideColumns);

        await this.setState({ columns, columnHeaders, hideColumns })
    }

    isColumnVisible = (key) => {
        return !_.includes(this.state.hideColumns, key)
    }

    toggleColumn = async (i) => {
        this.setState({ isLoading: true })
        await this.setState(prevState => {
            let hidden = prevState.columns[i] && prevState.columns[i]['hidden'] ? prevState.columns[i]['hidden'] : false;
            var index = this.state.hideColumns.indexOf(prevState.columns[i]['dataField'])
            let hideColumns = this.state.hideColumns
            if (!hidden) {
                hideColumns.push(prevState.columns[i]['dataField'])
            } else {
                if (index !== -1) {
                    hideColumns.splice(index, 1);
                }
            }
            return {
                columns: update(this.state.columns, { [i]: { hidden: { $set: !hidden } } }),
                hideColumns
            }
        })
        this.setState({ isLoading: false })
    }

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState(() => ({
                selected: [...this.state.selected, row.id],
                exportData: [...this.state.exportData, row],
            }));
        } else {
            this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row.id),
                exportData: this.state.exportData.filter(x => x !== row),
            }));
        }
    }

    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.id);
        if (isSelect) {
            this.setState(() => ({
                selected: ids,
                exportData: rows
            }));
        } else {
            this.setState(() => ({
                selected: [],
                exportData: []
            }));
        }
    }

    toggleColumns = () => {
        this.setState({ toggleColumns: !this.state.toggleColumns });
    }

    async exceltable(format) {
        let d = [];
        const { exportData } = this.state
        const { data, type } = this.props
        console.log(
            {data,type,exportData,format})
          
        if (format === 'selecteduserxls' && exportData !== undefined && exportData.length !== 0){
        
            d = this.downloadxls(exportData)
        }

      else if (format === 'alluserxls' && data !== undefined && data.length !== 0){
            d = this.downloadxls(data)
        }
        else{
            return ToastService.Toast("Please select the columns to download", "default");
         }
          var xls = new XlsExport(d)
        xls.exportToXLS(`${type}List.xls`)
    }

    downloadxls(data) {
        let dataarr = []
        if (data.length > 0) {
            for (let item of data) {
            // if(item.row)  {delete item.row}

                dataarr.push(_.omit(item,['row']))
            }
            return dataarr
        } else {
            return dataarr
        }
    }

    getColumns(type, columnsHeaders, hideColumns = []) {
        let columns = []
        const { keys, def } = columnsHeaders
        _.forEach(keys, (key) => {
            columns.push({ ...def[key], hidden: _.includes(hideColumns, key) })
        })
        return columns
    }

    getColumnHeaders(type, prefixUrl = "", dynamicLabels = {}) {
        let labels = dynamicLabels['client'] ? dynamicLabels : this.getDefaultClientLabels()
        let allKeys = ["name", "id", "noClient", "noEntity", "noBranch", "noDepartment", "noBatch", "noStudent", "noStaff", "actions"]
        let excludeKeys = [];
        switch (type) {
            case "client":
                excludeKeys = ["noClient"]
                break;
            case "entity":
                excludeKeys = ["noClient", "noEntity"]
                break;
            case "branch":
                excludeKeys = ["noClient", "noEntity", "noBranch", "actions"]
                break;
            case "department":
                excludeKeys = ["noClient", "noEntity", "noBranch", "noDepartment", "actions"]
                break;
            case "batch":
                excludeKeys = ["noClient", "noEntity", "noBranch", "noDepartment", "noBatch", "actions"]
                break;
            default:
                break;
        }

        let keys = _.filter(allKeys, (v) => !_.includes(excludeKeys, v))
        let def = {
            "sno": { dataField: 'sno', isDummyField: true, text: "S.No", formatter: this.serialNumberFormatter },
            "name": { dataField: 'name', text: `${this.capitalize(type)} ${labels["name"][0]} `, formatter: this.clientNameFormatter, filter: this.getTextFilter(), sort: true },
            "id": { dataField: 'id', text: `${this.capitalize(type)} ${labels['id'][0]} `, filter: this.getTextFilter(), formatter: this.clientLinkFormatter, formatExtraData: { type: type, prefixUrl: prefixUrl }, sort: true },
            "noClient": { dataField: 'noClient', text: `${labels['client'][0]}`, desc: `No of ${labels['client'][0]}`, sort: true },
            "noEntity": { dataField: 'noEntity', text: `${labels['entity'][0]}`, desc: `No of ${labels['entity'][0]}`, sort: true },
            "noBranch": { dataField: 'noBranch', text: `${labels['branch'][0]}`, desc: `No of ${labels['branch'][0]}`, sort: true },
            "noDepartment": { dataField: 'noDepartment', text: `${labels['department'][0]}`, desc: `No of ${labels['department'][0]}`, sort: true },
            "noBatch": { dataField: 'noBatch', text: `${labels['batch'][0]}`, desc: `No of ${labels['batch'][0]}`, sort: true },
            "noStaff": { dataField: 'noStaff', text: `Staffs`, desc: `No of ${labels['staff'][0]}`, sort: true },
            "noStudent": { dataField: 'noStudent', text: `Students`, desc: `No of ${labels['student'][0]}`, sort: true },
            "actions": { dataField: 'actions', isDummyField: true, text: "Actions", formatter: this.actionsFormatter }
        }
        return { "keys": keys, "def": def }
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getDefaultClientLabels() {
        // Client as Group
        //Entity as Institute
        return {
            "id": ["ID", "ID"],
            "name": ["Name", "Name"],
            // "client": ["Clients", "Client"],
            // "clients": ["Clients", "Client"],
            // "entity": ["Entities", "Entity"],
            // _____________________________
            "client": ["Groups", "Group"],
            "clients": ["Groups", "Group"],
            "entity": ["Institutions", "Institution"],
            //_______________________________
            "branch": ["Branches", "Branch"],
            "department": ["Departments", "Department"],
            "batch": ["Batches", "Batch"],
            "admin": ["Admins", "Admin"],
            "student": ["Students", "Student"],
            "staff": ["Staff", "Staff"],
            "parent": ["Parents", "Parent"]
        }
    }

    serialNumberFormatter=(cell, row, rowIndex, formatExtraData) =>{
        return rowIndex + 1
    }

    clientNameFormatter=(cell, row, rowIndex, formatExtraData)=> {
        if (row.type === 'client') {
            return (
                <div className="clientName">
                    <div className="icon" style={{ backgroundImage: `url(${row.icon})` }}></div>
                    {cell}
                </div>
            )
        } else {
            return (
                <div className="clientName">
                    {cell}
                </div>
            )
        }

    }

    clientLinkFormatter = (cell, row, rowIndex, formatExtraData) => {
        let links = []
        let { type, prefixUrl } = formatExtraData;
      
console.log({formatExtraData})
     //*   prefixUrl =  prefixUrl + '' + row.id

       if(prefixUrl&&prefixUrl!=="undefined"&&prefixUrl!=="null"){
        prefixUrl =  prefixUrl + '/' + row.id
       }
       else{
           prefixUrl=row.id
       }


        console.log(prefixUrl,row.id,"LL")  
        switch (type) {
            case "client":
                links.push(<NavLink key={rowIndex} to={`${subDirectory}/${prefixUrl}/entity/list`} title="Click to See Entity List" onClick={() => this.redirectTo()} className='cursor badge badge-primary'>{cell}</NavLink>)
                break;
            case "entity":
                links.push(<NavLink key={rowIndex} to={`${subDirectory}/${prefixUrl}/branch/list`} title="Click to See Branch List" onClick={() => this.redirectTo()} className='cursor badge badge-primary'>{cell}</NavLink>)
                break;
            case "branch":
                links.push(<NavLink key={rowIndex} to={`${subDirectory}/${prefixUrl}/department/list`} title="Click to See Department List" onClick={() => this.redirectTo()} className='cursor badge badge-primary'>{cell}</NavLink>)
                break;

            default:
                links.push(cell)
        }
        return <div className="">{links.concat(" ")}</div>
    }

    getTextFilter(type = "default") {
        return textFilter({
            placeholder: '',
            delay: 1000
        })
    }

    actionsFormatter = (cell, row, rowIndex, formatExtraData) => {
        const { rightsData } = this.state;
        const { type } = row;
        let editUrl = '';
        switch (type) {
            case "client":
                editUrl = `${subDirectory}/group/edit`
                break;
            case "entity":
                editUrl = `${subDirectory}/institution/edit`
                break;
            default:
                break;
        }
        let _form = "Clients";
        let links = [];
        // rightsData && rightsData[_form] && rightsData[_form].view.value &&
        links.push(<div key={'view' + rowIndex} onClick={() => this.editFun(`${subDirectory}/${row.type}/${row.id}/view`, row, "view")} className='badge badge-success'>View</div>)
        // rightsData && rightsData[_form] && rightsData[_form].edit.value &&
        links.push(<div key={'edit' + rowIndex} onClick={() => this.editFun(`${editUrl}`, row, 'edit')} className='badge badge-warning'>Edit</div>)
        rightsData && rightsData[_form] && rightsData[_form].delete.value && row.row.name.status === 'active' &&
            links.push(<div key={'delete' + rowIndex} onClick={() => this.deleteFun(row, 'blocked')} className='badge badge-danger'>Block</div>)
        rightsData && rightsData[_form] && rightsData[_form].edit.value && row.row.name.status !== 'active' &&
            links.push(<div key={'delete' + rowIndex} onClick={() => this.deleteFun(row, 'active')} className='badge badge-danger'>UnBlock</div>)
        return <div className="actions">{links.concat(" ")}</div>
    }

    editFun = (url, data, type) => {
        console.log(':;;;;;;;;;;;;;;;;;;;;;;;;;;; data at editfun ', data, url)
        if (type === 'edit') {
            const { row: { name }, id } = data;
            let name_ = name
            if (data.type === 'entity') {
                // for (let i = 0; i <= name.length - 1; i++) {
                //     if (name[i]["code"] === data.id) {
                //         name_ = name[i]
                //     }
                // }
                name_ = name.filter(n => n.code === data.id)[0]
            }
            this.props.props.history.push({
                pathname: url,
                state: {
                    row: name_,
                    entityId: id,
                    funType: type,
                    clientId: this.props.props.match.params.clientid
                }
            })
        }
        else if (type === "view") {
            const { row: { name }, id } = data;
            let name_ = name
            if (data.type === 'entity') {
                // url = '/institute'
                // for (let i = 0; i <= name.length - 1; i++) {
                //     if (name[i]["code"] === data.id) {
                //         name_ = name[i]
                //     }
                // }
                name_ = name.filter(n => n.code === data.id)[0]
            }
            this.props.props.history.push({
                pathname: url,
                state: {
                    row: name_,
                    entityId: id,
                    funType: type,
                    clientId: this.props.props.match.params.clientid
                }
            })
        }
        else if (type === "add") {
            const { id } = data;
            this.props.props.history.push({
                pathname: url,
                state: {
                    name: "",
                    funType: type,
                    entityId: id,
                    clientId: this.props.props.match.params.clientid,
                    // internalCode: '',
                    // password: this.props.props.session.password,
                    // name: this.props,
                    // shortname: '',
                    // logo: '',
                    // icon: '',
                    // email: this.props.props.session.email,
                    // uid: this.props.props.session.uid,
                    // defaultPassword: '',
                    // userType: this.props.props.session.userType,
                    // rules: ''
                }
            })
        }
        else {
            this.props.props.history.push({
                pathname: url,
                state: {
                    funType: type
                }
            })
        }
    }

    deleteFun = async (data, status) => {
        const { refreshTable } = this.props;
        let rowData = data.row.name

        let params = `/clients?uid=${rowData.uid}&code=${rowData.code}&status=${status}
        `
        let res = await deleteClient(params)

        if (res.data.statusCode === 1) {
            refreshTable()
        }
    }

    redirectTo = async (url) => {
        const { refreshTable } = this.props;
        await this.props.props.history.push({
            pathname: url
        })
        console.log(url)
        await refreshTable()
    }

    render() {
        const { isPageLoading, isLoading, type, labels, data, columnHeaders: { keys: colKeys, def: colDef }, columns, rightsData } = this.state;
        const excludeToggleFields = ["sno", "actions"];
        const { parentData } = this.props;
        let _form = "Clients";
        const selectRow = {
            mode: 'checkbox',
            // clickToSelect: true,
            clickToExpand: true,
            selected: this.state.selected,
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll,
            bgColor: '#b7e4ff',
            selectionHeaderRenderer: ({ mode, checked, indeterminate, ...rest }) => {
                return (
                    <div className="custom-control custom-control-inline mr-0  custom-checkbox">
                        <input type={mode} className="custom-control-input" checked={checked} indeterminate={indeterminate ? indeterminate.toString() : "false"} {...rest} />
                        <label className="custom-control-label"></label>
                    </div>
                )
            },
            selectionRenderer: ({ mode, ...rest }) => (
                <div className="custom-control custom-control-inline mr-0 custom-checkbox">
                    <input type={mode} className="custom-control-input" {...rest} />
                    <label className="custom-control-label"></label>
                </div>
            )
        }
        
        const options = {
            paginationSize: 4,
            pageStartIndex: 1,
            sizePerPage: 10,
            alwaysShowAllBtns: true, // Always show next and previous button
            hideSizePerPage: true, // Hide the sizePerPage dropdown always
            hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true
        };

        const { prefixUrl, props: { session: { data: { userType } } } } = this.props

        return (
            <React.Fragment>
                {!isPageLoading && <React.Fragment >
                    <Breadcrumb>
                        <BreadcrumbItem><NavLink to={`${subDirectory}/dashboard`}>Dashboard</NavLink></BreadcrumbItem>
                        {parentData && parentData.map(d => (
                            <BreadcrumbItem><NavLink to={`${subDirectory}/${d.type}/${d.id}`}>{d.id}</NavLink></BreadcrumbItem>))
                        }
                        {/* {type === 'entity' && userType === 'sadmin' &&
                            <BreadcrumbItem><NavLink to="/client/list">Clients</NavLink></BreadcrumbItem>
                        }
                        {type === 'entity' && userType === 'sadmin' &&
                            <BreadcrumbItem active>{prefixUrl}</BreadcrumbItem>
                        } */}
                        <BreadcrumbItem active>{labels[type][0]}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="d-md-flex align-items-md-center justify-content-md-between maincontentheader">
                        {type === 'entity' ?
                            <h5>Institutions</h5>
                            : <h5>Groups</h5>
                        }
                        <div>
                            <button className="btn btn-outline-info btn-sm" onClick={this.toggleColumns}>Columns</button> &nbsp;
                            {/* <button className="btn btn-outline-secondary btn-sm">Export</button> &nbsp; */}
                            {rightsData && rightsData[_form] && rightsData[_form].export.value &&
                                <UncontrolledButtonDropdown >
                                    <DropdownToggle caret className="btn btn-outline-secondary btn-sm white">Download</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem header>Excel Format</DropdownItem>
                                        <DropdownItem onClick={() => { this.exceltable('alluserxls') }}>All {labels[type][0]} List</DropdownItem>
                                        <DropdownItem onClick={() => { this.exceltable('selecteduserxls') }} >Selected {labels[type][0]} List</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem header>CSV Format</DropdownItem>
                                        <DropdownItem>
                                            <CSVLink data={this.downloadxls(this.props.data)} filename={`${labels[type][0]}list.csv`}>
                                                All {labels[type][0]} List
                                    </CSVLink>
                                        </DropdownItem>
                                        {/* <DropdownItem>
                                            <CSVLink data={this.downloadxls(this.state.exportData)} filename={`${labels[type][0]}list.csv`}>
                                                Selected {labels[type][0]} List
                                            </CSVLink>
                                        </DropdownItem> */}
                                           {this.state.exportData.length>0?
                                        <DropdownItem>
                                            <CSVLink data={this.downloadxls(this.state.exportData)} filename={`${labels[type][0]}list.csv`}>
                                                Selected {labels[type][0]} List
                                            </CSVLink>
                                        </DropdownItem>
                                        :null}
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>}&nbsp;
                            {rightsData && rightsData[_form] && rightsData[_form].create.value && type === 'client' &&
                                <NavLink className="btn btn-outline-primary btn-sm" to={`${subDirectory}/group/add`}>+ Add Group</NavLink>
                            }
                            {userType!=='sadmin'&&type === 'entity' &&
                                <button className="btn btn-outline-primary btn-sm" onClick={() => this.editFun(`${subDirectory}/institution/add`, '', 'add')}>+ Add Institution</button>
                            }
                        </div>
                    </div>

                    <Collapse isOpen={this.state.toggleColumns}>
                        <div className="alert alert-info alert-sm">
                            <div className="d-flex align-items-center justify-content-between">
                                <h6>Show/Hide Columns </h6>
                                {/* <button className="btn btn-link btn-sm" onClick={this.initTableData}>Reset to default visible columns</button> */}
                            </div>
                            {colKeys.map((k, i) => {
                                if (excludeToggleFields.indexOf(k) > -1)
                                    return ''

                                return <div key={`toggle_${k}`} className="custom-control custom-control-inline col-6 col-md-2 custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" checked={this.isColumnVisible(k)}
                                        onChange={(e) => this.toggleColumn(i)} id={`toggle_${k}`} />
                                    <label className="custom-control-label" htmlFor={`toggle_${k}`}>{colDef[k]['desc'] ? colDef[k]['desc'] : colDef[k]['text']}</label>
                                </div>
                            })}
                        </div>
                    </Collapse>
                    {!isLoading &&
                        <div>
                            <BootstrapTable
                                keyField="id"
                                data={data}
                                columns={columns}
                                bootstrap4
                                classes="table table-bordered table-hover table-sm"
                                wrapperClasses="table-responsive"
                                filter={filterFactory()}
                                pagination={paginationFactory(options)}
                                selectRow={selectRow}
                                noDataIndication={'No data to display here'}
                            />
                        </div>
                    }
                </React.Fragment>
                }
            </React.Fragment >
        );
    }
}

