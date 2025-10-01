import Layout from "../../components/ui/Layout";
import Button from "../../components/ui/Button";
import "./StartPage.css";

const StartPage = ({ onNavigate }) => {
  return (
    <Layout>
      <div className="start-page">
        <h1>Хрестики-Нулики</h1>
        <Button onClick={() => onNavigate("game")} variant="primary">
          Почати гру
        </Button>
      </div>
    </Layout>
  );
};

export default StartPage;
