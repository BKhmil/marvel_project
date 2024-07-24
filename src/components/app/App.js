import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import { Component } from "react";

class App extends Component {
    state = {
        selectedChar: null
    }

    selectChar = (charId) => {
        this.setState({ selectedChar: charId });
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList selectChar={this.selectChar} />
                        <CharInfo selectedChar={this.state.selectedChar} />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        );
    }
}

export default App;