import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

// import {
//   firestore,
//   convertCollectionsSnapshotToMap
// } from '../../firebase/firebase.utils';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  // state = {
  //   loading: true
  // };

  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    // console.log("Zdravo")
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection('collections');

    // // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-72e2a/databases/(default)/documents/collections')
    // // .then(response => response.json())
    // // .then(collections => console.log(collections));

    // collectionRef.get().then(snapshot => {
    //   // console.log(snapshot)
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   // console.log(collectionsMap);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const {match, isCollectionFetching, isCollectionLoaded} = this.props;
    // const { loading } = this.state;

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={props => (
            <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
          )} />
        <Route path={`${match.path}/:collectionId`} render={props => (
            <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
          )} />
     </div>
    )
  }
};

const mapStatetoProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  // updateCollections: collectionsMap =>
  //   dispatch(updateCollections(collectionsMap))
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ShopPage);