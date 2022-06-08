import React from 'react';
import fetch from 'isomorphic-fetch';


class WriteToJournal extends React.Component{
    constructor(props){
        super(props);
        this.handleJournalSubmit=this.handleJournalSubmit.bind(this);

   }
    handleJournalSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
        fetch('https://8ff9bpdm7f.execute-api.us-east-1.amazonaws.com/dev/journal', {
            method: 'POST',
            body: (json),
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                    window.location.reload();
              } else {
               console.log('Error getting a response');
              }
        }).catch(err => err);
	
    }
    render(){
        return(<><h3>Write to your journal</h3><form method="post" onSubmit={this.handleJournalSubmit} name="journalentry">
            <table name="addtojournal"><tbody>
                <tr><td><label>Title  </label></td><td><input name="title"></input></td></tr>
                <tr><td><label>Content  </label></td><td><textarea name="content"></textarea></td></tr>
                <tr><td><label>Mood  </label></td><td><select name="mood"><option>Happy</option><option>Sad</option><option>Angry</option></select></td></tr>
                <tr><td></td><td><input type="submit" value="Add to Journal" /></td></tr>
                </tbody>
            </table>
        </form></>);
    }
}

export default WriteToJournal;