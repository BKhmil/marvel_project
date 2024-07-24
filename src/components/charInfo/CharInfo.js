import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar(this.props.selectedChar);
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const { selectedChar } = this.props;

        if (!selectedChar) {
            return;
        }

        this.onCharLoading();

        this.marvelService.getCharacter(selectedChar)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false });
    }

    onError = () => {
        this.setState({ loading: false, error: true });
    }

    render() {
        const { char, loading, error } = this.state;

        const skeleton = !(char || loading || error) && <Skeleton />;
        const errorMess = error && <ErrorMessage />;
        const spinner = loading && <Spinner />;
        const view = !(loading || error || !char) && <View char={char} />;

        return (
            <div className="char__info">
                {skeleton}
                {errorMess}
                {spinner}
                {view}
            </div>
        );
    }
}

const View = ({ char }) => {
    const { name, thumbnail, description, homepage, wiki, comics } = char;

    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    const comicsList =
        comics.slice(0, 10).map((comic, index) => <li key={index} className="char__comics-item">{comic.name}</li>);

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList.length ? comicsList : 'No comics with this character'}
            </ul>
        </>
    );
}

export default CharInfo;