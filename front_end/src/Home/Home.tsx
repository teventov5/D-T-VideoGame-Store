import { Slider } from '../Slider/Slider';
import './Home.css';

export function Home() {
    return (
        <div className="homePage minHeightClass">
            <h1 className="title">Our Games</h1>
            <Slider />
        </div>
    );
}
