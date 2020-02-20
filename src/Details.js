import React, { lazy } from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

const Modal = lazy(() => import("./Modal"));

class Details extends React.Component {
  // Non-Babel way
  // constructor(props) {
  //   super(props); // Since this is constructed with props, they have to be handed up to React

  //   this.state = {
  //     // Setting state for this component,
  //     loading: true
  //   };
  // }

  // Using Babel and Parcel together
  state = { loading: true, showModal: false };
  componentDidMount() {
    // Lifecycle mehods similar to useEffect
    pet
      .animal(this.props.id) // this.props is immutable = read only since its from parent
      .then(({ animal }) => {
        //  => will not create a new context
        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        });
      }, console.error);
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);
  // All class components must have a render() method
  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal
    } = this.state; // Desrtructuring to pull all elements out of this.state

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>

          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}? </h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>Cancel</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
