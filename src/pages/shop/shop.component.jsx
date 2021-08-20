import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import {
//   firestore,
//   convertCollectionsSnapshotToMap
// } from '../../firebase/firebase.utils';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

class ShopPage extends React.Component {
  // state = {
  //   loading: true
  // };

  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    // console.log("Zdravo")
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection('collections');

    fetch('https://firestore.googleapis.com/v1/projects/crwn-db-72e2a/databases/(default)/documents/collections')
    .then(response => response.json())
    .then(collections => {
      console.log(collections.documents)
      let formatedCollection1 = collections.documents.map(document => {
      // console.log("Collection0", document)
     let arrayItems = document.fields.items.arrayValue.values.map(item =>  { 
       const itemFields = item.mapValue.fields
      return { 
       id: itemFields.id.integerValue, 
       imageUrl: itemFields.imageUrl.stringValue, 
       name: itemFields.name.stringValue, 
       price: itemFields.price.integerValue 
     }
   })
        return {
          id: document.name.split('/').pop(), 
          routeName: document.fields.title.stringValue.toLowerCase(),
          title: document.fields.title.stringValue, 
          items: arrayItems
      }
        
      })
      console.log("FormatedCollection0", formatedCollection1)

      console.log("Zdravo", formatedCollection1)
  const newVar = formatedCollection1.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {}); 
console.log(newVar);
      const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync(newVar);

      // formatedCollection1 = formatedCollection1.map(item => {
      //   // console.log("Collection0", document)
      //     return {id: item.id, routeName: item.routeName, title: item.title, items: item.items.map(item => { return { id: item.mapValue.fields.id.integerValue, imageUrl: item.mapValue.fields.imageUrl.stringValue, name: item.mapValue.fields.name.stringValue, price: item.mapValue.fields.price.integerValue }})
      //     }
  
    //  })

    //  console.log("FormatedCollection0", formatedCollection1)

    })
    
      // console.log(collections.documents)
      // collections.documents.forEach(item => {console.log(item)})
    
    // collectionRef.get().then(snapshot => {
    //   // console.log(snapshot)
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   // console.log(collectionsMap);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
    // const { fetchCollectionsStartAsync } = this.props;
    // fetchCollectionsStartAsync(formatedCollection1);
  }

  render() {
    const { match } = this.props;
    // const { loading } = this.state;

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />     
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  // updateCollections: collectionsMap =>
  //   dispatch(updateCollections(collectionsMap))
  fetchCollectionsStartAsync: (param1) => dispatch(fetchCollectionsStartAsync(param1))
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);