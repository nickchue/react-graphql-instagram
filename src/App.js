import React from 'react';
import Header from './components/Header';
import Post from './components/Post';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <section className="App-main">
          <Post
            name="Nick Chue"
            avatar="https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png"
            image="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"
            image_alt="My First Post!"
            description="This is my first instagram post!"
          />
          <Post
            name="Nick Chue"
            avatar="https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png"
            image="https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?cs=srgb&dl=animal-avian-beak-349758.jpg&fm=jpg"
            image_alt="My First Post!"
            description="This is my second instagram post!"
          />
        </section>
      </div>
    );
  }
}

export default App;
