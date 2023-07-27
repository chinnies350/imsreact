import Joi from 'joi-browser';
import _ from 'lodash';
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { deleteSyllabus } from 'services/syllabusService'
import ToastService from 'services/toastService'

import {subDirectory} from '../../config.json'

export default class SyllabusList extends Component {

    state = {
        clientIds: [], entityIds: [], branchIds: [],
        client: '',
        entity: '',
        department: '',
        branch: '',
        batch: '',
        uid: '',
        data:' ',
        data1:' '
    }

    async componentDidMount() {
        console.log('......................')
        
        const {data, rightsData } = this.props;
        const { data1 } = this.props
        const { client, entity, branch,prefixUrl } = this.state;
        console.log(this.state,this.props)
       
        let tableDatas = [];
        for (let item of data) {
            item['lesson'].map(sitem => {
                sitem["refId"] = item["refId"];
                return ''
            });
            tableDatas = _.concat(tableDatas, item['lesson']);
        }
        this.setState({ tableDatas,data, rightsData })
        await this.initTableData()


        if (this.props.history) {
            console.log(" hggggggggggg")
            this.setState({
                data: this.props.location,
                // client: this.props.location.client,
                // entity: this.props.location.entity,
                // branch: this.props.location.branch,
                
            })
           
        }
        console.log('77777777777777777777')

    }

 

    schema = {
        branch: Joi.string().required().label("Department"),
        client: Joi.string().required().label("Client"),
        entity: Joi.string().required().label("Entity")
    };

    initTableData = async () => {
        const { hideColumns } = this.state;
        const columnHeaders = this.getColumnHeaders(this.props.prefixUrl);
        const columns = getColumns(columnHeaders, hideColumns);
        await this.setState({ columns, columnHeaders, hideColumns })
    }

    getColumnHeaders(prefixUrl = "") { //dynamic headers 
        let allKeys = [  "Subject Code", "Chapter Name", "Syllabus", "actions"];
        let excludeKeys = [];
        let keys = _.filter(allKeys, (v) => !_.includes(excludeKeys, v))
        let def = {
            "sno": { dataField: 'sno', isDummyField: true, text: "S.No", formatter: serialNumberFormatter },
            "Subject Code": { dataField: 'refId', text: 'Subject Code ', sort: true, filter: getTextFilter() },
            "Chapter Name": { dataField: 'chapter', text: 'Chapter Name', sort: true, filter: getTextFilter() },
            "Syllabus": { dataField: 'syllabus', text: 'Syllabus', sort: true, filter: getTextFilter() },
            "actions": { dataField: 'actions', isDummyField: true, text: "Actions", formatter: this.actionsFormatter }
        }
        return { "keys": keys, "def": def }
    }

    actionsFormatter = (cell, row, rowIndex, formatExtraData) => {
        const { rightsData } = this.state;
        let _form = "Syllabus";
        let links = [];
        rightsData && rightsData[_form] && rightsData[_form].edit.value &&
            links.push(<div onClick={() => this.editFun(`${subDirectory}/course/syllabus/edit`, row)} className='badge badge-warning'>Edit</div>)
        rightsData && rightsData[_form] && rightsData[_form].delete.value &&
            links.push(<div onClick={() => this.deleteSyllabus(row)} className='badge badge-danger'>Delete</div>)

        return <div className="actions">{links.concat(" ")}</div>
    }

    editFun = (url, syllabusDatas) => {//Pass Datas to Edit page 
        console.log(' edit syllabus',syllabusDatas)       
        const { client, entity, branch } = this.props
        let path = url;
        this.props.props.history.push({
            pathname: path,
            state: {
                syllabusDatas, "client": client, "entity": entity, "branch": branch,

            }
        })
        
    }

    

    deleteSyllabus = async (row) => { //Delete the particular details from the table
        console.log(" delete syllabus",row)
        const { refreshTable } = this.props; 
      
   const{data,client,entity,branch}= this.props
        console.log(this.props,this.state)
        let response;
        let params = `client=${client}&entity=${entity}&branch=${branch}&refId=${row.refId}&id=${row._id}`
        console.log(params)
        response = await deleteSyllabus(params)
        console.log(response)
        if (response.data.statusCode !== 1) return ToastService.Toast(response.data.message, 'default');
        if (response.data.statusCode === 1) {
            await ToastService.Toast(response.data.message, 'default');
            refreshTable()    
           
        }
    }

    render() {
        const options = {
            paginationSize: 4,
            pageStartIndex: 1,
            sizePerPage: 100,
            alwaysShowAllBtns: true,
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true,
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
        const {data,data1,client,entity,branch, tableDatas, columns } = this.state;
        console.log(this.state)
        return (
            <React.Fragment >
                {tableDatas &&
                    <BootstrapTable
                        keyField="_id"
                        data={tableDatas}
                        columns={columns}
                        bootstrap4
                        pagination={paginationFactory(options)}
                        classes="table table-bordered table-hover table-sm"
                        wrapperClasses="table-responsive"
                        filter={filterFactory()}
                        noDataIndication={'No data to display here'}
                    />
                }
            </React.Fragment>)
    }
}

function getTextFilter(type = "default") { //Bootstrap filter
    return textFilter({
        placeholder: '',
        delay: 1000
    })
}

function serialNumberFormatter(cell, row, rowIndex, formatExtraData) {
    return rowIndex + 1
}

function getColumns(columnsHeaders, hideColumns) {
    let columns = []
    const { keys, def } = columnsHeaders;

    _.forEach(keys, (key) => {
        columns.push({ ...def[key], hidden: _.includes(hideColumns, key) })
    })
    return columns;
}

