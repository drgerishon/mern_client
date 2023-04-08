import {useState} from 'react';
import {useIdleTimer} from 'react-idle-timer';

export default function useIdle({idleTime = 1}) {
    const [isIdle, setIsIdle] = useState(false);
    const handleOnIdle = () => {
        setIsIdle(true);
    };
    useIdleTimer({
        timeout: 1000 * 60 * idleTime,
        onIdle: handleOnIdle,
        debounce: 500,
    });

    return {
        isIdle,
    };
}
