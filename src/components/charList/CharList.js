import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    onError = () => {
        this.setState({ error: true, loading: false });
    }

    onCharsLoaded = (chars) => {
        this.setState({ chars, loading: false, error: false });
    }

    renderList(chars) {
        const list = chars.map((char) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li
                    key={char.id}
                    className="char__item"
                    onClick={() => this.props.selectChar(char.id)}
                >
                    <img src={char.thumbnail} alt={char.name} style={imgStyle} />
                    <div className="char__name">{char.name}</div>
                </li>
            );
        });

        return (
            <ul className="char__grid">
                {list}
            </ul>
        )
    }

    render() {
        const { chars, loading, error } = this.state;

        const list = this.renderList(chars);

        const view = error ? <ErrorMessage /> : loading
            ? <Spinner /> : list;

        return (
            <div className="char__list">
                {view}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;