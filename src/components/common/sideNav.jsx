import React from 'react';
import { Navbar, Nav, NavItem, Card, CardHeader, Collapse, CardBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import _ from 'lodash'
import * as FAIcons from 'react-icons/fa';
import { getRoles } from 'services/rolesService';
import Static from 'services/static';
import Menus from 'components/common/menus';
import Routes from './Routes';
import ClientView from 'components/client/viewForm'
import ToastService from "services/toastService"
import {subDirectory} from '../../config.json'


class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      list: [],
      RightsList: [],
      submoduleArr:[],
      collapse: 0,
    };
  }

  componentWillReceiveProps() {

  }
  async componentDidMount() {

    this.menuFormation();
  }
  menuFormation = async () => {
    const { session: { data: { userType, client,entity,branch,roles } }, session } = this.props.props;

    console.log(session)
    let list = {}
    let RightsList = {};
    list = Menus;
  
    // if(userType === 'client' || userType === 'entity'){
    //   delete list.institutions.submenu.Clients;
    //   list.institutions.submenu.Profile.url=`/client/${client}/view`;
    // }
    // if(userType === 'sadmin'){
    //   delete list.institutions.submenu.Profile;
    // }
    // if (userType === 'sadmin' || userType === 'client' || userType === 'entity') {
    //    RightsList = list
    // }
    // else {
    await this.Rights(session);

    const { userRights, submoduleArr } = this.state;
    

    _.forEach(userRights, (r, key) => {
      RightsList[r] = list[r];
      // console.log(RightsList[r] )
    });

    _.map(RightsList, (r, key) => {
      // console.log(r)
      _.map(_.keys(r.submenu), (s, key) => {
        // console.log(s,r.submenu)
        s = s.trim();
      
        if (_.includes(submoduleArr, s)) {
         
          if (s === "Institution") {
          
            r.submenu[s].url = `${subDirectory}/${client}/entity/list`
          
            // console.log( r.submenu[s].url)
          }




          // if (s === "Clients"){
          //   r.submenu[s].url = `/client/${client}/view`
          // }
        } else {
          delete r.submenu[s]
        }
        // _.map(submoduleArr,(sA,key) => {           
        //   if(sA[keyValue]){
        //     console.log(sA[keyValue],s)
        //     if(sA[keyValue] === s){
        //     }else{
        //       delete r.submenu[s]
        //     }
        //   }
        // })
      });

    });

    // }
console.log("rightslist",RightsList)
    //list = _.filter(list, v => _.includes(v.userTypes, userType));
    await this.setState({ RightsList });
  }

  Rights = async (session) => {
    // let rightsArr = ["clients", "setting", "user", "schedule", "roles", "timetable", "attendance", "fee", "leave", "exam", "course", "event", "report", "credentials", "notification", "grade"];
    let rightsArr = ["dashboard", "group", "roles", "institutions", "groupmasters", "institutionmasters", "scheduling", "academics", "exam", "staffs", "timetable", "students", "communication", "externalCourse", "events", "feeManagement", "reports"]
    let filterArr = ["dashboard"];
    let submoduleArr = [];
    if (session && session.data) {
      let res = await getRoles(`client=${session.data.client}&entity=${session.data.entity}&branch=${session.data.branch}&type=${session.data.roles}`);
// console.log(res,session.data)
      //m-modules , s-submodules, a-actions
      // if (res && res.data.statusCode === 1) {
      if (session && session.data && session.data.rightsData[0]) {
        // let rightsData = res.data.data[0];
        let rightsData = session.data.rightsData[0];
        console.log(rightsData)
        // _.map(rightsArr, (m, key) => {
        //   _.map(rightsData[m], (s, key) => {
        //     _.map(_.keys(s), (a, key) => {
        //       if (s[a].value) return filterArr.push(m);
        //     });
        //   });
        // });

        _.map(rightsArr, (m, key) => {
          _.map(_.keys(rightsData[m]), (sm, key) => {
            // console.log(rightsData[m][sm],"AAA")
            _.map(rightsData[m][sm], (a, key) => {
            
              if (a.value) {
                submoduleArr.push(sm)
                filterArr.push(m);
              }
            })
          })
        })

        filterArr = await _.uniq(filterArr)
        console.log(filterArr,await _.uniq(submoduleArr),"menus")
        await this.setState({
          userRights: filterArr,
          submoduleArr: submoduleArr
        })
      }
      else{
        ToastService.Toast("Seems Roles are empty. Please ask your Admin to Assign you Roles", "default");
      }
    }

    // let filterArr = [];
    // let rightsArr = ["dashboard", "institutions", "masters", "academics", "scheduling", "roles", "staffs", "class", "students", "communication", "externalCourse", "events", "feeManagement", "reports"]
    // let rightsData = Static.getModules();
    // _.map(rightsArr, (m, key) => {      
    //   _.map(_.keys(rightsData[m]), (sm, key) => {        
    //     _.map(rightsData[m][sm], (a, key) => {           
    //        if (a.value){            
    //         submoduleArr.push(sm)
    //         filterArr.push(m);
    //        } 
    //     })

    //   })

    // })
    filterArr = await _.uniq(filterArr)
    await this.setState({
      userRights: filterArr,
      submoduleArr: submoduleArr
    })

  }

  // toViewForm = () => {
  //   console.log(":;;;;;;;;;;;;; inside the to view form", this.props)

  //   const { props: { session, session: { data, data: { client } } } } = this.props;
  //   let url = `/client/${client}/view`
  //   let props = this.props
  //   let isPageLoadingFalse = false
  //   let isPageLoadingTrue = true

  //   // this.props["location"]["state"]["data"] = data;

  //   console.log(this.props)

  //   // /:type/:id/view

  //   // this.history.push({
  //   //   pathname: url,
  //   //   state: {
  //   //     row: data,
  //   //     entityId: client,
  //   //     funType: 'view'
  //   //   }
  //   // })

  //   return <Routes ><ClientView {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />}/></Routes>

  // }

  toggle(e) {
    let event = e.target.dataset.event;
    this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
  }

  render() {
    const { RightsList, collapse } = this.state;
    console.log(this.state)
    const { props: { session: { data, data: { client, userType } } } } = this.props;
    // let client_view = `/client/${client}/view`
    console.log(this.props,"side nav props")
    

    return (
      <Navbar className="sidemenu" >
        {/* {userType === "client" ?
          (RightsList &&
            <Nav navbar>
              {_.map(_.keys(RightsList), (item, i) =>
                <NavItem key={i}>
                  {!RightsList[item].submenu &&
                    <NavLink to={RightsList[item].url} onClick={this.toggle} data-event={i} className="nav-link mainnavtext">{RightsList[item].icon} {RightsList[item].text}</NavLink>
                  }
                  {RightsList[item].submenu &&
                    <div onClick={this.toggle} data-event={i} className="nav-link mainnavtext">{RightsList[item].icon} {RightsList[item].text}</div>
                  }
                  {RightsList[item].submenu &&
                    <Collapse isOpen={collapse === i} style={collapseStyle}>
                      {_.map(RightsList[item].submenu, (sm, i) =>
                        (sm.text === "Groups" ?
                          <NavLink to={{
                            pathname: sm.url,
                            state: {row: data}
                          }} className="nav-link">{sm.icon} {sm.text}</NavLink> :
                          // <div onClick={this.toViewForm} className="nav-link">{sm.icon} {sm.text}</div> :
                          <NavLink to={sm.url} className="nav-link">{sm.icon} {sm.text}</NavLink>)
                      )}
                    </Collapse>
                  }
                </NavItem>
              )}
            </Nav>
          ) : */}
          {RightsList &&
            <Nav navbar>
              {_.map(_.keys(RightsList), (item, i) =>
                <NavItem key={i}>
                  {!RightsList[item].submenu &&
                    <NavLink to={RightsList[item].url} onClick={this.toggle} data-event={i} className="nav-link mainnavtext">{RightsList[item].icon} {RightsList[item].text}</NavLink>
                  }
                  {RightsList[item].submenu &&
                    <div onClick={this.toggle} data-event={i} className="nav-link mainnavtext">{RightsList[item].icon} {RightsList[item].text}</div>
                  }
                  {RightsList[item].submenu &&
                    <Collapse isOpen={collapse === i} style={collapseStyle}>
                      {_.map(RightsList[item].submenu, (sm, i) =>
                        <NavLink to={sm.url} className="nav-link">{sm.icon} {sm.text}</NavLink>
                      )}
                    </Collapse>
                  }
                </NavItem>
              )}
            </Nav>
          }
      </Navbar>
    )
  }
}

var collapseStyle = {
  marginLeft: "20px",
};

export default SideNav;
