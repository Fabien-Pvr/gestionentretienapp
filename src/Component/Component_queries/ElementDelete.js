// DeleteElement.js
import { ref, remove } from "firebase/database";
import { db } from "../../Services/Firebase";

const deleteElement = async (table, id, setError) => {
  try {
    const elementRef = ref(db, `${table}/${id}`);
    await remove(elementRef);
    console.log(
      `Élément avec l'ID ${id} supprimé avec succès de la table ${table}.`
    );
    setError(""); // Effacez l'erreur en cas de succès
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de l'élément :",
      error.message
    );
    setError(`Erreur lors de la suppression de l'élément : ${error.message}`);
  }
};

export default deleteElement;
