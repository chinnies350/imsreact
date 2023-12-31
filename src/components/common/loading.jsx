import React from 'react';
import 'styles/App.scss'
import loading from "./Images/imsloader.gif"
const typingspinner = {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    background: "#ffffffd1",
    zIndex: "555",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
  }
const Loading = ({ color }) => {   
    return (
        <div style={typingspinner} className="typing-spinner">
           {/* <div>  <img src="http://www.broadwaybalancesamerica.com/images/ajax-loader.gif"  alt="Loading" />  </div>            */}
           <div>  <img src={loading} style={{width:"180px"}}alt="Loading" height="150px" width="180px"/>  </div>           
        </div>  
    );
};

export default Loading;
