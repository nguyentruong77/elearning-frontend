import { ErrorText } from "../Input/style"

export const Checkbox = ({ onChange, value, error, children }) => {
    const _onChange = (ev) => {
        onChange({ target: { value: ev.target.Checked } })
    }

    return (
        <>
            <div className="checkcontainer">
                {children}
                {/* Giảm giá còn <span><strong>5.800.000 VND</strong>, còn lại 100 COIN</span> */}
                {/* Cần ít nhất 200 COIN để giảm giá */}
                <input type="checkbox" onChange={_onChange} checked={value} />
                <span className="checkmark" />
            </div>
            {error && <ErrorText>{error}</ErrorText>}
        </>
    )
}
