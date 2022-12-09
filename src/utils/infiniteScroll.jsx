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
    
    // use the observer to update the page based on the scroll position
    // if the user scrolls past 80% of the current page height fire the loadMore function
    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (y < window.innerHeight * 1.5) {
        this.props.loadMore();
        }
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
