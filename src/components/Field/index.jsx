import React, { memo } from "react";
import styled from "styled-components";

const ErrorS = styled.span`
  color: red;
  position: absolute;
  top: 100%;
  left: 230px;
  font-size: 0.875rem;
  font-style: italic;
`;

function Field({
  label,
  error,
  required,
  type = "text",
  renderInput,
  ...props
}) {
  return (
    <label style={{ position: 'relative' }}>
      <p>
        {label}
        {required && <span>*</span>}
      </p>
      {renderInput ? renderInput?.(props) : <input {...props} type={type} />}
      {error && <ErrorS>{error}</ErrorS>}
    </label>
  );
}
export default memo(Field, (oldProps, newProps) => {
  return oldProps.error === newProps.error && oldProps.value === newProps.value
})
