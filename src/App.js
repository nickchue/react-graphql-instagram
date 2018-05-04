import React from 'react';
import Header from './components/Header';
import Posts from './components/Posts';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends React.Component {
  componentDidMount() {
    // To Check support notification or not
    // if ('actions' in Notification.prototype) {
    //   alert('You can enjoy the notification feature');
    // } else {
    //   alert('Sorry notifications are NOT supported on your browser');
    // }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <section className="App-main">
            <Posts pusher={this.props.pusher} apollo_client={client} />
          </section>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
