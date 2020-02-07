import React from "react";

export default function Project({ name, lead, description }) {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{lead}</h2>
      <h2>{description}</h2>
    </div>
  );
}
