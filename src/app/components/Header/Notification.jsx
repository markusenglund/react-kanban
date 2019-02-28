import React from "react";
import { connect } from "react-redux";
import {Icon,Button,Popover,Pane,Text,Position,Table,Pill} from 'evergreen-ui'
import {withRouter} from 'react-router-dom'; 
import socket from '../../socketIOHandler';
import { withTranslation } from "react-i18next";

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      notifications:[]
    }
    socket.on("notification", (newNotification) => {
      this.addNewNotification(newNotification);
      //add state for changing logo to updates
    });
    
  }
  fetchNotificationsFromDB(){
    fetch("/api//notifications/getByUserId", {
      method: "POST",
      body: JSON.stringify({ id:this.props.userId }),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then(response => {
      if (response) {
        if (response.status === 200) {
          response.json().then(jsonData => {
           this.setState({notifications:jsonData}) 
          });
        }
      }
    });
  }
  addNewNotification(newNotification){
    let currentNotifications = this.state.notifications;
    this.setState({notifications:[...currentNotifications,newNotification]});
  }

  componentDidMount() {
    this.fetchNotificationsFromDB()

    const cardsById = this.props.cardsById;
 
  }
  goToBoard(notification){
    const {history} = this.props;
    history.push(`/b/${notification.boardId}`)
  }

  notificationMessage(notification){
    const { user, t } = this.props;
      return `${t("Notifications."+notification.action)} ${notification.title}`
  }
deleteHandler(notification){
  const notificationsWithRemovedNotification = [...this.state.notifications].filter(item=>item._id!==notification._id);          
  this.setState({notifications:notificationsWithRemovedNotification}) 
  fetch("/api//notifications/", {
    method: "DELETE",
    body: JSON.stringify({ _id:notification._id }),
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  }).then(response => {
    if (response) {
      if (response.status === 200) {
        //success
      }
    }
  });
}
  render() {
    const styles = {
      container: {
        display: "flex",
        alignItems: "center",
        padding: 4,
        background: "transparent",
        border: "none",
        outline: "none"
      },
      text: {
        display: "flex",
        background: "transparent",
        border: "none",
        outline: "none"
      },
      icon: {
        height: "25px"
      }
    };
    return (
      <div style={styles.container}>
        <Popover
        position={Position.BOTTOM_RIGHT}
  content={
    <Table
      width={400}
      height={480}
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDirection="column"
    >
    <Table.VirtualBody width={400}
      height={480}>
        
      {this.state.notifications?this.state.notifications.map(notification=>{return (
         
           <Table.Row
         key={notification._id}
         isSelectable
         
       >
         
         <Table.TextCell onClick={() => this.goToBoard(notification)} flexBasis={340} flexShrink={0} flexGrow={0}>
         {this.notificationMessage(notification)}
         </Table.TextCell>
         <Table.Cell>
         <Button
         onClick={()=>this.deleteHandler(notification)}
        isActive={false}
        appearance="minimal"
      ><Icon  
      
      appearance="minimal"
      height={40}
      icon="trash"
      color="danger"></Icon></Button>
         </Table.Cell>
       </Table.Row>
      
      )}):null}
       
       </Table.VirtualBody>
</Table>
  }
>
<Button
        isActive={false}
        appearance="minimal"
        height={40}
      >
      { this.state.notifications.length>0?
        (<Pill color="red" isSolid>{this.state.notifications.length}</Pill>):
        null}
      <Icon   
      appearance="minimal"
      height={40}
      icon="notifications"
      color="#ffffff"></Icon></Button>
</Popover>
       
      </div>
    );
  }

}

const mapStateToProps = state => {
  return { 
     userId:state.user ? state.user._id : "guest",
     boardsById:state.boardsById
  };
};

export default withRouter(connect(mapStateToProps)(withTranslation()(Notification)));
