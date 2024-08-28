'use client'

// @ts-ignore
import { OCConnect, OCConnectProps } from '@opencampus/ocid-connect-js';

export default function OCConnectWrapper({ children, opts, sandboxMode }) {
    return (
        <OCConnect opts={opts} sandboxMode={sandboxMode}>
            {children}
        </OCConnect>
    );
}