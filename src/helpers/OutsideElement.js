import React, { useRef, useEffect } from "react";

/* Hook that close popper when clicks outside of the passed ref */
function useOutsideAlerter(ref, showPopper) {

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                showPopper()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.showPopper);

    return <div ref={wrapperRef}>{props.children}</div>;
}