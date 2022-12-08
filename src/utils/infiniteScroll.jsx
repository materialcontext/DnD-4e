// use the intersection observer to create infinite scroll of the FeatsTable for preact
import { Component } from 'preact';

export default class InfiniteScroll extends Component {
    constructor(props) {
        super(props);
        this.observer = new IntersectionObserver(this.handleObserver.bind(this), {
        rootMargin: '0px',
        threshold: .08
        });
    }
    
    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.prevY > y - 50) {
            console.log(entities[0])
            const { loadMore } = this.props;
            loadMore();
        }
        this.prevY = y;
    }
    
    componentDidMount() {
        this.observer.observe(this.loadingRef);
    }
    
    componentWillUnmount() {
        this.observer.disconnect();
    }
    
    render() {

        return (
        <div>
            {this.props.children}
            <div
            ref={loadingRef => (this.loadingRef = loadingRef)}
            style={{ height: '10px'}}
            ></div>
        </div>
        );
    }   
}
