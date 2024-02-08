import React, { useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../Firebase";

const DeleteElement = ({ table, id }) => {
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      const elementRef = ref(db, `${table}/${id}`);
      await remove(elementRef);
      console.log(
        `Élément avec l'ID ${id} supprimé avec succès de la table ${table}.`
      );
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'élément :",
        error.message
      );
      setError(`Erreur lors de la suppression de l'élément : ${error.message}`);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleDelete}>Supprimer l'élément</button>
    </div>
  );
};

export default DeleteElement;

///// Exemple d'utilisation

// import React from "react";
// import DeleteElement from "./DeleteElement";

// const ExampleComponent = () => {
//   const exampleId = "-Np5iLUnLY4H6EFn38Qd"; // Remplacez cela par l'ID que vous souhaitez supprimer
//   const exampleTable = "Materiel"; // Remplacez cela par la table à partir de laquelle vous souhaitez supprimer l'élément

//   return (
//     <div>
//       <p>Supprimer un élément de la table :</p>
//       <DeleteElement table={exampleTable} id={exampleId} />
//     </div>
//   );
// };

// export default ExampleComponent;
