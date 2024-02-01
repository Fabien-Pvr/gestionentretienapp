import ChoixMaterielNouveau from "./ChoixMaterielNouveau";
import MiseFormeFrameMat from "./MiseFormeFrameMat";
import "./CSS/Home.css";
const Home = () => {
  return (
    <div>
      <ChoixMaterielNouveau />
      <div className="ContainerInit">
        <MiseFormeFrameMat />
      </div>
    </div>
  );
};
export default Home;
