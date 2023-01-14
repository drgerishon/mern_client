// import React from 'react'
// import IdleTimer from 'react-idle-timer';
// import {IdleTimeOutModal} from "../components/modal/IdleTimeOutModal";
// import {Outlet} from "react-router-dom";
//
// class IdlerDetector extends React.Component {
//
//     constructor(props) {
//         super(props)
//
//         this.state = {
//             timeout: 1000 * 5,
//             showModal: false,
//             userLoggedIn: false,
//             isTimedOut: false
//         }
//
//         this.idleTimer = null
//         this.onAction = this._onAction.bind(this)
//         this.onActive = this._onActive.bind(this)
//         this.onIdle = this._onIdle.bind(this)
//         this.handleClose = this.handleClose.bind(this)
//         this.handleLogout = this.handleLogout.bind(this)
//     }
//
//     _onAction(e) {
//         console.log('user did something', e)
//         this.setState({isTimedOut: false})
//     }
//
//     _onActive(e) {
//         console.log('user is active', e)
//         this.setState({isTimedOut: false})
//     }
//
//     _onIdle(e) {
//         console.log('user is idle', e)
//         const isTimedOut = this.state.isTimedOut
//         if (isTimedOut) {
//             this.props.history.push('/')
//         } else {
//             this.setState({showModal: true})
//             this.idleTimer.reset();
//             this.setState({isTimedOut: true})
//         }
//
//     }
//
//     handleClose() {
//         this.setState({showModal: false})
//     }
//
//     handleLogout() {
//         this.setState({showModal: false})
//         //logout
//     }
//
//     render() {
//
//         return (
//             <>
//                 <IdleTimer
//                     ref={ref => {
//                         this.idleTimer = ref
//                     }}
//                     element={document}
//                     onActive={this.onActive}
//                     onIdle={this.onIdle}
//                     onAction={this.onAction}
//                     debounce={250}
//                     timeout={this.state.timeout}/>
//
//                 <div className="">
//
//
//                     <IdleTimeOutModal
//                         showModal={this.state.showModal}
//                         handleClose={this.handleClose}
//                         handleLogout={this.handleLogout}
//                     />
//                 </div>
//             </>
//         )
//     }
//
// }
//
// export default IdlerDetector

import {useEffect, useState} from "react";
import {useIdleTimer} from "react-idle-timer";

export function App() {
    // Set timeout values
    // const timeout = 1000 * 60 * 30
    // const promptTimeout = 1000 * 30
    const timeout = 1000 * 60
    const promptTimeout = 1000 * 30

    // Modal open state
    const [open, setOpen] = useState(false)

    // Time before idle
    const [remaining, setRemaining] = useState(0)

    const onPrompt = () => {
        // onPrompt will be called after the timeout value is reached
        // In this case 30 minutes. Here you can open your prompt.
        // All events are disabled while the prompt is active.
        // If the user wishes to stay active, call the `reset()` method.
        // You can get the remaining prompt time with the `getRemainingTime()` method,
        setOpen(true)
        setRemaining(promptTimeout)
    }

    const onIdle = () => {
        // onIdle will be called after the promptTimeout is reached.
        // In this case 30 seconds. Here you can close your prompt and
        // perform what ever idle action you want such as log out your user.
        // Events will be rebound as long as `stopOnMount` is not set.
        setOpen(false)
        setRemaining(0)
    }

    const onActive = () => {
        // onActive will only be called if `reset()` is called while `isPrompted()`
        // is true. Here you will also want to close your modal and perform
        // any active actions.
        setOpen(false)
        setRemaining(0)
    }

    const {getRemainingTime, isPrompted, activate} = useIdleTimer({
        timeout,
        promptTimeout,
        onPrompt,
        onIdle,
        onActive
    })

    const handleStillHere = () => {
        setOpen(false)
        activate()
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPrompted()) {
                setRemaining(Math.ceil(getRemainingTime() / 1000))
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [getRemainingTime, isPrompted])

    return (
        <div className='modal' style={{display: open ? 'block' : 'none'}}>
            <p>Logging you out in {remaining} seconds</p>
            <button onClick={handleStillHere}>Im Still Here</button>
        </div>
    )
}