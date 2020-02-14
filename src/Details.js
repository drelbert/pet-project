import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

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
  state = { loading: true };
  componentDidMount() {
    // Lifecycle mehods similar to useEffect
    pet
      .animal(this.props.id) // this.props is immutable = read only since its from parent
      .then(({ animal }) => {
        //  => will not create a new context
        this.setState({
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
  // All class components must have a render() method
  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }

    const { animal, breed, location, description, name, media } = this.state; // Desrtructuring to pull all elements out of this.state

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
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
