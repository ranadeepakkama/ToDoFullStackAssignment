import Navbar from "../Navbar";
import TodoList from "../TodoList";
import './index.css';

const HomePage = () => {

    return (
        <div>
            <Navbar />
            <div>
                <TodoList/>
            </div>
        </div>
    );
};

export default HomePage;
