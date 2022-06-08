import React from 'react';

class ShowJournal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { entries: '', dataIsReady:false };
    
    }
    componentDidMount() {
        fetch(
            "https://8ff9bpdm7f.execute-api.us-east-1.amazonaws.com/dev/journal")
            .then((res) => res.json())
            .then((json) => {
                console.log("Received data from REST GET call: "+json);
                this.setState({
                    entries: json,
                    dataIsReady: true
                });
            })
    }
    render() {
        const { dataIsReady, entries } = this.state;
        if (!dataIsReady) return <div>
            <h3> Retrieving your journal... </h3> </div> ;

        return (
        <div >
            <h3> Your Journal </h3> 
            {
                entries.data.Items.map((item) => ( 
                    <ol key = { item.id } >
                        Title: { item.title },<br></br> 
                        Content: { item.content },<br></br> 
                        Mood: { item.mood } 
                        </ol>
                    ))
            }
        </div>
    );
}
}

export default ShowJournal;