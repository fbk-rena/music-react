import React from 'react';
import firebase from 'firebase'
import Playlist from './containers/Playlist';
import AddSong from './containers/AddSong';

export default	class SpotiRank extends React.Component {
    
 constructor(props){
    super(props);
    
    this.state = {
    playlist: ['Shape of you', 'Moonligth', 'Despacito']
};
     this.addToPlaylist = this.addToPlaylist.bind(this);
}
 componentDidMount(){
     const config = {
    apiKey: "AIzaSyBBLFLF7f1D7NaV0sxbD0GjUoO4tmkPA2M",
    authDomain: "spotirank-35c77.firebaseapp.com",
    databaseURL: "https://spotirank-35c77.firebaseio.com",
    projectId: "spotirank-35c77",
    storageBucket: "spotirank-35c77.appspot.com",
    messagingSenderId: "463651285149"
  };
    const app = firebase.initializeApp(config);
    this.database = app.database();
    
     const playlistDatabase = this.database.ref('/playlist');
     
     //leer la BD
     playlistDatabase.on('value', (snapshot)=>{
         const songs = snapshot.val();
         console.log(songs);
     })
 }   
    savePlaylist(songs){
      const playlistDatabase = this.database.ref('/playlist');
     //escribe en BD
     playlistDatabase.set({
         songs: songs
     });  
    }
    addToPlaylist = (song) => {
        let playlist = this.state.playlist;
        playlist.push(song);
        this.setState({
            plalist: playlist
        });
        this.savePlaylist(playlist);
    }
		render(){
            const songs = this.state.playlist;
            
			return(
				<div>
					<h1>SportiRank</h1>
					<AddSong addSongToPlayList={this.addSongToPlayList}/>
					<Playlist songs={songs}/>
				</div>
			);
		}
	}