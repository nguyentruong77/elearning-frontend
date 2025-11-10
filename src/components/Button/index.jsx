import React from 'react'
import { ButtonStyle } from './style'
import { LoadingOutlined } from '@ant-design/icons';

export default function Button({ loading, children, ...props }) {
    return (
        <ButtonStyle {...props} disabled={loading} className={`btn main rect gap-3 ${props.className ?? ''}`} >
            {loading && <LoadingOutlined style={{ fontSize: 20 }} />}
            {children}
        </ButtonStyle >
    )
}
