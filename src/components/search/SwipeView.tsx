import Button from "../Button";

type SwipeProps = {
    onBack: () => void;
}

function SwipeCandidates({onBack} : SwipeProps) {

    // get the filtered candidates:
    
    return ( 
        <section style={ {backgroundColor: 'pink'}}>
            <Button onClick={() => {onBack()}}>
                <i></i>
            </Button>
            empty swipe candidate view
        </section>
     );
}

export default SwipeCandidates;